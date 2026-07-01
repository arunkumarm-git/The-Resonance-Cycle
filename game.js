/* =============================================================
   THE RESONANCE CYCLE — GAME ENGINE
   =============================================================
   State machine-based narrative game. All scenes, choices,
   and morality logic live here. Images are loaded from /assets/.
   ============================================================= */

'use strict';

// ─────────────────────────────────────────────────────────────
// SOUND ENGINE  (Web Audio API — fully procedural, no files)
// ─────────────────────────────────────────────────────────────
class SoundEngine {
  constructor() {
    this.ctx         = null;
    this.masterGain  = null;
    this.muted       = false;
    this.ambientNode = null;   // currently playing ambient loop
    this.tickInterval = 2;     // play tick every N characters
    this.tickCounter  = 0;
  }

  /** Called on first user gesture to unlock AudioContext */
  unlock() {
    if (this.ctx) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.55, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
      this.playBoot();
    } catch (e) {
      console.warn('Web Audio not supported', e);
    }
  }

  setMuted(val) {
    this.muted = val;
    if (!this.masterGain) return;
    this.masterGain.gain.setTargetAtTime(
      val ? 0 : 0.55,
      this.ctx.currentTime, 0.1
    );
    if (val) this._stopAmbient();
  }

  // ── INTERNAL helpers ──────────────────────────────────────
  _osc(type, freq, startTime, duration, gainPeak = 0.4, detune = 0) {
    if (!this.ctx || this.muted) return;
    const g   = this.ctx.createGain();
    const osc = this.ctx.createOscillator();
    osc.type    = type;
    osc.frequency.setValueAtTime(freq, startTime);
    if (detune) osc.detune.setValueAtTime(detune, startTime);
    g.gain.setValueAtTime(0, startTime);
    g.gain.linearRampToValueAtTime(gainPeak, startTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
    osc.connect(g); g.connect(this.masterGain);
    osc.start(startTime); osc.stop(startTime + duration);
  }

  _noise(startTime, duration, gainPeak = 0.15, lpFreq = 800) {
    if (!this.ctx || this.muted) return;
    const bufLen = this.ctx.sampleRate * duration;
    const buf    = this.ctx.createBuffer(1, bufLen, this.ctx.sampleRate);
    const data   = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) data[i] = Math.random() * 2 - 1;
    const src    = this.ctx.createBufferSource();
    src.buffer   = buf;
    const lp     = this.ctx.createBiquadFilter();
    lp.type      = 'lowpass';
    lp.frequency.setValueAtTime(lpFreq, startTime);
    const g      = this.ctx.createGain();
    g.gain.setValueAtTime(0, startTime);
    g.gain.linearRampToValueAtTime(gainPeak, startTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
    src.connect(lp); lp.connect(g); g.connect(this.masterGain);
    src.start(startTime); src.stop(startTime + duration);
  }

  // ── PUBLIC SOUNDS ─────────────────────────────────────────

  /** Boot / init chime — low resonance pulse */
  playBoot() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime + 0.1;
    // Deep resonance thrum
    this._osc('sine',      55,  t,       2.5, 0.18);
    this._osc('sine',      110, t + 0.3, 1.8, 0.09);
    this._osc('triangle',  220, t + 0.8, 1.2, 0.06);
    this._noise(t, 0.4, 0.12, 400);
    // Subtle teal ping
    this._osc('sine', 880, t + 1.2, 0.6, 0.05);
    this._osc('sine', 1320, t + 1.4, 0.4, 0.03);
  }

  /** Single typewriter tick — soft mechanical click */
  playTick() {
    this.tickCounter++;
    if (this.tickCounter % this.tickInterval !== 0) return;
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;
    this._noise(t, 0.04, 0.08, 2200);
    this._osc('square', 1800, t, 0.03, 0.04);
  }

  /** Scene transition — dimensional whoosh */
  playTransition() {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;
    // Sweep osc
    const osc = this.ctx.createOscillator();
    const g   = this.ctx.createGain();
    osc.type  = 'sine';
    osc.frequency.setValueAtTime(80, t);
    osc.frequency.exponentialRampToValueAtTime(400, t + 0.3);
    osc.frequency.exponentialRampToValueAtTime(60, t + 0.7);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.28, t + 0.1);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
    osc.connect(g); g.connect(this.masterGain);
    osc.start(t); osc.stop(t + 0.8);
    this._noise(t + 0.05, 0.4, 0.1, 600);
  }

  /** Empathy choice — warm crystalline chime */
  playEmpathy() {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;
    // Teal chord: D major arpeggio feel
    const notes = [293.66, 369.99, 440.00, 587.33];
    notes.forEach((freq, i) => {
      this._osc('sine', freq, t + i * 0.07, 0.9 - i * 0.1, 0.12 - i * 0.02);
      this._osc('triangle', freq * 2, t + i * 0.07, 0.5, 0.04);
    });
    // Shimmer tail
    this._osc('sine', 1760, t + 0.35, 0.6, 0.025);
  }

  /** Violence choice — percussive concussive thud */
  playViolence() {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;
    // Sub kick
    const osc = this.ctx.createOscillator();
    const g   = this.ctx.createGain();
    osc.type  = 'sine';
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.exponentialRampToValueAtTime(30, t + 0.25);
    g.gain.setValueAtTime(0.5, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
    osc.connect(g); g.connect(this.masterGain);
    osc.start(t); osc.stop(t + 0.35);
    // Noise crack
    this._noise(t, 0.18, 0.35, 3000);
    this._noise(t + 0.05, 0.3, 0.12, 500);
    // Metal ring
    this._osc('square', 180, t, 0.12, 0.08);
  }

  /** Echo / ghost hum — eerie resonance drone pulse */
  playEchoHum() {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;
    // Dissonant interval (tritone)
    this._osc('sine', 98,  t,       1.8, 0.12);
    this._osc('sine', 138, t + 0.1, 1.6, 0.08);
    this._osc('sawtooth', 49, t,    1.2, 0.04, -20);
    // High shimmer
    this._osc('sine', 2200, t + 0.6, 0.8, 0.03);
    this._noise(t, 0.8, 0.06, 300);
  }

  /** Ending — empathy: ascending hopeful resonance */
  playEndingEmpathy() {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;
    const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 659.25, 880.00];
    scale.forEach((freq, i) => {
      this._osc('sine',     freq,     t + i * 0.18, 1.5, 0.1);
      this._osc('triangle', freq * 2, t + i * 0.18, 0.8, 0.04);
    });
    // Drone bed
    this._osc('sine', 65.41, t, 3.5, 0.15);
  }

  /** Ending — violence: descending dissonant collapse */
  playEndingViolence() {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;
    // Descending minor tritone cluster
    [220, 207.65, 185, 155.56, 130.81].forEach((freq, i) => {
      this._osc('sawtooth', freq, t + i * 0.22, 1.2, 0.09 - i * 0.01);
    });
    this._noise(t,       0.6, 0.2, 800);
    this._noise(t + 0.8, 0.8, 0.12, 400);
    this._osc('sine', 40, t, 2.5, 0.25); // sub boom
  }

  // ── AMBIENT LOOPS ─────────────────────────────────────────
  /** Start a looping ambient drone suited to the scene type */
  startAmbient(type = 'wasteland') {
    this._stopAmbient();
    if (!this.ctx || this.muted) return;
    this._scheduleAmbientLoop(type);
  }

  _stopAmbient() {
    if (this.ambientNode) {
      try { this.ambientNode.stop(); } catch(e) {}
      this.ambientNode = null;
    }
  }

  _scheduleAmbientLoop(type) {
    if (!this.ctx || this.muted) return;
    const t       = this.ctx.currentTime;
    const loopDur = 8; // seconds per loop cycle

    if (type === 'ash_storm') {
      // ── Ash Storm: three noise bands + gust bursts ──
      // 1. Deep sub-wind rumble — low LPF noise
      this._ambientNoiseLoop(0.14, 120,  t,        loopDur);
      // 2. Mid rushing air — bandpass feel
      this._ambientNoiseLoop(0.10, 800,  t + 0.5,  loopDur);
      this._ambientNoiseLoop(0.05, 2800, t + 1.0,  loopDur); // high grit hiss
      // 3. Gust burst at ~3s — a sharp swell that peaks and fades
      this._ashGustBurst(t + 2.8, 1.6);
      // 4. Low bass drone — howling wind resonance
      this._ambientOscLoop(40, 'sine', 0.05, t, loopDur);
      this._ambientOscLoop(63, 'sine', 0.03, t + 1.5, loopDur);
    } else if (type === 'wasteland') {
      // Low wind howl
      this._ambientOscLoop(55,  'sine',     0.07, t, loopDur);
      this._ambientOscLoop(82,  'sine',     0.04, t + 0.5, loopDur);
      this._ambientNoiseLoop(0.04, 200, t, loopDur);
    } else if (type === 'echo') {
      // Unsettling resonance
      this._ambientOscLoop(98,  'sine',     0.08, t, loopDur);
      this._ambientOscLoop(138, 'sine',     0.05, t + 0.3, loopDur);
      this._ambientOscLoop(49,  'sawtooth', 0.03, t, loopDur);
      this._ambientNoiseLoop(0.03, 180, t + 1, loopDur);
    } else if (type === 'bunker') {
      // Hum of machinery
      this._ambientOscLoop(60,  'square',   0.04, t, loopDur);
      this._ambientOscLoop(120, 'sine',     0.03, t + 0.2, loopDur);
      this._ambientNoiseLoop(0.02, 600, t, loopDur);
    } else if (type === 'epicenter') {
      // Massive resonance tear
      this._ambientOscLoop(40,  'sine',     0.12, t, loopDur);
      this._ambientOscLoop(80,  'sine',     0.07, t + 0.8, loopDur);
      this._ambientOscLoop(160, 'triangle', 0.04, t + 0.4, loopDur);
      this._ambientNoiseLoop(0.06, 300, t, loopDur);
    } else if (type === 'ending_empathy') {
      // Gentle tonal warmth
      this._ambientOscLoop(130.81, 'sine', 0.06, t, loopDur);
      this._ambientOscLoop(196.00, 'sine', 0.04, t + 0.5, loopDur);
      this._ambientOscLoop(261.63, 'sine', 0.03, t + 1.0, loopDur);
    } else if (type === 'ending_violence') {
      // Low ominous grinding
      this._ambientOscLoop(36.71, 'sawtooth', 0.10, t, loopDur);
      this._ambientOscLoop(55.00, 'sawtooth', 0.06, t + 0.3, loopDur);
      this._ambientNoiseLoop(0.07, 120, t, loopDur);
    }

    // Schedule next loop
    this._ambientTimer = setTimeout(() => this._scheduleAmbientLoop(type),
      loopDur * 1000 - 300);
  }

  /** A sharp wind gust burst — layered noise swell */
  _ashGustBurst(startTime, dur) {
    if (!this.ctx || this.muted) return;
    // Gust body — broadband noise swell
    const bufLen = Math.ceil(this.ctx.sampleRate * dur);
    const buf    = this.ctx.createBuffer(1, bufLen, this.ctx.sampleRate);
    const data   = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) data[i] = Math.random() * 2 - 1;
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    // Band-pass to shape the gust frequency (500–3500 Hz)
    const bp  = this.ctx.createBiquadFilter();
    bp.type   = 'bandpass';
    bp.frequency.setValueAtTime(1200, startTime);
    bp.frequency.linearRampToValueAtTime(400, startTime + dur * 0.6);
    bp.Q.setValueAtTime(0.8, startTime);
    const g   = this.ctx.createGain();
    // Attack quickly, hold, then tail off
    g.gain.setValueAtTime(0, startTime);
    g.gain.linearRampToValueAtTime(0.18, startTime + 0.15);  // fast attack
    g.gain.setValueAtTime(0.18, startTime + dur * 0.5);       // hold
    g.gain.linearRampToValueAtTime(0.0,  startTime + dur);    // tail
    src.connect(bp); bp.connect(g); g.connect(this.masterGain);
    src.start(startTime); src.stop(startTime + dur);
    // Add a whine overtone (whistle of wind through cracks)
    this._osc('sine', 620, startTime + 0.1, dur * 0.7, 0.025);
    this._osc('sine', 940, startTime + 0.2, dur * 0.5, 0.015);
  }

  _ambientOscLoop(freq, type, gain, startTime, dur) {
    if (!this.ctx || this.muted) return;
    const osc = this.ctx.createOscillator();
    const g   = this.ctx.createGain();
    osc.type  = type;
    osc.frequency.setValueAtTime(freq, startTime);
    const fadeIn  = 0.8;
    const fadeOut = 1.2;
    g.gain.setValueAtTime(0, startTime);
    g.gain.linearRampToValueAtTime(gain, startTime + fadeIn);
    g.gain.setValueAtTime(gain, startTime + dur - fadeOut);
    g.gain.linearRampToValueAtTime(0, startTime + dur);
    osc.connect(g); g.connect(this.masterGain);
    osc.start(startTime); osc.stop(startTime + dur);
  }

  _ambientNoiseLoop(gain, lpFreq, startTime, dur) {
    if (!this.ctx || this.muted) return;
    const bufLen = Math.ceil(this.ctx.sampleRate * dur);
    const buf    = this.ctx.createBuffer(1, bufLen, this.ctx.sampleRate);
    const data   = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) data[i] = Math.random() * 2 - 1;
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const lp  = this.ctx.createBiquadFilter();
    lp.type   = 'lowpass';
    lp.frequency.setValueAtTime(lpFreq, startTime);
    const g   = this.ctx.createGain();
    g.gain.setValueAtTime(0, startTime);
    g.gain.linearRampToValueAtTime(gain, startTime + 1.0);
    g.gain.setValueAtTime(gain, startTime + dur - 1.5);
    g.gain.linearRampToValueAtTime(0, startTime + dur);
    src.connect(lp); lp.connect(g); g.connect(this.masterGain);
    src.start(startTime); src.stop(startTime + dur);
  }
}

