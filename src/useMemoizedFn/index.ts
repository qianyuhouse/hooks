import { isFunction } from "../utils";
import isDev from "../utils/isDev";
import { useMemo } from "../useMemo";
import { ref } from "vue";

type noop = (this: any, ...args: any[]) => any;

type PickFunction<T extends noop> = (
  this: ThisParameterType<T>,
  ...args: Parameters<T>
) => ReturnType<T>;

export function useMemoizedFn<T extends noop>(fn: T) {
  if (isDev) {
    if (!isFunction(fn)) {
      console.error(
        `useMemoizedFn expected parameter is a function, got ${typeof fn}`
      );
    }
  }

  const fnRef = useMemo<T>(() => fn, [() => fn]);

  const memoizedFn = ref<PickFunction<T>>();
  if (!memoizedFn.value) {
    memoizedFn.value = function (this, ...args) {
      return fnRef.value.apply(this, args);
    };
  }

  return memoizedFn.value as T;
}
