/**
 * title: Default usage
 * desc: Most common usage.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 最基本的用法。
 */

import { useState, useEffect } from "@vue-widget/hooks";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const [state, setState] = useState<number>(0);
    useEffect(() => {
      console.log("current count:", state.value);
    }, [state]);
    return () => {
      return (
        <div>
          <pre>
            count: {state.value} {Math.random()}
          </pre>
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
