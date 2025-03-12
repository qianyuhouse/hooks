/**
 * title: Basic usage
 * desc: useSize can receive ref as argument
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: useSize 可以接收 ref 参数
 */

import { defineComponent } from "vue";
import { useRef, useSize } from "@vue-widget/hooks";

export default defineComponent({
  setup() {
    const ref = useRef(null);
    const size = useSize(ref);
    return () => {
      return (
        <div ref={ref}>
          <p>Try to resize the preview window </p>
          <p>
            width: {size.value?.width}px, height: {size.value?.height}px
          </p>
        </div>
      );
    };
  }
});
