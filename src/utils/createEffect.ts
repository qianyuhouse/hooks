import {
  onMounted,
  unref,
  watch,
  type WatchSource,
  onUpdated,
  onBeforeMount,
  nextTick,
  onRenderTracked,
  onRenderTriggered,
  getCurrentInstance,
  getCurrentScope
} from "vue";

type CleanUp = () => void;

export type EffctCallback<V = any, OV = any> = (
  value: V,
  oldValue: OV
) => CleanUp | void;

export type EffectType = "useEffect" | "useLayoutEffect";

export function createEffect(type: EffectType) {
  return (callback: EffctCallback, deps: WatchSource[], immediate = true) => {
    let lastEffects: CleanUp | null = null;
    function cleanup() {
      typeof lastEffects === "function" && lastEffects();
    }
    async function watchCallback(newValue, oldValue) {
      cleanup();
      lastEffects = callback(newValue, oldValue) || null;
    }

    deps.length && watch(deps, watchCallback);

    if (!deps.length) {
      onUpdated(() => {
        watchCallback([], []);
      });
    }

    if (immediate) {
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
  };
}
