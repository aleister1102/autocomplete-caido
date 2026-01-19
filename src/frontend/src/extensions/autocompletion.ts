import { autocompletion } from "@codemirror/autocomplete";
import { autocompleteSource } from "../completions/source";

export const autocompleteExtension = () => {
  return autocompletion({
    override: [autocompleteSource]
  });
};
