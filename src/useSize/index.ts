import ResizeObserver from "resize-observer-polyfill";
import type { BasicTarget } from "../utils/domTarget";
import { getTargetElement } from "../utils/domTarget";
import { useState } from "../useState";
import { toRef, type Ref } from "vue";
import useEffectWithTarget from "../utils/useEffectWithTarget";

type ObserverElementType = HTMLElement | Element;
type Size = { width: number; height: number };

export function useSize(
  target: BasicTarget<ObserverElementType>
): Ref<Size | undefined> {
  const _target = toRef(target);
  const [state, setState] = useState<Size | undefined>(() => {
    const el = getTargetElement<ObserverElementType>(target);
    return el ? { width: el.clientWidth, height: el.clientHeight } : undefined;
  });

  useEffectWithTarget(
    () => {
      const el = getTargetElement<ObserverElementType>(target);

      if (!el) {
        return;
      }

      const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          const { clientWidth, clientHeight } = entry.target;
          setState({ width: clientWidth, height: clientHeight });
        });
      });
      resizeObserver.observe(el);
      return () => {
        resizeObserver.disconnect();
      };
    },
    [],
    _target
  );

  return state;
}
