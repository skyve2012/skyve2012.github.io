/* Shared layout primitives + data for the site prototype */

const { useState, useEffect, useRef } = React;

/* ────────────────── Site nav ────────────────── */
function Nav({ current, onNav, theme, onToggleTheme }) {
  const items = [
    { id: "home", label: "home" },
    { id: "writing", label: "posts" },
    { id: "research", label: "research" },
    { id: "projects", label: "projects" },
    { id: "now", label: "now" },
  ];
  return (
    <nav className="nav">
      <div className="nav__inner">
        <a
          href="#home"
          className="nav__brand"
          onClick={(e) => {
            e.preventDefault();
            onNav("home");
          }}
        >
          <span className="dot"></span>
          hongyu&nbsp;shen
        </a>
        <ul className="nav__links">
          {items.map((it) => (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={current === it.id ? "is-active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  onNav(it.id);
                }}
              >
                {it.label}
              </a>
            </li>
          ))}
          <li>
            <button
              className="nav__theme"
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {theme === "dark" ? (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
                </svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

/* ────────────────── Footer ────────────────── */
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div>
        © {year} Hongyu Shen — built with care, served quietly.
      </div>
      <div className="footer__cmd">
        <a href="#now">colophon</a>
        <span>·</span>
        <a href="#writing">rss</a>
        <span>·</span>
        <span className="footer__kbd">⌘ K</span>
      </div>
    </footer>
  );
}

/* ────────────────── Striped placeholder ────────────────── */
function Placeholder({ label, hue = 35 }) {
  const id = `ph-${Math.random().toString(36).slice(2, 7)}`;
  return (
    <>
      <svg viewBox="0 0 200 120" preserveAspectRatio="none">
        <defs>
          <pattern id={id} patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke={`oklch(0.7 0.02 ${hue})`} strokeOpacity="0.35" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="200" height="120" fill={`url(#${id})`} />
      </svg>
      <span className="ph-label">{label}</span>
    </>
  );
}

/* ────────────────── Avatar — Dr. Shy bunny portrait ────────────────── */
function Avatar() {
  return (
    <div className="hero__avatar" aria-label="Dr. Shy — cartoon portrait">
      <img src="assets/dr-shy-avatar.png" alt="Dr. Shy cartoon portrait" style={{ width: "100%", height: "100%", display: "block", borderRadius: "50%" }} />
    </div>
  );
}

/* ────────────────── Reveal-on-scroll wrapper ────────────────── */
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setShown(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={"reveal" + (shown ? " is-in" : "")}>
      {children}
    </div>
  );
}

/* ────────────────── Data ────────────────── */
/* Note: NEWS is intentionally personal — not work. The day-job lives elsewhere. */
const NEWS = [
  { date: "Aug 2026", tag: "post", body: "Learning with Maps #3: Old Words, New Objects — a field report from OSDI 2026: an entire track of LLM systems papers, read through one lens. The OS vocabulary held; the objects changed. Full version at drshy.xyz/notes/osdi26." },
  { date: "Aug 2026", tag: "post", body: "Learning with Maps #2: Can You Search for an Org Chart? — the automated-design camp mapped through one axis: when the team's structure gets fixed. Full version at drshy.xyz/notes/searching-the-org-chart." },
  { date: "Jul 2026", tag: "post", body: "Learning with Maps #1: Nobody Hands Out the Roles — one question through two research eras: where does division of labor come from when nobody assigns it? Full version at drshy.xyz/notes/division-of-labor." },
  { date: "Jul 2026", tag: "post", body: "Learning with Code #2: Nemotron 3 — a teardown of NVIDIA's 550B hybrid: 48 Mamba-2 blocks, latent experts, 12 attention anchors, and a draft model riding in the checkpoint. Full version at drshy.xyz/notes/nemotron3." },
  { date: "Jul 2026", tag: "post", body: "Learning with Code #1: DiffusionGemma — a component-by-component teardown of the released model, traced to the shipped source. Full version at drshy.xyz/notes/diffusiongemma." },
  { date: "May 2026", tag: "release", body: "Shipped lightroom-py v0.6 — a Python library, CLI, and Claude agent skill for automating Adobe Lightroom Classic. First open driver with verified programmatic mask creation. pip install lightroom-py." },
  { date: "Apr 2026", tag: "site", body: "Quietly relaunched this site. New home for things outside the day job — reading notes, side projects, stray thoughts." },
  { date: "Dec 2025", tag: "paper", body: "G²M (Generalized Gaussian Mirror) accepted at NeurIPS 2025. Joint work with Zhizhen Zhao on boosting feature-selection power while keeping FDR control." },
  { date: "Dec 2024", tag: "paper", body: "AAAI 2025 paper on subpopulation-aware importance sampling for boosting test-time performance is up. Camera-ready in the proceedings." },
  { date: "Sep 2024", tag: "paper", body: "DeepDRK — a distribution-free deep knockoff for feature selection — accepted at NeurIPS 2024. Code on GitHub." },
  { date: "Mar 2024", tag: "life", body: "Moved to Seattle. Trading cornfields for evergreens." },
];

