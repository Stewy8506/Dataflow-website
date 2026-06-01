"use client";

import { useEffect, useMemo, useState } from "react";
import Lenis from "lenis";
import {
  ArrowDownToLine,
  Bot,
  Check,
  ChevronRight,
  Code2,
  Download,
  Eye,
  FileWarning,
  GitBranch,
  Lock,
  Network,
  Radar,
  ShieldCheck,
  TerminalSquare,
} from "lucide-react";

const primaryDownload = "/downloads/dataflow-visualiser_1.0.0_x64-setup.exe";
const msiDownload = "/downloads/dataflow-visualiser_1.0.0_x64_en-US.msi";

const modes = [
  {
    key: "map",
    eyebrow: "01 / graph terrain",
    title: "Map a repo like a living system.",
    body: "2D and 3D dependency views reveal folders, edges, imports, external packages, and implicit framework relationships without flattening the codebase into a static report.",
    signal: "1,248 indexed files",
    graphLabel: "folder clusters + import flow",
    statA: "2D / 3D",
    statB: "weighted edges",
    icon: Network,
  },
  {
    key: "impact",
    eyebrow: "02 / blast radius",
    title: "Preview the damage before the refactor.",
    body: "Pick a file and trace downstream paths with risk coloring, health grades, circular dependency markers, churn overlays, snapshots, and diffable graph state.",
    signal: "42 affected nodes",
    graphLabel: "risk path highlighted",
    statA: "blast radius",
    statB: "snapshot diff",
    icon: Radar,
  },
  {
    key: "ai",
    eyebrow: "03 / codebase memory",
    title: "Ask questions inside the architecture.",
    body: "Use Gemini or local OpenAI-compatible providers to explain files, group semantic domains, and execute AI-assisted refactor previews on your own machine.",
    signal: "local AI ready",
    graphLabel: "semantic domains grouped",
    statA: "file Q&A",
    statB: "local provider",
    icon: Bot,
  },
] as const;

const gallery = [
  ["Find dead code", "Orphaned files and unused exports are marked directly in the graph instead of buried in reports."],
  ["Preview refactors", "Select a node and see downstream impact before renaming, moving, or deleting code."],
  ["Trace React props", "Follow prop-drilling paths through component trees without jumping across tabs."],
  ["Audit dependencies", "External packages, unused dependencies, and OSV vulnerability badges stay visible on the map."],
];

const stack = ["TypeScript", "Rust", "Tauri", "React", "Next.js", "Python", "C/C++", "Dart", "Java", "Go", "CMake"];

const audience = [
  "Refactoring legacy repositories",
  "Onboarding into unfamiliar systems",
  "Reviewing architecture before PRs",
  "Auditing dependency and Git risk",
];

const walkthrough = [
  ["Open a repo", "Pick a local workspace through the native file dialog."],
  ["Index the graph", "Rust extracts imports, symbols, packages, and framework links."],
  ["Inspect risk", "Filter, diff, ask AI, export, or stage changes from the same console."],
];

const releaseDetails = [
  ["Version", "1.0.0"],
  ["Platform", "Windows x64"],
  ["Setup EXE", "3.8 MB"],
  ["MSI package", "5.2 MB"],
  ["Released", "May 29, 2026"],
  ["Signing", "Unsigned local build"],
];

const changelog = [
  "Tauri desktop bundles for Windows x64",
  "2D and 3D dependency map workspace",
  "Blast-radius preview and graph snapshot diffing",
  "Gemini and local OpenAI-compatible provider support",
];

