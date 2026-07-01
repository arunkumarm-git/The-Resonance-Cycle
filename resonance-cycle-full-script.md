# THE RESONANCE CYCLE
### Complete Branching Script — Full Text, Options & Consequences (v2.0)

---

## HOW TO READ THIS DOCUMENT

Each node is one screen the player sees. Every choice row shows:

**Option — what the button says** | **Type** (◈ empathy / ✕ violence-or-danger / ⬡ control-or-tactical / ⟡ evasive-or-neutral) | **Stat effect** | **Leads to**

Stats tracked:
- `EMP` empathy score / `VIO` violence score — drives Endings A & B
- `WND` wound state: `none → wounded → critical → DEAD` — a wrong combat move pushes this forward; `DEAD` routes straight to Ending D
- `RES` resonance (0–100) — rises from real Attune-successes, falls from Severing Echoes — gates Ending E
- `FLAGS` — persistent memory tokens (e.g. `cutter_spared`, `child_at_peace`, `knows_core_truth`) — gate optional content and change later text

If a fight scene has no visible "wrong" answer listed, assume the omitted move types are simply absent from that beat's button row (the engine hides moves that make no narrative sense, same as it hides the Flank option while wounded).

---

## FULL CONNECTIONS MAP

```
title
 └─ act1_road
     ├─ act1_helped ─┐
     └─ act1_ignored ┤ (ignored = start wounded)
                      └─ act1_ambush_1 [GUNFIGHT]
                          ├─ (hit) act1_ambush_1_hit ─┐
                          └─ (cover) ──────────────────┴─ act1_ambush_2
                                                             ├─ (hit) act1_ambush_2_hit ─┐
                                                             └─ (flank/fire) ─────────────┴─ act1_ambush_3
                                                                                                ├─ DEAD-check (only if WND=critical AND wrong move) → ending_severed
                                                                                                ├─ Finish  → act1_ambush_finish  ─┐
                                                                                                └─ Spare   → act1_ambush_spare  ─┤ [FLAG cutter_spared]
                                                                                                                                   └─ act2_bunker
act2_bunker
 ├─ (investigate Mireth) act2_mireth_secret ─┐
 └─ (skip) ─────────────────────────────────┴─ act2_bunker_choice
                                                  ├─ Take spare Core   → act2_bunker_end (EMP+2)
                                                  └─ Leave Core        → act2_bunker_end (VIO+1)
act2_bunker_end → act3_gauntlet
act3_gauntlet [ENTITY COMBAT]
 ├─ Attune   → act3_endure_check
 │              ├─ (success) act3_pacify
 │              └─ (fail)    act3_endure_fail → act3_destroy_forced
 ├─ Sever    → act3_destroy
 └─ Retreat  → act3_retreat → act3_retreat_fight
                                  ├─ Attune (correct) → act3_pacify
                                  └─ Sever/wrong       → act3_destroy_forced
[act3_pacify | act3_destroy | act3_destroy_forced] → act3_bridge_end
act3_bridge_end
 ├─ (if FLAG cutter_spared) → act3b_camp [HAND-TO-HAND]
 │                              act3b_duel_1 → act3b_duel_2 → act3b_duel_end → act4_rift
 └─ (else) → act4_rift
act4_rift
 ├─ Give ration   → act4_given [FLAG child_at_peace] → act5_epicenter
 └─ Refuse        → act4_child_echo [ENTITY COMBAT]
                       ├─ Attune  → act4_child_saved [FLAG child_at_peace] → act5_epicenter
                       ├─ Retreat → act4_child_lost → act5_epicenter
                       └─ Sever   → act4_child_severed [FLAG severed_the_child] → act5_epicenter
act5_epicenter → FINAL CHOICE (options vary by flags/stats):
    → ending_true      (secret, needs RES≥80 + knows_core_truth + child_at_peace)
    → ending_ascendant (needs WND never worse than wounded + cutter_spared + one Attune success)
    → ending_severed   (if WND = DEAD at any point in the run)
    → ending_empathy   (EMP > VIO, default)
    → ending_violence  (VIO ≥ EMP, default)
All endings except ending_true → __RESTART__ → title (loopCount+1, FLAGS persist)
```

