import { ref } from "vue";
export function useEvent(callback: (...args: any) => any) {
  const fnRef = ref();
  fnRef.value = callback;
  return function (...args: any) {
    let _fnRef$current;
    return (_fnRef$current = fnRef.value) === null || _fnRef$current === void 0
      ? void 0
      : _fnRef$current.call.apply(_fnRef$current, [fnRef].concat(args));
  };
}
