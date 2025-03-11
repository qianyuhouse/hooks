import {
  onMounted,
  unref,
  watch,
  type WatchSource,
  onUpdated,
  onBeforeUnmount
} from "vue";

type CleanUp = () => void;

export type EffectCallback<V = any, OV = any> = (
  value: V,
  oldValue: OV
) => CleanUp | void;

export type EffectType = "useEffect" | "useLayoutEffect";
export function createEffect(type: EffectType) {
  return (callback: EffectCallback, deps: WatchSource[]) => {
    let lastEffects: CleanUp | null = null;
    function cleanup() {
      typeof lastEffects === "function" && lastEffects();
    }
    async function watchCallback(newValue, oldValue) {
      cleanup();
      lastEffects = callback(newValue, oldValue) || null;
    }

    deps.length && watch(deps, watchCallback, { immediate: true });

    if (!deps.length) {
      onUpdated(() => {
        watchCallback([], []);
      });
      onMounted(() => {
        const args: [any, any] = [
          deps.length
            ? deps.map((cb) => unref(typeof cb === "function" ? cb() : cb))
            : [],
          []
        ];
        watchCallback(...args);
      });
    }

    onBeforeUnmount(cleanup);
  };
}
