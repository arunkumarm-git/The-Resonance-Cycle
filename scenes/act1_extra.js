export const act1Ambush1Scene = {
  id: 'act1_ambush_1',
  act: 'ACT I · THE ASH ROAD',
  location: 'GUTTED TRANSIT TUNNEL',
  image: 'assets/act1_ambush_1.png',
  narrator: null,
  text: `Three shapes step out of the dark — matching red tourniquets, disciplined. The point-woman raises her rifle level with your chest. "Tether. Core's not yours anymore. Set it down, walk out. We've done this before — nobody has to loop back from this one hurt."`,
  glitch: false,
  echoScene: false,
  violence: false,
  choices: [
    {
      label: 'Take Cover',
      sub: 'Answer her raised rifle instead of answering fire.',
      icon: '◈',
      type: 'neutral',
      next: 'act1_ambush_2',
      empathy: 0,
      violence: 0
    },
    {
      label: 'Return Fire',
      sub: 'She hasn\'t fired yet — premature and dangerous.',
      icon: '✕',
      type: 'violence',
      next: 'act1_ambush_1_hit',
      empathy: 0,
      violence: 0,
      wound: 'wounded'
    }
  ]
};

export const act1Ambush1HitScene = {
  id: 'act1_ambush_1_hit',
  act: 'ACT I · THE ASH ROAD',
  location: 'GUTTED TRANSIT TUNNEL',
  image: 'assets/act1_ambush_1_hit.png',
  narrator: 'VANE',
  text: `You break cover too early. Her round catches your shoulder plate and spins you into the wall. Pain blooms white behind your eyes. You're still in it. Just barely.`,
  glitch: false,
  echoScene: false,
  violence: true,
  choices: [
    {
      label: 'Get back into it',
      sub: 'Push through despite the pain.',
      icon: '✕',
      type: 'violence',
      next: 'act1_ambush_2',
      empathy: 0,
      violence: 0
    }
  ]
};

export const act1Ambush2Scene = {
  id: 'act1_ambush_2',
  act: 'ACT I · THE ASH ROAD',
  location: 'GUTTED TRANSIT TUNNEL',
  image: 'assets/act1_ambush_2.png',
  narrator: null,
  text: `Two flankers break from cover, crossing open ground to pin you from both sides. They're exposed. Now.`,
  glitch: false,
  echoScene: false,
  violence: false,
  choices: [
    {
      label: 'Flank / Return Fire',
      sub: 'Answer their exposure with action.',
      icon: '✕',
      type: 'violence',
      next: 'act1_ambush_3',
      empathy: 0,
      violence: 0
    },
    {
      label: 'Hold Cover',
      sub: 'Wait, but they close the distance.',
      icon: '⬡',
      type: 'neutral',
      next: 'act1_ambush_2_hit',
      empathy: 0,
      violence: 0,
      wound: 'wounded'
    }
  ]
};

export const act1Ambush2HitScene = {
  id: 'act1_ambush_2_hit',
  act: 'ACT I · THE ASH ROAD',
  location: 'GUTTED TRANSIT TUNNEL',
  image: 'assets/act1_ambush_2_hit.png',
  narrator: 'VANE',
  text: `You wait too long. A flanker gets a clean line and clips your leg. You drop to one knee, suit alarms screaming CRITICAL. This is the last mistake this fight can afford.`,
  glitch: false,
  echoScene: false,
  violence: true,
  choices: [
    {
      label: 'Force yourself back up',
      sub: 'There is no other choice. Finish this fight.',
      icon: '✕',
      type: 'violence',
      next: 'act1_ambush_3',
      empathy: 0,
      violence: 0,
      wound: 'critical'
    }
  ]
};

export const act1Ambush3Scene = {
  id: 'act1_ambush_3',
  act: 'ACT I · THE ASH ROAD',
  location: 'GUTTED TRANSIT TUNNEL',
  image: 'assets/act1_ambush_3.png',
  narrator: null,
  text: `The point-woman staggers back into the wall, weapon arm limp. For one second she's just a person, breathing hard, looking at you like she's doing the math on whether this was worth it.`,
  glitch: false,
  echoScene: false,
  violence: false,
  choices: [
    {
      label: 'Finish her',
      sub: 'End it before she can recover.',
      icon: '✕',
      type: 'violence',
      next: 'act1_ambush_finish',
      empathy: 0,
      violence: 2
    },
    {
      label: 'Order a stand-down — let her walk',
      sub: 'Show mercy and spare her life.',
      icon: '◈',
      type: 'empathy',
      next: 'act1_ambush_spare',
      empathy: 2,
      violence: 0,
      flag: 'cutter_spared'
    }
  ]
};

export const act1AmbushFinishScene = {
  id: 'act1_ambush_finish',
  act: 'ACT I · THE ASH ROAD',
  location: 'GUTTED TRANSIT TUNNEL',
  image: 'assets/act1_ambush_finish.png',
  narrator: 'VANE',
  text: `It's fast. It's clean. Efficient, the way the wasteland trained you to be. Her last look isn't fear. It's recognition — like she expected exactly this from exactly someone like you. You don't have time to think about it. You have a schedule.`,
  glitch: false,
  echoScene: false,
  violence: true,
  choices: [
    {
      label: 'Continue to Bunker 7',
      sub: 'The mission continues.',
      icon: '⬡',
      type: 'neutral',
      next: 'act2_bunker',
      empathy: 0,
      violence: 0
    }
  ]
};

export const act1AmbushSpareScene = {
  id: 'act1_ambush_spare',
  act: 'ACT I · THE ASH ROAD',
  location: 'GUTTED TRANSIT TUNNEL',
  image: 'assets/act1_ambush_spare.png',
  narrator: 'VANE',
  text: `"Why," she says. Not a question exactly. More like she's testing the sentence. "You didn't have to let me go." She backs into the dark. "So I'm telling you something instead: our camp has gear that could save your life later. Bridge crossing. Ask for Rell."`,
  glitch: false,
  echoScene: false,
  violence: false,
  choices: [
    {
      label: 'Continue to Bunker 7',
      sub: 'You spared her. Now keep moving.',
      icon: '◈',
      type: 'neutral',
      next: 'act2_bunker',
      empathy: 0,
      violence: 0,
      flag: 'cutter_spared'
    }
  ]
};

export const act1AmbushCollapseScene = {
  id: 'act1_ambush_collapse',
  act: 'ACT I · THE ASH ROAD',
  location: 'GUTTED TRANSIT TUNNEL',
  image: 'assets/act1_ambush_collapse.png',
  narrator: 'VANE',
  text: `You go down before you reach her. The world tilts sideways. When it stops spinning, she's crouched over you — not finishing the job. She seals your shoulder wound with a strip torn from her sleeve. "You people," she mutters. "Always so sure the mission needs a body count."`,
  glitch: false,
  echoScene: false,
  violence: false,
  choices: [
    {
      label: 'Let her help you up',
      sub: 'Accept the mercy and keep moving.',
      icon: '◈',
      type: 'empathy',
      next: 'act2_bunker',
      empathy: 1,
      violence: 0,
      wound: 'wounded',
      flag: 'cutter_spared'
    }
  ]
};
