/**
 * 游戏数据（全站统一字段）
 * 每条：id, title, description, tags, publishDate, imageUrl, imageAlt,
 * iframeUrl, addressBar, itchIo?, seo, detailsHtml, screenshots, faq
 * — itchIo（可选）：仅主推游戏需要时配置 { storeUrl?, searchQuery? }；无 storeUrl 时用 searchQuery 或 title 作为 itch.io 搜索关键词
 * — reviewsEnabled（可选）：为 true 时游戏详情页显示评分与评论；仅主推游戏建议开启
 * — 富文本仅 detailsHtml（v-html）；截图 screenshots[]；FAQ 为 faq[{ question, answerHtml }]
 */
export default [
  {
    id: 1,
    title: 'COBB CAN MOVE',
    iframeUrl: 'https://gamaverse.com/c/f/g/cobb-can-move-1749146982/',
    description:
      'Survival horror from above: survive a dark pixel dungeon, keep coal-fed light alive, and escape Cobb as the rules change every level.',
    tags: ['Survival Horror', 'Roguelite', 'Pixel Art', 'Browser'],
    publishDate: '2025',
    imageUrl:
      '/images/about-img.webp',
    imageAlt: 'Dark corridor with cold light, suggesting the in-game dungeon',
    seo: {
      title: 'COBB CAN MOVE — Play Survival Horror Online',
      description:
        'Top-down survival horror: coal and light against the dark, shifting hunts from Cobb, Story and Endless modes—play in your browser.',
      keywords:
        'COBB CAN MOVE, Cobb Can Move, survival horror, roguelite, pixel art, browser game, Story Mode, Endless Mode',
    },
    addressBar: '/',
    reviewsEnabled: true,
    itchIo: {
      storeUrl: 'https://abho.itch.io/cobb-can-move',
      searchQuery: 'COBB CAN MOVE survival horror roguelite pixel art',
    },
    detailsHtml: `
      <p><strong>COBB CAN MOVE</strong> is a top-down survival horror game in a dark pixel dungeon. You push through tight corridors while <strong>Cobb</strong> hunts you—each level can change how he senses and closes distance.</p>
      <p>Carry <strong>burning coal</strong> to fight the dark and buy time. Complete objectives such as furnaces and breakers, then get out before the layout, alarms, or Cobb’s new tricks undo your plan.</p>
      <h3>Modes</h3>
      <ul>
        <li><strong>Story Mode</strong> — structured runs that ramp threat and teach Cobb’s toolkit.</li>
        <li><strong>Endless Mode</strong> — survival-focused loops with heavier randomization.</li>
      </ul>
      <h3>How to play</h3>
      <ol>
        <li>Click the game window, move with <strong>WASD</strong> or <strong>arrow keys</strong>, interact with <strong>E</strong> or <strong>Spacebar</strong> (gamepad supported when the build allows).</li>
        <li>Keep light up, finish the objective, and move with sound and sightlines in mind—noise matters.</li>
        <li>When behavior shifts—hearing, sight, smell, speed, reach, or doubles—assume your last safe route is wrong until you prove it again.</li>
      </ol>
    `,
    screenshots: [
      {
        imageUrl: '/images/game01-01.webp',
        imageAlt: 'Single warm light in a long dark corridor',
        caption: 'Tight corridors: light is scarce and every step counts.',
      },
      {
        imageUrl: '/images/game01-02.webp',
        imageAlt: 'Foggy industrial interior',
        caption: 'Pressure in the dark: objectives and hazards keep the route tense.',
      },
      {
        imageUrl: '/images/game01-03.webp',
        imageAlt: 'Small lights in darkness',
        caption: 'Shifting rules: what felt safe can flip as Cobb gains new senses.',
      },
    ],
    faq: [
      {
        question: 'Can I play in the browser?',
        answerHtml:
          '<p>Yes. Use the player on this page when the embed loads, or open the same session in a new tab. Some networks block iframes—try another network or browser if the frame stays blank.</p>',
      },
      {
        question: 'What is the difference between Story and Endless?',
        answerHtml:
          '<p><strong>Story Mode</strong> strings together authored escalation so you learn systems in a deliberate order. <strong>Endless Mode</strong> leans on randomized rule mixes and survival pressure for players who want the dungeon to keep rewriting itself.</p>',
      },
      {
        question: 'Why does Cobb feel different on the next floor?',
        answerHtml:
          '<p>Cobb’s kit can rotate—sound, sight, smell, speed, reach, duplication, and more. Treat each floor as a new contract: re-scout, re-light, and re-plan instead of autopiloting the last win.</p>',
      },
      {
        question: 'What are the controls?',
        answerHtml:
          '<p>Default PC layout is <strong>WASD</strong> or <strong>arrows</strong> to move and <strong>E</strong> or <strong>Spacebar</strong> to interact. If prompts differ on-screen, follow the build’s own callouts.</p>',
      },
    ],
  },
  {
    id: 2,
    title: 'The Freak Circus',
    iframeUrl: 'https://html-classic.itch.zone/html/16572088/index.html?v=1771780207',
    description:
      'Psychological horror visual novel under circus lights: you drift into a night that refuses to end—between Pierrot’s silences and Harlequin’s grin, every choice tightens the wire.',
    tags: ['Visual Novel', "Ren'Py", 'Horror', 'Romance', 'Mature (18+)', 'Browser'],
    publishDate: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=960&q=80',
    imageAlt: 'Colorful carnival string lights at night suggesting a circus setting',
    seo: {
      title: 'The Freak Circus — Play the Visual Novel in Your Browser',
      description:
        'The Freak Circus: a psychological horror visual novel set in a surreal big top—Ren’Py web build, branching choices, and a slow-burn story around Pierrot and Harlequin. Mature audiences.',
      keywords:
        'The Freak Circus, Garula, visual novel, RenPy, circus, psychological horror, romance, browser game, Pierrot, Harlequin',
    },
    addressBar: 'https://html-classic.itch.zone/html/16572088/index.html?v=1771780207',
    itchIo: {
      storeUrl: 'https://garula.itch.io/the-freak-circus',
      searchQuery: 'The Freak Circus Garula visual novel',
    },
    detailsHtml: `
      <p><strong>The Freak Circus</strong> is a <strong>psychological horror visual novel</strong> built in <strong>Ren’Py</strong> by indie creator <strong>Garula</strong>. Think less “jump-scare carnival ride” and more <strong>slow dread under tinsel</strong>: the lights are bright, the music never quite stops, and the people in costume remember your name a little too well.</p>

      <h3>Where the story lives</h3>
      <p>You are pulled into a <strong>circus that behaves like a mood</strong>—canvas, sawdust, gasoline-sweet air, and corridors that seem to rearrange when you blink. The show is always “about to start.” The audience might be empty, or might be watching from angles you cannot see. The longer you stay, the harder it becomes to tell whether you wandered in by accident… or were invited.</p>

      <h3>What you are really playing</h3>
      <p>This is <strong>character-first horror</strong>: long beats of conversation, uneasy intimacy, jealousy that arrives dressed as concern, and silence that carries weight. Expect <strong>branching choices</strong> that shift tone more than they shout—who you comfort, who you challenge, what you pretend not to notice. Routes can read like romance until the story reminds you why romance and fixation share a border.</p>

      <h3>Pierrot &amp; Harlequin</h3>
      <p>Two presences anchor the circus myth: <strong>Pierrot</strong>—pale, still, too careful with words—and <strong>Harlequin</strong>—quick, theatrical, smiling at the wrong moments. One watches like a verdict; the other performs like a dare. Between them, the narrative tightens like a rope walk: you are asked where you stand, then asked again when the lights change color.</p>

      <h3>Atmosphere &amp; themes</h3>
      <ul>
        <li><strong>Psychological pressure</strong> over cheap shocks—dread from implication, proximity, and power imbalance.</li>
        <li><strong>Performance as identity</strong>—masks, routines, encore habits; who is “on stage” even when the tent is empty.</li>
        <li><strong>Mature romance under stress</strong>—attraction tangled with control, possession, and fear of being replaced.</li>
        <li><strong>Liminal night</strong>—time loops that feel personal: the same hour returns with a different smile.</li>
      </ul>

      <h3>Who it is for</h3>
      <p>The tone sits with <strong>adult readers</strong> who like visual novels that commit to unease. If you enjoy slow burns, morally complicated relationships, and stories where the horror is “what someone might do while insisting they love you,” you are in the right tent. If you need a gentle comfort read, this is probably not it.</p>

      <h3>How it plays</h3>
      <ul>
        <li><strong>Click to advance</strong> dialogue; use mouse, touch, or keyboard prompts as the Ren’Py UI suggests.</li>
        <li><strong>Choose carefully</strong> when menus appear—small shifts in tone can redirect scenes and endings.</li>
        <li><strong>Save often</strong> through the in-game menu; web builds may expose import/export for saves depending on the port—use whatever tools the title bar offers.</li>
      </ul>

      <h3>Content notice</h3>
      <p>The project is commonly tagged <strong>18+</strong> for mature themes: psychological tension, horror, and romance tropes that can include obsessive dynamics. Treat the opening warnings seriously; if a scene asks you to step away, that is part of the design, not a glitch.</p>
    `,
    screenshots: [
      {
        imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=960&q=80',
        imageAlt: 'Warm carnival lights against night sky',
        caption: 'Big-top glow: beauty and unease sharing the same wire.',
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=960&q=80',
        imageAlt: 'Theater stage with red curtains and spotlights',
        caption: 'Curtain call energy—placeholder art until official stills ship.',
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=960&q=80',
        imageAlt: 'Concert crowd silhouettes and stage lights',
        caption: 'A crowd you can hear but cannot quite see—mood reference for the hub gallery.',
      },
    ],
    faq: [
      {
        question: 'Why does the page say “Powered by Ren’Py”?',
        answerHtml:
          '<p>The web build is exported with <strong>Ren’Py’s HTML target</strong>. That banner is normal—it only identifies the engine running the novel in your browser.</p>',
      },
      {
        question: 'Is this game appropriate for all ages?',
        answerHtml:
          '<p>No. The experience is aimed at <strong>mature audiences</strong> and may include psychological horror, intense relationships, and obsessive or controlling dynamics framed as romance. Read any in-game content notices before continuing.</p>',
      },
    ],
  },
  {
    id: 3,
    title: 'Granny Horror',
    iframeUrl: 'https://1games.io/game/granny-horror/',
    description:
      'First-person house escape in the browser: five days on the clock, creaky floorboards, and footsteps that answer your mistakes—hide, loot, solve, and slip out before she corners you again.',
    tags: ['Horror', 'Stealth', 'Escape', 'Survival', 'First-person', 'Browser'],
    publishDate: 'Web',
    imageUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=960&q=80',
    imageAlt: 'Dark narrow corridor with a single cold light, suggesting a haunted house interior',
    seo: {
      title: 'Granny Horror — Play the Escape House Survival Game Online',
      description:
        'Play Granny Horror in your browser: stealth through a locked house, avoid noise that gives you away, search for tools and keys, and escape within five days—quick sessions, high tension.',
      keywords:
        'Granny Horror, escape house, survival horror, stealth, browser game, first person, hide and seek, puzzle items, 1games',
    },
    addressBar: 'https://1games.io/game/granny-horror/',
    itchIo: {
      searchQuery: 'Granny survival horror escape house game',
    },
    detailsHtml: `
      <p>If you already know the “wake up trapped—<strong>don’t get caught</strong>—<strong>find the way out</strong>” loop, <strong>Granny Horror</strong> will feel familiar in the best way: it is built around <strong>tension in short bursts</strong>, not a cinematic campaign. You are inside a hostile house where mistakes echo. The fun is learning the rules of the floorboards, the timing of patrols, and which objects are worth the risk to carry.</p>

      <h3>What you are actually doing (player POV)</h3>
      <p>Most runs boil down to a simple rhythm: <strong>listen</strong>, <strong>move</strong>, <strong>loot</strong>, <strong>hide</strong>, repeat. You are not “winning fights”—you are buying seconds. The house is a puzzle box made of rooms, and the enemy is a moving alarm clock that punishes sloppy routing. Early attempts feel unfair; later attempts feel like you finally learned the house’s grammar.</p>

      <h3>The five-day pressure (why it hooks)</h3>
      <p>The “<strong>five days</strong>” framing is the spine of the fantasy: each day is a contract that says you get another sunrise if you survive the night. That creates a clean mental scoreboard—<em>today I only need one more piece</em>—and it pushes you to take calculated risks instead of camping in a closet forever. If you hate timers, you will feel pushed; if you like stakes, it is the whole point.</p>

      <h3>Sound is your real inventory</h3>
      <p>Treat noise like a resource you spend. Dropping items, sprinting when you should walk, opening the wrong door at the wrong time—those are not “mistakes,” they are <strong>signals</strong>. Good players slow down and let silence do work. Panicked players feed the horror loop on purpose. Headphones help not because of jump scares alone, but because you are trying to read distance from audio cues.</p>

      <h3>Exploration that respects fear</h3>
      <p>You will backtrack. You will forget which drawer you checked. You will find a tool and realize you do not know the exit plan yet. That is normal. The house wants you slightly lost so shortcuts feel earned. Keep a mental map: <strong>where is a hide spot two steps from the objective</strong>, not “where is the objective” only.</p>

      <h3>Controls (typical web build)</h3>
      <p>Browser ports vary slightly, but most follow a PC-friendly layout: <strong>WASD</strong> or <strong>arrow keys</strong> to move, <strong>E</strong> (or a prompted key) to interact, <strong>crouch</strong> or <strong>hide</strong> bindings when the UI tells you. If something feels “dead,” click inside the game frame first—browsers only send keys to the focused player.</p>

      <h3>Who will enjoy it</h3>
      <ul>
        <li>Players who like <strong>stealth loops</strong> more than combat loops.</li>
        <li>Anyone who wants a <strong>15–40 minute</strong> horror session without installing a client.</li>
        <li>People who enjoy “one more try” after a dumb death—because the death was <em>your</em> noise, not RNG theater.</li>
      </ul>

      <h3>Honest expectations</h3>
      <p>This hub entry points at a <strong>third-party browser host</strong> build. It follows the popular <strong>escape-the-house</strong> survival horror formula players associate with the Granny-style genre—tight corridors, hiding spots, item gating, and a relentless pursuer—but exact item lists, rooms, and difficulty can differ from any single-platform release you might have seen on video. Judge it on its own feel: responsiveness, fairness of cues, and whether the scare is coming from tension or from janky controls.</p>

      <h3>Quick tips from someone who lost a lot first</h3>
      <ol>
        <li><strong>Learn one route</strong> before you learn every item spawn.</li>
        <li><strong>Close doors behind you</strong> when the game allows it—information control matters.</li>
        <li>When you are “almost out,” that is when you get greedy—<strong>play boring</strong> and finish clean.</li>
      </ol>
    `,
    screenshots: [
      {
        imageUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=960&q=80',
        imageAlt: 'Dark corridor with cold light',
        caption: 'Corridor tension: one wrong step turns a quiet plan into a chase.',
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=960&q=80',
        imageAlt: 'Dim interior with warm lamp light',
        caption: 'Small pools of light—where you read the room, and where you misread it.',
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=960&q=80',
        imageAlt: 'Old wooden door slightly open in shadow',
        caption: 'Doors as decisions: open for progress, or open for sound.',
      },
    ],
    faq: [
      {
        question: 'Why does the game feel harder on day one than day three sometimes?',
        answerHtml:
          '<p>Because your first runs are “mapping runs.” Once you stop exploring randomly and start chaining <strong>objective → hideout → route</strong>, difficulty drops in a way the UI never spells out. That is skill, not a bug.</p>',
      },
      {
        question: 'My keyboard does nothing—what should I check?',
        answerHtml:
          '<p>Click inside the player frame so the browser routes keys to the game. If you are on a laptop trackpad, disable palm rejection quirks temporarily, and try fullscreen if the host offers it—some layouts steal focus near the edges.</p>',
      },
      {
        question: 'Is this the same build as the mobile “Granny” everyone talks about?',
        answerHtml:
          '<p>Think of this page as a <strong>browser survival horror escape</strong> in that tradition: similar fantasy and loop, but not a guarantee of identical content to any specific app store version. Compare audio cues, item behavior, and level flow on its own merits.</p>',
      },
    ],
  },
]
