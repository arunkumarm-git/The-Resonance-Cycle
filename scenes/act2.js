export const act2BunkerScene = {
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
};
