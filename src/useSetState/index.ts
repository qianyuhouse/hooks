import { useState } from "../useState";
import { useMemoizedFn } from "../useMemoizedFn";
import { isFunction } from "../utils";
import type { Ref } from "vue";

export type SetStates<S extends Record<string, any>> = <K extends keyof S>(
  state: Pick<S, K> | null | ((prevState: Readonly<S>) => Pick<S, K> | S | null)
) => void;

export const useSetState = <S extends Record<string, any>>(
  initialState: S | (() => S)
): [Ref<S>, SetStates<S>] => {
  const [state, setState] = useState<S>(initialState);

  const setMergeState = useMemoizedFn((patch) => {
    setState((prevState) => {
      const newState = isFunction(patch) ? patch(prevState) : patch;
      return newState ? { ...prevState, ...newState } : prevState;
    });
  });

  return [state, setMergeState];
};