// Global singleton
const Sound = new SoundEngine();

// ─────────────────────────────────────────────────────────────
// CONSTANTS & CONFIG
// ─────────────────────────────────────────────────────────────

const TYPEWRITER_SPEED = 28; // ms per character
const TRANSITION_DURATION = 600; // ms for scene fade

const ROMAN_NUMERALS = ['Ⅰ','Ⅱ','Ⅲ','Ⅳ','Ⅴ','Ⅵ','Ⅶ','Ⅷ','Ⅸ','Ⅹ'];

// ─────────────────────────────────────────────────────────────
// SCENE DATA
// ─────────────────────────────────────────────────────────────
// Each scene:
//   id:        string — unique scene key
//   act:       string — display label (null to hide)
//   location:  string — shown in image corner (null to hide)
//   image:     string — path in assets/ folder
//   narrator:  string — who is speaking (null = omniscient)
//   text:      string — narrative body
//   glitch:    bool   — trigger Echo glitch overlay
//   echoScene: bool   — teal aura on panel
//   violence:  bool   — red aura + screen shake
//   choices:   array  — [{label, sub, icon, type, next, empathy, violence}]
// ─────────────────────────────────────────────────────────────

const SCENES = {

  // ── TITLE ──────────────────────────────────────────────────
  title: {
    id: 'title',
    act: null,
    location: null,
    image: 'assets/title.png',
    narrator: null,
    text: `Year 2142. "The Fracture" tore the world in two.\n\nYou are VANE. Tether. Courier. One of the last people who walks the Ash Roads between dying bunkers — keeping humanity anchored to a world that is slowly forgetting how to be real.\n\nYour cargo: a Resonance Core. Your destination: the end of everything.`,
    glitch: false,
    echoScene: false,
    violence: false,
    choices: [
      {
        label: 'Begin the Cycle',
        sub: 'Start a new journey',
        icon: '◈',
        type: 'neutral',
        next: 'act1_road',
        empathy: 0,
        violence: 0
      }
    ]
  },

  // ── ACT 1: THE ASH ROAD ────────────────────────────────────
  act1_road: {
    id: 'act1_road',
    act: 'ACT I · THE ASH ROAD',
    location: 'SECTOR 9 · ASH CORRIDOR',
    image: 'assets/act1_road.png',
    narrator: null,
    text: `The ash storm is worse today. Your visor pings: 14km to Bunker 7.\n\nThrough the static roar you hear something — a sound that shouldn't be here. A cough. Human. Weak.\n\nIn the hollow of a collapsed overpass, half-buried under debris, lies a survivor. Young. Breathing. But their leg is badly pinned.\n\nYour suit logs it automatically: two hours of medical supplies available. The detour would cost forty minutes.`,
    glitch: false,
    echoScene: false,
    violence: false,
    choices: [
      {
        label: 'Stop and Help',
        sub: 'Use medical supplies. Risk the schedule.',
        icon: '◈',
        type: 'empathy',
        next: 'act1_helped',
        empathy: 2,
        violence: 0
      },
      {
        label: 'Keep Moving',
        sub: 'The Core comes first. Every minute counts.',
        icon: '✕',
        type: 'violence',
        next: 'act1_ignored',
        empathy: 0,
        violence: 1
      }
    ]
  },

  act1_helped: {
    id: 'act1_helped',
    act: 'ACT I · THE ASH ROAD',
    location: 'SECTOR 9 · SHELTER RUIN',
    image: 'assets/act1_helped.png',
    narrator: 'VANE',
    text: `You pull away the rubble. The survivor — a kid, maybe sixteen — grabs your wrist with surprising strength.\n\n"Thank you... I didn't think anyone still... did this."\n\nAs you work the med-seal over the wound, they whisper: "There's a raider tripwire on the main road. Fifty meters past the third pylon. They've been robbing Tethers."\n\nA warning, freely given. An exchange without ledgers.\n\nYou leave them with a thermal pack and push forward. The detour costs forty-two minutes. The road ahead, because of what you know now, costs nothing.`,
    glitch: false,
    echoScene: false,
    violence: false,
    choices: [
      {
        label: 'Continue to Bunker 7',
        sub: 'Take the safe route the survivor warned about.',
        icon: '◈',
        type: 'neutral',
        next: 'act2_bunker',
        empathy: 0,
        violence: 0
      }
    ]
  },

  act1_ignored: {
    id: 'act1_ignored',
    act: 'ACT I · THE ASH ROAD',
    location: 'SECTOR 9 · MAIN ROAD',
    image: 'assets/act1_ignored.png',
    narrator: 'VANE',
    text: `You walk past.\n\nThe voice calls after you — not in anger. Just: "Be careful on the main road... past the third pylon... please."\n\nYou don't turn back.\n\nFifty meters past the third pylon, the raider trap springs. They take forty percent of your emergency supplies before your suit's defense array drives them off. You arrive at Bunker 7 lighter than you left.\n\nYou saved forty-two minutes. You spent them on the road picking yourself up off the ground.`,
    glitch: false,
    echoScene: false,
    violence: true,
    choices: [
      {
        label: 'Continue to Bunker 7',
        sub: 'Bruised, depleted, but moving.',
        icon: '✕',
        type: 'neutral',
        next: 'act2_bunker',
        empathy: 0,
        violence: 0
      }
    ]
  },

  // ── ACT 2: BUNKER 7 ────────────────────────────────────────
  act2_bunker: {
    id: 'act2_bunker',
    act: 'ACT II · BUNKER 7',
    location: 'BUNKER 7 · RESONANCE PORT',
    image: 'assets/act2_bunker.png',
    narrator: null,
    text: `Bunker 7. One hundred and twelve people live in rooms carved from old subway lines. When you emerge from the airlock, they're waiting. Not cheering — Tethers don't get cheers anymore. Just watching.\n\nYou slot the Resonance Core into the anchor port. Teal light blooms through the corridors. The hum settles into the walls, the floors, the bones of the bunker.\n\nThe bunker administrator — an older woman with circuit burns across her jaw — looks at you a long time.\n\n"You have a choice. We have one spare Core here. The last one. It's either a backup for us... or you take it with you toward the Fracture. The signal says someone else out there needs it more."`,
    glitch: false,
    echoScene: false,
    violence: false,
    choices: [
      {
        label: 'Take the spare Core',
        sub: 'Someone else needs this more. You\'ll carry the risk.',
        icon: '◈',
        type: 'empathy',
        next: 'act3_gauntlet',
        empathy: 2,
        violence: 0
      },
      {
        label: 'Leave the Core here',
        sub: 'These 112 lives are not abstractions. Protect them.',
        icon: '✕',
        type: 'violence',
        next: 'act3_gauntlet',
        empathy: 0,
        violence: 1
      }
    ]
  },

  // ── ACT 3: THE GAUNTLET ─────────────────────────────────────
  act3_gauntlet: {
    id: 'act3_gauntlet',
    act: 'ACT III · THE BRIDGE',
    location: 'FRACTURE APPROACH · MERIDIAN BRIDGE',
    image: 'assets/act3_gauntlet.png',
    narrator: null,
    text: `The only route forward is the Meridian Bridge — a skeletal span over a kilometer-wide tear in the earth where the Fracture opened the ground.\n\nHalfway across, you stop.\n\nAn Echo.\n\nNearly three meters tall. A distorted, howling shape that used to be a man — you can see the ghost of him inside the static: a worker, a father, a person who died the moment the Fracture hit. Now he paces the bridge in a loop, replaying his last terrified moments, over and over.\n\nHe can't see you yet. But he will.`,
    glitch: true,
    echoScene: true,
    violence: false,
    choices: [
      {
        label: 'Attempt to Reach Him',
        sub: 'Use the suit\'s resonance emitter. Make contact.',
        icon: '◈',
        type: 'empathy',
        next: 'act3_pacify',
        empathy: 3,
        violence: 0
      },
      {
        label: 'Deploy Sonic Charge',
        sub: 'Neutralize the Echo. Don\'t let it suffer longer.',
        icon: '✕',
        type: 'violence',
        next: 'act3_destroy',
        empathy: 0,
        violence: 2
      }
    ]
  },

  act3_pacify: {
    id: 'act3_pacify',
    act: 'ACT III · THE BRIDGE',
    location: 'MERIDIAN BRIDGE · CONTACT',
    image: 'assets/act3_pacify.png',
    narrator: 'VANE',
    text: `You activate the resonance emitter and step forward.\n\nThe Echo turns. Fixes you with a gaze that is pure static and grief. And then you are inside it — inside his last moment. A man standing in a parking lot when the sky cracked. Calling his daughter's name. The sound of her voice cutting off mid-syllable.\n\nYou don't look away.\n\nYou let the memory complete. You witness it, fully, without flinching.\n\nThe Echo exhales — a sound like a radio finally tuning in — and disperses into soft teal light that drifts upward until it's gone.\n\nThe bridge is clear. The air smells faintly of rain.`,
    glitch: false,
    echoScene: true,
    violence: false,
    choices: [
      {
        label: 'Cross the Bridge',
        sub: 'Whatever happens next — you saw him. You remembered him.',
        icon: '◈',
        type: 'neutral',
        next: 'act4_rift',
        empathy: 1,
        violence: 0
      }
    ]
  },

  act3_destroy: {
    id: 'act3_destroy',
    act: 'ACT III · THE BRIDGE',
    location: 'MERIDIAN BRIDGE · CONTACT',
    image: 'assets/act3_destroy.png',
    narrator: 'VANE',
    text: `You arm the sonic charge. Three. Two. One.\n\nThe detonation is a white concussion wave. The Echo doesn't have time to turn. It simply — ends. Fragments of teal static scatter like broken glass and dissolve before they touch the ground.\n\nEfficient. Clean. Gone.\n\nYou walk across the bridge and don't look down at the place where it stood.\n\nBut your suit's bio-monitor registers something: your heartrate, which spiked at the detonation, takes forty seconds to come back down. The data doesn't lie. Something in you knew what it was.`,
    glitch: false,
    echoScene: false,
    violence: true,
    choices: [
      {
        label: 'Cross the Bridge',
        sub: 'The mission continues. That\'s all that matters.',
        icon: '✕',
        type: 'neutral',
        next: 'act4_rift',
        empathy: 0,
        violence: 0
      }
    ]
  },

  // ── ACT 4: RIFT'S EDGE ─────────────────────────────────────
  act4_rift: {
    id: 'act4_rift',
    act: 'ACT IV · RIFT\'S EDGE',
    location: 'FRACTURE PERIMETER · KILOMETER 0',
    image: 'assets/act4_rift.png',
    narrator: null,
    text: `The Fracture's perimeter. The sky here is wrong — it bends, prismatic, showing colors that have no names. Temporal radiation shimmers in visible waves.\n\nA small shape steps out from behind a rusted transport carcass.\n\nA child. Maybe eight years old. Filthy, feverish. They carry nothing. They are nothing but need.\n\n"Please," they say, looking at your suit. "I can see the glow. You have food in there. I haven't... I can't find my family anymore. I can't find anything."\n\nYour suit displays your emergency reserves: CRITICAL. You have exactly one ration pack left. Enough for you to make the final push to the epicenter. Enough to survive the approach.`,
    glitch: false,
    echoScene: false,
    violence: false,
    choices: [
      {
        label: 'Give Them the Ration',
        sub: 'You go in hungry. This child goes forward.',
        icon: '◈',
        type: 'empathy',
        next: 'act5_epicenter',
        empathy: 3,
        violence: 0
      },
      {
        label: 'Refuse. Press On.',
        sub: 'The mission is everything. Without you, billions lose the Core.',
        icon: '✕',
        type: 'violence',
        next: 'act5_epicenter',
        empathy: 0,
        violence: 2
      }
    ]
  },

  // ── ACT 5: THE EPICENTER ───────────────────────────────────
  act5_epicenter: {
    id: 'act5_epicenter',
    act: 'ACT V · THE EPICENTER',
    location: 'FRACTURE CORE · ZERO POINT',
    image: 'assets/act5_epicenter.png',
    narrator: null,
    text: `You are here.\n\nZero Point. The wound in the world. The Fracture machine towers above you — a cathedral of collapsed physics, a machine the size of a city block, built by brilliant, careless people who tore a hole in the membrane of reality.\n\nYour suit translates the interface. To seal the rift permanently, the final Resonance Core must be synchronized — calibrated by a living consciousness from the inside.\n\nThere is no other way. The data is clear.\n\nYou step forward. You place your hand on the machine. You feel the teal warmth of every Core you ever carried pulsing back through your fingers.\n\nYou plug in.\n\nAnd the Cycle begins.`,
    glitch: true,
    echoScene: true,
    violence: false,
    choices: [
      {
        label: 'Activate the Core',
        sub: 'Complete the mission. Shatter into time.',
        icon: '⬡',
        type: 'neutral',
        next: '__ENDING__',
        empathy: 0,
        violence: 0
      }
    ]
  },

  // ── ENDINGS ────────────────────────────────────────────────
  ending_empathy: {
    id: 'ending_empathy',
    act: 'THE CYCLE RETURNS',
    location: null,
    image: 'assets/ending_empathy.png',
    narrator: 'THE PRIME ECHO',
    text: `You understand now.\n\nThe Prime Echo — the colossal, hunting ghost that stalked your journey — was never your enemy.\n\nIt was you. A future Vane, shattered across the time-scar of the Fracture, trying to reach backward through the loop.\n\nTrying to tell you what you already chose to be.\n\nThe world resets. The Ash Road stretches out again before a new Vane under a fractured sky.\n\nBut the Prime Echo does not rage. It walks beside them, barely visible — a ghost made of memory, of every stranger's hand you held, every Echo you witnessed back into peace.\n\nThis time, the new Vane pauses before the collapsed overpass.\n\nAnd kneels.\n\nThe Cycle turns. The light is teal. There is still hope.`,
    glitch: false,
    echoScene: true,
    violence: false,
    choices: [
      {
        label: 'Begin Again',
        sub: 'A new loop. A better path.',
        icon: '◈',
        type: 'empathy',
        next: '__RESTART__',
        empathy: 0,
        violence: 0
      }
    ]
  },

  ending_violence: {
    id: 'ending_violence',
    act: 'THE CYCLE COLLAPSES',
    location: null,
    image: 'assets/ending_violence.png',
    narrator: 'THE PRIME ECHO',
    text: `You understand too late.\n\nYour consciousness fractures and scatters like the Echo on the bridge — except there is nothing to witness yours. No one to say: I see you. I remember you.\n\nThe Prime Echo is born from the shrapnel of who you chose to be.\n\nIt does not guide. It does not wait. It hunts.\n\nThe world resets, and a new Vane walks out under a fractured sky — but the Prime Echo is there from the very first step now, malevolent and enormous, the accumulated weight of every abandoned survivor, every destroyed Echo, every refusal to be anything other than efficient.\n\nThe new Vane walks faster. Keeps their head down.\n\nThe Cycle turns. The light is red. But somewhere in the static, a sound — the echo of a choice not yet made.`,
    glitch: true,
    echoScene: false,
    violence: true,
    choices: [
      {
        label: 'Begin Again',
        sub: 'Into the nightmare. Into the loop.',
        icon: '✕',
        type: 'violence',
        next: '__RESTART__',
        empathy: 0,
        violence: 0
      }
    ]
  }
};

