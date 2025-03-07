/**
 * title: Use with cleanup callback
 * desc: Use cleanup callback to clean effects.
 *
 * title.zh-CN: 使用回调移除副作用
 * desc.zh-CN: 使用回调函数移除监听副作用。
 */

import { useState, useEffect } from "@vue-widget/hooks";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const [state, setState] = useState<number>(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setState((pre) => pre + 1);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }, [state]);
    return () => {
      return (
        <div>
          <pre>count: {state.value}</pre>
          <p>
            <button type="button" onClick={() => setState((pre) => pre + 1)}>
              count + 1
            </button>
          </p>
        </div>
      );
    };
  }
});
