export const act3GauntletScene = {
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
      next: 'act3_endure_check',
      empathy: 0,
      violence: 0
    },
    {
      label: 'Deploy Sonic Charge',
      sub: 'Neutralize the Echo. Don\'t let it suffer longer.',
      icon: '✕',
      type: 'violence',
      next: 'act3_destroy',
      empathy: 0,
      violence: 2,
      resonance: -15
    },
    {
      label: 'Retreat',
      sub: 'This isn\'t the moment. Find another way across.',
      icon: '⬡',
      type: 'neutral',
      next: 'act3_retreat',
      empathy: 0,
      violence: 0
    }
  ]
};

export const act3EndureCheckScene = {
  id: 'act3_endure_check',
  act: 'ACT III · THE BRIDGE',
  location: 'MERIDIAN BRIDGE · LINK',
  image: 'assets/act3_endure_check.png',
  narrator: null,
  text: `You open the link. You are inside his last moment — a parking lot, a cracking sky, his daughter's voice cutting off mid-syllable. The memory spikes, a psychic lash aimed at throwing you out of the connection.`,
  glitch: true,
  echoScene: true,
  violence: false,
  choices: [
    {
      label: 'Endure',
      sub: 'Brace and keep the link open.',
      icon: '◈',
      type: 'empathy',
      next: 'act3_pacify',
      empathy: 0,
      violence: 0,
      resonance: 20,
      noteAttune: true
    },
    {
      label: 'Pull back reflexively',
      sub: 'The weight of the grief forces you out.',
      icon: '✕',
      type: 'violence',
      next: 'act3_endure_fail',
      empathy: 0,
      violence: 0,
      wound: 'wounded'
    }
  ]
};

export const act3EndureFailScene = {
  id: 'act3_endure_fail',
  act: 'ACT III · THE BRIDGE',
  location: 'MERIDIAN BRIDGE · LINK',
  image: 'assets/act3_endure_fail.png',
  narrator: null,
  text: `You flinch. The link snaps. The Echo's grief curdles into rage mid-memory, and it's on you before your suit can compensate — a shoulder-check of pure static knocks the wind out of you. There's no more window for gentleness here.`,
  glitch: true,
  echoScene: false,
  violence: true,
  choices: [
    {
      label: 'Sever it — no other option left',
      sub: 'Land the charge before it can close again.',
      icon: '✕',
      type: 'violence',
      next: 'act3_destroy_forced',
      empathy: 0,
      violence: 2,
      resonance: -10
    }
  ]
};

export const act3DestroyForcedScene = {
  id: 'act3_destroy_forced',
  act: 'ACT III · THE BRIDGE',
  location: 'MERIDIAN BRIDGE · CONTACT',
  image: 'assets/act3_destroy_forced.png',
  narrator: 'VANE',
  text: `There was no clean version of this one. The charge lands anyway. The Echo goes out mid-scream instead of mid-memory, and that difference sits in your chest the rest of the walk.`,
  glitch: false,
  echoScene: false,
  violence: true,
  choices: [
    {
      label: 'Cross the Bridge',
      sub: 'Keep moving. The mission does not wait.',
      icon: '✕',
      type: 'neutral',
      next: 'act3_bridge_end',
      empathy: 0,
      violence: 0
    }
  ]
};

export const act3RetreatScene = {
  id: 'act3_retreat',
  act: 'ACT III · THE BRIDGE',
  location: 'MERIDIAN BRIDGE · SERVICE CATWALK',
  image: 'assets/act3_retreat.png',
  narrator: null,
  text: `You pull back before the confrontation forces itself. There's a service catwalk below the main span — narrower, exposed to the drop, but it avoids him entirely.

Halfway down it, you understand why nobody uses this route. There's a second Echo down here — older, more coherent, less lost. It's been watching you the whole time you climbed down.`,
  glitch: true,
  echoScene: true,
  violence: false,
  choices: [
    {
      label: 'Face it',
      sub: 'This one wants to be witnessed.',
      icon: '◈',
      type: 'neutral',
      next: 'act3_retreat_fight',
      empathy: 0,
      violence: 0
    }
  ]
};