// Scene order for the main path (used for progress/act display)
const MAIN_PATH = ['title','act1_road','act1_helped','act1_ignored','act2_bunker','act3_gauntlet','act3_pacify','act3_destroy','act4_rift','act5_epicenter','ending_empathy','ending_violence'];

// ─────────────────────────────────────────────────────────────
// GAME STATE
// ─────────────────────────────────────────────────────────────

class GameState {
  constructor() {
    this.empathyScore  = 0;
    this.violenceScore = 0;
    this.currentScene  = 'title';
    this.loopCount     = 0;
    this.load();
  }

  load() {
    try {
      const saved = localStorage.getItem('resonance_state');
      if (saved) {
        const data = JSON.parse(saved);
        this.empathyScore  = data.empathyScore  || 0;
        this.violenceScore = data.violenceScore || 0;
        this.currentScene  = data.currentScene  || 'title';
        this.loopCount     = data.loopCount     || 0;
      }
    } catch (e) {
      // ignore storage errors
    }
  }

  save() {
    try {
      localStorage.setItem('resonance_state', JSON.stringify({
        empathyScore:  this.empathyScore,
        violenceScore: this.violenceScore,
        currentScene:  this.currentScene,
        loopCount:     this.loopCount
      }));
    } catch (e) {}
  }

