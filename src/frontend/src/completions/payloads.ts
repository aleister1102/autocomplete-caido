import packageMetadata from "../../../../package.json";

interface Payload {
  name: string;
  value: string;
}

export interface Category {
  name: string;
  payloads?: Payload[];
  categories?: Category[];
}

interface PayloadPack {
  schemaVersion: 1;
  payloads: Category[];
}

const PAYLOAD_PACK_URL = `https://raw.githubusercontent.com/aleister1102/autocomplete-caido/v${packageMetadata.version}/payloads/security.json`;
const PAYLOAD_PACK_SHA256 = "29726bd52458b08a21aa28f590c0e0573d39a90583be70623152a4ec2f302e75";
const MAX_PAYLOAD_PACK_BYTES = 128 * 1024;
const MAX_NAME_LENGTH = 128;
const MAX_VALUE_LENGTH = 16 * 1024;
const MAX_ITEMS_PER_LEVEL = 512;

const toHex = (bytes: Uint8Array): string => {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

const validatePayload = (value: unknown): value is Payload => {
  return (
    isRecord(value) &&
    typeof value.name === "string" &&
    value.name.length <= MAX_NAME_LENGTH &&
    typeof value.value === "string" &&
    value.value.length <= MAX_VALUE_LENGTH
  );
};

const validateCategory = (value: unknown, depth: number): value is Category => {
  if (
    !isRecord(value) ||
    typeof value.name !== "string" ||
    value.name.length > MAX_NAME_LENGTH ||
    depth > 8
  ) {
    return false;
  }

  if (value.payloads !== undefined) {
    if (
      !Array.isArray(value.payloads) ||
      value.payloads.length > MAX_ITEMS_PER_LEVEL ||
      !value.payloads.every(validatePayload)
    ) {
      return false;
    }
  }

  if (value.categories !== undefined) {
    if (
      !Array.isArray(value.categories) ||
      value.categories.length > MAX_ITEMS_PER_LEVEL ||
      !value.categories.every((category) => validateCategory(category, depth + 1))
    ) {
      return false;
    }
  }

  return value.payloads !== undefined || value.categories !== undefined;
};

const isPayloadPack = (value: unknown): value is PayloadPack => {
  return (
    isRecord(value) &&
    value.schemaVersion === 1 &&
    Array.isArray(value.payloads) &&
    value.payloads.every((category) => validateCategory(category, 0))
  );
};

const parsePayloadPack = (bytes: Uint8Array): PayloadPack => {
  const parsed: unknown = JSON.parse(new TextDecoder().decode(bytes));
  if (!isPayloadPack(parsed)) {
    throw new Error("The payload catalog has an invalid format");
  }

  return parsed;
};

export const loadPayloads = async (): Promise<Category[]> => {
  const response = await fetch(PAYLOAD_PACK_URL, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Payload catalog request failed with status ${response.status}`);
  }
  const contentLength = Number(response.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_PAYLOAD_PACK_BYTES) {
    throw new Error("The payload catalog exceeds the size limit");
  }

  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.byteLength > MAX_PAYLOAD_PACK_BYTES) {
    throw new Error("The payload catalog exceeds the size limit");
  }

  const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", bytes));
  if (toHex(digest) !== PAYLOAD_PACK_SHA256) {
    throw new Error("The payload catalog failed its integrity check");
  }

  return parsePayloadPack(bytes).payloads;
};
