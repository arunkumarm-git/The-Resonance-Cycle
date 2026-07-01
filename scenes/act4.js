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
      next: 'act4_given',
      empathy: 3,
      violence: 0,
      flag: 'child_at_peace'
    },
    {
      label: 'Refuse. Press On.',
      sub: 'The mission is everything. Without you, billions lose the Core.',
      icon: '✕',
      type: 'violence',
      next: 'act4_child_echo',
      empathy: 0,
      violence: 2
    }
  ]
};

export const act4GivenScene = {
  id: 'act4_given',
  act: 'ACT IV · RIFT\'S EDGE',
  location: 'FRACTURE PERIMETER · KILOMETER 0',
  image: 'assets/act4_given.png',
  narrator: null,
  text: `You tear the last ration packet open and hand it over. The child's eyes go wide, then calm. They eat a few bites standing there, and when they look up the danger in them has not vanished — but the panic has.

"Thank you," they say. "I can walk now."

You watch them disappear into the warped horizon. You are lighter, and also visibly more alone.`,
  glitch: false,
  echoScene: false,
  violence: false,
  choices: [
    {
      label: 'Continue to the Epicenter, hungry',
      sub: 'You keep moving. The child keeps moving too.',
      icon: '◈',
      type: 'empathy',
      next: 'act5_epicenter',
      empathy: 0,
      violence: 0
    }
  ]
};

export const act4ChildEchoScene = {
  id: 'act4_child_echo',
  act: 'ACT IV · RIFT\'S EDGE',
  location: 'FRACTURE PERIMETER · ZERO LINE',
  image: 'assets/act4_child_echo.png',
  narrator: null,
  text: `The child turns at your back, but their face is wrong. The light inside their eyes is not human anymore. It is a static field of impossible age and sorrow.

You realize, with a cold clarity, that this is not a lost child. This is an Echo.

It steps forward, arms out. You have one shot to decide how to meet it: with resonance or with force.`,
  glitch: true,
  echoScene: true,
  violence: false,
  choices: [
    {
      label: 'Attune',
      sub: 'Witness the child instead of fighting it.',
      icon: '◈',
      type: 'empathy',
      next: 'act4_child_saved',
      empathy: 0,
      violence: 0,
      resonance: 20,
      noteAttune: true,
      flag: 'child_at_peace'
    },
    {
      label: 'Retreat',
      sub: 'You can’t watch this happen. Get away. Fast.',
      icon: '⬡',
      type: 'neutral',
      next: 'act4_child_lost',
      empathy: 0,
      violence: 0,
      resonance: -5
    },
    {
      label: 'Sever',
      sub: 'End it before it becomes something worse.',
      icon: '✕',
      type: 'violence',
      next: 'act4_child_severed',
      empathy: 0,
      violence: 3,
      resonance: -30,
      flag: 'severed_the_child'
    }
  ]
};

export const act4ChildSavedScene = {
  id: 'act4_child_saved',
  act: 'ACT IV · RIFT\'S EDGE',
  location: 'FRACTURE PERIMETER · ZERO LINE',
  image: 'assets/act4_child_saved.png',
  narrator: null,
  text: `The Echo's static presence softens as you stay with it. It takes one last breath and the world inside it settles like a tide.

When the light clears, the child you saw is still there — calm, almost smiling. A small, steady shape walking a half-step behind the Prime Echo now, unafraid.

You were able to witness it. You were able to let it go.`,
  glitch: false,
  echoScene: true,
  violence: false,
  choices: [
    {
      label: 'Continue to the Epicenter',
      sub: 'The Rift is still there. The work is still yours.',
      icon: '◈',
      type: 'empathy',
      next: 'act5_epicenter',
      empathy: 0,
      violence: 0
    }
  ]
};

export const act4ChildLostScene = {
  id: 'act4_child_lost',
  act: 'ACT IV · RIFT\'S EDGE',
  location: 'FRACTURE PERIMETER · ZERO LINE',
  image: 'assets/act4_child_lost.png',
  narrator: null,
  text: `You back away. The Echo reaches its arms toward you and the light in its eyes fades into something resigned.

It does not follow. It does not let go. It bleeds back into the fracture like smoke.

You keep moving. The child is gone. The guilt is not.`,
  glitch: false,
  echoScene: false,
  violence: false,
  choices: [
    {
      label: 'Continue to the Epicenter',
      sub: 'You have to keep going. There is no turning back now.',
      icon: '⬡',
      type: 'neutral',
      next: 'act5_epicenter',
      empathy: 0,
      violence: 0
    }
  ]
};

export const act4ChildSeveredScene = {
  id: 'act4_child_severed',
  act: 'ACT IV · RIFT\'S EDGE',
  location: 'FRACTURE PERIMETER · ZERO LINE',
  image: 'assets/act4_child_severed.png',
  narrator: null,
  text: `You don't give it a choice.

The blade slides through static and flesh alike. The child collapses, and the Echo's cry is everything you regret all at once.

The world goes very quiet. The Rift is still there. You are still here. But something in you has changed.`,
  glitch: false,
  echoScene: false,
  violence: true,
  choices: [
    {
      label: 'Continue to the Epicenter',
      sub: 'Finish the mission. There is no redemption in hesitation.',
      icon: '✕',
      type: 'violence',
      next: 'act5_epicenter',
      empathy: 0,
      violence: 0
    }
  ]
};
