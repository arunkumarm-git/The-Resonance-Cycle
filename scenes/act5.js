export const act5EpicenterScene = {
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
};
