import { titleScene } from './title.js';
import { act1RoadScene, act1HelpedScene, act1IgnoredScene } from './act1.js';
import {
  act1Ambush1Scene, act1Ambush1HitScene, act1Ambush2Scene, act1Ambush2HitScene,
  act1Ambush3Scene, act1AmbushFinishScene, act1AmbushSpareScene, act1AmbushCollapseScene
} from './act1_extra.js';
import { act2BunkerScene, act2MirethSecretScene, act2BunkerEndScene } from './act2.js';
import {
  act3GauntletScene, act3EndureCheckScene, act3EndureFailScene, act3DestroyForcedScene,
  act3RetreatScene, act3RetreatFightScene, act3PacifyScene, act3DestroyScene,
  act3BridgeEndScene, act3bCampScene, act3bDuel1Scene, act3bDuel1HitScene, act3bDuel2Scene,
  act3bDuel2HitScene, act3bDuelEndScene, act3bCampEndScene
} from './act3.js';
import {
  act4RiftScene, act4GivenScene, act4ChildEchoScene, act4ChildSavedScene,
  act4ChildLostScene, act4ChildSeveredScene
} from './act4.js';
import { act5EpicenterScene } from './act5.js';
import {
  endingEmpathyScene, endingViolenceScene, endingAscendantScene,
  endingSeveredScene, endingTrueScene
} from './endings.js';

export const SCENES = {
  [titleScene.id]: titleScene,
  [act1RoadScene.id]: act1RoadScene,
  [act1HelpedScene.id]: act1HelpedScene,
  [act1IgnoredScene.id]: act1IgnoredScene,
  [act1Ambush1Scene.id]: act1Ambush1Scene,
  [act1Ambush1HitScene.id]: act1Ambush1HitScene,
  [act1Ambush2Scene.id]: act1Ambush2Scene,
  [act1Ambush2HitScene.id]: act1Ambush2HitScene,
  [act1Ambush3Scene.id]: act1Ambush3Scene,
  [act1AmbushFinishScene.id]: act1AmbushFinishScene,
  [act1AmbushSpareScene.id]: act1AmbushSpareScene,
  [act1AmbushCollapseScene.id]: act1AmbushCollapseScene,
  [act2BunkerScene.id]: act2BunkerScene,
  [act2MirethSecretScene.id]: act2MirethSecretScene,
  [act2BunkerEndScene.id]: act2BunkerEndScene,
  [act3GauntletScene.id]: act3GauntletScene,
  [act3EndureCheckScene.id]: act3EndureCheckScene,
  [act3EndureFailScene.id]: act3EndureFailScene,
  [act3DestroyForcedScene.id]: act3DestroyForcedScene,
  [act3RetreatScene.id]: act3RetreatScene,
  [act3RetreatFightScene.id]: act3RetreatFightScene,
  [act3PacifyScene.id]: act3PacifyScene,
  [act3DestroyScene.id]: act3DestroyScene,
  [act3BridgeEndScene.id]: act3BridgeEndScene,
  [act3bCampScene.id]: act3bCampScene,
  [act3bDuel1Scene.id]: act3bDuel1Scene,
  [act3bDuel1HitScene.id]: act3bDuel1HitScene,
  [act3bDuel2Scene.id]: act3bDuel2Scene,
  [act3bDuel2HitScene.id]: act3bDuel2HitScene,
  [act3bDuelEndScene.id]: act3bDuelEndScene,
  [act3bCampEndScene.id]: act3bCampEndScene,
  [act4RiftScene.id]: act4RiftScene,
  [act4GivenScene.id]: act4GivenScene,
  [act4ChildEchoScene.id]: act4ChildEchoScene,
  [act4ChildSavedScene.id]: act4ChildSavedScene,
  [act4ChildLostScene.id]: act4ChildLostScene,
  [act4ChildSeveredScene.id]: act4ChildSeveredScene,
  [act5EpicenterScene.id]: act5EpicenterScene,
  [endingEmpathyScene.id]: endingEmpathyScene,
  [endingViolenceScene.id]: endingViolenceScene,
  [endingAscendantScene.id]: endingAscendantScene,
  [endingSeveredScene.id]: endingSeveredScene,
  [endingTrueScene.id]: endingTrueScene
};

export const MAIN_PATH = [
  'title',
  'act1_road',
  'act1_helped',
  'act1_ignored',
  'act1_ambush_1',
  'act1_ambush_1_hit',
  'act1_ambush_2',
  'act1_ambush_2_hit',
  'act1_ambush_3',
  'act1_ambush_finish',
  'act1_ambush_spare',
  'act1_ambush_collapse',
  'act2_bunker',
  'act2_mireth_secret',
  'act2_bunker_end',
  'act3_gauntlet',
  'act3_endure_check',
  'act3_endure_fail',
  'act3_destroy_forced',
  'act3_retreat',
  'act3_retreat_fight',
  'act3_pacify',
  'act3_destroy',
  'act3_bridge_end',
  'act3b_camp',
  'act3b_duel_1',
  'act3b_duel_1_hit',
  'act3b_duel_2',
  'act3b_duel_2_hit',
  'act3b_duel_end',
  'act3b_camp_end',
  'act4_rift',
  'act4_given',
  'act4_child_echo',
  'act4_child_saved',
  'act4_child_lost',
  'act4_child_severed',
  'act5_epicenter',
  'ending_empathy',
  'ending_violence',
  'ending_ascendant',
  'ending_severed',
  'ending_true'
];
