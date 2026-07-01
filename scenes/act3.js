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
      next: 'act4_rift',
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
      next: 'act4_rift',
      empathy: 0,
      violence: 0
    }
  ]
};
