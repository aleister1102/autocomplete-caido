import { CompletionContext, CompletionResult } from "@codemirror/autocomplete";
import { PAYLOADS, KEYWORDS, Category, Payload } from "../../../shared/payloads";

export function autocompleteSource(context: CompletionContext): CompletionResult | null {
  const word = context.matchBefore(/\w*/);
  if (!word || (word.from === word.to && !context.explicit)) {
    return null;
  }

  const options: any[] = [];

  // Add Keywords
  for (const [category, values] of Object.entries(KEYWORDS)) {
    for (const value of values) {
      options.push({
        label: value,
        type: "keyword",
        detail: category
      });
    }
  }

  // Add Payloads recursively
  function addPayloads(cat: Category, path: string = "") {
    const currentPath = path ? `${path} > ${cat.name}` : cat.name;
    
    if (cat.payloads) {
      for (const payload of cat.payloads) {
        options.push({
          label: payload.value,
          displayLabel: payload.name,
          type: "variable",
          detail: currentPath
        });
      }
    }
    
    if (cat.categories) {
      for (const subCat of cat.categories) {
        addPayloads(subCat, currentPath);
      }
    }
  }

  for (const cat of PAYLOADS) {
    addPayloads(cat);
  }

  return {
    from: word.from,
    options: options,
    filter: true
  };
}