export default function InteractiveLanding() {
  const [activeMode, setActiveMode] = useState<(typeof modes)[number]["key"]>("map");
  const mode = useMemo(() => modes.find((item) => item.key === activeMode) ?? modes[0], [activeMode]);
  const ModeIcon = mode.icon;

  return (
    <>
      <SmoothScroll />
      <main className="site">
        <IntroLoader />

        <nav className="nav" aria-label="Primary">
          <a className="brand" href="#top" aria-label="Dataflow Visualiser home">
            <span className="brandMark">DV</span>
            <span>D A T A F L O W</span>
          </a>
          <div className="navLinks">
            <a href="#work">WORK</a>
            <a href="#engine">ENGINE</a>
            <a href="#privacy">PRIVACY</a>
            <a href="#download">DOWNLOAD</a>
          </div>
        </nav>

        <section className="hero" id="top">
          <div className="heroMeta">
            <span>AVAILABLE / WINDOWS X64</span>
            <span>SPECIALIZATION / CODEBASE INTELLIGENCE</span>
            <span>ENGINE / RUST + TAURI</span>
          </div>

          <div className="heroType">
            <p>
              See dependencies, blast radius, Git volatility, and AI code context in one local-first desktop workspace.
            </p>
            <h1>
              DATAFLOW
              <br />
              VISUALISER
            </h1>
          </div>

          <div className="heroBottom">
            <div className="availability">
              <span />
              Release 1.0.0 ready for download
            </div>
            <div className="heroActions">
              <a className="button dark" href={primaryDownload} download>
                <Download size={18} aria-hidden="true" />
                Download EXE
              </a>
              <a className="button light" href={msiDownload} download>
                <ArrowDownToLine size={18} aria-hidden="true" />
                MSI
              </a>
            </div>
          </div>
          <div className="heroProof">
            <span>Built for codebases too large to reason about from tabs alone.</span>
            <span>Native parsing. Spatial maps. Private by default.</span>
          </div>
        </section>

        <section className="showcase" id="work">
          <div className="showcaseHeader">
            <span>PROJECT PREVIEW</span>
            <span>INTERACTIVE DEPENDENCY MAP</span>
          </div>
          <div className="productPanel">
            <aside className="leftRail">
              <span>GRAPH</span>
              <span>IMPACT</span>
              <span>AI MAP</span>
              <span>GIT</span>
            </aside>
            <GraphScene activeMode={activeMode} graphLabel={mode.graphLabel} />
            <aside className="rightRail">
              <small>{mode.eyebrow}</small>
              <strong>{mode.signal}</strong>
              <div className="railLine" />
              <span>
                <Check size={14} /> indexed
              </span>
              <span>
                <Check size={14} /> diffable
              </span>
              <span>
                <Check size={14} /> private
              </span>
            </aside>
          </div>
        </section>

        <section className="modeSection">
          <div className="modeCopy">
            <p>{mode.eyebrow}</p>
            <h2>{mode.title}</h2>
            <span>{mode.body}</span>
          </div>
          <div className="modeControls" role="tablist" aria-label="Product modes">
            {modes.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  aria-selected={activeMode === item.key}
                  className={activeMode === item.key ? "active" : ""}
                  key={item.key}
                  onClick={() => setActiveMode(item.key)}
                  role="tab"
                  type="button"
                >
                  <Icon size={18} aria-hidden="true" />
                  <span>{item.key}</span>
                </button>
              );
            })}
          </div>
          <div className="modeSignal">
            <ModeIcon size={34} aria-hidden="true" />
            <span>{mode.signal}</span>
            <small>{mode.statA}</small>
            <small>{mode.statB}</small>
          </div>
        </section>

        <section className="walkthroughSection" aria-label="Product walkthrough">
          <div className="walkthroughIntro">
            <p>DEMO FLOW</p>
            <h2>From folder to architecture map in three moves.</h2>
          </div>
          <div className="walkthroughGrid">
            {walkthrough.map(([title, body], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{title}</strong>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="audienceSection" aria-label="Who Dataflow Visualiser is for">
          <div>
            <p>FOR ENGINEERS WHO ARE</p>
            <h2>Changing code they cannot fully hold in their head.</h2>
          </div>
          <div className="audienceList">
            {audience.map((item) => (
              <span key={item}>
                <Check size={16} aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="engineSection" id="engine">
          <div className="engineShell">
            <div className="engineIntro">
              <p>ABOUT THE ENGINE</p>
              <h2>Native analysis for living code maps.</h2>
              <span>
                Dataflow Visualiser is a desktop architecture console: Rust indexes the repository, React renders the workspace, and the signal layer keeps risk attached to real files.
              </span>
            </div>

            <div className="engineFlow" aria-label="Engine pipeline">
              <article>
                <small>01</small>
                <strong>Rust Core</strong>
                <span>AST parsing, filesystem traversal, graph construction, and native-speed indexing.</span>
              </article>
              <article>
                <small>02</small>
                <strong>React Studio</strong>
                <span>2D and 3D maps, filters, matrix view, inspector, snapshots, and exports.</span>
              </article>
              <article>
                <small>03</small>
                <strong>Signal Layer</strong>
                <span>Blast radius, cycles, unused exports, CVE risk, health scores, and Git churn.</span>
              </article>
            </div>

            <div className="engineFooter">
              <span>
                <b>10-50x</b>
                faster JS/TS parsing path
              </span>
              <span>
                <b>Local</b>
                repo-first analysis
              </span>
              <span>
                <b>Tauri</b>
                explicit filesystem boundaries
              </span>
            </div>
          </div>
        </section>

        <section className="galleryGrid" aria-label="Capability gallery">
          {gallery.map(([title, body], index) => (
            <article className="galleryCard" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{body}</p>
              <ChevronRight size={20} aria-hidden="true" />
            </article>
          ))}
        </section>

        <section className="stackMarquee" aria-label="Supported stack">
          <div>
            {[...stack, ...stack].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </section>

        <section className="privacySection" id="privacy">
          <div className="privacyCopy">
            <p>PRIVACY MODEL</p>
            <h2>Local first, explicit when AI leaves the machine.</h2>
            <span>
              Repository indexing happens in the desktop app. Cloud AI is opt-in through your provider key; local AI endpoints keep semantic mapping and Q&A on your own hardware.
            </span>
          </div>
          <div className="privacyCards">
            <article>
              <ShieldCheck size={24} />
              <strong>Local indexing</strong>
              <p>File access starts from the native directory picker and Tauri capability scopes.</p>
            </article>
            <article>
              <Lock size={24} />
              <strong>Provider choice</strong>
              <p>Use Gemini for cloud assistance or Ollama, LM Studio, vLLM, and compatible local APIs.</p>
            </article>
          </div>
        </section>

        <section className="trustGrid">
          <div>
            <Eye size={24} />
            <span>Architecture visibility</span>
          </div>
          <div>
            <FileWarning size={24} />
            <span>Risk before edits</span>
          </div>
          <div>
            <GitBranch size={24} />
            <span>Git-aware analysis</span>
          </div>
          <div>
            <TerminalSquare size={24} />
            <span>Integrated terminal</span>
          </div>
        </section>

        <section className="downloadSection" id="download">
          <div className="downloadLabel">
            <Code2 size={18} />
            WINDOWS RELEASE
          </div>
          <h2>
            DOWNLOAD
            <br />
            THE APP.
          </h2>
          <p>The current release artifacts are served directly from this Next.js landing site.</p>
          <div className="releaseMeta">
            {releaseDetails.map(([label, value]) => (
              <span key={label}>
                <small>{label}</small>
                <b>{value}</b>
              </span>
            ))}
          </div>
          <div className="downloadActions">
            <a className="button dark" href={primaryDownload} download>
              <Download size={18} />
              Windows setup EXE
            </a>
            <a className="button light" href={msiDownload} download>
              <ArrowDownToLine size={18} />
              Windows MSI package
            </a>
          </div>
          <div className="changelog">
            <strong>What is in 1.0.0</strong>
            {changelog.map((item) => (
              <span key={item}>
                <Check size={15} />
                {item}
              </span>
            ))}
          </div>
        </section>

        <footer className="siteFooter">
          <div>
            <span className="brandMark">DV</span>
            <strong>Dataflow Visualiser</strong>
          </div>
          <p>MIT licensed desktop app for local-first codebase dependency analysis.</p>
          <nav aria-label="Footer">
            <a href="#top">Top</a>
            <a href="#work">Preview</a>
            <a href="#privacy">Privacy</a>
            <a href="#download">Download</a>
          </nav>
        </footer>
      </main>
    </>
  );
}

function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const element = document.querySelector<HTMLElement>(id);
      if (!element) return;
      event.preventDefault();
      lenis.scrollTo(element, { offset: -18 });
    };

    frame = requestAnimationFrame(raf);
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}

function IntroLoader() {
  return (
    <div className="introLoader" aria-hidden="true">
      <span>100</span>
      <p>Initializing visual engine</p>
    </div>
  );
}

function GraphScene({ activeMode, graphLabel }: { activeMode: string; graphLabel: string }) {
  return (
    <div className={`graphScene ${activeMode}`}>
      <div className="sceneTop">
        <span>workspace / dependency-map</span>
        <strong>{graphLabel}</strong>
      </div>
      <svg viewBox="0 0 760 500" role="img" aria-label="Animated dependency graph preview">
        <path className="edge e1" d="M104 112 C230 56, 356 74, 542 142" />
        <path className="edge e2" d="M142 360 C282 232, 428 250, 636 172" />
        <path className="edge e3" d="M206 168 C298 218, 330 368, 512 374" />
        <path className="edge e4" d="M386 116 C452 198, 454 292, 620 342" />
        <path className="edge e5" d="M92 266 C210 310, 276 146, 386 116" />
        <g className="nodes">
          <circle cx="104" cy="112" r="38" />
          <circle cx="142" cy="360" r="47" />
          <circle cx="542" cy="142" r="54" />
          <circle cx="636" cy="172" r="32" />
          <circle cx="512" cy="374" r="48" />
          <circle cx="620" cy="342" r="28" />
          <circle cx="386" cy="116" r="35" />
          <circle cx="302" cy="272" r="24" />
          <circle cx="92" cy="266" r="29" />
        </g>
      </svg>
      <div className="sceneBadge one">UI layer</div>
      <div className="sceneBadge two">Rust parser</div>
      <div className="sceneBadge three">AI domain map</div>
    </div>
  );
}
