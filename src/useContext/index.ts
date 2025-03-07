import type { Ref } from "vue";
import type { Context } from "../createContext";
import { inject, ref, unref } from "vue";

export function useContext<T>(context: Context, defaultValue?: T) {
  return inject(context.uid, ref(unref(defaultValue))) as Ref<T>;
}
