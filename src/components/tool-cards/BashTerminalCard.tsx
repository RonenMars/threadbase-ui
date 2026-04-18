import { memo, useState } from 'react'
import type { BashToolResult } from '@threadbase/core'

const COLLAPSED_THRESHOLD = 15

export const BashTerminalCard = memo(function BashTerminalCard({ result }: { result: BashToolResult }) {
  const stdoutLines = result.stdout ? result.stdout.split('\n') : []
  const stderrLines = result.stderr ? result.stderr.split('\n') : []
  const totalLines = stdoutLines.length + stderrLines.length
  const shouldCollapse = totalLines > COLLAPSED_THRESHOLD
  const [expanded, setExpanded] = useState(!shouldCollapse)

  const visibleStdout = expanded ? result.stdout : stdoutLines.slice(0, COLLAPSED_THRESHOLD).join('\n')
  const showStderr = expanded && result.stderr

  return (
    <div className="tool-card">
      <div className="tool-card-header bg-tb-bg-surface">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <span className="shrink-0 font-mono text-xs text-tb-success">$</span>
          <span className="truncate font-mono text-xs text-tb-text">{getCommandPreview(result)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          {result.interrupted && (
            <span className="rounded border border-red-700/40 bg-red-900/40 px-1.5 py-0.5 text-[10px] text-red-400">
              interrupted
            </span>
          )}
        </div>
      </div>

      <div className="terminal-body overflow-x-auto rounded-b-lg border border-tb-border bg-tb-bg">
        {visibleStdout && (
          <pre className="px-3 py-2 font-mono text-xs leading-5 break-all whitespace-pre-wrap text-tb-text">
            {visibleStdout}
          </pre>
        )}

        {result.stderr && !expanded && (
          <div className="border-t border-tb-border px-3 py-1 text-[10px] text-tb-warning">
            stderr: {stderrLines.length} line{stderrLines.length !== 1 ? 's' : ''} (expand to view)
          </div>
        )}
        {showStderr && (
          <pre className="border-t border-tb-border px-3 py-2 font-mono text-xs leading-5 break-all whitespace-pre-wrap text-tb-warning">
            {result.stderr}
          </pre>
        )}

        {!result.stdout && !result.stderr && (
          <div className="px-3 py-2 text-xs text-tb-text-muted italic">No output</div>
        )}

        {shouldCollapse && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full border-t border-tb-border bg-tb-bg-surface px-3 py-1.5 text-[10px] text-tb-text-muted transition-colors hover:text-tb-text"
          >
            {expanded ? '▲ Collapse' : `▼ Show all (${totalLines} lines)`}
          </button>
        )}
      </div>
    </div>
  )
})

function getCommandPreview(result: BashToolResult): string {
  // Bash results don't store the command directly — we show first line of stdout as a fallback
  // The command will be shown via ToolInvocationBadge on the assistant message
  const firstLine = result.stdout?.split('\n')[0] || result.stderr?.split('\n')[0] || ''
  return firstLine.length > 120 ? `${firstLine.slice(0, 120)  }...` : firstLine || '(no output)'
}
