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

export const STACK_ITEMS = ["Rust", "Tauri v2", "React 19", "WebGL", "oxc-parser", "Tree-Sitter", "Gemini API", "Local LLMs", "TypeScript"];

export const FEATURES = [
  { num: "01", title: "Native-Speed Parsing", body: "Uses oxc-parser and Tree-Sitter in Rust to scan thousands of files per second without blocking the main thread.", icon: Zap },
  { num: "02", title: "Interactive Canvas", body: "WebGL-powered 2D and 3D force-directed graphs with smart dynamic handle routing and directory clustering.", icon: Network },
  { num: "03", title: "Blast-Radius Analytics", body: "Simulate structural changes and instantly see the downstream propagation path color-coded by breaking risk.", icon: Radar },
  { num: "04", title: "Deep AI Engine", body: "Automated semantic domain mapping, executable refactoring, and interactive file-scoped Q&A via Gemini or local LLMs.", icon: Bot },
  { num: "05", title: "Advanced Analysis", body: "Dead code detection, circular dependency tracking, and complexity heatmaps across your entire workspace.", icon: Code2 },
  { num: "06", title: "Deep IDE Integration", body: "Fully integrated PTY terminal. Open any node directly in VS Code, Cursor, WebStorm, IntelliJ, or Neovim.", icon: Terminal },
];

// Structured feature groups for the deep-dive section
export const FEATURE_GROUPS = [
  {
    id: "analyse",
    title: "Analyse",
    subtitle: "Understand risk before you ship.",
    features: [
      { title: "Blast-Radius Simulation", desc: "Select any node and trace downstream breaking risk, color-coded from deep red to light orange.", icon: Radar },
      { title: "Dead Code Detection", desc: "Instantly identifies orphaned files and flags unused exports across your entire workspace.", icon: Eye },
      { title: "Circular Dependency Detection", desc: "Detects and highlights import cycles via DFS, mapping circular paths in bright rose.", icon: Activity },
      { title: "Complexity Heatmap", desc: "Visually maps function density, import counts, and file sizes across nodes to locate hotspots.", icon: Cpu },
      { title: "Dependency Health Score", desc: "Composite A–F grade for every file based on coupling, blast-radius, and code complexity.", icon: Shield },
    ],
  },
  {
    id: "visualise",
    title: "Visualise",
    subtitle: "See your entire codebase at a glance.",
    features: [
      { title: "2D + 3D Canvas", desc: "Switch seamlessly between a Dagre-layouted 2D flow and a fully interactive WebGL 3D force-directed web.", icon: Network },
      { title: "Directory Clustering", desc: "Files grouped visually by folder hierarchy with smart bounding-box overlays.", icon: Layers },
      { title: "Smart Edge Routing", desc: "Dynamic handle selection (top/bottom/left/right) for clean bezier curves with zero crossing artifacts.", icon: GitBranch },
      { title: "PNG & JSON Export", desc: "Export graphs to transparent PNG images or deterministic JSON snapshots for CI diffing.", icon: Camera },
      { title: "Symbol-Level Drill-Down", desc: "Expand any file node on-canvas to inspect exported functions, classes, and variables inline.", icon: FileCode },
    ],
  },
  {
    id: "ai",
    title: "AI Engine",
    subtitle: "Cloud or local. Your choice.",
    features: [
      { title: "Semantic Domain Mapping", desc: "Automatically assigns descriptive domains and explanations to every file, making unfamiliar codebases readable.", icon: Bot },
      { title: "Executable Refactoring", desc: "Preview structural changes, then have the AI directly rewrite and save affected files to disk.", icon: Code2 },
      { title: "File-Scoped Q&A", desc: "Floating AI chat docked over the canvas. Click any node to inject its code as context and interrogate it.", icon: Search },
      { title: "Local Provider Support", desc: "Point to LMStudio, Ollama, or vLLM for fully private AI. Zero code leaves your machine.", icon: Shield },
    ],
  },
  {
    id: "devops",
    title: "DevOps",
    subtitle: "Built into your workflow.",
    features: [
      { title: "Git Churn Heatmap", desc: "Analyses last 100 commits to paint a volatility heatmap, spotting bug-prone components instantly.", icon: GitBranch },
      { title: "Snapshot Diffing", desc: "Save graph state to SQLite and visually diff (Base vs Target) with emerald/rose highlighting.", icon: Database },
      { title: "CVE/OSV Scanning", desc: "Cross-references lockfile dependencies against osv.dev, flagging vulnerable packages with CVE badges.", icon: Shield },
      { title: "Headless CI Export", desc: "Invoke via CLI --export-graph for deterministic JSON graph snapshots in GitHub Actions.", icon: Terminal },
    ],
  },
];

export const WORKFLOW_STEPS = [
  { num: "1", title: "Select", body: "Pick any local directory via the native OS file picker. Recent projects are remembered for single-click restoration." },
  { num: "2", title: "Index", body: "The Rust engine scans thousands of files per second via oxc-parser, building the full AST dependency graph and streaming results to the canvas in real-time." },
  { num: "3", title: "Simulate", body: "Click any node to run blast-radius DFS. Watch downstream breaking risk fan out in red, orange, and amber — before you've touched a single line of code." },
  { num: "4", title: "Enrich", body: "Ask the AI to map semantic domains, explain file logic, or answer questions about specific components. Works with Gemini or fully offline via local LLMs." },
  { num: "5", title: "Refactor", body: "Have the AI directly rewrite impacted files and apply them to disk. Preview every change before committing through the integrated Git panel." },
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
    misses: "No interactive canvas, no AI, no live filesystem watching, no blast-radius",
  },
  {
    tool: "Madge",
    does: "Circular dependency detection via terminal",
    misses: "Terminal-only output — no visual graph, no multi-language, no analysis",
  },
  {
    tool: "CodeSee",
    does: "Cloud-hosted codebase maps",
    misses: "Sends your code to their servers. No local execution, no privacy control",
  },
  {
    tool: "Cursor / Copilot",
    does: "In-editor AI suggestions and chat",
    misses: "No whole-graph structural view. Can't see blast-radius or dependency topology",
  },
  {
    tool: "Nx Graph",
    does: "Monorepo visual dependency graph",
    misses: "Only works within Nx workspaces. No AI, no blast-radius, no multi-language",
  },
];

export const SHOWCASE_TABS = [
  { id: "graph", label: "Dependency Graph", image: "/mockup-graph.png", caption: "Interactive 2D canvas with directory clustering, smart edge routing, and color-coded directionality." },
  { id: "blast", label: "Blast Radius", image: "/mockup-blast.png", caption: "Select any node and instantly visualise downstream breaking risk before touching a single line." },
  { id: "3d", label: "3D Mode", image: "/mockup-3d.png", caption: "Switch to a WebGL-powered 3D force-directed graph for complete spatial exploration of your codebase." },
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
  "Tauri desktop bundles for Windows x64",
  "2D and 3D dependency map workspace",
  "Blast-radius preview and graph snapshot diffing",
  "Gemini and local OpenAI-compatible provider support",
];
