import {
  onBeforeUnmount,
  onMounted,
  onUpdated,
  unref,
  watch,
  type WatchSource
} from "vue";
import type { EffectType } from "./createEffect";
import type { BasicTarget } from "./domTarget";
import { getTargetElement } from "./domTarget";
import { getArray } from "./getArray";

type EffectWithTargetCleanUp = () => void;

export type EffectWithTargetCallback = () => EffectWithTargetCleanUp | void;

const createEffectWithTarget = (type: EffectType) => {
  /**
   *
   * @param effect
   * @param deps
   * @param target target should compare ref.current vs ref.current, dom vs dom, ()=>dom vs ()=>dom
   */
  const useEffectWithTarget = (
    effect: EffectWithTargetCallback,
    deps: WatchSource[],
    target: BasicTarget<any> | BasicTarget<any>[]
  ) => {
    let hasInitRef = false;

    let lastElementRef: Array<Element> | null = null;
    let lastDepsRef: WatchSource[] = [];

    let unLoadRef: any;
    let isChanged = false;
    watch(
      [() => deps?.map(unref), () => unref(target)],
      () => {
        isChanged = true;
      },
      { flush: "sync", deep: true }
    );

    onUpdated(() => {
      if (!hasInitRef) return;
      const targets = getArray(target);
      const els = targets.map((item) => getTargetElement(item));
      if (isChanged) {
        unLoadRef?.();
        lastElementRef = els;
        lastDepsRef = deps;
        unLoadRef = effect();
        isChanged = false;
      }
    });

    onMounted(() =>
      setTimeout(() => {
        hasInitRef = true;
        const targets = getArray(target);
        const els = targets.map((item) => getTargetElement(item));
        lastElementRef = els;
        lastDepsRef = deps;
        unLoadRef = effect();
      })
    );

    onBeforeUnmount(() => {
      unLoadRef?.();
      hasInitRef = false;
    });
  };

  return useEffectWithTarget;
};

export default createEffectWithTarget;
