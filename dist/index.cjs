"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  BashTerminalCard: () => BashTerminalCard,
  DiffViewer: () => DiffViewer,
  EditDiffCard: () => EditDiffCard,
  ErrorBoundary: () => ErrorBoundary,
  GenericToolCard: () => GenericToolCard,
  GlobResultCard: () => GlobResultCard,
  GrepResultCard: () => GrepResultCard,
  MessageContent: () => MessageContent,
  MessageNavigation: () => MessageNavigation,
  ReadFileCard: () => ReadFileCard,
  TaskAgentCard: () => TaskAgentCard,
  TaskCreateCard: () => TaskCreateCard,
  TaskUpdateCard: () => TaskUpdateCard,
  ToolInvocationBadge: () => ToolInvocationBadge,
  ToolResultCard: () => ToolResultCard,
  WriteFileCard: () => WriteFileCard
});
module.exports = __toCommonJS(index_exports);

// src/components/tool-cards/BashTerminalCard.tsx
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var COLLAPSED_THRESHOLD = 15;
var BashTerminalCard = (0, import_react.memo)(function BashTerminalCard2({ result }) {
  const stdoutLines = result.stdout ? result.stdout.split("\n") : [];
  const stderrLines = result.stderr ? result.stderr.split("\n") : [];
  const totalLines = stdoutLines.length + stderrLines.length;
  const shouldCollapse = totalLines > COLLAPSED_THRESHOLD;
  const [expanded, setExpanded] = (0, import_react.useState)(!shouldCollapse);
  const visibleStdout = expanded ? result.stdout : stdoutLines.slice(0, COLLAPSED_THRESHOLD).join("\n");
  const showStderr = expanded && result.stderr;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tool-card", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tool-card-header bg-tb-bg-surface", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex min-w-0 flex-1 items-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "shrink-0 font-mono text-xs text-tb-success", children: "$" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "truncate font-mono text-xs text-tb-text", children: getCommandPreview(result) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex items-center gap-1.5", children: result.interrupted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "rounded border border-red-700/40 bg-red-900/40 px-1.5 py-0.5 text-[10px] text-red-400", children: "interrupted" }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "terminal-body overflow-x-auto rounded-b-lg border border-tb-border bg-tb-bg", children: [
      visibleStdout && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { className: "px-3 py-2 font-mono text-xs leading-5 break-all whitespace-pre-wrap text-tb-text", children: visibleStdout }),
      result.stderr && !expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "border-t border-tb-border px-3 py-1 text-[10px] text-tb-warning", children: [
        "stderr: ",
        stderrLines.length,
        " line",
        stderrLines.length !== 1 ? "s" : "",
        " (expand to view)"
      ] }),
      showStderr && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { className: "border-t border-tb-border px-3 py-2 font-mono text-xs leading-5 break-all whitespace-pre-wrap text-tb-warning", children: result.stderr }),
      !result.stdout && !result.stderr && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "px-3 py-2 text-xs text-tb-text-muted italic", children: "No output" }),
      shouldCollapse && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "button",
        {
          onClick: () => setExpanded(!expanded),
          className: "w-full border-t border-tb-border bg-tb-bg-surface px-3 py-1.5 text-[10px] text-tb-text-muted transition-colors hover:text-tb-text",
          children: expanded ? "\u25B2 Collapse" : `\u25BC Show all (${totalLines} lines)`
        }
      )
    ] })
  ] });
});
function getCommandPreview(result) {
  const firstLine = result.stdout?.split("\n")[0] || result.stderr?.split("\n")[0] || "";
  return firstLine.length > 120 ? `${firstLine.slice(0, 120)}...` : firstLine || "(no output)";
}

// src/components/tool-cards/EditDiffCard.tsx
var import_react3 = require("react");

