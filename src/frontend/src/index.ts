import { Caido } from "@caido/sdk-frontend";
import { autocompleteExtension } from "./extensions/autocompletion";
import { Extension } from "@codemirror/state";
import { startCompletion } from "@codemirror/autocomplete";
import { configurePayloadLoader } from "./completions/source";
import { loadPayloads } from "./completions/payloads";

const AUTOCOMPLETE_COMMAND_ID = "autocomplete.trigger";

export const init = (caido: Caido) => {
  configurePayloadLoader(loadPayloads, (error) => {
    const message = error instanceof Error ? error.message : String(error);
    caido.log.error(`Payload catalog unavailable: ${message}`);
  });

  const extensions: Extension[] = [autocompleteExtension()];

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

  // Register command in Caido commands registry and command palette (Cmd+K / Ctrl+K)
  if (caido.commands) {
    caido.commands.register(AUTOCOMPLETE_COMMAND_ID, {
      name: "Trigger Autocomplete Suggestions",
      group: "Autocomplete",
      run: () => {
        const activeEditor = caido.window?.getActiveEditor();
        if (activeEditor) {
          activeEditor.focus();
          const view = activeEditor.getEditorView();
          if (view) {
            startCompletion(view);
          }
        }
      }
    });

    if (caido.commandPalette) {
      caido.commandPalette.register(AUTOCOMPLETE_COMMAND_ID);
    }

    if (caido.shortcuts) {
      caido.shortcuts.register(AUTOCOMPLETE_COMMAND_ID, ["Control", "Shift", " "]);
    }
  }

  caido.log.info("Autocomplete initialized");
};
