import type { Ref } from "vue";
import { ref } from "vue";
import { isFunction } from "../utils";

export type SetState<T> = (val: T | ((prevState: T) => T)) => void;
export function useState<T, R = Ref<T>>(
  defaultStateValue?: T | (() => T)
): [R, SetState<T>] {
  const initValue: T =
    typeof defaultStateValue === "function"
      ? (defaultStateValue as any)()
      : defaultStateValue;

  const innerValue = ref(initValue) as Ref<T>;

  const triggerChange: SetState<T> = (newValue) => {
    if (isFunction(newValue))
      innerValue.value = (newValue as any)(innerValue.value);
    else innerValue.value = newValue;
  };

  return [innerValue as unknown as R, triggerChange];
}