// src/components/DiffViewer.tsx
var import_react2 = require("react");
var import_jsx_runtime2 = require("react/jsx-runtime");
var COLLAPSE_THRESHOLD = 50;
var DiffViewer = (0, import_react2.memo)(function DiffViewer2({ hunks, filename }) {
  const allLines = hunks.flatMap((h) => h.lines);
  const shouldCollapse = allLines.length > COLLAPSE_THRESHOLD;
  const [expanded, setExpanded] = (0, import_react2.useState)(!shouldCollapse);
  const addedCount = allLines.filter((l) => l.startsWith("+")).length;
  const removedCount = allLines.filter((l) => l.startsWith("-")).length;
  const dirParts = filename.split("/");
  const base = dirParts.pop() ?? "";
  const dir = dirParts.length > 0 ? `${dirParts.join("/")}/` : "";
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    "div",
    {
      className: "overflow-hidden rounded-lg border border-tb-border bg-tb-bg",
      style: { touchAction: "manipulation" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center justify-between gap-2 border-b border-tb-border bg-tb-bg-surface px-3 py-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex min-w-0 items-center gap-1.5", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(FileEditIcon, {}),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "truncate text-[11px] text-tb-text-muted", children: dir }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "text-[11px] font-semibold text-tb-text", children: base })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex shrink-0 items-center gap-2 text-[10px]", children: [
            addedCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "text-tb-diff-added-text", children: [
              "+",
              addedCount
            ] }),
            removedCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "text-tb-diff-removed-text", children: [
              "\u2212",
              removedCount
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "overflow-x-auto", style: { WebkitOverflowScrolling: "touch" }, children: hunks.map((hunk, hi) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          HunkBlock,
          {
            hunk,
            hunkIndex: hi,
            expanded,
            isFirst: hi === 0
          },
          hi
        )) }),
        shouldCollapse && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "button",
          {
            onClick: () => setExpanded(!expanded),
            className: "w-full border-t border-tb-border bg-tb-bg-surface px-3 py-1.5 text-[10px] text-tb-text-muted transition-colors hover:text-tb-text",
            children: expanded ? "\u25B2 Collapse" : `\u25BC Show all ${allLines.length} lines`
          }
        )
      ]
    }
  );
});
var HunkBlock = (0, import_react2.memo)(function HunkBlock2({ hunk, hunkIndex, expanded, isFirst }) {
  const [copied, setCopied] = (0, import_react2.useState)(false);
  const handleCopy = (0, import_react2.useCallback)(async () => {
    const text = hunk.lines.join("\n");
    await navigator.clipboard.writeText(text).catch(() => {
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [hunk.lines]);
  const lines = expanded ? hunk.lines : isFirst ? hunk.lines.slice(0, COLLAPSE_THRESHOLD) : [];
  let oldLine = hunk.oldStart;
  let newLine = hunk.newStart;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "relative font-mono text-xs leading-5", children: [
    hunkIndex > 0 && expanded && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "diff-hunk-header flex items-center justify-between border-y border-tb-border bg-tb-bg-surface px-3 py-0.5", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "text-[10px] text-tb-text-muted", children: [
        "@@ -",
        hunk.oldStart,
        ",",
        hunk.oldLines,
        " +",
        hunk.newStart,
        ",",
        hunk.newLines,
        " @@"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "button",
        {
          onClick: handleCopy,
          className: "ml-2 text-[10px] text-tb-text-muted transition-colors hover:text-tb-text",
          title: "Copy hunk",
          children: copied ? "Copied!" : "Copy"
        }
      )
    ] }),
    hunkIndex === 0 && lines.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "button",
      {
        onClick: handleCopy,
        className: "absolute top-0.5 right-2 z-10 text-[10px] text-tb-text-muted transition-colors hover:text-tb-text",
        title: "Copy hunk",
        children: copied ? "Copied!" : "Copy"
      }
    ),
    lines.map((line, li) => {
      const prefix = line[0];
      let lineNum = "";
      let cls = "";
      if (prefix === "-") {
        lineNum = String(oldLine++);
        cls = "diff-removed";
      } else if (prefix === "+") {
        lineNum = String(newLine++);
        cls = "diff-added";
      } else {
        lineNum = String(oldLine++);
        newLine++;
        cls = "diff-context";
      }
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: `flex ${cls}`, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "diff-line-num w-10 shrink-0 pr-2 text-right text-tb-text-muted select-none", children: lineNum }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "diff-line-prefix w-4 shrink-0 text-center select-none", children: prefix }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "diff-line-content pr-3 whitespace-pre", children: line.slice(1) })
      ] }, `${hunkIndex}-${li}`);
    })
  ] });
});
function FileEditIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { className: "h-3.5 w-3.5 shrink-0 text-tb-accent", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) });
}

// src/components/tool-cards/EditDiffCard.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var EditDiffCard = (0, import_react3.memo)(function EditDiffCard2({ result }) {
  const ext = result.filePath.split(".").pop()?.toLowerCase();
  if (!result.structuredPatch || result.structuredPatch.length === 0) {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(EditDiffCardRawFallback, { result });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "tool-card", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "tool-card-header", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex min-w-0 items-center gap-2", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "text-xs text-tb-text-muted truncate", children: result.filePath }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center gap-1.5", children: [
        result.userModified && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "rounded border border-amber-700/40 bg-amber-900/40 px-1.5 py-0.5 text-[10px] text-amber-400", children: "user modified" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "rounded border border-blue-700/40 bg-blue-900/40 px-1.5 py-0.5 text-[10px] text-blue-400", children: "Modified" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      DiffViewer,
      {
        hunks: result.structuredPatch,
        filename: result.filePath,
        language: ext
      }
    )
  ] });
});
function EditDiffCardRawFallback({ result }) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "tool-card", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "tool-card-header", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "text-xs text-tb-text-muted truncate", children: result.filePath }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "rounded border border-tb-border px-1.5 py-0.5 text-[10px] text-tb-text-muted", children: "raw" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "overflow-x-auto rounded-b-lg border border-tb-border bg-tb-bg p-3 font-mono text-xs text-tb-text-muted whitespace-pre", children: [
      result.oldString && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "text-tb-diff-removed-text", children: [
        "- ",
        result.oldString.split("\n").join("\n- ")
      ] }),
      result.newString && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "text-tb-diff-added-text", children: [
        "+ ",
        result.newString.split("\n").join("\n+ ")
      ] })
    ] })
  ] });
}