  reset() {
    this.empathyScore  = 0;
    this.violenceScore = 0;
    this.currentScene  = 'title';
    this.loopCount     = Math.min(this.loopCount, 9); // cap at roman numeral X
    this.save();
  }

  addEmpathy(n)  { this.empathyScore  += n; this.save(); }
  addViolence(n) { this.violenceScore += n; this.save(); }

  getEnding() {
    // Higher empathy → empathy ending; ties and higher violence → violence ending
    return (this.empathyScore > this.violenceScore)
      ? 'ending_empathy'
      : 'ending_violence';
  }
}

// ─────────────────────────────────────────────────────────────
// GAME ENGINE
// ─────────────────────────────────────────────────────────────

class GameEngine {
  constructor() {
    this.state = new GameState();
    this.typewriterTimer = null;
    this.isTransitioning = false;
    this.imagesLoaded = {};

    // DOM refs
    this.dom = {
      sceneImage:     document.getElementById('scene-image'),
      imageWrapper:   document.getElementById('panel-image-wrapper'),
      narrativeText:  document.getElementById('narrative-text'),
      textCursor:     document.getElementById('text-cursor'),
      choicesGrid:    document.getElementById('choices-grid'),
      mortalityHUD:   document.getElementById('morality-hud'),
      actIndicator:   document.getElementById('act-indicator'),
      actLabel:       document.getElementById('act-label'),
      empathyBar:     document.getElementById('hud-empathy-bar'),
      violenceBar:    document.getElementById('hud-violence-bar'),
      empathyVal:     document.getElementById('hud-empathy-val'),
      violenceVal:    document.getElementById('hud-violence-val'),
      locationTag:    document.getElementById('location-tag'),
      locationText:   document.getElementById('location-text'),
      narratorLabel:  document.getElementById('narrator-label'),
      narratorName:   document.getElementById('narrator-name'),
      glitchOverlay:  document.getElementById('glitch-overlay'),
      panelFrame:     document.getElementById('panel-frame'),
      gameContainer:  document.getElementById('game-container'),
      loopCounter:    document.getElementById('loop-counter'),
      loopNumber:     document.getElementById('loop-number'),
      loadingScreen:  document.getElementById('loading-screen'),
      narrativePanel: document.getElementById('narrative-panel'),
    };
  }

