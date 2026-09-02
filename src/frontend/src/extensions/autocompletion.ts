import { acceptCompletion, autocompletion, startCompletion } from "@codemirror/autocomplete";
import { Prec, type Extension } from "@codemirror/state";
import { keymap } from "@codemirror/view";
import { autocompleteSource } from "../completions/source";

export const autocompleteExtension = (): Extension => {
  return [
    autocompletion({
      override: [autocompleteSource]
    }),
    Prec.highest(
      keymap.of([
        { key: "Ctrl-Shift-Space", preventDefault: true, run: startCompletion },
        { mac: "Cmd-Shift-Space", preventDefault: true, run: startCompletion },
        { key: "Tab", run: acceptCompletion }
      ])
    )
  ];
};
