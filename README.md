# Autocomplete for Caido

This plugin provides autocompletion features for Caido, inspired by the HopLa Burp Suite extension.

## Features

- Header and keyword autocompletion (common HTTP headers, verbs, content-types)
- Payload library integration (XSS, SQLi, LFI, SSTI, etc.)
- Custom keyboard shortcut (`Ctrl+Q`) to force-show suggestions
- Registered across all major request editors (HTTP History, Replay, Search, Sitemap, Automate, Findings)

## Usage

- Start typing in a request editor to see context-aware suggestions
- Press `Ctrl+Q` to trigger the autocompletion popup manually
- Suggestions include headers/verbs/content-types and payload snippets (XSS, SQLi, LFI, SSTI)

## Installation

1) Build the plugin:
   ```bash
   bun run build
   ```
2) Load `dist/plugin_package.zip` in Caido via Plugins → Install.

## Development

- Rebuild: `bun run build`
- Watch (hot rebuild): `bun run watch`
- Packaging script: `bun scripts/package.mjs`

## Troubleshooting

- If you see `Unrecognized extension value ... multiple instances of @codemirror/state`, ensure the bundled build is used. The plugin externalizes CodeMirror so Caido’s built-in instance is used; reinstall the freshly built `dist/plugin_package.zip`.
