/**
 * title: Updating with callback
 * desc: When using the callback to update, the previous state can be received, and the return value will be automatically merged.
 *
 * title.zh-CN: 使用回调更新
 * desc.zh-CN: 通过回调进行更新，可以获取上一次的状态，并且也会自动合并返回的对象。
 */

import { useState } from "@vue-widget/hooks";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const [state, setState] = useState<number>(0);

    return () => {
      return (
        <div>
          <pre>count: {state.value}</pre>
          <p>
            <button type="button" onClick={() => setState((prev) => prev + 1)}>
              count + 1
            </button>
          </p>
        </div>
      );
    };
  }
});
