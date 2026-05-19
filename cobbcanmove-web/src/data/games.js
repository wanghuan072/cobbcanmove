/**
 * 游戏数据（除首页主推外的列表/详情）
 * 每条：id, title, description, tags, publishDate, imageUrl, imageAlt,
 * iframeUrl, addressBar（用于 URL 路径段，如 the-freak-circus）, seo, detailsHtml, screenshots, faq
 * — 富文本仅 detailsHtml（v-html）；截图 screenshots[]；FAQ 为 faq[{ question, answerHtml }]
 */
export default [
  {
    id: 2,
    title: 'The Freak Circus',
    iframeUrl: 'https://html-classic.itch.zone/html/16572088/index.html?v=1771780207',
    description:
      'Psychological horror visual novel under circus lights: you drift into a night that refuses to end—between Pierrot’s silences and Harlequin’s grin, every choice tightens the wire.',
    tags: ['Visual Novel', "Ren'Py", 'Horror', 'Romance', 'Mature (18+)', 'Browser'],
    publishDate: '2025',
    imageUrl: '/images/game02-01.webp',
    imageAlt: 'Colorful carnival string lights at night suggesting a circus setting',
    seo: {
      title: 'The Freak Circus — Play horror visual novel online',
      description:
        'The Freak Circus browser VN: Ren’Py psychological horror, circus lights, branching choices, Pierrot and Harlequin. Mature 18+; hub page with embed and FAQ.',
      keywords:
        'The Freak Circus, Garula, visual novel browser, RenPy web, psychological horror, circus horror, Pierrot, Harlequin, mature 18+, indie VN',
    },
    addressBar: 'the-freak-circus',
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
        imageUrl: '/images/game02-01.webp',
        imageAlt: 'Warm carnival lights against night sky',
        caption: 'Big-top glow: beauty and unease sharing the same wire.',
      },
      {
        imageUrl: '/images/game02-02.webp',
        imageAlt: 'Theater stage with red curtains and spotlights',
        caption: 'Curtain call energy—placeholder art until official stills ship.',
      },
      {
        imageUrl: '/images/game02-03.webp',
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
    imageUrl: '/images/game03.webp',
    imageAlt: 'Dark narrow corridor with a single cold light, suggesting a haunted house interior',
    seo: {
      title: 'Granny Horror — Escape house survival in browser',
      description:
        'Granny Horror in-browser: stealth house escape, five-day timer, keys and noise cues. Short survival horror via linked build—screenshots and FAQ on hub page.',
      keywords:
        'Granny Horror, escape house game, survival horror browser, stealth horror, five day escape, browser first person, hide and seek horror, 1games',
    },
    addressBar: 'granny-horror',
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
        imageUrl: '/images/game03-01.webp',
        imageAlt: 'Dark corridor with cold light',
        caption: 'Corridor tension: one wrong step turns a quiet plan into a chase.',
      },
      {
        imageUrl: '/images/game03-02.webp',
        imageAlt: 'Dim interior with warm lamp light',
        caption: 'Small pools of light—where you read the room, and where you misread it.',
      },
      {
        imageUrl: '/images/game03-03.webp',
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
