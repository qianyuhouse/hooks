import { ref } from "vue";
let uuid = 0;

/** Is client side and not jsdom */
export const isBrowserClient = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

/** Get unique id for accessibility usage */
export function getUUID(): number | string {
  let retId: string | number;

  // Test never reach
  /* istanbul ignore if */
  if (isBrowserClient) {
    retId = uuid;
    uuid += 1;
  } else {
    retId = "TEST_OR_SSR";
  }

  return retId;
}

export function useId(id = ref("")): string {
  // Inner id for accessibility usage. Only work in client side
  const innerId = `rv_unique_${getUUID()}`;

  return id.value || innerId;
}