  // ── Init ────────────────────────────────────────────────────
  init() {
    // Always start from title for clean experience each session
    this.state.reset();
    this.preloadImages(() => {
      this.hideLoading();
      this.renderScene(this.state.currentScene);
    });
  }

  // ── Image preloading ────────────────────────────────────────
  preloadImages(callback) {
    const imageKeys = Object.keys(SCENES);
    let loaded = 0;
    const total = imageKeys.length;

    if (total === 0) { callback(); return; }

    const loadingText = document.getElementById('loading-text');
    const msgs = [
      'CALIBRATING RESONANCE CORE...',
      'MAPPING ASH CORRIDORS...',
      'SCANNING FOR ECHOES...',
      'LOADING TETHER SUIT...',
      'INITIALIZING TIMELINE...'
    ];
    let msgIdx = 0;
    const msgInterval = setInterval(() => {
      if (loadingText) {
        loadingText.textContent = msgs[msgIdx % msgs.length];
        msgIdx++;
      }
    }, 600);

    imageKeys.forEach(key => {
      const scene = SCENES[key];
      if (!scene.image) { loaded++; if (loaded >= total) { clearInterval(msgInterval); callback(); } return; }

      const img = new Image();
      img.onload  = () => { this.imagesLoaded[scene.image] = true; loaded++; if (loaded >= total) { clearInterval(msgInterval); callback(); } };
      img.onerror = () => { this.imagesLoaded[scene.image] = false; loaded++; if (loaded >= total) { clearInterval(msgInterval); callback(); } };
      img.src = scene.image;
    });
  }

