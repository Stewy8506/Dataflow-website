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
  GitBranch,
  Lock,
  Network,
  Radar,
  ShieldCheck,
  TerminalSquare,
  Workflow,
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
    icon: Network,
  },
  {
    key: "impact",
    eyebrow: "02 / blast radius",
    title: "Preview the damage before the refactor.",
    body: "Pick a file and trace downstream paths with risk coloring, health grades, circular dependency markers, churn overlays, snapshots, and diffable graph state.",
    signal: "42 affected nodes",
    icon: Radar,
  },
  {
    key: "ai",
    eyebrow: "03 / codebase memory",
    title: "Ask questions inside the architecture.",
    body: "Use Gemini or local OpenAI-compatible providers to explain files, group semantic domains, and execute AI-assisted refactor previews on your own machine.",
    signal: "local AI ready",
    icon: Bot,
  },
] as const;

const gallery = [
  ["Native parser", "Rust, oxc-parser, tree-sitter, Rayon"],
  ["Signal layer", "cycles, dead exports, CVE badges, health scores"],
  ["Workflow", "Git timeline, terminal, command palette, snapshots"],
  ["Privacy", "Tauri capabilities, local indexing, local AI endpoints"],
];

const stack = ["TypeScript", "Rust", "Tauri", "React", "Next.js", "Python", "C/C++", "Dart", "Java", "Go", "CMake"];

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
            <p>Native desktop app for engineers who need to see what breaks before they ship.</p>
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
            <GraphScene activeMode={activeMode} />
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
          </div>
        </section>

        <section className="editorial" id="engine">
          <div>
            <p>ABOUT THE ENGINE</p>
            <h2>
              It is not a diagram export.
              <br />
              It is a working architecture console.
            </h2>
          </div>
          <div className="editorialText">
            <p>
              Dataflow Visualiser indexes local repositories through a native systems layer, renders spatial code maps in React, and adds practical engineering signals: blast radius, circular dependencies, unused exports, dependency risk, snapshots, source control, and terminal workflow.
            </p>
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

        <section className="trustGrid">
          <div>
            <ShieldCheck size={24} />
            <span>Local filesystem scopes</span>
          </div>
          <div>
            <Lock size={24} />
            <span>Local AI providers</span>
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
        </section>
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

function GraphScene({ activeMode }: { activeMode: string }) {
  return (
    <div className={`graphScene ${activeMode}`}>
      <div className="sceneTop">
        <span>workspace / dependency-map</span>
        <strong>LIVE</strong>
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
