# @threadbase/ui

Shared React rendering components for the [Threadbase](https://threadbase.sh/) project. Depends on [`@threadbase/core`](https://github.com/RonenMars/threadbase-core). Consumed by the Threadbase desktop and editor clients ([`threadbase-electron`](https://github.com/RonenMars/threadbase-electron), [`threadbase-vscode`](https://github.com/RonenMars/threadbase-vscode)).

Published here for transparency. Not intended as a standalone component library — the API surface targets the needs of the Threadbase clients and may change without notice.

## Install

```sh
npm install git+https://github.com/RonenMars/threadbase-ui.git
```

Peer dependencies: `react@^18 || ^19`, `react-dom@^18 || ^19`.

## Related

- [`threadbase-core`](https://github.com/RonenMars/threadbase-core) — Shared TypeScript provider abstractions (required peer)
- [`threadbase-mobile`](https://github.com/RonenMars/threadbase-mobile) — iOS + Android client
- [`threadbase-electron`](https://github.com/RonenMars/threadbase-electron) — Desktop client
- [`threadbase-vscode`](https://github.com/RonenMars/threadbase-vscode) — VS Code extension
- [`threadbase-intellij`](https://github.com/RonenMars/threadbase-intellij) — JetBrains plugin

## License

[MIT](LICENSE)
