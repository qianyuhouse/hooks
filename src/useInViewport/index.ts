import "intersection-observer";
import type { BasicTarget } from "../utils/domTarget";
import { getTargetElement } from "../utils/domTarget";
import { useState } from "../useState";
import { useEffect } from "../useEffect";
import { toRef, type ComputedRef, type Ref } from "vue";
import useEffectWithTarget from "../utils/useEffectWithTarget";
import { getArray } from "../utils/getArray";

type CallbackType = (entry: IntersectionObserverEntry) => void;

export interface UseInViewportOptions {
  rootMargin?: string;
  threshold?: number | number[];
  root?: BasicTarget<Element>;
  callback?: CallbackType;
}

export function useInViewport(
  target: BasicTarget | BasicTarget[],
  options?:
    | UseInViewportOptions
    | Ref<UseInViewportOptions>
    | ComputedRef<UseInViewportOptions>
) {
  const _target = toRef(target);
  const _options = toRef(options || {});

  const [state, setState] = useState<boolean>();
  const [ratio, setRatio] = useState<number>();

  useEffectWithTarget(
    () => {
      const targets = getArray(target);
      const els = targets
        .map((element) => getTargetElement(element))
        .filter(Boolean);

      if (!els.length) {
        setState(false);
        setRatio(0);
        return;
      }

      const { callback, ...option } = _options.value;
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            setRatio(entry.intersectionRatio);
            setState(entry.isIntersecting);
            callback?.(entry);
          }
        },
        {
          ...option,
          root: getTargetElement(option?.root)
        }
      );

      els.forEach((el) => observer.observe(el!));

      return () => {
        observer.disconnect();
      };
    },
    [_options],
    _target
  );

  return [state, ratio] as const;
}
