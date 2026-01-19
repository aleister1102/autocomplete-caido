import { Caido } from "@caido/sdk-frontend";
import { autocompleteExtension } from "./extensions/autocompletion";
import { keymap } from "@codemirror/view";
import { Extension } from "@codemirror/state";
import { startCompletion } from "@codemirror/autocomplete";

export const init = (caido: Caido) => {
  const extensions: Extension[] = [
    autocompleteExtension(),
    keymap.of([
      {
        key: "Ctrl-q",
        run: startCompletion
      }
    ])
  ];

  // Register for all request editors across major surfaces
  if (caido.httpHistory) {
    caido.httpHistory.addRequestEditorExtension(extensions);
  }

  if (caido.replay) {
    caido.replay.addRequestEditorExtension(extensions);
  }

  if (caido.search) {
    caido.search.addRequestEditorExtension(extensions);
  }

  if (caido.sitemap) {
    caido.sitemap.addRequestEditorExtension(extensions);
  }

  if (caido.automate) {
    caido.automate.addRequestEditorExtension(extensions);
  }

  if (caido.findings) {
    caido.findings.addRequestEditorExtension(extensions);
  }

  caido.log.info("Autocomplete initialized");
};