const POSTS = [
  {
    id: "osdi26",
    date: "Aug 18, 2026",
    read: "45 min",
    tag: "learning-with-maps",
    title: "Learning with Maps: Old Words, New Objects",
    blurb: "A field report from OSDI 2026 — the year the oldest systems conference gave an entire track to LLM systems. 48 papers walked through one lens: paging, time-sharing, checksums, and admission control all survived; their objects changed. Plus a glossary of every borrowed word.",
    href: "/notes/osdi26/",
  },
  {
    id: "searching-the-org-chart",
    date: "Aug 16, 2026",
    read: "50 min",
    tag: "learning-with-maps",
    title: "Learning with Maps: Can You Search for an Org Chart?",
    blurb: "The automated-design camp of LLM multi-agent systems, mapped through one axis — when the team's structure gets fixed. Two years, three orals, a clock that only moves later, and a search that ends by dissolving its own target.",
    href: "/notes/searching-the-org-chart/",
  },
  {
    id: "division-of-labor",
    date: "Jul 19, 2026",
    read: "50 min",
    tag: "learning-with-maps",
    title: "Learning with Maps: Nobody Hands Out the Roles",
    blurb: "Where does division of labor come from when no one assigns the roles? Five years of MARL and three years of LLM agents, walked as one question — latent roles, carved menus, trained orchestrators, and the four signals that would settle it.",
    href: "/notes/division-of-labor/",
  },
  {
    id: "nemotron3",
    date: "Jul 15, 2026",
    read: "45 min",
    tag: "learning-with-code",
    title: "Learning with Code: Nemotron 3",
    blurb: "NVIDIA's 550B-A55B flagship, opened component by component — 48 Mamba-2 blocks, latent experts, 12 attention anchors, and the draft model riding in the checkpoint.",
    href: "/notes/nemotron3/",
  },
  {
    id: "diffusiongemma",
    date: "Jul 03, 2026",
    read: "40 min",
    tag: "learning-with-code",
    title: "Learning with Code: DiffusionGemma",
    blurb: "A teardown of every component, straight from the source — RoPE, GQA, MoE, and the diffusion loop that writes 256 tokens at a time.",
    href: "/notes/diffusiongemma/",
  },
];

/* Real publications, pulled from papers.bib. */
const PUBS = [
  {
    year: "2025",
    title: "G²M: A Generalized Gaussian Mirror Method to Boost Feature Selection Power",
    authors: ["Shen, H.", "Zhao, Z."],
    venue: "NeurIPS 2025",
    links: [{ label: "pdf", href: "#" }],
  },
  {
    year: "2025",
    title: "Boosting Test Performance with Importance Sampling — a Subpopulation Perspective",
    authors: ["Shen, H.", "Zhao, Z."],
    venue: "AAAI 2025",
    links: [{ label: "pdf", href: "#" }],
  },
  {
    year: "2024",
    title: "DeepDRK: Deep Dependency Regularized Knockoff for Feature Selection",
    authors: ["Shen, H.", "Yan, Y.", "Zhao, Z."],
    venue: "NeurIPS 2024",
    links: [{ label: "pdf", href: "#" }, { label: "code", href: "https://github.com/skyve2012" }],
  },
  {
    year: "2023",
    title: "Automated Morphological Phenotyping Using Learned Shape Descriptors and Functional Maps",
    authors: ["Thomas, O.", "Shen, H.", "Raaum, R.", "Harcourt-Smith, W.", "Polk, J.", "Hasegawa-Johnson, M."],
    venue: "PLoS Computational Biology · 19(1)",
    links: [{ label: "pdf", href: "#" }],
  },
  {
    year: "2022",
    title: "Learning Personalized Representations using Graph Convolutional Network",
    authors: ["Shen, H.", "Oh, J.", "Zhao, S.", "Wang, G.", "Taghavi, T.", "Lee, S."],
    venue: "KDD Workshop on Mining and Learning with Graphs",
    links: [{ label: "pdf", href: "#" }],
  },
  {
    year: "2022",
    title: "Statistically-Informed Deep Learning for Gravitational Wave Parameter Estimation",
    authors: ["Shen, H.", "Huerta, E. A.", "O'Shea, E.", "Kumar, P.", "Zhao, Z."],
    venue: "Machine Learning: Science & Technology · 3(1)",
    links: [{ label: "pdf", href: "#" }],
  },
  {
    year: "2019",
    title: "Denoising Gravitational Waves with Enhanced Deep Recurrent Denoising Auto-Encoders",
    authors: ["Shen, H.", "George, D.", "Huerta, E. A.", "Zhao, Z."],
    venue: "ICASSP 2019",
    links: [{ label: "pdf", href: "#" }],
  },
];

