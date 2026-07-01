export const titleScene = {
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
};
