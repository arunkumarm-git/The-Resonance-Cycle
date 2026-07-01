export const act4RiftScene = {
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
};
