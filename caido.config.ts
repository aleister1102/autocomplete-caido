import { defineConfig } from "@caido-community/dev";
import packageMetadata from "./package.json";

export default defineConfig({
  id: "autocomplete",
  name: "Autocomplete",
  description: "Autocomplete for Caido",
  version: packageMetadata.version,
  author: {
    name: "insomnia1102",
  },
  plugins: [
    {
      kind: "frontend",
      id: "autocomplete-frontend",
      name: "Autocomplete",
      root: "./src/frontend",
      vite: {
        build: {
          rollupOptions: {
            // IMPORTANT: Caido provides CodeMirror as a shared runtime.
            // If we bundle our own CodeMirror, instanceof checks will fail.
            external: (id: string) => {
              if (id.startsWith("@codemirror/")) return true;
              if (id.startsWith("@lezer/")) return true;
              if (id.includes("/node_modules/@codemirror/") || id.includes("\\node_modules\\@codemirror\\")) return true;
              if (id.includes("/node_modules/@lezer/") || id.includes("\\node_modules\\@lezer\\")) return true;
              return false;
            },
          },
        },
      },
    },
  ],
});
