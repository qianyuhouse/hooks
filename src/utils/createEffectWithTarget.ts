import {
  onBeforeUnmount,
  onMounted,
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
    let unLoadRef: any;
    watch(
      [() => deps?.map(unref), () => unref(target)],
      () => {
        const targets = getArray(target);
        const els = targets.map((item) => getTargetElement(item));
        unLoadRef?.();
        unLoadRef = effect();
      },
      { flush: "sync", deep: true }
    );

    onMounted(() =>
      setTimeout(() => {
        const targets = getArray(target);
        const els = targets.map((item) => getTargetElement(item));
        unLoadRef = effect();
      })
    );

    onBeforeUnmount(() => {
      unLoadRef?.();
    });
  };

  return useEffectWithTarget;
};

export default createEffectWithTarget;
