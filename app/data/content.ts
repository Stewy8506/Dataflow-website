import { Zap, Network, Radar, Bot, Code2, Terminal, GitBranch, Shield, Search, Layers, Camera, Database, Activity, Eye, FileCode, Cpu } from "lucide-react";
import { SiReact, SiNodedotjs, SiPython, SiRust, SiDotnet, SiFlutter, SiAngular } from "react-icons/si";
import { FaJava } from "react-icons/fa";

export const DOWNLOADS = {
  windows: {
    primary: { url: "/downloads/dataflow-visualiser_1.0.0_x64-setup.exe", label: "Windows Setup" },
    secondary: { url: "/downloads/dataflow-visualiser_1.0.0_x64_en-US.msi", label: "MSI Package" }
  },
  mac: {
    primary: { url: "/downloads/dataflow-visualiser_1.0.0_universal.dmg", label: "macOS DMG" },
    secondary: { url: "/downloads/dataflow-visualiser_1.0.0_universal.pkg", label: "macOS PKG" }
  },
  linux: {
    primary: { url: "/downloads/dataflow-visualiser_1.0.0_amd64.AppImage", label: "AppImage" },
    secondary: { url: "/downloads/dataflow-visualiser_1.0.0_amd64.deb", label: "Debian Package" }
  }
};

export const STACK_ITEMS = ["Rust", "Tauri v2", "React 19", "React Flow v12", "WebGL", "oxc-parser", "Tree-Sitter", "SQLite", "TypeScript"];

export const FEATURES = [
  { num: "01", title: "Native-Speed Parsing", body: "Uses oxc-parser and native Tree-Sitter in Rust to scan thousands of files per second across multiple languages.", icon: Zap },
  { num: "02", title: "Interactive Canvas", body: "Seamless 2D canvas via React Flow v12 with custom node folding and WebGL-powered 3D force-directed orbits.", icon: Network },
  { num: "03", title: "Blast-Radius Analytics", body: "Simulate file edits and trace downstream breaking risk, color-coded by Tier-1, Tier-2, and Tier-3 propagation impact.", icon: Radar },
  { num: "04", title: "Universal AI Engine", body: "Refactor code or chat with Gemini, OpenAI, Anthropic, Groq, DeepSeek, OpenRouter, Cohere, or local Ollama/LMStudio.", icon: Bot },
  { num: "05", title: "Advanced Analysis", body: "Locate circular imports, dead code exports, git churn heatmaps, and test coverage borders natively.", icon: Code2 },
  { num: "06", title: "Deep IDE Integration", body: "Integrated Monaco preview & PTY terminal. Open nodes directly in VS Code, Cursor, WebStorm, IntelliJ, or Neovim.", icon: Terminal },
];

// Structured feature groups for the deep-dive section
export const FEATURE_GROUPS = [
  {
    id: "analyse",
    title: "Analyse",
    subtitle: "Understand risk before you ship.",
    features: [
      { title: "Blast-Radius Simulation", desc: "Select any node and trace downstream breaking risk, color-coded from Tier 1 (Red) to Tier 3 (Yellow).", icon: Radar },
      { title: "Dead Code Deletion", desc: "Flags unused files and exports with skull badges, allowing direct deletion from the disk.", icon: Eye },
      { title: "Circular Dependency Detection", desc: "Detects import cycles via DFS, mapping circular paths in bright rose on the canvas.", icon: Activity },
      { title: "Complexity Heatmap", desc: "Highlights hotspots by function count, import density, and file size metrics directly on nodes.", icon: Cpu },
      { title: "Dependency Health Score", desc: "Calculates coupling and risk metrics to assign letter-grade health scores (A-F) to each file.", icon: Shield },
    ],
  },
  {
    id: "visualise",
    title: "Visualise",
    subtitle: "See your entire codebase at a glance.",
    features: [
      { title: "2D + 3D Canvas", desc: "Switch seamlessly between a React Flow v12 2D node map and a WebGL 3D orbiting force-directed layout.", icon: Network },
      { title: "Directory Clustering", desc: "Groups file nodes by folder hierarchy with bounding box visualization structures.", icon: Layers },
      { title: "Prop Trace Engine", desc: "Trace specific property dependency chains, highlighting matching nodes and dimming the rest.", icon: GitBranch },
      { title: "PNG & JSON Export", desc: "Export graphs to transparent PNGs or serialize deterministic JSON structures for CI pipelines.", icon: Camera },
      { title: "Symbol-Level Drill-Down", desc: "Expand file nodes on-canvas to inspect default and named exports with status indicators.", icon: FileCode },
    ],
  },
  {
    id: "ai",
    title: "AI Engine",
    subtitle: "Cloud or local. Your choice.",
    features: [
      { title: "Semantic Domain Mapping", desc: "AI maps descriptive domains and explains logic to render unfamiliar repositories instantly readable.", icon: Bot },
      { title: "Executable Refactoring", desc: "Generates structural refactoring code blocks and writes files directly to disk.", icon: Code2 },
      { title: "File-Scoped Q&A", desc: "Floating chat interface docked on-canvas. Selected node code is automatically injected as context.", icon: Search },
      { title: "Ollama & Local Models", desc: "Supports local endpoints (Ollama/LMStudio) for fully private, 100% offline analysis.", icon: Shield },
    ],
  },
  {
    id: "devops",
    title: "DevOps",
    subtitle: "Built into your workflow.",
    features: [
      { title: "Git Churn Heatmap", desc: "Tracks commit histories to spot high-volatility files prone to bugs and frequent updates.", icon: GitBranch },
      { title: "Snapshot Diffing", desc: "Save graph state to local SQLite database and diff versions visually with emerald/rose edges.", icon: Database },
      { title: "CVE Vulnerability Scan", desc: "Scans lockfiles against the osv.dev database, adding CVE warning shields to dependencies.", icon: Shield },
      { title: "Headless CI Export", desc: "Export deterministic JSON graph snapshots inside GitHub Actions via command-line arguments.", icon: Terminal },
    ],
  },
];

