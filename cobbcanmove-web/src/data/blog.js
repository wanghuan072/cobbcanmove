/**
 * 博客文章（全站统一字段）
 * 每条：id, title, description, tags, publishDate, imageUrl, imageAlt,
 * seo { title, description, keywords }, addressBar（必填：URL 路径片段 /blog/ 后的 slug，如 cobb-can-move-how-to-play）, detailsHtml（v-html）
 */
export default [
  {
    id: 1,
    title: 'Player guide: how COBB CAN MOVE actually plays (controls, coal, objectives)',
    description:
      'From someone who just wants a clean run: movement, light and coal, what you are fixing in the dark, and why Cobb feels different every floor.',
    tags: ['Guide', 'Gameplay', 'COBB CAN MOVE'],
    publishDate: '2026-05',
    imageUrl: '/images/game01-01.webp',
    imageAlt: 'Warm light in a long dark corridor—like peering down an in-game hallway',
    seo: {
      title: 'How to play COBB CAN MOVE — Controls & coal guide',
      description:
        'COBB CAN MOVE guide: WASD, coal, light, furnaces, breakers, noise vs Cobb, Story vs Endless. Tips for first clears—read here, then play the home embed.',
      keywords:
        'COBB CAN MOVE how to play, controls guide, coal and light, Story Mode, Endless Mode, Cobb hunter, survival horror tips, browser roguelite',
    },
    addressBar: 'cobb-can-move-how-to-play',
    detailsHtml: `
      <p>If you are new here, skip the pitch: <strong>COBB CAN MOVE</strong> is a top-down run through a dark dungeon. You move, you keep a little light alive, you tick objectives (think furnaces and breakers), and you try to leave before <strong>Cobb</strong> rewrites the rules under your feet.</p>
      <p>This is written like notes I would send a friend—not a press sheet.</p>

      <h3>Controls (PC, browser)</h3>
      <ul>
        <li><strong>Move:</strong> WASD or arrow keys.</li>
        <li><strong>Interact:</strong> E or Spacebar—doors, pickups, whatever the floor asks you to touch.</li>
        <li><strong>Click the game frame first</strong> so the browser sends keys to the player, not the page.</li>
        <li>Gamepad sometimes works depending on the build; if inputs feel dead, fall back to keyboard.</li>
      </ul>

      <h3>Your main “items”: light and coal</h3>
      <p>You are not hoarding a huge inventory. The run lives or dies on <strong>burning coal</strong> and the <strong>light</strong> it feeds. Think of coal as time in the dark: when pressure climbs, you are usually managing radius, tempo, and when you can afford to move—not scrolling a bag of fifty potions.</p>
      <ul>
        <li><strong>Light</strong> buys you information: corridors read cleaner, threats read earlier.</li>
        <li><strong>Running low</strong> is not a game-over screen by itself, but it is the moment Cobb’s side of the map gets chatty—treat it like a timer on your confidence.</li>
      </ul>

      <h3>What you are actually doing each floor</h3>
      <p>Objectives are grounded stuff—<strong>furnaces</strong>, <strong>breakers</strong>, that kind of industrial horror busywork. The loop is simple to say and hard to do: <strong>light up → finish the job → route out</strong>. The dungeon adds pressure with alarms, layout, and Cobb’s behavior so “simple” still feels mean.</p>

      <h3>Cobb is the wildcard (and why floors feel different)</h3>
      <p>Cobb is the hunter. What hurts is not only raw speed—it is <strong>rotation</strong>. One floor might lean on sound, another on sight, another on smell, reach, speed, even “doubled” pressure. Player takeaway: <strong>do not autopilot a route that worked ten minutes ago</strong>. Re-scout sightlines and sound cues like it is a new game each time the rules text shifts.</p>

      <h3>Noise, sightlines, and “I thought I was safe”</h3>
      <p>If you sprint everywhere and slam every interact, you are volunteering information. The readable way to play is slower corners, fewer surprise collisions with the dark, and remembering that <strong>noise matters</strong>. You are not stealth-only, but you are always negotiating how loud your run is.</p>

      <h3>Story vs Endless (pick your pain)</h3>
      <ul>
        <li><strong>Story Mode</strong> — good first home. Threat ramps in authored beats so you learn Cobb’s toolkit with fewer mystery deaths.</li>
        <li><strong>Endless Mode</strong> — for when you want the dungeon to keep shuffling the deck. Randomization hits harder; bring the habits above or expect short runs.</li>
      </ul>

      <p>Last tip: if the embed ever fails on a school or office network, try another connection or pop the player in a fresh tab. The hub is built so you can read this, then jump straight into the frame on the home page when you are ready.</p>
    `,
  },
  {
    id: 2,
    title: 'COBB CAN MOVE: Cobb’s rules floor by floor (Story)',
    description:
      'A floor-by-floor scout sheet for Story Mode: how hearing, smell, sight, reach, speed, and duplication change the contract—and the habit you should install before the next elevator ride.',
    tags: ['COBB CAN MOVE', 'Story Mode', 'Cobb', 'Levels', 'Guide'],
    publishDate: '2026-06',
    imageUrl: '/images/game01-02.webp',
    imageAlt: 'Foggy industrial interior with harsh light—like a mid-story floor tightening the screws',
    seo: {
      title: 'COBB CAN MOVE Story — Cobb rules by floor | Guide',
      description:
        'COBB CAN MOVE Story floors: hearing, smell, sight, reach, speed, duplication habits by floor. Player scout sheet—trust the in-game rule strip after patches.',
      keywords:
        'COBB CAN MOVE Story Mode, Cobb rules, floor guide, hearing smell sight, duplication, survival horror roguelite, level tips, patch notes mindset',
    },
    addressBar: 'cobb-story-floors-cobb-skills',
    detailsHtml: `
      <p><strong>COBB CAN MOVE</strong> is honest about its pitch: the dungeon is a classroom and <strong>Cobb</strong> is the teacher who keeps changing the syllabus. Story Mode strings together roughly <strong>seven authored floors</strong> so you learn his toolkit in escalating beats—then Endless shuffles the deck until you stop relying on muscle memory.</p>
      <p>This article is a <strong>scout sheet from a player seat</strong>, not a datamine. Public patch notes and community write-ups (around releases like <strong>v1.4</strong> and <strong>v1.5</strong>) mention specific tuning goals—like making sure early floors introduce a sensory rule cleanly, or tightening late-story pressure. Builds change: if a paragraph disagrees with your screen, trust the <strong>on-floor rule strip</strong> and treat this as “how to read a floor,” not gospel coordinates.</p>
      <p>Big-picture context players repeat: the project surfaced as a <strong>jam-born horror roguelite</strong> with <strong>seeded chunk generation</strong> and a hunter who cheats by <strong>swapping rules</strong> instead of only scaling HP—so the “difficulty spike” is often <em>you misunderstanding the contract</em>, not you mis-clicking once.</p>

      <h3>Cobb’s “skills” are really rule modules</h3>
      <p>When people say “skills,” they usually mean the <strong>behavior modules</strong> Story rotates in—often discussed in bundles like:</p>
      <ul>
        <li><strong>Hearing</strong> — noise becomes a trail you paint for Cobb.</li>
        <li><strong>Smell</strong> — your path history matters; greedy loops punish you.</li>
        <li><strong>Sight</strong> — line-of-sight and light discipline become primary defenses.</li>
        <li><strong>Speed / patrol pressure</strong> — fewer “free” resets; timing windows tighten.</li>
        <li><strong>Reach</strong> — doorways and corners you trusted become fake friends.</li>
        <li><strong>Duplication / twin pressure</strong> — one brain must track two clocks.</li>
      </ul>
      <p>Not every module shows up as a giant UI sticker—sometimes it arrives as a <strong>tuning change</strong> (sight range, late objective tempo) that only shows up in your deaths. That is still “a new skill check.”</p>

      <h3>The skill you are really upgrading</h3>
      <p>Your “character build” is not an RPG tree. It is <strong>information hygiene</strong>: where you walk, how fast, when you interact, where you stash light, and how often you re-draw the map when Cobb’s behavior rotates. Each floor below names the <strong>Cobb skill family</strong> the layout usually spotlights and the <strong>player habit</strong> that pays rent on that floor.</p>

      <h3>Story floor 1 — vocabulary: coal, light, objectives</h3>
      <p><strong>What Cobb is (probably) light on:</strong> full kit chaos. The run wants you to install the basics: <strong>coal feeds light</strong>, light buys readable corridors, objectives like <strong>furnaces and breakers</strong> force routing through risk instead of hugging a corner forever.</p>
      <p><strong>What Cobb is still testing:</strong> whether you will respect <strong>attention</strong>—the UI already tells you a lot, but new players love to look at Cobb instead of looking at <em>what the floor wants next</em>. Floor one is where you learn that the horror is operational, not cinematic.</p>
      <p><strong>Player skill to level:</strong> <em>slow hands, clean pathing.</em> Learn the sound of your own movement and the cadence of interacts. If you clear floor one by sprinting and panic-looting, floor two will invoice you for it.</p>

      <h3>Story floor 2 — your first “sensory contract”</h3>
      <p>Patch-facing notes around <strong>v1.4</strong> called out an intent players feel in practice: by floor two, Story should hand you a <strong>clear sensory rule</strong>—think <strong>hearing</strong>, <strong>smell</strong>, or <strong>sight</strong>—so you stop treating Cobb like a generic chase AI.</p>
      <ul>
        <li><strong>Hearing week:</strong> stop treating noise as flavor. Count steps. Avoid “just one more” interact while he is near.</li>
        <li><strong>Smell week:</strong> double backs and long loops become expensive; plan like you are leaving a scent ribbon.</li>
        <li><strong>Sight week:</strong> treat corridors like line-of-sight puzzles; break contact intentionally, not accidentally.</li>
      </ul>
      <p><strong>Player skill to level:</strong> <em>read the rule before you route.</em> The UI is trying to save you from your own autopilot.</p>

      <h3>Story floor 3 — “Cobb can move” stops being a joke</h3>
      <p>Once you respect a sense, the run often adds <strong>tempo</strong>: Cobb’s movement becomes less forgiving—more <strong>patrol-like</strong>, fewer free resets. Corners that were “probably fine” become commitment checks.</p>
      <p><strong>What Cobb is testing:</strong> whether you mistake “I survived” for “I am in control.” Patrol pressure is the game’s way of saying your route must include <strong>dead time</strong>—moments where you intentionally do nothing so your next interact is not a coin flip.</p>
      <p><strong>Player skill to level:</strong> <em>commit windows.</em> Decide “I touch this objective now or never,” instead of hovering in the doorway where sound and sight both go bad.</p>

      <h3>Story floor 4 — pressure without novelty</h3>
      <p>Here Story likes to stack <strong>two constraints that are each fair alone</strong>—say a sensory rule plus tighter patrol timing, or a shorter coal leash on a larger footprint. The lesson is <strong>resource triage</strong>: you cannot collect every shiny and still keep light stable.</p>
      <p><strong>What Cobb is testing:</strong> whether you can keep <strong>two failure modes in your head at once</strong>—for example “I am safe from sight” while forgetting you are loud, or “I am quiet” while forgetting you are painting smell loops. The deaths look random; they are usually <strong>orthogonal mistakes</strong>.</p>
      <p><strong>Player skill to level:</strong> <em>drop greed.</em> Pick one upgrade path for the floor: route safety, objective speed, or light bank—rarely all three.</p>

      <h3>Story floor 5 — reach and “I thought that was safe”</h3>
      <p>Community chatter and late-patch tuning talk about <strong>reach</strong> and <strong>sight adjustments</strong>—the kind of changes that do not show up as a new UI icon but absolutely show up as <strong>death through a doorway you used twice already</strong>.</p>
      <p><strong>What Cobb is testing:</strong> your respect for <strong>threshold spaces</strong>—doorframes, corners, the one-tile “maybe” zone where the game loves to collect tax. Reach turns “I got away” into “I got away <em>this</em> frame,” which is a different game emotionally.</p>
      <p><strong>Player skill to level:</strong> <em>door discipline.</em> Close loops behind you, re-check angles after every major interact, and stop assuming identical geometry reads identical threat.</p>

      <h3>Story floor 6 — duplication is a personality test</h3>
      <p>When duplication-style pressure appears, the game stops being “one pursuer, one brain.” Your minimap brain must fork: <strong>which threat is the clock</strong>, which is the punisher, and which corridor is the lie.</p>
      <p><strong>What Cobb is testing:</strong> whether you panic into <strong>noise spikes</strong>—because duplication is not only “more bodies,” it is “more chances for you to sprint yourself into a corner you cannot read.” The skill is not APM; it is <strong>cooldown management for your own adrenaline</strong>.</p>
      <p><strong>Player skill to level:</strong> <em>split attention without panic sprinting.</em> If you run, you answer both copies at once. If you walk, you buy time but not space—pick the poison deliberately.</p>

      <h3>Story floor 7 — finisher cadence and the last objective</h3>
      <p>Late-story floors are where patch notes mention the mean stuff honestly: <strong>environmental chokes</strong> (players reported level-seven visibility and layout tweaks across versions), and a finale that <strong>buffs pressure during the last stretch</strong> so you cannot sleepwalk across the finish line.</p>
      <p><strong>What Cobb is testing:</strong> whether you can execute when the map stops being “fair exploration” and becomes <strong>route enforcement</strong>—fewer wide outs, more “you must commit now.” Some updates even leaned into <strong>terrain reads</strong> (think extra choke props) so your old kiting line no longer clears.</p>
      <p><strong>Player skill to level:</strong> <em>boring wins.</em> You already know the verbs. The house wants you to execute without style points—finish clean, skip the extra loot tick, and treat stamina like a hidden HP bar.</p>

      <h3>How this helps Endless immediately</h3>
      <p>Story is the tutorial for a vocabulary: <strong>sense → movement → reach → duplication → clock</strong>. Endless randomizes the draws, but the reads are the same. If you can name which lesson a floor is teaching, you stop dying to “new” rules that are actually old homework shuffled sideways.</p>

      <h3>Closing note from someone who still dies to doors</h3>
      <p>If you take one habit into the next run, take this: <strong>re-announce the rule out loud when the floor loads</strong>—“this is a smell floor,” “this is a sight floor,” whatever. Your thumbs already know how to move. Cobb wins when your <strong>brain</strong> forgets which episode you are in.</p>
    `,
  },
]