export const act3RetreatFightScene = {
  id: 'act3_retreat_fight',
  act: 'ACT III · THE BRIDGE',
  location: 'MERIDIAN BRIDGE · LOWER SPAN',
  image: 'assets/act3_retreat_fight.png',
  narrator: null,
  text: `The second Echo is calm — arms open, waiting, like it's been rehearsing this meeting for years. It gestures, slow and deliberate, toward the resonance emitter on your suit. It wants to be witnessed. There's no ambiguity in the tell at all.`,
  glitch: true,
  echoScene: true,
  violence: false,
  choices: [
    {
      label: 'Attune',
      sub: 'Answer the invitation. This one is waiting for you.',
      icon: '◈',
      type: 'empathy',
      next: 'act3_pacify',
      empathy: 0,
      violence: 0,
      resonance: 25,
      noteAttune: true
    },
    {
      label: 'Sever anyway',
      sub: 'Out of habit or fear.',
      icon: '✕',
      type: 'violence',
      next: 'act3_destroy_forced',
      empathy: 0,
      violence: 2,
      resonance: -20,
      wound: 'wounded'
    }
  ]
};

export const act3BridgeEndScene = {
  id: 'act3_bridge_end',
  act: 'ACT III · THE BRIDGE',
  location: 'BRIDGE OUTER EDGE',
  image: 'assets/act3_bridge_end.png',
  narrator: null,
  text: `The far side of the bridge opens onto scorched earth and a long, straight road toward the Fracture's perimeter.`,
  glitch: false,
  echoScene: false,
  violence: false,
  choices: [
    {
      label: 'Continue',
      sub: 'Move toward the Rift. No time to linger.',
      icon: '⬡',
      type: 'neutral',
      next: 'act4_rift',
      empathy: 0,
      violence: 0
    },
    {
      label: 'A figure is waiting near the guardrail — Rell, from the camp',
      sub: 'Talk to him. This only appears if you spared the Cutter.',
      icon: '⬡',
      type: 'neutral',
      next: 'act3b_camp',
      empathy: 0,
      violence: 0,
      condition: state => state.hasFlag('cutter_spared')
    }
  ]
};

export const act3bCampScene = {
  id: 'act3b_camp',
  act: 'ACT IIIB · CUTTER CAMP',
  location: 'CUTTER CAMP · RELL',
  image: 'assets/act3b_camp.png',
  narrator: 'RELL',
  text: `"You didn't have to let her go," Rell says — a broad-shouldered man missing two fingers on his left hand. "So I'm telling you: our Core stabilizer bay has a spare regulator. Yours is degrading faster than you think. But nothing here is free. Passage rights are earned, not given."`,
  glitch: false,
  echoScene: false,
  violence: false,
  choices: [
    {
      label: 'Accept the duel',
      sub: 'Show them what you can do.',
      icon: '⬡',
      type: 'neutral',
      next: 'act3b_duel_1',
      empathy: 0,
      violence: 0
    },
    {
      label: 'Walk away',
      sub: 'You don\'t need it badly enough to fight for it.',
      icon: '⬡',
      type: 'neutral',
      next: 'act4_rift',
      empathy: 0,
      violence: 0
    }
  ]
};

export const act3bDuel1Scene = {
  id: 'act3b_duel_1',
  act: 'ACT IIIB · CUTTER CAMP',
  location: 'CUTTER RING · ROUND 1',
  image: 'assets/act3b_duel_1.png',
  narrator: null,
  text: `Your opponent — the camp's second — circles you, weight forward, already committed to closing distance fast.`,
  glitch: false,
  echoScene: false,
  violence: false,
  choices: [
    {
      label: 'Reposition / Dodge',
      sub: 'Answer speed and close distance.',
      icon: '⬡',
      type: 'neutral',
      next: 'act3b_duel_2',
      empathy: 0,
      violence: 0
    },
    {
      label: 'Strike',
      sub: 'You\'re not close enough yet.',
      icon: '✕',
      type: 'violence',
      next: 'act3b_duel_1_hit',
      empathy: 0,
      violence: 0,
      wound: 'wounded'
    }
  ]
};