export const WORKFLOW_STEPS = [
  { num: "1", title: "Select", body: "Pick any local directory via the native OS file picker. Recent projects are stored for single-click restoration." },
  { num: "2", title: "Index", body: "The Rust engine scans thousands of files per second via oxc-parser and tree-sitter, streaming dependency relations to the canvas in real-time." },
  { num: "3", title: "Simulate", body: "Select a node to calculate its blast radius. Watch downstream breaking risk pulse in Tier 1 (Red), Tier 2 (Orange), and Tier 3 (Yellow) warning states." },
  { num: "4", title: "Enrich", body: "Map semantic domains, explain functions, or answer architecture questions with local Ollama/LMStudio or cloud LLM endpoints." },
  { num: "5", title: "Refactor", body: "Execute refactoring changes directly. AI rewrites impacted files and applies modifications to disk safely." },
];

export const ECOSYSTEMS = [
  { name: "React", icon: SiReact, color: "#61DAFB", depth: "JSX prop tracing · Barrel file flattening · Next.js App Router mapping" },
  { name: "Node", icon: SiNodedotjs, color: "#339933", depth: "NestJS controller/service wiring · Express router chain awareness" },
  { name: "Python", icon: SiPython, color: "#3776AB", depth: "Django ORM ForeignKey · Celery async task execution edges" },
  { name: "Rust", icon: SiRust, color: "#DEA584", depth: "Cargo Workspace resolution · Cross-crate dependency mapping" },
  { name: "Java", icon: FaJava, color: "#b07219", depth: "Spring Boot @Autowired · @Inject · @Bean DI wiring" },
  { name: ".NET", icon: SiDotnet, color: "#178600", depth: "AddTransient/AddScoped interface → concrete class mapping" },
  { name: "Flutter", icon: SiFlutter, color: "#00B4AB", depth: "Widget tree extraction · StatelessWidget/StatefulWidget hierarchies" },
  { name: "Angular", icon: SiAngular, color: "#DD0031", depth: "NgModule & decorator resolution · Component dependency injection" },
];

export const COMPARISON = [
  {
    tool: "Dependency Cruiser",
    does: "CLI dependency graph with rule-based validation",
    misses: "No interactive UI dashboard, no AI engine, no live watch, no blast-radius",
  },
  {
    tool: "Madge",
    does: "Circular dependency tracking via terminal output",
    misses: "No visual node graph canvas, no multi-language support, no metrics, no AI",
  },
  {
    tool: "CodeSee",
    does: "Cloud-hosted codebase visualization maps",
    misses: "Requires code transfer to external servers. No local first, no offline privacy",
  },
  {
    tool: "Cursor / Copilot",
    does: "In-editor AI suggestions and floating chat",
    misses: "No macro architecture canvas. Can't see blast-radius or dependency topology",
  },
  {
    tool: "Nx Graph",
    does: "Monorepo visual dependency graphs",
    misses: "Locked into Nx project structures. No AI refactoring, no multi-language scope",
  },
];

export const SHOWCASE_TABS = [
  { id: "graph", label: "Dependency Graph", image: "/mockup-graph.png", caption: "Interactive React Flow v12 2D canvas with custom node cards, folders clustering, and floating metrics dashboard." },
  { id: "blast", label: "Blast Radius", image: "/mockup-blast.png", caption: "Select any file to simulate edits and trace Tier-1 (Red), Tier-2 (Orange), and Tier-3 (Yellow) warning glows." },
  { id: "trace", label: "Prop Trace", image: "/mockup-graph.png", caption: "Trace a specific property variable flow. highlights participating files in neon cyan and dims all others." },
  { id: "3d", label: "3D Mode", image: "/mockup-3d.png", caption: "Orbit your entire codebase in 3D space. WebGL force-directed node map designed for large repository inspection." },
];

export const RELEASE_DETAILS: Record<string, { label: string; value: string }[]> = {
  windows: [
    { label: "Version", value: "1.0.0" },
    { label: "Platform", value: "Windows x64" },
    { label: "Setup EXE", value: "3.8 MB" },
    { label: "MSI package", value: "5.2 MB" },
    { label: "Released", value: "May 29, 2026" },
  ],
  mac: [
    { label: "Version", value: "1.0.0" },
    { label: "Platform", value: "macOS Universal" },
    { label: "DMG image", value: "8.4 MB" },
    { label: "PKG installer", value: "9.1 MB" },
    { label: "Released", value: "May 29, 2026" },
  ],
  linux: [
    { label: "Version", value: "1.0.0" },
    { label: "Platform", value: "Linux x64" },
    { label: "AppImage", value: "12.6 MB" },
    { label: "Debian pkg", value: "6.3 MB" },
    { label: "Released", value: "May 29, 2026" },
  ]
};

export const CHANGELOG = [
  "Tauri v2 desktop bundles for Windows x64",
  "React Flow v12 2D graph & WebGL 3D mode",
  "Blast-radius tiers, Prop Trace, and snapshot diffing",
  "Ollama/LMStudio local AI & Gemini, Groq, DeepSeek, OpenAI cloud providers",
];
