/**
 * title: Default usage
 * desc: Most common usage.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 最基本的用法。
 */

import { useState } from "@vue-widget/hooks";
import { defineComponent } from "vue";

interface State {
  hello: string;
  [key: string]: any;
}

export default defineComponent({
  setup() {
    const [state, setState] = useState<State>({
      hello: ""
    });
    return () => {
      return (
        <div>
          <pre>{JSON.stringify(state.value, null, 2)}</pre>
          <p>
            <button type="button" onClick={() => setState({ hello: "world" })}>
              set hello
            </button>
          </p>
        </div>
      );
    };
  }
});
