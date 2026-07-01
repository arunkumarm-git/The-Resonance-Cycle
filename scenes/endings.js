export const endingEmpathyScene = {
  id: 'ending_empathy',
  act: 'THE CYCLE RETURNS',
  location: null,
  image: 'assets/ending_empathy.png',
  narrator: 'THE PRIME ECHO',
  text: `You understand now.\n\nThe Prime Echo — the colossal, hunting ghost that stalked your journey — was never your enemy.\n\nIt was you. A future Vane, shattered across the time-scar of the Fracture, trying to reach backward through the loop.\n\nTrying to tell you what you already chose to be.\n\nThe world resets. The Ash Road stretches out again before a new Vane under a fractured sky.\n\nBut the Prime Echo does not rage. It walks beside them, barely visible — a ghost made of memory, of every stranger's hand you held, every Echo you witnessed back into peace.\n\nThis time, the new Vane pauses before the collapsed overpass.\n\nAnd kneels.\n\nThe Cycle turns. The light is teal. There is still hope.`,
  glitch: false,
  echoScene: true,
  violence: false,
  choices: [
    {
      label: 'Begin Again',
      sub: 'A new loop. A better path.',
      icon: '◈',
      type: 'empathy',
      next: '__RESTART__',
      empathy: 0,
      violence: 0
    }
  ]
};

export const endingViolenceScene = {
  id: 'ending_violence',
  act: 'THE CYCLE COLLAPSES',
  location: null,
  image: 'assets/ending_violence.png',
  narrator: 'THE PRIME ECHO',
  text: `You understand too late.\n\nYour consciousness fractures and scatters like the Echo on the bridge — except there is nothing to witness yours. No one to say: I see you. I remember you.\n\nThe Prime Echo is born from the shrapnel of who you chose to be.\n\nIt does not guide. It does not wait. It hunts.\n\nThe world resets, and a new Vane walks out under a fractured sky — but the Prime Echo is there from the very first step now, malevolent and enormous, the accumulated weight of every abandoned survivor, every destroyed Echo, every refusal to be anything other than efficient.\n\nThe new Vane walks faster. Keeps their head down.\n\nThe Cycle turns. The light is red. But somewhere in the static, a sound — the echo of a choice not yet made.`,
  glitch: true,
  echoScene: false,
  violence: true,
  choices: [
    {
      label: 'Begin Again',
      sub: 'Into the nightmare. Into the loop.',
      icon: '✕',
      type: 'violence',
      next: '__RESTART__',
      empathy: 0,
      violence: 0
    }
  ]
};
