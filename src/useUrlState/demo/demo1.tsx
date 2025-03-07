/**
 * title: Default usage
 * desc: Store the state into url query. By set the value to `undefined`, the attribute can be removed from the url query.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 将状态同步到 url query 中。通过设置值为 `undefined`, 可以从 url query 上彻底删除某个属性，从而使用默认值。
 */

import { useUrlState } from "@vue-widget/hooks";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const [state, setState] = useUrlState({ count: "1" });
    return () => {
      return (
        <>
          <div>state: {state.value?.count}</div>
          <div style={{ paddingTop: "8px" }}>
            <button
              type="button"
              onClick={() =>
                setState({ count: Number(state.value.count || 0) + 1 })
              }
            >
              add
            </button>
            <button
              type="button"
              onClick={() => setState({ count: undefined })}
            >
              clear
            </button>
          </div>
        </>
      );
    };
  }
});