  hideLoading() {
    const ls = this.dom.loadingScreen;
    ls.classList.add('hidden');
    setTimeout(() => { ls.style.display = 'none'; }, 900);
  }

  // ── Render Scene ────────────────────────────────────────────
  renderScene(sceneId) {
    const scene = SCENES[sceneId];
    if (!scene) { console.error('Scene not found:', sceneId); return; }

    this.state.currentScene = sceneId;
    this.state.save();

    // Fade image out
    this.dom.sceneImage.classList.add('fading');

    setTimeout(() => {
      this._applyScene(scene);
      this.dom.sceneImage.classList.remove('fading');
      this.dom.gameContainer.classList.add('scene-enter');
      setTimeout(() => this.dom.gameContainer.classList.remove('scene-enter'), 500);
    }, TRANSITION_DURATION / 2);
  }

  _applyScene(scene) {
    // ── Ambient sound for this scene ──
    Sound.playTransition();
    Sound.startAmbient(this._ambientTypeForScene(scene.id));

    // ── Ending one-shot stings ──
    if (scene.id === 'ending_empathy')  setTimeout(() => Sound.playEndingEmpathy(),  800);
    if (scene.id === 'ending_violence') setTimeout(() => Sound.playEndingViolence(), 800);
    // ── Echo hum ──
    if (scene.glitch) setTimeout(() => Sound.playEchoHum(), 400);

    // ── Image ──
    if (scene.image && this.imagesLoaded[scene.image] !== false) {
      this.dom.sceneImage.src = scene.image;
      this.dom.sceneImage.alt = scene.location || scene.act || '';
      this.dom.imageWrapper.classList.remove('no-image');
      this.dom.sceneImage.style.display = '';
    } else {
      this.dom.imageWrapper.classList.add('no-image');
    }

    // ── Location tag ──
    if (scene.location) {
      this.dom.locationTag.removeAttribute('hidden');
      this.dom.locationText.textContent = scene.location;
    } else {
      this.dom.locationTag.setAttribute('hidden', '');
    }

    // ── Glitch / Echo overlays ──
    this.dom.glitchOverlay.classList.toggle('active', !!scene.glitch);
    this.dom.panelFrame.classList.toggle('echo-scene', !!scene.echoScene);
    this.dom.panelFrame.classList.toggle('violence-scene', !!scene.violence);

    // ── Act indicator ──
    if (scene.act) {
      this.dom.actIndicator.removeAttribute('hidden');
      this.dom.actLabel.textContent = scene.act;
    } else {
      this.dom.actIndicator.setAttribute('hidden', '');
    }

    // ── Narrator ──
    if (scene.narrator) {
      this.dom.narratorLabel.removeAttribute('hidden');
      this.dom.narratorName.textContent = `[ ${scene.narrator} ]`;
    } else {
      this.dom.narratorLabel.setAttribute('hidden', '');
    }

    // ── Morality HUD (hide on title) ──
    if (scene.id === 'title') {
      this.dom.mortalityHUD.setAttribute('hidden', '');
    } else {
      this.dom.mortalityHUD.removeAttribute('hidden');
      this._updateHUD();
    }

    // ── Loop counter ──
    if (this.state.loopCount > 0) {
      this.dom.loopCounter.removeAttribute('hidden');
      this.dom.loopNumber.textContent = ROMAN_NUMERALS[Math.min(this.state.loopCount - 1, 9)];
    } else {
      this.dom.loopCounter.setAttribute('hidden', '');
    }

    // ── Narrative text (typewriter) ──
    this._lockChoices();
    this._typewrite(scene.text, () => {
      this._renderChoices(scene.choices);
      this._unlockChoices();
    });
  }