// src/components/tool-cards/GrepResultCard.tsx
var import_react4 = require("react");
var import_jsx_runtime4 = require("react/jsx-runtime");
var COLLAPSED_THRESHOLD2 = 15;
var GrepResultCard = (0, import_react4.memo)(function GrepResultCard2({ result }) {
  const contentLines = result.content ? result.content.split("\n") : [];
  const shouldCollapse = contentLines.length > COLLAPSED_THRESHOLD2;
  const [expanded, setExpanded] = (0, import_react4.useState)(!shouldCollapse);
  const visibleContent = expanded ? result.content : contentLines.slice(0, COLLAPSED_THRESHOLD2).join("\n");
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "tool-card", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "tool-card-header", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex min-w-0 items-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { className: "h-3.5 w-3.5 shrink-0 text-cyan-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "font-mono text-xs text-tb-text", children: "Grep" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "text-xs text-tb-text-muted", children: [
          "(",
          result.mode,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center gap-1.5", children: [
        result.numFiles > 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "rounded border border-cyan-700/40 bg-cyan-900/40 px-1.5 py-0.5 text-[10px] text-cyan-400", children: [
          result.numFiles,
          " file",
          result.numFiles !== 1 ? "s" : ""
        ] }),
        result.numLines > 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "rounded border border-tb-border bg-tb-bg-surface px-1.5 py-0.5 text-[10px] text-tb-text-muted", children: [
          result.numLines,
          " line",
          result.numLines !== 1 ? "s" : ""
        ] })
      ] })
    ] }),
    visibleContent && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "overflow-x-auto rounded-b-lg border border-tb-border bg-tb-bg", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("pre", { className: "px-3 py-2 font-mono text-xs leading-5 break-all whitespace-pre-wrap text-tb-text-muted", children: visibleContent }),
      shouldCollapse && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "button",
        {
          onClick: () => setExpanded(!expanded),
          className: "w-full border-t border-tb-border bg-tb-bg-surface px-3 py-1.5 text-[10px] text-tb-text-muted transition-colors hover:text-tb-text",
          children: expanded ? "\u25B2 Collapse" : `\u25BC Show all ${contentLines.length} lines`
        }
      )
    ] })
  ] });
});

// src/components/tool-cards/WriteFileCard.tsx
var import_react5 = require("react");
var import_jsx_runtime5 = require("react/jsx-runtime");
var WriteFileCard = (0, import_react5.memo)(function WriteFileCard2({ result }) {
  const dirParts = result.filePath.split("/");
  const basename2 = dirParts.pop() || "";
  const directory = `${dirParts.join("/")}/`;
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "tool-card", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "tool-card-header rounded-lg", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex min-w-0 items-center gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { className: "h-3.5 w-3.5 shrink-0 text-green-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 4v16m8-8H4" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "truncate text-xs text-tb-text-muted", children: directory }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-xs font-semibold text-tb-text", children: basename2 })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "rounded border border-green-700/40 bg-green-900/40 px-1.5 py-0.5 text-[10px] text-green-400", children: "Created" })
  ] }) });
});

// src/components/tool-cards/ReadFileCard.tsx
var import_react6 = require("react");
var import_jsx_runtime6 = require("react/jsx-runtime");
var ReadFileCard = (0, import_react6.memo)(function ReadFileCard2({ result }) {
  const dirParts = result.filePath.split("/");
  const basename2 = dirParts.pop() || "";
  const directory = `${dirParts.join("/")}/`;
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "tool-card", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "tool-card-header rounded-lg", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex min-w-0 items-center gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("svg", { className: "h-3.5 w-3.5 shrink-0 text-emerald-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "truncate text-xs text-tb-text-muted", children: directory }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-xs font-semibold text-tb-text", children: basename2 })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "rounded border border-emerald-700/40 bg-emerald-900/40 px-1.5 py-0.5 text-[10px] text-emerald-400", children: "Read" })
  ] }) });
});

// src/components/tool-cards/GlobResultCard.tsx
var import_react7 = require("react");
var import_jsx_runtime7 = require("react/jsx-runtime");
var MAX_VISIBLE = 20;
var GlobResultCard = (0, import_react7.memo)(function GlobResultCard2({ result }) {
  const [showAll, setShowAll] = (0, import_react7.useState)(false);
  const visibleFiles = showAll ? result.filenames : result.filenames.slice(0, MAX_VISIBLE);
  const hasMore = result.filenames.length > MAX_VISIBLE;
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "tool-card", children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "tool-card-header", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex min-w-0 items-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("svg", { className: "h-3.5 w-3.5 shrink-0 text-purple-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "font-mono text-xs text-tb-text", children: "Glob" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", { className: "rounded border border-purple-700/40 bg-purple-900/40 px-1.5 py-0.5 text-[10px] text-purple-400", children: [
          result.numFiles,
          " file",
          result.numFiles !== 1 ? "s" : ""
        ] }),
        result.truncated && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "rounded border border-amber-700/40 bg-amber-900/40 px-1.5 py-0.5 text-[10px] text-amber-400", children: "truncated" })
      ] })
    ] }),
    result.filenames.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "overflow-x-auto rounded-b-lg border border-tb-border bg-tb-bg", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "space-y-0.5 px-3 py-2 font-mono text-xs text-tb-text-muted", children: visibleFiles.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "truncate", children: f }, i)) }),
      hasMore && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        "button",
        {
          onClick: () => setShowAll(!showAll),
          className: "w-full border-t border-tb-border bg-tb-bg-surface px-3 py-1.5 text-[10px] text-tb-text-muted transition-colors hover:text-tb-text",
          children: showAll ? "\u25B2 Show less" : `\u25BC Show all ${result.filenames.length} files`
        }
      )
    ] })
  ] });
});

