import { memo, useState } from 'react'
import type { GrepToolResult } from '@threadbase/core'

const COLLAPSED_THRESHOLD = 15

export const GrepResultCard = memo(function GrepResultCard({ result }: { result: GrepToolResult }) {
  const contentLines = result.content ? result.content.split('\n') : []
  const shouldCollapse = contentLines.length > COLLAPSED_THRESHOLD
  const [expanded, setExpanded] = useState(!shouldCollapse)
  const visibleContent = expanded ? result.content : contentLines.slice(0, COLLAPSED_THRESHOLD).join('\n')

  return (
    <div className="tool-card">
      <div className="tool-card-header">
        <div className="flex min-w-0 items-center gap-2">
          <svg className="h-3.5 w-3.5 shrink-0 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="font-mono text-xs text-tb-text">Grep</span>
          <span className="text-xs text-tb-text-muted">({result.mode})</span>
        </div>
        <div className="flex items-center gap-1.5">
          {result.numFiles > 0 && (
            <span className="rounded border border-cyan-700/40 bg-cyan-900/40 px-1.5 py-0.5 text-[10px] text-cyan-400">
              {result.numFiles} file{result.numFiles !== 1 ? 's' : ''}
            </span>
          )}
          {result.numLines > 0 && (
            <span className="rounded border border-tb-border bg-tb-bg-surface px-1.5 py-0.5 text-[10px] text-tb-text-muted">
              {result.numLines} line{result.numLines !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      {visibleContent && (
        <div className="overflow-x-auto rounded-b-lg border border-tb-border bg-tb-bg">
          <pre className="px-3 py-2 font-mono text-xs leading-5 break-all whitespace-pre-wrap text-tb-text-muted">
            {visibleContent}
          </pre>
          {shouldCollapse && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-full border-t border-tb-border bg-tb-bg-surface px-3 py-1.5 text-[10px] text-tb-text-muted transition-colors hover:text-tb-text"
            >
              {expanded ? '▲ Collapse' : `▼ Show all ${contentLines.length} lines`}
            </button>
          )}
        </div>
      )}
    </div>
  )
})