export const act3bDuel1HitScene = {
  id: 'act3b_duel_1_hit',
  act: 'ACT IIIB · CUTTER CAMP',
  location: 'CUTTER RING · ROUND 1',
  image: 'assets/act3b_duel_1_hit.png',
  narrator: null,
  text: `You swing at air and eat a shoulder-check for it. The ring of onlookers doesn't cheer or jeer — this is a ritual, not a spectacle, and they watch it like one.`,
  glitch: false,
  echoScene: false,
  violence: false,
  choices: [
    {
      label: 'Reset your stance',
      sub: 'Recover. The match isn\'t over.',
      icon: '⬡',
      type: 'neutral',
      next: 'act3b_duel_2',
      empathy: 0,
      violence: 0
    }
  ]
};

export const act3bDuel2Scene = {
  id: 'act3b_duel_2',
  act: 'ACT IIIB · CUTTER CAMP',
  location: 'CUTTER RING · ROUND 2',
  image: 'assets/act3b_duel_2.png',
  narrator: null,
  text: `He overextends on a heavy strike, off-balance for half a second.`,
  glitch: false,
  echoScene: false,
  violence: false,
  choices: [
    {
      label: 'Strike',
      sub: 'Answer the opening with force.',
      icon: '✕',
      type: 'violence',
      next: 'act3b_duel_end',
      empathy: 0,
      violence: 0
    },
    {
      label: 'Block',
      sub: 'Nothing is coming at you yet.',
      icon: '◈',
      type: 'empathy',
      next: 'act3b_duel_2_hit',
      empathy: 0,
      violence: 0,
      wound: 'wounded'
    }
  ]
};

export const act3bDuel2HitScene = {
  id: 'act3b_duel_2_hit',
  act: 'ACT IIIB · CUTTER CAMP',
  location: 'CUTTER RING · ROUND 2',
  image: 'assets/act3b_duel_2_hit.png',
  narrator: null,
  text: `You brace for a hit that was never coming and he uses the opening to put you on the ground. The crowd murmurs — not mockery, just acknowledgment that this round is nearly over.`,
  glitch: false,
  echoScene: false,
  violence: false,
  choices: [
    {
      label: 'Get up',
      sub: 'The round finishes now.',
      icon: '✕',
      type: 'violence',
      next: 'act3b_duel_end',
      empathy: 0,
      violence: 0,
      wound: 'critical'
    }
  ]
};

export const act3bDuelEndScene = {
  id: 'act3b_duel_end',
  act: 'ACT IIIB · CUTTER CAMP',
  location: 'CUTTER RING · ROUND 3',
  image: 'assets/act3b_duel_end.png',
  narrator: null,
  text: `He's staggered, off his feet, hand raised — the ritual's signal that the round can end here.`,
  glitch: false,
  echoScene: false,
  violence: false,
  choices: [
    {
      label: 'Finish it',
      sub: 'End the fight cleanly.',
      icon: '✕',
      type: 'violence',
      next: 'act3b_camp_end',
      empathy: 0,
      violence: 2,
      flag: 'core_stabilizer'
    },
    {
      label: 'Spare him',
      sub: 'Show mercy and still earn the regulator.',
      icon: '◈',
      type: 'empathy',
      next: 'act3b_camp_end',
      empathy: 2,
      violence: 0,
      flag: 'core_stabilizer'
    }
  ]
};

export const act3bCampEndScene = {
  id: 'act3b_camp_end',
  act: 'ACT IIIB · CUTTER CAMP',
  location: 'CUTTER CAMP · PASSAGE',
  image: 'assets/act3b_camp_end.png',
  narrator: null,
  text: `Rell nods once, like a debt has been settled either way. "Passage granted." He presses the stabilizer regulator into your hand. It hums, faintly, like it's grateful to be useful again.`,
  glitch: false,
  echoScene: false,
  violence: false,
  choices: [
    {
      label: 'Continue toward the Rift',
      sub: "The work isn't done yet.",
      icon: '⬡',
      type: 'neutral',
      next: 'act4_rift',
      empathy: 0,
      violence: 0
    }
  ]
};

export const act3PacifyScene = {
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
      next: 'act3_bridge_end',
      empathy: 1,
      violence: 0
    }
  ]
};

export const act3DestroyScene = {
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
      next: 'act3_bridge_end',
      empathy: 0,
      violence: 0
    }
  ]
};