// src/components/tool-cards/GenericToolCard.tsx
var import_react8 = require("react");
var import_jsx_runtime8 = require("react/jsx-runtime");
var GenericToolCard = (0, import_react8.memo)(function GenericToolCard2({ result }) {
  const [collapsed, setCollapsed] = (0, import_react8.useState)(true);
  const [copied, setCopied] = (0, import_react8.useState)(false);
  const formatted = (0, import_react8.useMemo)(() => {
    try {
      return JSON.stringify(result.data, null, 2);
    } catch {
      return String(result.data);
    }
  }, [result.data]);
  const handleCopy = (0, import_react8.useCallback)(async () => {
    try {
      await navigator.clipboard.writeText(formatted);
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    } catch {
    }
  }, [formatted]);
  const displayName = result.toolName !== "unknown" ? result.toolName : "Tool Result";
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "tool-card", children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "tool-card-header rounded-t-lg", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "rounded border border-tb-border bg-tb-bg-surface px-1.5 py-0.5 font-mono text-[10px] text-tb-text-muted", children: displayName }) }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          "button",
          {
            onClick: () => setCollapsed(!collapsed),
            className: "text-[10px] text-tb-text-muted transition-colors hover:text-tb-text",
            children: collapsed ? "\u25B6 Expand" : "\u25BC Collapse"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          "button",
          {
            onClick: handleCopy,
            className: "text-[10px] text-tb-text-muted transition-colors hover:text-tb-text",
            children: copied ? "\u2713" : "Copy"
          }
        )
      ] })
    ] }),
    !collapsed && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("pre", { className: "max-h-64 overflow-auto rounded-b-lg border border-tb-border bg-tb-bg p-3 font-mono text-xs text-tb-text-muted", children: formatted })
  ] });
});
var TaskAgentCard = (0, import_react8.memo)(function TaskAgentCard2({ result }) {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "tool-card", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "tool-card-header rounded-lg", children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex min-w-0 items-center gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("svg", { className: "h-3.5 w-3.5 shrink-0 text-indigo-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 10V3L4 14h7v7l9-11h-7z" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "text-xs text-tb-text", children: "Sub-agent" }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "font-mono text-[10px] text-tb-text-muted", children: result.agentId })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: `rounded border px-1.5 py-0.5 text-[10px] ${result.status === "completed" ? "border-green-700/40 bg-green-900/40 text-green-400" : "border-amber-700/40 bg-amber-900/40 text-amber-400"}`, children: result.status })
  ] }) });
});
var TaskCreateCard = (0, import_react8.memo)(function TaskCreateCard2({ result }) {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "tool-card", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "tool-card-header rounded-lg", children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex min-w-0 items-center gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("svg", { className: "h-3.5 w-3.5 shrink-0 text-green-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: "text-xs text-tb-text", children: [
        "Task #",
        result.taskId
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "truncate text-xs text-tb-text-muted", children: result.subject })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "rounded border border-green-700/40 bg-green-900/40 px-1.5 py-0.5 text-[10px] text-green-400", children: "Created" })
  ] }) });
});
var TaskUpdateCard = (0, import_react8.memo)(function TaskUpdateCard2({ result }) {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "tool-card", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "tool-card-header rounded-lg", children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex min-w-0 items-center gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("svg", { className: "h-3.5 w-3.5 shrink-0 text-tb-accent", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: "text-xs text-tb-text", children: [
        "Task #",
        result.taskId
      ] }),
      result.statusChange && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: "text-xs text-tb-text-muted", children: [
        result.statusChange.from,
        " \u2192 ",
        result.statusChange.to
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "rounded border border-blue-700/40 bg-blue-900/40 px-1.5 py-0.5 text-[10px] text-blue-400", children: "Updated" })
  ] }) });
});

