# Microsoft Defender False Positive Submission Details

**Submission URL:** [https://www.microsoft.com/en-us/wdsi/filesubmission](https://www.microsoft.com/en-us/wdsi/filesubmission)

## File Details
- **File Name:** `plugin_package.zip`
- **SHA256:** `42b8d992890c1442310c6fc8e529e4df22c520b627e39c115ab86975facdbf99` (Version 1.0.4)
- **Product:** Microsoft Defender for Endpoint / Microsoft Defender Antivirus
- **Category:** Software developer (False Positive)

## Explanation
This file is a benign security testing plugin (Autocomplete) for the **Caido** security platform. It provides autocompletion features for security researchers and penetration testers.

The reason for the detection is that the plugin intentionally contains a library of static security testing payloads, including:
- XSS payloads
- SQL injection snippets
- SSRF and XXE templates
- Common reverse shell strings and web shell snippets

These strings are stored in `src/shared/payloads.ts` and compiled into the frontend bundle `autocomplete-frontend/index.js`. They are used **only** for displaying autocompletion suggestions in a code editor and are **never** executed by the plugin itself.

## Verification & Provenance
- **Source Code:** [https://github.com/caido/caido-toolbox/tree/master/plugins/Autocomplete](https://github.com/caido/caido-toolbox/tree/master/plugins/Autocomplete)
- **Official Store Listing:** [https://github.com/caido/caido-toolbox/blob/master/store/plugin_packages.json](https://github.com/caido/caido-toolbox/blob/master/store/plugin_packages.json)
- **Release Page:** [https://github.com/aleister1102/autocomplete-caido/releases](https://github.com/aleister1102/autocomplete-caido/releases)

The release artifact is digitally signed. The signature (`plugin_package.zip.sig`) can be verified against the public key listed in the Caido Store metadata.
