import type { Completion, CompletionContext, CompletionResult } from "@codemirror/autocomplete";
import { KEYWORDS } from "../../../shared/keywords";
import type { Category } from "./payloads";

const keywordOptions: Completion[] = Object.entries(KEYWORDS).flatMap(([category, values]) => {
  return values.map((value) => ({
    label: value,
    type: "keyword",
    detail: category
  }));
});

let options = keywordOptions;
let payloadLoader:
  | {
      load: () => Promise<Category[]>;
      onError: (error: unknown) => void;
    }
  | undefined;

const buildPayloadOptions = (categories: Category[]): Completion[] => {
  const payloadOptions: Completion[] = [];

  const addCategory = (category: Category, path = "") => {
    const currentPath = path ? `${path} > ${category.name}` : category.name;

    for (const payload of category.payloads ?? []) {
      payloadOptions.push({
        label: payload.value,
        displayLabel: payload.name,
        type: "variable",
        detail: currentPath
      });
    }

    for (const child of category.categories ?? []) {
      addCategory(child, currentPath);
    }
  };

  for (const category of categories) {
    addCategory(category);
  }

  return payloadOptions;
};

export const configurePayloadLoader = (
  load: () => Promise<Category[]>,
  onError: (error: unknown) => void
) => {
  payloadLoader = { load, onError };
};

const startPayloadLoad = () => {
  if (!payloadLoader) {
    return;
  }

  const { load, onError } = payloadLoader;
  payloadLoader = undefined;

  void load()
    .then((categories) => {
      options = [...keywordOptions, ...buildPayloadOptions(categories)];
    })
    .catch(onError);
};

export function autocompleteSource(context: CompletionContext): CompletionResult | null {
  const word = context.matchBefore(/[^\s:]*$/);
  if (!word || (word.from === word.to && !context.explicit)) {
    return null;
  }
  startPayloadLoad();

  return {
    from: word.from,
    options,
    filter: true
  };
}
