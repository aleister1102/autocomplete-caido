# Legacy Microsoft Defender false-positive record

**Submission URL:** [https://www.microsoft.com/en-us/wdsi/filesubmission](https://www.microsoft.com/en-us/wdsi/filesubmission)

## File Details
- **File Name:** `plugin_package.zip`
- **SHA256:** `42b8d992890c1442310c6fc8e529e4df22c520b627e39c115ab86975facdbf99` (Version 1.0.4)
- **Product:** Microsoft Defender for Endpoint / Microsoft Defender Antivirus
- **Category:** Software developer (False Positive)

## Historical explanation

Version 1.0.4 bundled a static security-testing catalog for Caido. The catalog included XSS, SQL injection, SSRF, XXE, reverse-shell, and web-shell strings. Those strings were used only as editor suggestions, but compiling them into `autocomplete-frontend/index.js` caused Microsoft Defender to classify the install archive as a security tool or threat.

## Current packaging

Starting with version 1.0.7, `plugin_package.zip` no longer contains the payload catalog. The plugin downloads the plain JSON catalog from the matching repository tag on first use, verifies its SHA-256 digest, and keeps the parsed data in memory for the current session. The plugin does not execute catalog values, encrypt them, or write them to plugin storage.

## Verification and provenance
- **Source Code:** [https://github.com/caido/caido-toolbox/tree/master/plugins/Autocomplete](https://github.com/caido/caido-toolbox/tree/master/plugins/Autocomplete)
- **Official Store Listing:** [https://github.com/caido/caido-toolbox/blob/master/store/plugin_packages.json](https://github.com/caido/caido-toolbox/blob/master/store/plugin_packages.json)
- **Release Page:** [https://github.com/aleister1102/autocomplete-caido/releases](https://github.com/aleister1102/autocomplete-caido/releases)

The release artifact is digitally signed. The signature (`plugin_package.zip.sig`) can be verified against the public key listed in the Caido Store metadata.