// src/components/message/MessageContent.tsx
var import_react9 = require("react");
var import_react_markdown = __toESM(require("react-markdown"), 1);
var import_remark_gfm = __toESM(require("remark-gfm"), 1);
var import_jsx_runtime9 = require("react/jsx-runtime");
function MessageContent({
  content,
  query
}) {
  const trimmed = content.trim();
  if (isJSON(trimmed)) {
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "message-content", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(JSONBlock, { content: trimmed, query }) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "message-content", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(MarkdownRenderer, { content, query }) });
}
function MarkdownRenderer({
  content,
  query
}) {
  const hl = (0, import_react9.useCallback)(
    (children) => query ? highlightChildren(children, query) : children,
    [query]
  );
  const components = (0, import_react9.useMemo)(
    () => ({
      // Code blocks & inline code
      code({ className, children }) {
        const langMatch = /language-(\w+)/.exec(className || "");
        const codeString = String(children).replace(/\n$/, "");
        if (langMatch) {
          return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
            CodeBlock,
            {
              language: langMatch[1],
              code: codeString,
              query
            }
          );
        }
        if (codeString.includes("\n")) {
          return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(CodeBlock, { language: "text", code: codeString, query });
        }
        return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("code", { className: "inline-code", children: hl(children) });
      },
      pre({ children }) {
        return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_jsx_runtime9.Fragment, { children });
      },
      // Tables
      table({ children }) {
        return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "my-3 overflow-x-auto rounded-lg border border-tb-border", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("table", { className: "md-table", children }) });
      },
      thead({ children }) {
        return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("thead", { className: "bg-tb-bg-surface", children });
      },
      th({ children }) {
        return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("th", { className: "border-b border-tb-border px-3 py-2 text-left text-xs font-semibold text-tb-text", children: hl(children) });
      },
      td({ children }) {
        return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("td", { className: "border-b border-tb-border px-3 py-2 text-xs text-tb-text", children: hl(children) });
      },
      // Headings
      h1({ children }) {
        return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("h1", { className: "mt-4 mb-2 border-b border-tb-border pb-1 text-xl font-bold text-tb-text", children: hl(children) });
      },
      h2({ children }) {
        return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("h2", { className: "mt-4 mb-2 text-lg font-semibold text-tb-text", children: hl(children) });
      },
      h3({ children }) {
        return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("h3", { className: "mt-3 mb-1 text-base font-semibold text-tb-text", children: hl(children) });
      },
      h4({ children }) {
        return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("h4", { className: "mt-2 mb-1 text-sm font-semibold text-tb-text", children: hl(children) });
      },
      // Paragraphs
      p({ children }) {
        return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "my-1.5 leading-relaxed", children: hl(children) });
      },
      // Lists
      ul({ children }) {
        return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("ul", { className: "my-1.5 ml-5 list-disc space-y-0.5", children });
      },
      ol({ children }) {
        return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("ol", { className: "my-1.5 ml-5 list-decimal space-y-0.5", children });
      },
      li({ children }) {
        return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("li", { className: "leading-relaxed", children: hl(children) });
      },
      // Blockquotes
      blockquote({ children }) {
        return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("blockquote", { className: "border-claude-orange/50 my-2 border-l-3 pl-3 text-tb-text-muted italic", children: hl(children) });
      },
      // Links
      a({ href, children }) {
        return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
          "a",
          {
            href,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-tb-accent underline underline-offset-2 hover:text-tb-accent",
            children: hl(children)
          }
        );
      },
      // Horizontal rule
      hr() {
        return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("hr", { className: "my-3 border-tb-border" });
      },
      // Strong / em
      strong({ children }) {
        return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("strong", { className: "font-semibold text-tb-text", children: hl(children) });
      },
      em({ children }) {
        return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("em", { className: "text-tb-text italic", children: hl(children) });
      }
    }),
    [hl, query]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "md-content", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_react_markdown.default, { remarkPlugins: [import_remark_gfm.default], components, children: content }) });
}
function highlightChildren(children, query) {
  if (!query) return children;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  const walk = (node) => {
    if (typeof node === "string") {
      const parts = node.split(regex);
      if (parts.length === 1) return node;
      return parts.map(
        (part, i) => regex.test(part) ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "highlight", children: part }, i) : part
      );
    }
    return node;
  };
  if (Array.isArray(children)) {
    return children.map((child, i) => {
      const result = walk(child);
      return Array.isArray(result) ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { children: result }, i) : result;
    });
  }
  return walk(children);
}
function CodeBlock({
  language,
  code,
  query
}) {
  const [copied, setCopied] = (0, import_react9.useState)(false);
  const handleCopy = (0, import_react9.useCallback)(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    } catch {
    }
  }, [code]);
  const highlighted = (0, import_react9.useMemo)(() => {
    const html = highlightCode(code, language);
    return query ? addSearchHighlightToHtml(html, query) : html;
  }, [code, language, query]);
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "code-block-wrapper group relative my-3", children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "flex items-center justify-between rounded-t-lg border-x border-t border-tb-border bg-tb-bg-surface px-3 py-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "font-mono text-xs text-tb-text-muted", children: language }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
        "button",
        {
          onClick: handleCopy,
          className: "rounded border border-tb-border bg-tb-bg-surface px-2 py-1 text-xs text-tb-text-muted opacity-0 transition-opacity group-hover:opacity-100 hover:bg-tb-bg-surface-hover hover:text-tb-text",
          children: copied ? "\u2713 Copied" : "Copy"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("pre", { className: "overflow-x-auto rounded-b-lg border border-tb-border bg-tb-bg p-4", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      "code",
      {
        className: `language-${language} text-sm`,
        dangerouslySetInnerHTML: { __html: highlighted }
      }
    ) })
  ] });
}
function JSONBlock({
  content,
  query
}) {
  const [copied, setCopied] = (0, import_react9.useState)(false);
  const [collapsed, setCollapsed] = (0, import_react9.useState)(false);
  const formatted = (0, import_react9.useMemo)(() => {
    try {
      const parsed = JSON.parse(content);
      return JSON.stringify(parsed, null, 2);
    } catch {
      return content;
    }
  }, [content]);
  const highlighted = (0, import_react9.useMemo)(() => {
    const html = highlightJSON(formatted);
    return query ? addSearchHighlightToHtml(html, query) : html;
  }, [formatted, query]);
  const handleCopy = (0, import_react9.useCallback)(async () => {
    try {
      await navigator.clipboard.writeText(formatted);
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    } catch {
    }
  }, [formatted]);
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "json-block-wrapper group relative my-3", children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "flex items-center justify-between rounded-t-lg border-x border-t border-purple-700/50 bg-linear-to-r from-purple-900/20 to-blue-900/20 px-3 py-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "font-mono text-xs text-purple-400", children: "JSON" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
          "button",
          {
            onClick: () => setCollapsed(!collapsed),
            className: "text-xs text-tb-text-muted hover:text-tb-text",
            children: collapsed ? "\u25B6 Expand" : "\u25BC Collapse"
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
        "button",
        {
          onClick: handleCopy,
          className: "rounded border border-purple-700/50 bg-purple-900/30 px-2 py-1 text-xs text-purple-300 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-purple-800/40 hover:text-purple-200",
          children: copied ? "\u2713 Copied" : "Copy"
        }
      )
    ] }),
    !collapsed && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("pre", { className: "max-h-96 overflow-auto rounded-b-lg border border-purple-700/50 bg-tb-bg p-4", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      "code",
      {
        className: "language-json text-sm",
        dangerouslySetInnerHTML: { __html: highlighted }
      }
    ) })
  ] });
}
function isJSON(str) {
  if (!str.startsWith("{") && !str.startsWith("[")) return false;
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}
function addSearchHighlightToHtml(html, query) {
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const searchRegex = new RegExp(escaped, "gi");
  return html.replace(
    /(<[^>]*>)|([^<]+)/g,
    (_match, tag, text) => {
      if (tag) return tag;
      return text.replace(searchRegex, '<span class="highlight">$&</span>');
    }
  );
}
function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function highlightJSON(json) {
  return json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"([^"]+)":/g, '<span class="json-key">"$1"</span>:').replace(/:\s*"([^"]*)"/g, ': <span class="json-string">"$1"</span>').replace(/:\s*(true|false)/g, ': <span class="json-boolean">$1</span>').replace(/:\s*(null)/g, ': <span class="json-null">$1</span>').replace(/:\s*(-?\d+\.?\d*)/g, ': <span class="json-number">$1</span>');
}
function highlightCode(code, language) {
  const escaped = escapeHtml(code);
  if (language === "javascript" || language === "typescript" || language === "jsx" || language === "tsx") {
    return escaped.replace(
      /\b(const|let|var|function|class|if|else|return|import|export|from|default|async|await|interface|type|extends|implements|new|this|throw|try|catch|finally|for|while|do|switch|case|break|continue|of|in|yield)\b/g,
      '<span class="syntax-keyword">$1</span>'
    ).replace(
      /\b(true|false|null|undefined)\b/g,
      '<span class="syntax-boolean">$1</span>'
    ).replace(/'([^']*)'/g, `<span class="syntax-string">'$1'</span>`).replace(/"([^"]*)"/g, '<span class="syntax-string">"$1"</span>').replace(/`([^`]*)`/g, '<span class="syntax-string">`$1`</span>').replace(/\/\/(.*?)$/gm, '<span class="syntax-comment">//$1</span>');
  }
  if (language === "python") {
    return escaped.replace(
      /\b(def|class|import|from|return|if|elif|else|for|while|try|except|finally|with|as|yield|lambda|pass|break|continue|raise|and|or|not|in|is|None|True|False|self|async|await)\b/g,
      '<span class="syntax-keyword">$1</span>'
    ).replace(/'([^']*)'/g, `<span class="syntax-string">'$1'</span>`).replace(/"([^"]*)"/g, '<span class="syntax-string">"$1"</span>').replace(/#(.*?)$/gm, '<span class="syntax-comment">#$1</span>');
  }
  if (language === "go") {
    return escaped.replace(
      /\b(func|package|import|var|const|type|struct|interface|map|chan|go|defer|return|if|else|for|range|switch|case|default|break|continue|select|fallthrough)\b/g,
      '<span class="syntax-keyword">$1</span>'
    ).replace(
      /\b(true|false|nil)\b/g,
      '<span class="syntax-boolean">$1</span>'
    ).replace(/"([^"]*)"/g, '<span class="syntax-string">"$1"</span>').replace(/`([^`]*)`/g, '<span class="syntax-string">`$1`</span>').replace(/\/\/(.*?)$/gm, '<span class="syntax-comment">//$1</span>');
  }
  if (language === "bash" || language === "sh" || language === "shell" || language === "zsh") {
    return escaped.replace(
      /\b(if|then|else|elif|fi|for|while|do|done|case|esac|function|return|exit|export|local|readonly|declare|typeset|unset|shift|source)\b/g,
      '<span class="syntax-keyword">$1</span>'
    ).replace(/"([^"]*)"/g, '<span class="syntax-string">"$1"</span>').replace(/'([^']*)'/g, `<span class="syntax-string">'$1'</span>`).replace(/#(.*?)$/gm, '<span class="syntax-comment">#$1</span>');
  }
  if (language === "json") {
    return highlightJSON(escaped);
  }
  return escaped;
}

