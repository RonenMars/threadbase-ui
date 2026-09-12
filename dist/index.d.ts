import * as react from 'react';
import { JSX, Component, ReactNode } from 'react';
import { BashToolResult, EditToolResult, GrepToolResult, WriteToolResult, ReadToolResult, GlobToolResult, GenericToolResult, TaskAgentToolResult, TaskCreateToolResult, TaskUpdateToolResult, ToolResult, ToolUseBlock, StructuredPatchHunk } from '@threadbase/core';

declare const BashTerminalCard: react.NamedExoticComponent<{
    result: BashToolResult;
}>;

declare const EditDiffCard: react.NamedExoticComponent<{
    result: EditToolResult;
}>;

declare const GrepResultCard: react.NamedExoticComponent<{
    result: GrepToolResult;
}>;

declare const WriteFileCard: react.NamedExoticComponent<{
    result: WriteToolResult;
}>;

declare const ReadFileCard: react.NamedExoticComponent<{
    result: ReadToolResult;
}>;

declare const GlobResultCard: react.NamedExoticComponent<{
    result: GlobToolResult;
}>;

declare const GenericToolCard: react.NamedExoticComponent<{
    result: GenericToolResult;
}>;
declare const TaskAgentCard: react.NamedExoticComponent<{
    result: TaskAgentToolResult;
}>;
declare const TaskCreateCard: react.NamedExoticComponent<{
    result: TaskCreateToolResult;
}>;
declare const TaskUpdateCard: react.NamedExoticComponent<{
    result: TaskUpdateToolResult;
}>;

interface MessageContentProps {
    content: string;
    query?: string;
}
declare function MessageContent({ content, query, }: MessageContentProps): JSX.Element;

interface MessageNavigationProps {
    currentIndex: number;
    totalMessages: number;
    onNavigate: (index: number) => void;
    onJumpToFirst: () => void;
    onJumpToLast: () => void;
}
declare function MessageNavigation({ currentIndex, totalMessages, onNavigate, onJumpToFirst, onJumpToLast }: MessageNavigationProps): JSX.Element;

interface ToolResultCardProps {
    results: ToolResult[];
}
declare const ToolResultCard: react.NamedExoticComponent<ToolResultCardProps>;

interface ToolInvocationBadgeProps {
    blocks: ToolUseBlock[];
}
declare const ToolInvocationBadge: react.NamedExoticComponent<ToolInvocationBadgeProps>;

interface DiffViewerProps {
    hunks: StructuredPatchHunk[];
    filename: string;
    language?: string;
}
declare const DiffViewer: react.NamedExoticComponent<DiffViewerProps>;

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}
interface State {
    hasError: boolean;
    error: Error | null;
}
declare class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props);
    static getDerivedStateFromError(error: Error): State;
    componentDidCatch(error: Error, info: React.ErrorInfo): void;
    render(): ReactNode;
}

export { BashTerminalCard, DiffViewer, type DiffViewerProps, EditDiffCard, ErrorBoundary, GenericToolCard, GlobResultCard, GrepResultCard, MessageContent, MessageNavigation, ReadFileCard, TaskAgentCard, TaskCreateCard, TaskUpdateCard, ToolInvocationBadge, ToolResultCard, WriteFileCard };
