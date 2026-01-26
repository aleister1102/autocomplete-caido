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

## Releasing

To publish a new version of the plugin, follow these steps:

1. **Bump Version**: Update the version in `package.json` and `manifest.json`.
   ```json
   "version": "1.0.x"
   ```
2. **Commit and Push**:
   ```bash
   git add package.json manifest.json
   git commit -m "chore: bump version to 1.0.x"
   git push origin main
   ```
3. **Create Tag**: Push a tag matching `v*` to trigger the release workflow.
   ```bash
   git tag v1.0.x
   git push origin v1.0.x
   ```
4. **Automated Release**: GitHub Actions will automatically:
   - Build the plugin.
   - Sign the package using the `PRIVATE_KEY` secret.
   - Create a new GitHub release with the signed `plugin_package.zip`.

## Troubleshooting

- If you see `Unrecognized extension value ... multiple instances of @codemirror/state`, ensure the bundled build is used. The plugin externalizes CodeMirror so Caido’s built-in instance is used; reinstall the freshly built `dist/plugin_package.zip`.

## Security & AV False Positives

Some antivirus engines (like Windows Defender) may flag this plugin as a "HackTool" or "Trojan" because it contains a library of common security testing payloads (e.g., reverse shell strings, web shells, and exploitation snippets). 

These payloads are strictly used for **autocompletion suggestions** in the Caido request editor and are never executed by the plugin. 

To verify the integrity of the plugin:
1. Check the SHA256 checksum of the `plugin_package.zip`.
2. Verify the digital signature `plugin_package.zip.sig` using the public key found in the [Caido Store](https://github.com/caido/caido-toolbox/blob/master/store/plugin_packages.json).

If you are using this in a professional environment and experience a block, you may need to add an exclusion for the Caido plugin directory or the specific zip file.