  // ── Typewriter ──────────────────────────────────────────────
  _typewrite(text, onComplete) {
    clearTimeout(this.typewriterTimer);
    this.dom.narrativeText.textContent = '';
    this.dom.textCursor.classList.remove('hidden');

    // Build flat token array: chars + newline markers
    const lines = text.split('\n');
    const chars = [];
    lines.forEach((line, li) => {
      for (const c of line) chars.push({ c, nl: false });
      if (li < lines.length - 1) chars.push({ c: '', nl: true });
    });

    let charIdx = 0;

    const tick = () => {
      if (charIdx >= chars.length) {
        this.dom.textCursor.classList.add('hidden');
        if (onComplete) onComplete();
        return;
      }

      const item = chars[charIdx];
      if (item.nl) {
        this.dom.narrativeText.appendChild(document.createElement('br'));
        // Consecutive \n = paragraph break: insert extra <br> and skip it
        if (charIdx + 1 < chars.length && chars[charIdx + 1].nl) {
          this.dom.narrativeText.appendChild(document.createElement('br'));
          charIdx++; // consume the second newline token now
        }
      } else {
        this.dom.narrativeText.appendChild(document.createTextNode(item.c));
        Sound.playTick(); // typewriter sound on visible characters
      }
      charIdx++;
      // Auto-scroll narrative panel so latest text stays visible
      this.dom.narrativePanel.scrollTop = this.dom.narrativePanel.scrollHeight;
      this.typewriterTimer = setTimeout(tick, TYPEWRITER_SPEED);
    };

    tick();
  }

  // Skip typewriter if clicking on narrative area
  _skipTypewriter(scene) {
    clearTimeout(this.typewriterTimer);

    // Render full text immediately
    const lines = scene.text.split('\n');
    this.dom.narrativeText.innerHTML = '';
    lines.forEach((line, li) => {
      this.dom.narrativeText.appendChild(document.createTextNode(line));
      if (li < lines.length - 1) {
        this.dom.narrativeText.appendChild(document.createElement('br'));
      }
    });

    this.dom.textCursor.classList.add('hidden');
    this._renderChoices(scene.choices);
    this._unlockChoices();
  }

  // ── HUD update ──────────────────────────────────────────────
  _updateHUD() {
    const e = this.state.empathyScore;
    const v = this.state.violenceScore;
    const total = Math.max(e + v, 1);

    this.dom.empathyVal.textContent = e;
    this.dom.violenceVal.textContent = v;
    this.dom.empathyBar.style.width  = Math.min((e / total) * 100, 100) + '%';
    this.dom.violenceBar.style.width = Math.min((v / total) * 100, 100) + '%';
  }

