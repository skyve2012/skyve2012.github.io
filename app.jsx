/* Main app — single-file SPA-style prototype with hash routing */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentHue": 35,
  "serifHeadlines": true,
  "showAvatar": true,
  "feedDensity": "comfortable"
}/*EDITMODE-END*/;

function useHashRoute() {
  const [route, setRoute] = React.useState(() => {
    const h = window.location.hash.replace(/^#/, "") || "home";
    return h;
  });
  React.useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace(/^#/, "") || "home";
      setRoute(h);
      window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const navigate = (id) => {
    window.location.hash = id;
  };
  return [route, navigate];
}

/* ─────────────────── HOME ─────────────────── */
function HomePage({ tweak, navigate }) {
  return (
    <>
      <section className="hero" data-screen-label="01 Home · Hero">
        <Reveal>
          <p className="eyebrow">Hongyu Shen · Seattle</p>
          <h1>A quiet corner of the internet for the things I care about outside of work.</h1>
          <p className="hero__lede">
            By day I'm an applied scientist at Amazon — but you won't find that work here. <em>This site is for
            everything else:</em> papers from my PhD, side projects, reading notes, and the occasional
            essay when an idea earns one.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="hero__row">
            {tweak.showAvatar && <Avatar />}
            <div className="hero__bio">
              <p className="hero__name">
                Hongyu Shen
                <span className="hero__alias" aria-label="also known as Dr. Shy">
                  <span className="hero__alias-sep">·</span> Dr. Shy
                </span>
              </p>
              <p className="hero__role">applied&nbsp;scientist · seattle, wa</p>
              <p style={{ margin: "0 0 12px", color: "var(--fg-muted)", fontSize: 14.5, lineHeight: 1.65 }}>
                These days I work on <em style={{ color: "var(--fg)", fontStyle: "normal", fontWeight: 500 }}>agentic
                AI</em> — building <em style={{ color: "var(--fg)", fontStyle: "normal", fontWeight: 500 }}>multi-agent
                systems</em> that plan and call tools, <em style={{ color: "var(--fg)", fontStyle: "normal", fontWeight: 500 }}>automated
                agent optimization</em> (so prompts, configs, and topology tune themselves), and
                the <em style={{ color: "var(--fg)", fontStyle: "normal", fontWeight: 500 }}>infra
                that makes agents cheap enough to actually deploy</em> — quantization, routing,
                caching, distillation. I also care about turning research into shipped products.
              </p>
              <p style={{ margin: "0 0 14px", color: "var(--fg-muted)", fontSize: 14.5, lineHeight: 1.65 }}>
                Past chapters: <em style={{ color: "var(--fg)", fontStyle: "normal", fontWeight: 500 }}>interpretable
                ML for healthcare</em>, time-series forecasting for scientific signals, controlled
                feature selection (FDR), and graph representation learning for personalization.
                Ph.D. in ECE (Data Science &amp; AI) from UIUC; M.S. in Statistics from the same.
                Opinions here are entirely my own.
              </p>
              <div className="hero__links">
                <a href="https://github.com/skyve2012" target="_blank" rel="noopener">github</a>
                <span>·</span>
                <a href="https://scholar.google.com/citations?user=CVCKr-EAAAAJ" target="_blank" rel="noopener">scholar</a>
                <span>·</span>
                <a href="https://orcid.org/0000-0001-7620-805X" target="_blank" rel="noopener">orcid</a>
                <span>·</span>
                <a href="/assets/pdf/CV_HS_2026.pdf" target="_blank" rel="noopener">cv ↗</a>
                <span>·</span>
                <a href="mailto:hello@hongyushen.com">email</a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="block" data-screen-label="01 Home · Interests">
        <div className="block__head">
          <div>
            <p className="eyebrow">What I work on</p>
            <h2>Interests</h2>
          </div>
          <span className="meta">find me · scholar · github</span>
        </div>
        <Reveal>
          <ul className="interests">
            {INTERESTS.map((it, i) => (
              <li className="interests__item" key={i}>
                <span className="interests__num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="interests__title">{it.title}</h3>
                  <p className="interests__body">{it.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="interests__foot">
            If any of this overlaps with what you're building, <a href="mailto:hello@hongyushen.com">say hi</a>.
          </p>
        </Reveal>
      </section>

      <section className="block" data-screen-label="01 Home · News">
        <div className="block__head">
          <div>
            <p className="eyebrow">Recent</p>
            <h2>News & notes</h2>
          </div>
          <a href="#now" onClick={(e) => { e.preventDefault(); navigate("now"); }}>all updates</a>
        </div>
        <Reveal>
          <ul className="feed">
            {NEWS.map((n, i) => (
              <li className="feed__item" key={i}>
                <span className="feed__date">{n.date}</span>
                <span className="feed__body">
                  <span className="feed__tag">{n.tag}</span>
                  {n.body}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="block" data-screen-label="01 Home · Featured writing">
        <div className="block__head">
          <div>
            <p className="eyebrow">Latest writing</p>
            <h2>From the notebook</h2>
          </div>
          <a href="#writing" onClick={(e) => { e.preventDefault(); navigate("writing"); }}>all posts</a>
        </div>
        <Reveal>
          <a className="lede-post" href={`#post/${POSTS[0].id}`} onClick={(e) => { e.preventDefault(); navigate(`post/${POSTS[0].id}`); }}>
            <p className="meta">{POSTS[0].date} · {POSTS[0].read} · {POSTS[0].tag}</p>
            <h3>{POSTS[0].title}</h3>
            <p>{POSTS[0].blurb}</p>
          </a>
          <ul className="posts" style={{ marginTop: 0 }}>
            {POSTS.slice(1, 3).map((p) => (
              <li key={p.id}>
                <a className="posts__item" href={`#post/${p.id}`} onClick={(e) => { e.preventDefault(); navigate(`post/${p.id}`); }}>
                  <span className="meta">{p.date} · {p.read} · {p.tag}</span>
                  <h3>{p.title}</h3>
                  <p>{p.blurb}</p>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="block" data-screen-label="01 Home · Now">
        <div className="block__head">
          <div>
            <p className="eyebrow">Right now</p>
            <h2>What I'm into</h2>
          </div>
          <a href="#now" onClick={(e) => { e.preventDefault(); navigate("now"); }}>full /now</a>
        </div>
        <Reveal>
          <div className="now">
            {NOW.slice(0, 4).map((n, i) => (
              <span key={i}>
                <span className="now__dot">·</span> <b>{n.k}:</b> {n.v}
              </span>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}

/* ─────────────────── WRITING ─────────────────── */
function WritingPage({ navigate }) {
  return (
    <section className="block" style={{ paddingTop: 96, borderBottom: "none" }} data-screen-label="02 Writing">
      <Reveal>
        <p className="eyebrow">Writing</p>
        <h1 style={{ fontSize: "clamp(34px,5vw,46px)", marginBottom: 14 }}>Essays, notes, and things in progress.</h1>
        <p style={{ color: "var(--fg-muted)", fontSize: 17, lineHeight: 1.6, maxWidth: "44ch", marginBottom: 36 }}>
          Long pieces when an idea earns it; short notes when it doesn't. Mostly written
          on weekend mornings. Subjects here are personal — research, side projects, reading,
          and the occasional non-technical detour. Nothing here represents my employer.
        </p>
      </Reveal>
      <Reveal delay={80}>
        <ul className="posts">
          {POSTS.map((p) => (
            <li key={p.id}>
              <a className="posts__item" href={`#post/${p.id}`} onClick={(e) => { e.preventDefault(); navigate(`post/${p.id}`); }}>
                <span className="meta">{p.date} · {p.read} · {p.tag}</span>
                <h3>{p.title}</h3>
                <p>{p.blurb}</p>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

/* ─────────────────── POST ─────────────────── */
function PostPage({ id, navigate }) {
  const post = POSTS.find((p) => p.id === id) || POSTS[0];
  return (
    <article className="block" style={{ paddingTop: 80, borderBottom: "none" }} data-screen-label={`Post · ${post.title}`}>
      <Reveal>
        <a
          href="#writing"
          onClick={(e) => { e.preventDefault(); navigate("writing"); }}
          style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-muted)", border: "none" }}
        >
          ← all writing
        </a>
        <p className="eyebrow" style={{ marginTop: 28 }}>{post.tag} · {post.read}</p>
        <h1 style={{ fontSize: "clamp(34px,5vw,48px)", marginBottom: 14 }}>{post.title}</h1>
        <p className="meta" style={{ marginBottom: 40 }}>{post.date} · Seattle, WA</p>
      </Reveal>

      <Reveal delay={60}>
        <div className="post-body">
          <p style={{ fontSize: 22, lineHeight: 1.5, color: "var(--fg-muted)", fontStyle: "italic" }}>
            {post.blurb}
          </p>
          <p>
            This is a placeholder for the actual essay — the template is doing the
            quiet work of giving prose a stage to stand on: generous measure, serif body,
            monospace metadata, no rails or ads or related-content slop in the margins.
          </p>
          <p>
            When the post is real, it goes here. Until then, the layout is the point: this is
            what writing on the site will feel like to read.
          </p>
          <h2>A note on what's here, and what isn't</h2>
          <p>
            Anything I write on this site is personal. It's not affiliated with my employer, doesn't
            represent their views, and won't be about ongoing work. If a topic touches my day job,
            I'll either skip it or wait long enough that it's no longer current.
          </p>
          <blockquote>
            The internet doesn't need another company blog. It could maybe use a few more honest
            personal ones.
          </blockquote>
          <h3>Where to find more</h3>
          <ul>
            <li>Papers and citations live on <a href="https://scholar.google.com/citations?user=CVCKr-EAAAAJ" target="_blank" rel="noopener">Google Scholar</a>.</li>
            <li>Code is on <a href="https://github.com/skyve2012" target="_blank" rel="noopener">GitHub</a>.</li>
            <li>Short updates land on the <a href="#now" onClick={(e)=>{e.preventDefault();navigate("now");}}>/now</a> page.</li>
          </ul>
          <p>
            If something here resonates — or doesn't —
            <a href="mailto:hello@hongyushen.com"> say hi</a>.
          </p>
        </div>
      </Reveal>
    </article>
  );
}

/* ─────────────────── RESEARCH ─────────────────── */
function ResearchPage() {
  return (
    <section className="block" style={{ paddingTop: 96, borderBottom: "none" }} data-screen-label="03 Research">
      <Reveal>
        <p className="eyebrow">Research</p>
        <h1 style={{ fontSize: "clamp(34px,5vw,46px)", marginBottom: 14 }}>Selected publications.</h1>
        <p style={{ color: "var(--fg-muted)", fontSize: 17, lineHeight: 1.6, maxWidth: "44ch", marginBottom: 36 }}>
          Recommendation systems, agentic AI, statistical inference, and a previous life in
          gravitational-wave signal processing. Full list on <a href="#">Google Scholar</a>.
        </p>
      </Reveal>
      <Reveal delay={80}>
        <ul className="pubs">
          {PUBS.map((p, i) => (
            <li className="pub" key={i}>
              <span className="pub__year">{p.year}</span>
              <div>
                <h3 className="pub__title">{p.title}</h3>
                <p className="pub__authors">
                  {p.authors.map((a, j) => (
                    <React.Fragment key={j}>
                      {j > 0 && ", "}
                      {a.startsWith("Shen") ? <b>{a}</b> : a}
                    </React.Fragment>
                  ))}
                </p>
                <span className="pub__venue">{p.venue}</span>
                <span className="pub__links">
                  {p.links.map((l, j) => (
                    <a key={j} href={l.href}>{l.label}</a>
                  ))}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

/* ─────────────────── PROJECTS ─────────────────── */
function ProjectsPage() {
  return (
    <section className="block" style={{ paddingTop: 96, borderBottom: "none" }} data-screen-label="04 Projects">
      <Reveal>
        <p className="eyebrow">Projects</p>
        <h1 style={{ fontSize: "clamp(34px,5vw,46px)", marginBottom: 14 }}>Things I've built or am building.</h1>
        <p style={{ color: "var(--fg-muted)", fontSize: 17, lineHeight: 1.6, maxWidth: "44ch", marginBottom: 36 }}>
          Small, opinionated, mostly open-source. Some are research artifacts; some are tools I needed
          and couldn't find.
        </p>
      </Reveal>
      <Reveal delay={80}>
        <div className="proj-grid">
          {PROJECTS.map((pr, i) => (
            <a
              className="proj"
              key={i}
              href={pr.href || "#"}
              target={pr.href ? "_blank" : undefined}
              rel={pr.href ? "noopener" : undefined}
            >
              <div className="proj__thumb">
                <Placeholder label={pr.placeholder} />
              </div>
              <h3>{pr.title}</h3>
              <p>{pr.blurb}</p>
              <div className="proj__tags">
                {pr.tags.map((t) => <span key={t} className="proj__tag">{t}</span>)}
              </div>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ─────────────────── NOW ─────────────────── */
function NowPage() {
  return (
    <section className="block" style={{ paddingTop: 96, borderBottom: "none" }} data-screen-label="05 Now">
      <Reveal>
        <p className="eyebrow">Now · Apr 2026</p>
        <h1 style={{ fontSize: "clamp(34px,5vw,46px)", marginBottom: 14 }}>What I'm thinking about, this month.</h1>
        <p style={{ color: "var(--fg-muted)", fontSize: 17, lineHeight: 1.6, maxWidth: "46ch", marginBottom: 36 }}>
          A <a href="https://nownownow.com/about" target="_blank" rel="noopener">/now</a>-style page —
          updated when something changes, not on a schedule. The newsletter equivalent of leaving the door open.
        </p>
      </Reveal>
      <Reveal delay={80}>
        <ul className="feed">
          {NOW.map((n, i) => (
            <li className="feed__item" key={i}>
              <span className="feed__date">{n.k}</span>
              <span className="feed__body">{n.v}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={140}>
        <h2 style={{ marginTop: 56, marginBottom: 16 }}>All updates</h2>
        <ul className="feed">
          {NEWS.map((n, i) => (
            <li className="feed__item" key={i}>
              <span className="feed__date">{n.date}</span>
              <span className="feed__body">
                <span className="feed__tag">{n.tag}</span>
                {n.body}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

/* ─────────────────── ROOT ─────────────────── */
function App() {
  const [route, navigate] = useHashRoute();
  const [theme, setTheme] = React.useState(() => {
    return localStorage.getItem("hs-theme") || "auto";
  });
  const tweak = window.useTweaks ? window.useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}];
  const [tweakValues, setTweak] = tweak;

  React.useEffect(() => {
    if (theme === "auto") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
    localStorage.setItem("hs-theme", theme);
  }, [theme]);

  React.useEffect(() => {
    document.documentElement.style.setProperty(
      "--accent",
      `oklch(0.58 0.13 ${tweakValues.accentHue})`
    );
    document.documentElement.style.setProperty(
      "--accent-soft",
      `oklch(0.58 0.13 ${tweakValues.accentHue} / 0.12)`
    );
  }, [tweakValues.accentHue]);

  const toggleTheme = () => {
    setTheme((t) => {
      const order = ["auto", "light", "dark"];
      return order[(order.indexOf(t) + 1) % order.length];
    });
  };

  let page;
  if (route.startsWith("post/")) {
    const id = route.slice(5);
    page = <PostPage id={id} navigate={navigate} />;
  } else if (route === "writing") page = <WritingPage navigate={navigate} />;
  else if (route === "research") page = <ResearchPage />;
  else if (route === "projects") page = <ProjectsPage />;
  else if (route === "now") page = <NowPage />;
  else page = <HomePage tweak={tweakValues} navigate={navigate} />;

  const navCurrent = route.startsWith("post/") ? "writing" : route;

  return (
    <div className="site">
      <Nav current={navCurrent} onNav={navigate} theme={theme === "auto" ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : theme} onToggleTheme={toggleTheme} />
      <main className="site__main">{page}</main>
      <Footer />
      {window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection title="Theme">
            <window.TweakRadio
              label="Mode"
              value={theme}
              onChange={setTheme}
              options={[
                { value: "auto", label: "Auto" },
                { value: "light", label: "Light" },
                { value: "dark", label: "Dark" },
              ]}
            />
            <window.TweakSlider
              label="Accent hue"
              value={tweakValues.accentHue}
              min={0}
              max={360}
              step={1}
              onChange={(v) => setTweak("accentHue", v)}
            />
          </window.TweakSection>
          <window.TweakSection title="Layout">
            <window.TweakToggle
              label="Show portrait"
              value={tweakValues.showAvatar}
              onChange={(v) => setTweak("showAvatar", v)}
            />
          </window.TweakSection>
        </window.TweaksPanel>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