---

# ACT I — THE ASH ROAD

### `title`
**Image:** ash storm, lone silhouette on a cracked highway

> Year 2142. "The Fracture" tore the world in two.
>
> You are VANE. Tether. Courier. One of the last people who walks the Ash Roads between dying bunkers — keeping humanity anchored to a world that is slowly forgetting how to be real.
>
> Your cargo: a Resonance Core. Your destination: the end of everything.
>
> *(If `loopCount` > 0, append: "The road looks the same as it did last time. You are not sure why that thought occurred to you.")*

| Option | Type | Effect | Leads to |
|---|---|---|---|
| Begin the Cycle | ⟡ neutral | — | `act1_road` |

---

### `act1_road`
**Location:** Sector 9 · Ash Corridor

> The ash storm is worse today. Your visor pings: 14km to Bunker 7.
>
> Through the static roar you hear something — a cough. Human. Weak.
>
> In the hollow of a collapsed overpass, half-buried under debris, lies a survivor. Young. Breathing. Their leg is pinned.
>
> Your suit logs it: two hours of medical supplies available. The detour costs forty minutes.

| Option | Type | Effect | Leads to |
|---|---|---|---|
| Stop and Help | ◈ empathy | `EMP+2` | `act1_helped` |
| Keep Moving | ✕ violence | `VIO+1` | `act1_ignored` |

---

### `act1_helped`
**Narrator:** VANE

> You pull the rubble away. The survivor — a kid, maybe sixteen — grabs your wrist. "Thank you... I didn't think anyone still did this."
>
> As you seal the wound, they whisper: "There's a raider tripwire on the main road. Fifty meters past the third pylon. They've been robbing Tethers — but they're not raiders. Not really. They move like soldiers."
>
> You leave them a thermal pack and push on, forewarned.

| Option | Type | Effect | Leads to |
|---|---|---|---|
| Continue toward Bunker 7 | ⟡ neutral | `WND` stays `none`; combat ahead begins with a **free first move** | `act1_ambush_1` |

---

### `act1_ignored`
**Narrator:** VANE

> You walk past. The voice calls after you — not angry, just: "Be careful past the third pylon... please."
>
> You don't turn back.
>
> Fifty meters past the third pylon, a trap springs — not a snare, a coordinated ambush you didn't see coming. Your suit's defense array takes the worst of it, but not all.

| Option | Type | Effect | Leads to |
|---|---|---|---|
| Push through, bleeding time you don't have | ✕ | `WND: none→wounded` | `act1_ambush_1` |

---

### `act1_ambush_1` — GUNFIGHT, Beat 1
**Location:** Gutted Transit Tunnel

> Three shapes step out of the dark — not scavenged plate, but matching red tourniquets, disciplined. A woman at point raises her rifle level with your chest. "Tether. Core's not yours anymore. Set it down, walk out. We've done this before — nobody has to loop back from this one hurt."
>
> She's already sighting down the barrel. She's about to fire.

*(If arriving from `act1_helped`, insert: "You already know where her flankers are hiding — the kid's warning was right." Skip straight to a guaranteed-correct first beat, no penalty possible here.)*

| Option | Type | Effect | Leads to |
|---|---|---|---|
| **Take Cover** — answers her raised rifle | ◈ tactical-correct | none | `act1_ambush_2` |
| Return Fire — she hasn't fired yet, this is premature | ✕ mismatched | `WND: →wounded` (or `wounded→critical` if already wounded) | `act1_ambush_1_hit` |

---

### `act1_ambush_1_hit`
> You break cover a half-second too early. Her round catches your shoulder plate — it holds, barely, but the impact spins you into the wall. Pain blooms white behind your eyes. You're still in this fight. Just barely.

| Option | Type | Effect | Leads to |
|---|---|---|---|
| Get back into it | ✕ | — | `act1_ambush_2` (wounded variant: one option below is removed) |

---

### `act1_ambush_2` — GUNFIGHT, Beat 2
**Location:** Gutted Transit Tunnel

> From behind cover you see it: two flankers breaking from the walls, crossing open ground to pin you from both sides. They're exposed. Now.

