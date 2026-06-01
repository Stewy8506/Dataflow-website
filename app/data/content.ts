import { Zap, Network, Radar, Bot, Code2, Terminal } from "lucide-react";
import { SiReact, SiNodedotjs, SiPython, SiRust, SiDotnet, SiFlutter } from "react-icons/si";
import { FaJava } from "react-icons/fa";

export const PRIMARY_DOWNLOAD = "/downloads/dataflow-visualiser_1.0.0_x64-setup.exe";
export const MSI_DOWNLOAD = "/downloads/dataflow-visualiser_1.0.0_x64_en-US.msi";

export const STACK_ITEMS = ["Rust", "Tauri v2", "React 19", "WebGL", "oxc-parser", "Tree-Sitter", "Gemini API", "Local LLMs", "TypeScript"];

export const FEATURES = [
  { num: "01", title: "Native-Speed Parsing", body: "Uses oxc-parser and Tree-Sitter in Rust to scan thousands of files per second without blocking the main thread.", icon: Zap },
  { num: "02", title: "Interactive Canvas", body: "WebGL-powered 2D and 3D force-directed graphs with smart dynamic handle routing and directory clustering.", icon: Network },
  { num: "03", title: "Blast-Radius Analytics", body: "Simulate structural changes and instantly see the downstream propagation path color-coded by breaking risk.", icon: Radar },
  { num: "04", title: "Deep AI Engine", body: "Automated semantic domain mapping, executable refactoring, and interactive file-scoped Q&A via Gemini or local LLMs.", icon: Bot },
  { num: "05", title: "Advanced Analysis", body: "Dead code detection, circular dependency tracking, and complexity heatmaps across your entire workspace.", icon: Code2 },
  { num: "06", title: "Deep IDE Integration", body: "Fully integrated PTY terminal. Open any node directly in VS Code, Cursor, WebStorm, IntelliJ, or Neovim.", icon: Terminal },
];

export const WORKFLOW_STEPS = [
  { num: "1", title: "Select", body: "Pick a local directory via the native OS picker." },
  { num: "2", title: "Index", body: "Rust builds the AST dependency graph and streams it to WebGL." },
  { num: "3", title: "Simulate", body: "Select a node to run blast-radius DFS and preview breaks." },
  { num: "4", title: "Enrich", body: "Ask the AI to map semantic domains or explain logic." },
  { num: "5", title: "Refactor", body: "Have the AI rewrite files and apply them to disk." },
];

export const ECOSYSTEMS = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Node", icon: SiNodedotjs, color: "#339933" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Rust", icon: SiRust, color: "#DEA584" },
  { name: "Java", icon: FaJava, color: "#b07219" },
  { name: ".NET", icon: SiDotnet, color: "#178600" },
  { name: "Flutter", icon: SiFlutter, color: "#00B4AB" },
];

export const RELEASE_DETAILS = [
  { label: "Version", value: "1.0.0" },
  { label: "Platform", value: "Windows x64" },
  { label: "Setup EXE", value: "3.8 MB" },
  { label: "MSI package", value: "5.2 MB" },
  { label: "Released", value: "May 29, 2026" },
];

export const CHANGELOG = [
  "Tauri desktop bundles for Windows x64",
  "2D and 3D dependency map workspace",
  "Blast-radius preview and graph snapshot diffing",
  "Gemini and local OpenAI-compatible provider support",
];
