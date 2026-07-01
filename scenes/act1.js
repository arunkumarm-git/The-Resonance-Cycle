export const act1RoadScene = {
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
};

export const act1HelpedScene = {
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
      label: 'Continue to the transit tunnel',
      sub: 'You move forward, the warning still fresh in your mind.',
      icon: '⬡',
      type: 'neutral',
      next: 'act1_ambush_1',
      empathy: 0,
      violence: 0
    }
  ]
};

export const act1IgnoredScene = {
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
      label: 'Continue to the transit tunnel',
      sub: "Your pace doesn't slow. The Core is still ahead.",
      icon: '⬡',
      type: 'neutral',
      next: 'act1_ambush_1',
      empathy: 0,
      violence: 0
    }
  ]
};
