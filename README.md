# Autocomplete for Caido

This plugin provides autocompletion features for Caido, inspired by the HopLa Burp Suite extension.

## Features

- Header and keyword autocompletion (common HTTP headers, verbs, content-types)
- Versioned payload library for XSS, SQL injection, LFI, SSTI, and other security tests
- `Ctrl+Shift+Space` (or `Cmd+Shift+Space` on macOS) to open suggestions, `Tab` or `Enter` to accept one
- Registered in Caido's Command Palette (`Cmd+K` / `Ctrl+K`) as "Trigger Autocomplete Suggestions"
- Registered across all major request editors (HTTP History, Replay, Search, Sitemap, Automate, Findings)

## Usage

- Start typing in a request editor to see context-aware suggestions
- Press `Ctrl+Shift+Space` (or `Cmd+Shift+Space` on macOS) to open the suggestion popup manually
- Or open Caido's Command Palette with `Cmd+K` / `Ctrl+K` and run **Trigger Autocomplete Suggestions**
- Press `Tab` or `Enter` to accept the highlighted suggestion. `Tab` still indents when no suggestion is open
- Payload suggestions become available after the catalog loads on the first completion request

## Installation

1) Build the plugin:
   ```bash
   bun run build
   ```
2) Load `dist/plugin_package.zip` in Caido via Plugins → Install.

The plugin needs network access the first time it loads payload suggestions. Header and keyword suggestions continue to work if the catalog is unavailable.

## Development

- Rebuild: `bun run build`
- Watch (hot rebuild): `bun run watch`
- Packaging script: `bun scripts/package.mjs`

## Releasing

To publish a new version of the plugin, follow these steps:

1. **Bump the version**: Update the version in `package.json`. The build uses it for the generated plugin manifest and the versioned catalog URL.
   ```json
   "version": "1.0.x"
   ```
2. **Update the catalog hash when needed**: If `payloads/security.json` changed, run `shasum -a 256 payloads/security.json` and copy the digest to `PAYLOAD_PACK_SHA256` in `src/frontend/src/completions/payloads.ts`.
3. **Commit and Push**:
   ```bash
   git add package.json payloads/security.json src/frontend/src/completions/payloads.ts
   git commit -m "chore: bump version to 1.0.x"
   git push origin main
   ```
4. **Create Tag**: Push a tag matching `v*` to trigger the release workflow.
   ```bash
   git tag v1.0.x
   git push origin v1.0.x
   ```
5. **Automated Release**: GitHub Actions will automatically:
   - Build the plugin.
   - Sign the package using the `PRIVATE_KEY` secret.
   - Create a new GitHub release with the signed `plugin_package.zip`.

## Troubleshooting

- If you see `Unrecognized extension value ... multiple instances of @codemirror/state`, ensure the bundled build is used. The plugin externalizes CodeMirror so Caido’s built-in instance is used; reinstall the freshly built `dist/plugin_package.zip`.

## Payload catalog and Windows security

The install archive does not contain the security payload strings. On the first completion request, the plugin downloads `payloads/security.json` from the matching version tag in this repository. It verifies the catalog against a pinned SHA-256 digest before parsing it.

The parsed catalog stays in memory for the current Caido session. It is not written to plugin storage. If the download or integrity check fails, header and keyword suggestions still work and Caido logs the catalog error.

This design keeps known shell and exploit signatures out of `plugin_package.zip`, where Windows security products can block installation or quarantine part of the plugin. It does not use encryption, encoding, or runtime decryption. Catalog parsing and completion-option construction happen once, so normal completion requests reuse the same option objects.

The source catalog remains plain JSON for review and auditing. Windows security products can still flag the catalog when someone downloads or clones the source repository, but that no longer prevents installing the plugin package.