/* Projects framed around public/research work — nothing about the day job. */
const PROJECTS = [
  {
    title: "lightroom-py",
    blurb: "Drive Adobe Lightroom Classic from Python — or a Claude agent. LR Classic has no AppleScript/COM/UXP, and its Lua plugin SDK is outbound-only, so this bolts on the missing automation surface: a tiny .lrplugin polls a local Python HTTP server, exposing 62 bridge handlers and 80 CLI verbs across catalog, develop, masks, and export. Includes verified end-to-end programmatic mask creation (a path documented elsewhere as impossible) and ships as a Claude agent skill + MCP server. pip install lightroom-py.",
    tags: ["python", "lightroom", "agents", "tooling"],
    placeholder: "62 handlers · 80 verbs",
    href: "https://github.com/drshy-org/lightroom-py",
  },
  {
    title: "AutoAgentClaw",
    blurb: "Automatic multi-agent system optimization. Point it at an agent repo; it discovers what's tunable, researches techniques, and runs experiments. Verified +29.3% on HotpotQA.",
    tags: ["python", "agents", "optimization"],
    placeholder: "12-stage pipeline",
    href: "https://github.com/skyve2012/autoAgentClaw",
  },
  {
    title: "DeepDRK",
    blurb: "Deep dependency-regularized knockoffs — a distribution-free way to do controlled feature selection. The code that backs the NeurIPS 2024 paper.",
    tags: ["python", "pytorch", "stats"],
    placeholder: "plot · FDR vs power",
    href: "https://github.com/skyve2012",
  },
  {
    title: "G²M",
    blurb: "Generalized Gaussian Mirror. A small but stubborn improvement on mirror statistics for feature selection. Companion to the NeurIPS 2025 paper.",
    tags: ["python", "inference"],
    placeholder: "diagram · mirror statistic",
    href: "https://github.com/skyve2012/G2M",
  },
  {
    title: "gw-denoise",
    blurb: "Recurrent denoising autoencoders for gravitational-wave signals — a leftover from grad school that still gets cited and forked.",
    tags: ["torch", "signal"],
    placeholder: "spectrogram",
    href: "https://github.com/skyve2012/DenoisingGW",
  },
];

/* Public research interests — what I'm thinking about, framed for findability */
const INTERESTS = [
  {
    title: "Agentic recommendation systems",
    body: "How recommender systems change when the unit is no longer a model but an agent that plans, calls tools, and reasons.",
  },
  {
    title: "Multi-agent optimization",
    body: "Automatically tuning agent systems — prompts, configs, communication, topology — without manual rewrites. (See AutoAgentClaw.)",
  },
  {
    title: "Low-latency, low-cost agentic AI",
    body: "Making agents fast and cheap enough to actually deploy. Quantization, routing, caching, distillation, and knowing when not to call the model.",
  },
  {
    title: "Agentic RL",
    body: "Reward design and trajectory shaping for agents that have to keep their mouth shut as often as they speak.",
  },
  {
    title: "AI infra & turning ideas into products",
    body: "Building the unglamorous scaffolding — eval harnesses, observability, deploy paths — that lets a sketch on a notebook become something a team can actually use. Research is the easy half.",
  },
];

const NOW = [
  { k: "Reading", v: "Stoner by John Williams. Slowly, on purpose." },
  { k: "Tinkering", v: "a small side project on better evaluation for retrieval — public when it's worth showing." },
  { k: "Listening", v: "Bach cello suites and a lot of Tigran Hamasyan." },
  { k: "Walking", v: "Discovery Park, mostly at dusk." },
  { k: "Last updated", v: "Apr 25, 2026 · Seattle, WA" },
];

Object.assign(window, {
  Nav, Footer, Avatar, Placeholder, Reveal,
  NEWS, POSTS, PUBS, PROJECTS, NOW, INTERESTS,
});