// src/components/message/MessageNavigation.tsx
var import_react10 = require("react");
var import_jsx_runtime10 = require("react/jsx-runtime");
function MessageNavigation({
  currentIndex,
  totalMessages,
  onNavigate,
  onJumpToFirst,
  onJumpToLast
}) {
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < totalMessages - 1;
  const [isEditing, setIsEditing] = (0, import_react10.useState)(false);
  const [inputValue, setInputValue] = (0, import_react10.useState)("");
  const inputRef = (0, import_react10.useRef)(null);
  const handlePrevious = () => {
    if (hasPrevious) {
      onNavigate(currentIndex - 1);
    }
  };
  const handleNext = () => {
    if (hasNext) {
      onNavigate(currentIndex + 1);
    }
  };
  const handleCounterClick = () => {
    setInputValue(String(currentIndex + 1));
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.select();
    }, 0);
  };
  const commitEdit = () => {
    const parsed = parseInt(inputValue, 10);
    if (!Number.isNaN(parsed)) {
      const clamped = Math.max(1, Math.min(parsed, totalMessages));
      onNavigate(clamped - 1);
    }
    setIsEditing(false);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      commitEdit();
    } else if (e.key === "Escape") {
      setIsEditing(false);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "flex items-center gap-2 rounded-lg border border-tb-border bg-tb-bg-surface px-3 py-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
      "button",
      {
        onClick: onJumpToFirst,
        disabled: !hasPrevious,
        className: "rounded p-1.5 text-tb-text-muted transition-colors hover:bg-tb-bg-surface-hover hover:text-tb-text disabled:cursor-not-allowed disabled:opacity-30",
        title: "Jump to first message",
        "aria-label": "Jump to first message",
        children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
          "svg",
          {
            className: "h-4 w-4",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M11 19l-7-7 7-7m8 14l-7-7 7-7"
              }
            )
          }
        )
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
      "button",
      {
        onClick: handlePrevious,
        disabled: !hasPrevious,
        className: "rounded p-1.5 text-tb-text-muted transition-colors hover:bg-tb-bg-surface-hover hover:text-tb-text disabled:cursor-not-allowed disabled:opacity-30",
        title: "Previous message",
        "aria-label": "Previous message",
        children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
          "svg",
          {
            className: "h-4 w-4",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M15 19l-7-7 7-7"
              }
            )
          }
        )
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "flex-1 text-center", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("span", { className: "text-xs text-tb-text-muted", children: [
      "Message",
      " ",
      isEditing ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        "input",
        {
          ref: inputRef,
          type: "number",
          min: 1,
          max: totalMessages,
          value: inputValue,
          onChange: (e) => setInputValue(e.target.value),
          onKeyDown: handleKeyDown,
          onBlur: commitEdit,
          className: "w-12 [appearance:textfield] rounded border border-tb-border bg-tb-bg-surface px-1 text-center text-xs font-medium text-tb-text [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        }
      ) : /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        "span",
        {
          className: "cursor-pointer font-medium text-tb-text hover:text-white hover:underline",
          onClick: handleCounterClick,
          title: "Click to jump to message",
          children: currentIndex + 1
        }
      ),
      " ",
      "of",
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "font-medium text-tb-text", children: totalMessages })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
      "button",
      {
        onClick: handleNext,
        disabled: !hasNext,
        className: "rounded p-1.5 text-tb-text-muted transition-colors hover:bg-tb-bg-surface-hover hover:text-tb-text disabled:cursor-not-allowed disabled:opacity-30",
        title: "Next message",
        "aria-label": "Next message",
        children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
          "svg",
          {
            className: "h-4 w-4",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M9 5l7 7-7 7"
              }
            )
          }
        )
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
      "button",
      {
        onClick: onJumpToLast,
        disabled: !hasNext,
        className: "rounded p-1.5 text-tb-text-muted transition-colors hover:bg-tb-bg-surface-hover hover:text-tb-text disabled:cursor-not-allowed disabled:opacity-30",
        title: "Jump to last message",
        "aria-label": "Jump to last message",
        children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
          "svg",
          {
            className: "h-4 w-4",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M13 5l7 7-7 7M5 5l7 7-7 7"
              }
            )
          }
        )
      }
    )
  ] });
}

