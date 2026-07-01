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
    },
    {
      label: 'Ask her about the bunker',
      sub: 'Find out why this place still holds a Core.',
      icon: '⬡',
      type: 'neutral',
      next: 'act2_mireth_secret',
      empathy: 0,
      violence: 0
    }
  ]
};

export const act2MirethSecretScene = {
  id: 'act2_mireth_secret',
  act: 'ACT II · BUNKER 7',
  location: 'BUNKER 7 · ANCHOR ROOM',
  image: 'assets/act2_mireth_secret.png',
  narrator: 'MIRETH',
  text: `Her jaw doesn't just have circuit burns. Under the flickering emergency lighting, for one unmistakable second, you see straight through her hand to the wall behind it.

"You're not supposed to notice that," she says quietly. "I anchored here forty years ago so this bunker wouldn't lose its Core-song and die like the others did. I am — mostly — real. The rest of me is memory, holding a door open."

She looks at you the way you'd look at someone you'd already grieved once. "Every Core you carry used to be someone like me. Like you. You'll understand at the Epicenter. I'm sorry no one told you sooner."`,
  glitch: false,
  echoScene: false,
  violence: false,
  choices: [
    {
      label: 'Take it in. Ask what to do with that.',
      sub: 'Truth is a weapon too.',
      icon: '◈',
      type: 'empathy',
      next: 'act2_bunker_end',
      empathy: 0,
      violence: 0,
      resonance: 15,
      flag: 'knows_core_truth'
    }
  ]
};

export const act2BunkerEndScene = {
  id: 'act2_bunker_end',
  act: 'ACT II · BUNKER 7',
  location: 'BUNKER 7 · RESONANCE PORT',
  image: 'assets/act2_bunker_end.png',
  narrator: null,
  text: `You slot the Core choice into motion. Whatever you decided, the bunker's lights hold a little longer because you were here. The Meridian Bridge waits beyond the airlock.`,
  glitch: false,
  echoScene: false,
  violence: false,
  choices: [
    {
      label: 'Continue to the Meridian Bridge',
      sub: "The fracture isn't going to close itself.",
      icon: '⬡',
      type: 'neutral',
      next: 'act3_gauntlet',
      empathy: 0,
      violence: 0
    }
  ]
};
