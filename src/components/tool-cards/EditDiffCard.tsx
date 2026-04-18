import { memo } from 'react'
import { DiffViewer } from '../DiffViewer'
import type { EditToolResult } from '@threadbase/core'

export const EditDiffCard = memo(function EditDiffCard({ result }: { result: EditToolResult }) {
  // Attempt to infer language from file extension for future syntax highlighting
  const ext = result.filePath.split('.').pop()?.toLowerCase()

  // If the structured patch is empty or malformed, fall back to raw strings
  if (!result.structuredPatch || result.structuredPatch.length === 0) {
    return <EditDiffCardRawFallback result={result} />
  }

  return (
    <div className="tool-card">
      <div className="tool-card-header">
        <div className="flex min-w-0 items-center gap-2">
          {/* Header is minimal — DiffViewer renders its own filename header */}
          <span className="text-xs text-tb-text-muted truncate">{result.filePath}</span>
        </div>
        <div className="flex items-center gap-1.5">
          {result.userModified && (
            <span className="rounded border border-amber-700/40 bg-amber-900/40 px-1.5 py-0.5 text-[10px] text-amber-400">
              user modified
            </span>
          )}
          <span className="rounded border border-blue-700/40 bg-blue-900/40 px-1.5 py-0.5 text-[10px] text-blue-400">
            Modified
          </span>
        </div>
      </div>

      <DiffViewer
        hunks={result.structuredPatch}
        filename={result.filePath}
        language={ext}
      />
    </div>
  )
})

// Raw fallback for when structured patch is unavailable
function EditDiffCardRawFallback({ result }: { result: EditToolResult }) {
  return (
    <div className="tool-card">
      <div className="tool-card-header">
        <span className="text-xs text-tb-text-muted truncate">{result.filePath}</span>
        <span className="rounded border border-tb-border px-1.5 py-0.5 text-[10px] text-tb-text-muted">
          raw
        </span>
      </div>
      <div className="overflow-x-auto rounded-b-lg border border-tb-border bg-tb-bg p-3 font-mono text-xs text-tb-text-muted whitespace-pre">
        {result.oldString && (
          <div className="text-tb-diff-removed-text">- {result.oldString.split('\n').join('\n- ')}</div>
        )}
        {result.newString && (
          <div className="text-tb-diff-added-text">+ {result.newString.split('\n').join('\n+ ')}</div>
        )}
      </div>
    </div>
  )
}
