/* Shared layout primitives + data for the site prototype */

const { useState, useEffect, useRef } = React;

/* ────────────────── Site nav ────────────────── */
function Nav({ current, onNav, theme, onToggleTheme }) {
  const items = [
    { id: "home", label: "home" },
    { id: "writing", label: "writing" },
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
    <div className="hero__avatar" aria-label="Dr. Shy — cartoon bunny portrait">
      <img src="assets/dr-shy.svg" alt="Dr. Shy bunny portrait" style={{ width: "100%", height: "100%", display: "block" }} />
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
  { date: "Apr 2026", tag: "site", body: "Quietly relaunched this site. New home for things outside the day job — reading notes, side projects, stray thoughts." },
  { date: "Dec 2025", tag: "paper", body: "G²M (Generalized Gaussian Mirror) accepted at NeurIPS 2025. Joint work with Zhizhen Zhao on boosting feature-selection power while keeping FDR control." },
  { date: "Dec 2024", tag: "paper", body: "AAAI 2025 paper on subpopulation-aware importance sampling for boosting test-time performance is up. Camera-ready in the proceedings." },
  { date: "Sep 2024", tag: "paper", body: "DeepDRK — a distribution-free deep knockoff for feature selection — accepted at NeurIPS 2024. Code on GitHub." },
  { date: "Mar 2024", tag: "life", body: "Moved to Seattle. Trading cornfields for evergreens." },
];

const POSTS = [
  {
    id: "why-this-site",
    date: "Apr 18, 2026",
    read: "3 min",
    tag: "note",
    title: "Why I rebuilt this site",
    blurb: "The old al-folio version did its job, but I wanted somewhere quieter to put the things I think about that aren't research papers.",
  },
  {
    id: "knockoffs-intuition",
    date: "Feb 11, 2026",
    read: "10 min",
    tag: "essay",
    title: "A short, honest intuition for knockoff filters",
    blurb: "Most introductions to knockoffs lean too hard on the math or too hard on the magic. Here's what I wish someone had told me on day one.",
  },
  {
    id: "gw-leftovers",
    date: "Nov 03, 2025",
    read: "7 min",
    tag: "long-read",
    title: "Leftovers from a thesis on gravitational waves",
    blurb: "Things I learned working on signal denoising and parameter estimation that I never got to put in a paper.",
  },
  {
    id: "reading-2025",
    date: "Sep 22, 2025",
    read: "5 min",
    tag: "reading",
    title: "What I read in 2025 (so far)",
    blurb: "A short list — books, papers, and one cookbook. Mostly outside ML on purpose.",
  },
  {
    id: "seattle-notes",
    date: "Jun 05, 2025",
    read: "4 min",
    tag: "life",
    title: "Notes from a first year in Seattle",
    blurb: "On rain, light, public transit, and the strange experience of moving from the Midwest to a city that disappears in fog.",
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
    href: "https://github.com/skyve2012",
  },
  {
    title: "gw-denoise",
    blurb: "Recurrent denoising autoencoders for gravitational-wave signals — a leftover from grad school that still gets cited and forked.",
    tags: ["torch", "signal"],
    placeholder: "spectrogram",
    href: "https://github.com/skyve2012",
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
