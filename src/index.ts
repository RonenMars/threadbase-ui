/**
 * @threadbase/ui — Shared React rendering components
 *
 * Theming: Components use semantic CSS custom properties (--tb-* prefix).
 * Consumers must either:
 * 1. Import theme-default.css for dark-mode defaults, OR
 * 2. Set --tb-* variables in their own CSS (see theme.css for the @theme bridge)
 *
 * Required CSS variables:
 *   --tb-text, --tb-text-muted, --tb-bg, --tb-bg-surface, --tb-bg-surface-hover,
 *   --tb-border, --tb-diff-added-bg, --tb-diff-added-text, --tb-diff-removed-bg,
 *   --tb-diff-removed-text, --tb-code-bg, --tb-code-text, --tb-accent,
 *   --tb-success, --tb-error, --tb-warning
 */

// Tool cards
export { BashTerminalCard } from "./components/tool-cards/BashTerminalCard";
export { EditDiffCard } from "./components/tool-cards/EditDiffCard";
export { GrepResultCard } from "./components/tool-cards/GrepResultCard";
export { WriteFileCard } from "./components/tool-cards/WriteFileCard";
export { ReadFileCard } from "./components/tool-cards/ReadFileCard";
export { GlobResultCard } from "./components/tool-cards/GlobResultCard";
export {
  GenericToolCard,
  TaskAgentCard,
  TaskCreateCard,
  TaskUpdateCard,
} from "./components/tool-cards/GenericToolCard";

// Message rendering
export { MessageContent } from "./components/message/MessageContent";
export { MessageNavigation } from "./components/message/MessageNavigation";
export { ToolResultCard } from "./components/message/ToolResultCard";
export { ToolInvocationBadge } from "./components/message/ToolInvocationBadge";

// Utilities
export { DiffViewer } from "./components/DiffViewer";
export type { DiffViewerProps } from "./components/DiffViewer";
export { ErrorBoundary } from "./components/util/ErrorBoundary";
