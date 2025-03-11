import type { ComputedRef, Ref } from "vue";
import { isFunction } from "./index";
import isBrowser from "./isBrowser";

type TargetValue<T> = T | undefined | null;

type TargetType = HTMLElement | Element | Window | Document;

export type BasicTarget<T extends TargetType = Element> =
  | (() => TargetValue<T>)
  | TargetValue<T>
  | Ref<TargetValue<T>>
  | ComputedRef<TargetValue<T>>;

export function getTargetElement<T extends TargetType>(
  target: BasicTarget<T>,
  defaultElement?: T
) {
  if (!isBrowser) {
    return undefined;
  }

  if (!target) {
    return defaultElement;
  }

  let targetElement: TargetValue<T>;

  if (isFunction(target)) {
    targetElement = target();
  } else if ("value" in target) {
    targetElement = target.value;
  } else {
    targetElement = target;
  }

  return targetElement;
}