// src/components/message/ToolResultCard.tsx
var import_react11 = require("react");
var import_jsx_runtime11 = require("react/jsx-runtime");
var ToolResultCard = (0, import_react11.memo)(function ToolResultCard2({ results }) {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "space-y-2", children: results.map((result, i) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(ToolResultDispatch, { result }, i)) });
});
function ToolResultDispatch({ result }) {
  switch (result.type) {
    case "edit":
      return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(EditDiffCard, { result });
    case "bash":
      return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(BashTerminalCard, { result });
    case "read":
      return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(ReadFileCard, { result });
    case "write":
      return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(WriteFileCard, { result });
    case "glob":
      return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(GlobResultCard, { result });
    case "grep":
      return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(GrepResultCard, { result });
    case "taskAgent":
      return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(TaskAgentCard, { result });
    case "taskCreate":
      return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(TaskCreateCard, { result });
    case "taskUpdate":
      return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(TaskUpdateCard, { result });
    case "generic":
      return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(GenericToolCard, { result });
    default:
      return null;
  }
}

// src/components/message/ToolInvocationBadge.tsx
var import_react12 = require("react");
var import_jsx_runtime12 = require("react/jsx-runtime");
var ToolInvocationBadge = (0, import_react12.memo)(function ToolInvocationBadge2({ blocks }) {
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "mt-1.5 flex flex-wrap gap-1", children: blocks.map((block) => /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
    "span",
    {
      className: "inline-flex items-center gap-1 rounded border border-tb-border bg-tb-bg-surface px-1.5 py-0.5 font-mono text-[10px] text-tb-text-muted",
      title: JSON.stringify(block.input, null, 2),
      children: [
        getToolIcon(block.name),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "text-tb-text", children: getShortToolName(block.name) }),
        getKeyParam(block) && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "max-w-50 truncate text-tb-text-muted", children: getKeyParam(block) })
      ]
    },
    block.id
  )) });
});
function getShortToolName(name) {
  if (name.startsWith("mcp__")) {
    const parts = name.split("__");
    return parts[parts.length - 1] || name;
  }
  return name;
}
function getKeyParam(block) {
  const input = block.input;
  const name = block.name;
  if (name === "Edit" || name === "Read" || name === "Write") {
    const fp = input.file_path;
    if (fp) return basename(fp);
  }
  if (name === "Bash") {
    const cmd = input.command;
    if (cmd) return cmd.length > 40 ? `${cmd.slice(0, 40)}...` : cmd;
  }
  if (name === "Glob") {
    return input.pattern || "";
  }
  if (name === "Grep") {
    return input.pattern || "";
  }
  if (name === "Task") {
    return input.description || "";
  }
  if (input.relative_path) return basename(input.relative_path);
  if (input.name_path_pattern) return input.name_path_pattern;
  if (input.file_path) return basename(input.file_path);
  return "";
}
function basename(path) {
  return path.split("/").pop() || path;
}
function getToolIcon(name) {
  switch (name) {
    case "Edit":
      return "\u270F\uFE0F";
    case "Read":
      return "\u{1F4D6}";
    case "Write":
      return "\u{1F4DD}";
    case "Bash":
      return "\u26A1";
    case "Glob":
      return "\u{1F50D}";
    case "Grep":
      return "\u{1F50E}";
    case "Task":
      return "\u{1F916}";
    case "TaskCreate":
      return "\u{1F4CB}";
    case "TaskUpdate":
      return "\u2705";
    case "EnterPlanMode":
      return "\u{1F4D0}";
    case "ExitPlanMode":
      return "\u{1F680}";
    default:
      if (name.startsWith("mcp__")) return "\u{1F527}";
      return "\u2699\uFE0F";
  }
}