| Option | Type | Effect | Leads to |
|---|---|---|---|
| **Flank / Return Fire** — answers their exposure | ✕ tactical-correct | none | `act1_ambush_3` |
| Hold Cover — passive, but they close the distance uncontested | ⟡ mismatched | `WND: →wounded` (or `→critical`) | `act1_ambush_2_hit` |
| *(hidden if wounded)* ~~Flank~~ | — | *(unavailable — your shoulder won't let you move that fast)* | — |

---

### `act1_ambush_2_hit`
> You wait a beat too long. One flanker gets a clean line and clips your leg. You go down to one knee, suit alarms screaming CRITICAL in the corner of your vision. This is the last mistake this fight can afford.

| Option | Type | Effect | Leads to |
|---|---|---|---|
| Force yourself back up | ✕ | `WND: critical` locked in | `act1_ambush_3` (critical variant) |

---

### `act1_ambush_3` — GUNFIGHT, Beat 3 (Resolution)
**Location:** Gutted Transit Tunnel

> The point-woman staggers back into the wall, weapon arm limp, and for one second she's just a person, breathing hard, looking at you like she's doing math about whether this was worth it.
>
> *(If `WND = critical` entering this beat, insert: "Your vision is tunneling. Your hands don't feel like yours anymore. Whatever you choose next, your body may not agree.")*

| Option | Type | Effect | Leads to |
|---|---|---|---|
| Finish her | ✕ violence | `VIO+2` | `act1_ambush_finish` |
| Order a stand-down — let her walk | ◈ empathy | `EMP+2`, `FLAG: cutter_spared` | `act1_ambush_spare` |
| *(only if `WND = critical`)* Push forward anyway | ✕ risky | **death-check**: on a mismatch here, `WND: DEAD` → routes straight to `ending_severed` instead of Act II | `act1_ambush_collapse` *or* `ending_severed` |

---

### `act1_ambush_finish`
> It's fast. It's clean. It's the kind of efficient the wasteland trained you to be.
>
> Her last look isn't fear. It's recognition — like she expected exactly this, from exactly someone like you.
>
> You don't have time to think about what that means. You have a schedule.

| Option | Type | Effect | Leads to |
|---|---|---|---|
| Continue to Bunker 7 | ⟡ | — | `act2_bunker` |

---

### `act1_ambush_spare`
> "Why," she says. Not a question, exactly. More like she's never been asked to test the sentence out loud.
>
> "You didn't have to let me go," she says finally, backing toward the dark. "So I'm telling you something instead: our camp has gear that could save your life later. Bridge crossing. Ask for Rell." She's gone before you can answer.

| Option | Type | Effect | Leads to |
|---|---|---|---|
| Continue to Bunker 7 | ⟡ | `FLAG: cutter_spared` already set | `act2_bunker` |

---

### `act1_ambush_collapse` *(rare mercy branch)*
> You go down before you reach her. The world tilts sideways.
>
> When it stops spinning, she's crouched over you — not finishing the job. Sealing your shoulder wound with a strip torn from her own sleeve. "You people," she mutters. "Always so sure the mission needs a body count."

| Option | Type | Effect | Leads to |
|---|---|---|---|
| Let her help you up | ◈ | `EMP+1`, `WND: critical→wounded`, `FLAG: cutter_spared` | `act2_bunker` |

---

# ACT II — BUNKER 7

### `act2_bunker_choice`
**Location:** Bunker 7 · Resonance Port

> One hundred and twelve people live in rooms carved from old subway lines. When you emerge from the airlock, they're waiting — not cheering, just watching.
>
> You slot the Resonance Core into the anchor port. Teal light blooms through the corridors.
>
> The bunker administrator — an older woman with circuit burns tracing her jaw, who does not blink during the resonance hum — studies you a long time. "You have a choice. One spare Core here. The last one. Backup for us, or you carry it toward the Fracture — someone else out there needs it more."

| Option | Type | Effect | Leads to |
|---|---|---|---|
| Ask her how long she's run this bunker | ⬡ investigate | — | `act2_mireth_secret` |
| Take the spare Core | ◈ empathy | `EMP+2` | `act2_bunker_end` |
| Leave the Core here | ✕ violence | `VIO+1` | `act2_bunker_end` |

---

### `act2_mireth_secret`
**Narrator:** MIRETH

> Her jaw doesn't just have circuit burns. Under the flickering emergency lighting, for one unmistakable second, you see straight through her hand to the wall behind it.
>
> "You're not supposed to notice that," she says quietly. "I anchored here forty years ago so this bunker wouldn't lose its Core-song and die like the others did. I am — mostly — real. The rest of me is memory, holding a door open."
>
> She looks at you the way you'd look at someone you'd already grieved once. "Every Core you carry used to be someone like me. Like you. You'll understand at the Epicenter. I'm sorry no one told you sooner."

| Option | Type | Effect | Leads to |
|---|---|---|---|
| Take it in. Ask what to do with that. | ◈ | `RES+15`, `FLAG: knows_core_truth` | `act2_bunker_choice` *(now shows only the two Core options, this one greyed out)* |

---

### `act2_bunker_end`
> You slot the choice into motion. Whatever you decided, the bunker's lights hold a little longer because you were here.

| Option | Type | Effect | Leads to |
|---|---|---|---|
| Continue to the Meridian Bridge | ⟡ | — | `act3_gauntlet` |

---

# ACT III — THE MERIDIAN BRIDGE

### `act3_gauntlet` — ENTITY ENCOUNTER
**Location:** Fracture Approach · Meridian Bridge

> The only route forward is a skeletal span over a kilometer-wide tear in the earth.
>
> Halfway across, you stop. An Echo. Nearly three meters tall, a distorted howling shape that used to be a man — you can see the ghost of him inside the static: a worker, a father, replaying his last terrified moments on a loop.
>
> He can't see you yet. But he will.

| Option | Type | Effect | Leads to |
|---|---|---|---|
| **Attune** — reach the resonance emitter toward him | ◈ | risk now, best outcome if it holds | `act3_endure_check` |
| **Sever** — sonic charge, end it clean | ✕ | `VIO+2`, `RES-15` | `act3_destroy` |
| **Retreat** — this isn't the moment, find another way across | ⟡ | delays the fight; the *next* encounter is harder but better telegraphed | `act3_retreat` |

---

### `act3_endure_check`
> You open the link. You are inside his last moment — a parking lot, a cracking sky, his daughter's voice cutting off mid-syllable. The memory spikes, a psychic lash aimed at throwing you out of the connection.

| Option | Type | Effect | Leads to |
|---|---|---|---|
| **Endure** — brace, don't let go of the link | ◈ tactical-correct | `RES+20` | `act3_pacify` |
| Pull back reflexively | ✕ mismatched | `WND: →wounded`, Echo turns hostile | `act3_endure_fail` |

---

### `act3_endure_fail`
> You flinch. The link snaps. The Echo's grief curdles into rage mid-memory, and it's on you before your suit can compensate — a shoulder-check of pure static that knocks the wind from you. There's no more window for gentleness here.

| Option | Type | Effect | Leads to |
|---|---|---|---|
| Sever it — no other option left | ✕ forced | `VIO+2`, `RES-10` | `act3_destroy_forced` |

---

### `act3_pacify`
**Narrator:** VANE

> You let the memory complete. You witness it, fully, without flinching.
>
> The Echo exhales — a sound like a radio finally tuning in — and disperses into soft teal light drifting upward until it's gone. The bridge is clear. The air smells faintly of rain.

| Option | Type | Effect | Leads to |
|---|---|---|---|
| Cross the bridge | ◈ | `EMP+1` | `act3_bridge_end` |

---

### `act3_destroy`
**Narrator:** VANE

> Three. Two. One. The detonation is a white concussion wave. The Echo doesn't have time to turn. It simply — ends. Fragments scatter like broken glass and dissolve before they touch the ground.
>
> Efficient. Clean. Gone. Your suit logs a line you don't fully understand yet: *FRAGMENT MASS ADDED TO UNKNOWN AGGREGATE — SIGNAL SOURCE: FRACTURE CORE.*
>
> Your heartrate, spiked at the detonation, takes forty seconds to come back down. Something in you knew what it was.

| Option | Type | Effect | Leads to |
|---|---|---|---|
| Cross the bridge | ✕ | — | `act3_bridge_end` |

---

### `act3_destroy_forced`
> There was no clean version of this one. The charge lands anyway. The Echo goes out mid-scream instead of mid-memory, and that difference sits in your chest the rest of the walk.

| Option | Type | Effect | Leads to |
|---|---|---|---|
| Cross the bridge | ✕ | — | `act3_bridge_end` |

---

### `act3_retreat`
> You pull back before the confrontation forces itself. There's a service catwalk below the main span — narrower, exposed to the drop, but it avoids him entirely.
>
> Halfway down it, you understand why nobody uses this route. There's a second Echo down here — older, more coherent, less lost. It's been watching you the whole time you climbed down.

| Option | Type | Effect | Leads to |
|---|---|---|---|
| Face it | ⟡ | — | `act3_retreat_fight` |

---

### `act3_retreat_fight` — ENTITY ENCOUNTER (harder, better telegraphed)
> This one isn't screaming. It's calm — arms open, waiting, like it's been rehearsing this meeting for years. It gestures, slow and deliberate, toward the resonance emitter on your suit. It *wants* to be witnessed. There's no ambiguity in the tell at all.

| Option | Type | Effect | Leads to |
|---|---|---|---|
| **Attune** — answer the invitation | ◈ tactical-correct | `RES+25` (higher payout for reading it correctly) | `act3_pacify` |
| Sever anyway, out of habit or fear | ✕ badly mismatched | `VIO+2`, `RES-20`, `WND: →wounded` (the backlash of severing a *willing* Echo is worse) | `act3_destroy_forced` |

---

### `act3_bridge_end`
> The far side of the bridge opens onto scorched earth and a long, straight road toward the Fracture's perimeter.

| Option | Type | Effect | Leads to |
|---|---|---|---|
| Continue | ⟡ | *(if `FLAG cutter_spared`, this option is replaced by the one below)* | `act4_rift` |
| A figure is waiting near the guardrail — Rell, from the camp | ⬡ *(only shown if `cutter_spared`)* | — | `act3b_camp` |

---

# ACT IIIB — THE CUTTER CAMP *(optional, requires `cutter_spared`)*

### `act3b_camp`
**Narrator:** RELL

> "You didn't have to let her go," Rell says — a broad-shouldered man missing two fingers on his left hand. "So I'm telling you: our Core stabilizer bay has a spare regulator. Yours is degrading faster than you think. But nothing here is free. Passage rights are earned, not given."

| Option | Type | Effect | Leads to |
|---|---|---|---|
| Accept the duel | ⬡ | — | `act3b_duel_1` |
| Walk away — you don't need it that badly | ⟡ | skip camp entirely | `act4_rift` |

---

### `act3b_duel_1` — HAND-TO-HAND, Beat 1
> Your opponent — the camp's second — circles you, weight forward, already committed to closing distance fast.

| Option | Type | Effect | Leads to |
|---|---|---|---|
| **Reposition/Dodge** — answers speed and closing distance | ⟡ tactical-correct | none | `act3b_duel_2` |
| Strike — you're not close enough, this is premature | ✕ mismatched | `WND: →wounded` | `act3b_duel_1_hit` |

---

### `act3b_duel_1_hit`
> You swing at air and eat a shoulder-check for it. The ring of onlookers doesn't cheer or jeer — this is a ritual, not a spectacle, and they watch it like one.

| Option | Type | Effect | Leads to |
|---|---|---|---|
| Reset your stance | ✕ | — | `act3b_duel_2` (wounded variant) |

---

### `act3b_duel_2` — HAND-TO-HAND, Beat 2
> He overextends on a heavy strike, off-balance for half a second.

| Option | Type | Effect | Leads to |
|---|---|---|---|
| **Strike** — answers the overextension | ✕ tactical-correct | none | `act3b_duel_end` |
| Block — nothing is coming at you to block yet | ◈ mismatched | `WND: →wounded` (or `→critical`) | `act3b_duel_2_hit` |

---

### `act3b_duel_2_hit`
> You brace for a hit that was never coming and he uses the opening to put you on the ground. The crowd murmurs — not mockery, just acknowledgment that this round is nearly over.

| Option | Type | Effect | Leads to |
|---|---|---|---|
| Get up | ✕ | `WND: critical` | `act3b_duel_end` (critical variant) |

---

### `act3b_duel_end`
> He's staggered, off his feet, hand raised — the ritual's signal that the round can end here.

| Option | Type | Effect | Leads to |
|---|---|---|---|
| Finish it | ✕ violence | `VIO+2`, grants Core Stabilizer *(prevents one future wound-escalation)* | `act3b_camp_end` |
| Spare him | ◈ empathy | `EMP+2`, grants Core Stabilizer | `act3b_camp_end` |

---

### `act3b_camp_end`
> Rell nods once, like a debt has been settled either way. "Passage granted." He presses the stabilizer regulator into your hand. It hums, faintly, like it's grateful to be useful again.

| Option | Type | Effect | Leads to |
|---|---|---|---|
| Continue toward the Rift | ⟡ | — | `act4_rift` |

---

# ACT IV — RIFT'S EDGE

### `act4_rift`
**Location:** Fracture Perimeter · Kilometer 0

> The sky here bends, prismatic, colors with no names. A small shape steps out from behind a rusted transport carcass.
>
> A child. Maybe eight. Filthy, feverish. "Please," they say, looking at your suit. "I can see the glow. I haven't... I can't find my family anymore. I can't find anything."
>
> Your reserves display CRITICAL. One ration pack left — enough for you to survive the final approach. Not enough for both.

| Option | Type | Effect | Leads to |
|---|---|---|---|
| Give them the ration | ◈ empathy | `EMP+3`, `FLAG: child_at_peace` | `act4_given` |
| Refuse. Press on. | ✕ violence | `VIO+2` | `act4_child_echo` |

---

### `act4_given`
> The child eats slowly, hands shaking. Color returns to their face in a way that has nothing to do with the ration and everything to do with someone finally stopping. "You're the first person who didn't just walk past," they say, and fall asleep against the transport carcass, safe, breathing.

| Option | Type | Effect | Leads to |
|---|---|---|---|
| Continue to the Epicenter, hungry | ◈ | — | `act5_epicenter` |

---

### `act4_child_echo` — ENTITY ENCOUNTER (forced, emotional core scene)
> You walk past. Behind you, a small sound — not a cry. A collapse.
>
> You turn. The child is on the ground, and the light coming off them isn't fever-shine anymore. It's teal. It's happening *right now*, in front of you — the transformation raiders whisper about, the moment a person becomes an Echo. Small. Panicked. Already reaching for you with hands that aren't fully solid.

| Option | Type | Effect | Leads to |
|---|---|---|---|
| **Attune** — there might still be time to witness them, not fight them | ◈ | `RES+20`, `FLAG: child_at_peace` (rescued late is still rescued) | `act4_child_saved` |
| **Retreat** — you can't watch this happen | ⟡ | `RES-5` | `act4_child_lost` |
| **Sever** — end it before it becomes something worse | ✕ *(flagged in-text as the darkest option in the game)* | `VIO+3`, `RES-30`, `FLAG: severed_the_child` | `act4_child_severed` |

---

### `act4_child_saved`
> You catch the moment before it finishes closing. The panic in the small shape settles into something like relief — like being told, at the very end, that someone saw exactly what happened to them. The light doesn't vanish. It settles, calm, and drifts alongside you rather than away.

| Option | Type | Effect | Leads to |
|---|---|---|---|
| Continue to the Epicenter | ◈ | — | `act5_epicenter` |

---

### `act4_child_lost`
> You look away. When you look back, the transformation has finished without you, and the small shape that used to be a person is gone — not destroyed, just gone somewhere you didn't follow. You'll never know which way it went.

| Option | Type | Effect | Leads to |
|---|---|---|---|
| Continue to the Epicenter | ⟡ | — | `act5_epicenter` |

---

### `act4_child_severed`
> It's fast. It's clean, the way the sonic charge always is. It is also, unmistakably, the worst thing you have done on this road.
>
> Your suit doesn't log a fragment mass this time. It logs a name it shouldn't be able to know, and then it logs nothing at all, like even the machine doesn't want a record of this one.

| Option | Type | Effect | Leads to |
|---|---|---|---|
| Continue to the Epicenter | ✕ | — | `act5_epicenter` |

---

# ACT V — THE EPICENTER

### `act5_epicenter`
**Location:** Fracture Core · Zero Point

> You are here. Zero Point. The Fracture machine towers above — a cathedral of collapsed physics, built by brilliant, careless people who tore a hole in the membrane of reality.
>
> You place your hand on the machine. The teal warmth doesn't just answer you — it *recognizes* you. For one unbearable second you see them: every Tether who stood where you're standing. Hundreds. Thousands. Some calm. Most screaming.
>
> *(If `FLAG knows_core_truth`, insert Mireth's voice surfacing through the suit: "The machine doesn't need a sacrifice. It needs a witness. It has always only ever needed a witness. None of us figured that out in time.")*
>
> The shape ahead of you in the light is enormous, and it is made of every version of you that came before. **This is the Prime Echo. It is waiting to see what you do.**

**Choices shown depend on accumulated stats/flags — see table below.**

| Option | Type | Shown when... | Effect | Leads to |
|---|---|---|---|---|
| **Attune to the whole machine** | ◈ *(secret option)* | `RES≥80` AND `knows_core_truth` AND `child_at_peace` | ends the loop entirely | `ending_true` |
| Activate the Core, standing your ground | ⬡ | `WND` never worse than `wounded` all run AND `cutter_spared` AND at least one real Attune success | | `ending_ascendant` |
| Activate the Core | ⟡ default | always available | resolves by `EMP` vs `VIO` | `ending_empathy` or `ending_violence` |

*(Note: if `WND = DEAD` was ever triggered earlier in the run, the player never reaches this scene at all — the run already redirected to `ending_severed` at the moment of death.)*

---

## THE FIVE ENDINGS

### `ending_empathy` — "The Cycle Turns Teal"
*(fires when `EMP > VIO` and no higher-priority ending qualifies)*

> You understand now. The Prime Echo — the colossal, hunting ghost that stalked your journey — was never your enemy. It was you. Every future Vane, shattered across the time-scar of the Fracture, trying to reach backward through the loop. Trying to tell you what you already chose to be.
>
> The world resets. The Ash Road stretches out again before a new Vane under a fractured sky. But the Prime Echo does not rage. It walks beside them, barely visible — a ghost made of memory, of every stranger's hand you held, every Echo you witnessed back into peace.
>
> *(If `FLAG child_at_peace`, insert: "A small, calm light walks a half-step behind the Prime Echo now, unafraid, the way it should have been all along.")*
>
> This time, the new Vane pauses before the collapsed overpass. And kneels. The Cycle turns. The light is teal. There is still hope.

| Option | Type | Effect | Leads to |
|---|---|---|---|
| Begin Again | ◈ | `loopCount+1`, scores reset, `loopMemory` persists | `__RESTART__ → title` |

---

### `ending_violence` — "The Cycle Turns Red"
*(fires when `VIO ≥ EMP` and no higher-priority ending qualifies)*

> You understand too late. Your consciousness fractures and scatters like the Echo on the bridge — except there is nothing to witness yours. No one to say: I see you. I remember you.
>
> The Prime Echo is born from the shrapnel of who you chose to be. It does not guide. It does not wait. It hunts.
>
> *(If `FLAG severed_the_child`, insert: "Somewhere in its mass is a light too small to belong there, still reaching for a hand that never came back.")*
>
> The world resets, and a new Vane walks out under a fractured sky — but the Prime Echo is there from the very first step now, malevolent and enormous. The new Vane walks faster. Keeps their head down.
>
> The Cycle turns. The light is red. But somewhere in the static, a sound — the echo of a choice not yet made.

| Option | Type | Effect | Leads to |
|---|---|---|---|
| Begin Again | ✕ | `loopCount+1`, scores reset, `loopMemory` persists | `__RESTART__ → title` |

---

### `ending_ascendant` — "The Tether Who Stayed Standing" *(rare)*

> Vane doesn't just survive the Epicenter — they walk out the other side of it, physically. The Prime Echo doesn't disperse and doesn't consume them; it simply exhales, like something that's been holding its breath for a very long time.
>
> "You didn't need to be perfect," it says, in a hundred overlapping voices. "You only needed to still be standing."
>
> The loop doesn't fully break — but this Vane remembers everything into the next one. For the first time, the friction runs the other way: the next loop starts already knowing things it shouldn't.

| Option | Type | Effect | Leads to |
|---|---|---|---|
| Carry it forward | ◈ | `loopCount+1`; **unlike other endings, `loopMemory` is preserved *in full*, not just as flags — next loop's dialogue openly references this entire run** | `__RESTART__ → title` |

---

### `ending_severed` — "The Cycle Breaks" *(failure state)*
*(fires the instant `WND` becomes `DEAD` during any combat, wherever that happens — this ending can interrupt the story at Act I, III, or IIIB)*

> The story doesn't stop. The machine doesn't care that you stopped moving. It takes what it needs anyway.
>
> Days later, the next Tether down the Ash Road finds a body, Core still warm in dead hands, and keeps walking — because that's the job.
>
> This isn't a game-over screen. It's the loop's coldest kind of friction: you failed, and the world moved on without ceremony, and it will ask someone else to try again.

| Option | Type | Effect | Leads to |
|---|---|---|---|
| The road remembers your shape | ✕ | `loopCount+1`, `FLAG: died_last_time` (next loop's NPCs may reference finding a body) | `__RESTART__ → title` |

---

### `ending_true` — "The Witness" *(secret, true ending — does not loop)*
*(requires `RES≥80` + `knows_core_truth` + `child_at_peace`, and choosing Attune over Activate at the final choice)*

> You don't activate the Core. You do the thing nobody in every prior loop thought to try: you attune to the *entire machine*, the way you'd attune to a single grieving Echo — because that's all it ever was. A grieving Echo the size of a wound in the world.
>
> It takes a long, long time. Every fragment — Mireth's borrowed decades, the Cutter camp's dead, the calm child, the man on the bridge, all of them — is witnessed, individually, by name where a name is known.
>
> The Fracture doesn't close. It **heals**, slowly, at the pace of a scar rather than a switch.
>
> Vane doesn't loop again. There is no title screen after this one — only a final line:
>
> *"For the first time, tomorrow is not a rerun."*

| Option | Type | Effect | Leads to |
|---|---|---|---|
| *(no choice — the story simply ends)* | ◈ | game does **not** call `__RESTART__` | credits / close |

---

## APPENDIX — STAT & FLAG QUICK REFERENCE

| Flag/Stat | Set by | Used by |
|---|---|---|
| `cutter_spared` | Sparing the point-woman in `act1_ambush_3` (or the collapse-mercy variant) | Unlocks `act3b_camp`; required for `ending_ascendant` |
| `knows_core_truth` | Talking to Mireth in `act2_mireth_secret` | Required for `ending_true`; changes Act V opening text |
| `child_at_peace` | Giving the ration in `act4_rift`, OR successfully Attuning in `act4_child_echo` | Required for `ending_true`; softens `ending_empathy` text |
| `severed_the_child` | Choosing Sever in `act4_child_echo` | Darkens `ending_violence` text; blocks `ending_true` |
| `died_last_time` | Reaching `ending_severed` | Referenced by NPCs in the following loop |
| `WND = DEAD` | Any mismatched combat move while already `critical` | Immediately routes to `ending_severed`, skipping the rest of the run |
| `RES ≥ 80` | Multiple successful Attune/Endure beats across Acts III–IV | Required for `ending_true` |

---

*Every scene ID above is written to slot directly into the existing `SCENES{}` object in `game.js`. Combat "hit" variants can be implemented as literal separate scene nodes (as scripted here) or, if you'd rather keep the scene count smaller, collapsed into conditional text blocks inside a single scene keyed off `woundState` — happy to write it either way once you're ready to move this into code.*
