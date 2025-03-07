import type { ComputedRef, PropType, Ref } from "vue";
import { computed, defineComponent, provide, ref, unref } from "vue";
function createProvider<T>(uid, defaultValue) {
  return defineComponent({
    props: {
      value: {
        type: Object as PropType<Ref<T> | ComputedRef<T>>,
        default: () => ref(defaultValue)
      }
    },
    setup(props, { slots }) {
      provide(
        uid,
        computed(() => unref(props.value))
      );
      return () => {
        return slots.default?.();
      };
    }
  });
}

export function createContext<T>(defaultValue: T) {
  const uid = Symbol("context");
  return {
    uid,
    defaultValue,
    Provider: createProvider(uid, defaultValue)
  };
}

export type Context = ReturnType<typeof createContext>;