  // ── Choices ─────────────────────────────────────────────────
  _renderChoices(choices) {
    const grid = this.dom.choicesGrid;
    grid.innerHTML = '';

    const count = choices.length;
    grid.className = `grid-${Math.min(count, 4)}`;

    choices.forEach((choice, idx) => {
      const btn = document.createElement('button');
      btn.id = `choice-btn-${idx}`;
      btn.className = `choice-btn ${choice.type}-choice locked`;
      btn.setAttribute('aria-label', choice.label);

      btn.innerHTML = `
        <span class="choice-icon" aria-hidden="true">${choice.icon}</span>
        <span class="choice-text">
          <span class="choice-label">${choice.label}</span>
          ${choice.sub ? `<span class="choice-sub">${choice.sub}</span>` : ''}
        </span>
      `;

      btn.addEventListener('click', () => this._onChoose(choice, btn));
      grid.appendChild(btn);
    });
  }

  _lockChoices() {
    document.querySelectorAll('.choice-btn').forEach(b => b.classList.add('locked'));
  }

  _unlockChoices() {
    document.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('locked'));
  }

  // ── On Choose ───────────────────────────────────────────────
  _onChoose(choice, btn) {
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    // Disable all buttons immediately
    this._lockChoices();

    // Apply morality deltas + sounds
    if (choice.empathy  > 0) {
      this.state.addEmpathy(choice.empathy);
      this._pulseEmpathy();
      Sound.playEmpathy();
    }
    if (choice.violence > 0) {
      this.state.addViolence(choice.violence);
      this._shakeScreen();
      Sound.playViolence();
    }
    if (choice.empathy === 0 && choice.violence === 0) {
      Sound.playTransition(); // neutral choice: just a whoosh
    }

    this._updateHUD();

    // Highlight chosen button
    btn.style.opacity = '1';
    btn.style.borderColor = choice.type === 'empathy' ? 'var(--teal)' : choice.type === 'violence' ? 'var(--red)' : 'var(--gray-400)';

    // Resolve special next values
    let nextScene = choice.next;
    if (nextScene === '__ENDING__') {
      nextScene = this.state.getEnding();
    } else if (nextScene === '__RESTART__') {
      this.state.loopCount++;
      this.state.reset();
      nextScene = 'title';
    }

    setTimeout(() => {
      this.isTransitioning = false;
      this.renderScene(nextScene);
    }, 500);
  }

  /** Map a scene id to its ambient type */
  _ambientTypeForScene(sceneId) {
    // Ash storm scenes — outdoor wasteland with heavy wind
    if (sceneId === 'title' || sceneId === 'act1_road' ||
        sceneId === 'act1_helped' || sceneId === 'act1_ignored' ||
        sceneId === 'act4_rift') return 'ash_storm';
    if (sceneId === 'act2_bunker') return 'bunker';
    if (sceneId === 'act5_epicenter') return 'epicenter';
    if (sceneId === 'ending_empathy') return 'ending_empathy';
    if (sceneId === 'ending_violence') return 'ending_violence';
    if (sceneId === 'act3_gauntlet' || sceneId === 'act3_pacify' || sceneId === 'act3_destroy') return 'echo';
    return 'wasteland'; // fallback
  }

  // ── Visual Feedback ─────────────────────────────────────────
  _shakeScreen() {
    this.dom.gameContainer.classList.remove('screen-shake');
    void this.dom.gameContainer.offsetWidth; // reflow
    this.dom.gameContainer.classList.add('screen-shake');
    setTimeout(() => this.dom.gameContainer.classList.remove('screen-shake'), 400);
  }

  _pulseEmpathy() {
    this.dom.panelFrame.classList.remove('empathy-pulse');
    void this.dom.panelFrame.offsetWidth;
    this.dom.panelFrame.classList.add('empathy-pulse');
    setTimeout(() => this.dom.panelFrame.classList.remove('empathy-pulse'), 600);
  }
}

// ─────────────────────────────────────────────────────────────
// BOOT
// ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const engine = new GameEngine();
  engine.init();

  // ── Unlock AudioContext on first user gesture (browser policy) ──
  let audioUnlocked = false;
  const unlockAudio = () => {
    if (audioUnlocked) return;
    audioUnlocked = true;
    Sound.unlock();
    document.removeEventListener('click',   unlockAudio);
    document.removeEventListener('keydown', unlockAudio);
  };
  document.addEventListener('click',   unlockAudio);
  document.addEventListener('keydown', unlockAudio);

  // ── Sound toggle button ──
  const soundToggle = document.getElementById('sound-toggle');
  const soundIcon   = document.getElementById('sound-icon');
  const soundLabel  = document.getElementById('sound-label');

  soundToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // don't trigger the narrative skip
    const nowMuted = !Sound.muted;
    Sound.setMuted(nowMuted);
    soundToggle.classList.toggle('muted', nowMuted);
    soundIcon.textContent  = nowMuted ? '✕' : '♪';
    soundLabel.textContent = nowMuted ? 'OFF' : 'SFX';
    // Resume ambient if unmuting
    if (!nowMuted) {
      const scene = SCENES[engine.state.currentScene];
      if (scene) Sound.startAmbient(engine._ambientTypeForScene(scene.id));
    }
  });

  // ── Skip typewriter on clicking narrative area ──
  document.getElementById('narrative-panel').addEventListener('click', () => {
    const scene = SCENES[engine.state.currentScene];
    if (scene && engine.typewriterTimer) {
      engine._skipTypewriter(scene);
      // Scroll to bottom after full text appears
      const np = document.getElementById('narrative-panel');
      setTimeout(() => { np.scrollTop = np.scrollHeight; }, 50);
    }
  });

  // Expose for debugging
  window._game   = engine;
  window._sound  = Sound;
});