// src/components/util/ErrorBoundary.tsx
var import_react13 = require("react");
var import_jsx_runtime13 = require("react/jsx-runtime");
var ErrorBoundary = class extends import_react13.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }
  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "flex h-full items-center justify-center text-tb-text-muted", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "max-w-md text-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("svg", { className: "mx-auto mb-3 h-12 w-12 text-tb-error", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "mb-1 text-sm", children: "Something went wrong rendering this view." }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "mb-4 font-mono text-xs text-tb-text-muted", children: this.state.error?.message }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
          "button",
          {
            onClick: () => this.setState({ hasError: false, error: null }),
            className: "rounded-md border border-tb-border bg-tb-bg-surface px-4 py-2 text-xs font-medium transition-colors hover:bg-tb-bg-surface-hover",
            children: "Try Again"
          }
        )
      ] }) });
    }
    return this.props.children;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BashTerminalCard,
  DiffViewer,
  EditDiffCard,
  ErrorBoundary,
  GenericToolCard,
  GlobResultCard,
  GrepResultCard,
  MessageContent,
  MessageNavigation,
  ReadFileCard,
  TaskAgentCard,
  TaskCreateCard,
  TaskUpdateCard,
  ToolInvocationBadge,
  ToolResultCard,
  WriteFileCard
});
