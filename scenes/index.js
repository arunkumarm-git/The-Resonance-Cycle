import { titleScene } from './title.js';
import { act1RoadScene, act1HelpedScene, act1IgnoredScene } from './act1.js';
import { act2BunkerScene } from './act2.js';
import { act3GauntletScene, act3PacifyScene, act3DestroyScene } from './act3.js';
import { act4RiftScene } from './act4.js';
import { act5EpicenterScene } from './act5.js';
import { endingEmpathyScene, endingViolenceScene } from './endings.js';

export const SCENES = {
  [titleScene.id]: titleScene,
  [act1RoadScene.id]: act1RoadScene,
  [act1HelpedScene.id]: act1HelpedScene,
  [act1IgnoredScene.id]: act1IgnoredScene,
  [act2BunkerScene.id]: act2BunkerScene,
  [act3GauntletScene.id]: act3GauntletScene,
  [act3PacifyScene.id]: act3PacifyScene,
  [act3DestroyScene.id]: act3DestroyScene,
  [act4RiftScene.id]: act4RiftScene,
  [act5EpicenterScene.id]: act5EpicenterScene,
  [endingEmpathyScene.id]: endingEmpathyScene,
  [endingViolenceScene.id]: endingViolenceScene
};

export const MAIN_PATH = [
  'title',
  'act1_road',
  'act1_helped',
  'act1_ignored',
  'act2_bunker',
  'act3_gauntlet',
  'act3_pacify',
  'act3_destroy',
  'act4_rift',
  'act5_epicenter',
  'ending_empathy',
  'ending_violence'
];
