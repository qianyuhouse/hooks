/**
 * title: Custom query-string options
 * desc: The rules can be customized by passing in parseOptions and stringifyOptions.
 *
 * title.zh-CN: 自定义 query-string 配置
 * desc.zh-CN: 可以通过传入 parseOptions 和 stringifyOptions 自定义转换规则。
 */

import { useUrlState } from "@vue-widget/hooks";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const [state, setState] = useUrlState(
      { ids: ["1", "2", "3"] },
      {
        parseOptions: {
          comma: true
        },
        stringifyOptions: {
          arrayFormat: "comma"
        }
      }
    );

    return () => {
      return (
        <div>
          <div>ids: {JSON.stringify(state.value.ids)}</div>
          <button
            style={{ marginTop: "8px" }}
            onClick={() => {
              const arr = Array(3)
                .fill(1)
                .map(() => Math.floor(Math.random() * 10));
              setState({ ids: arr });
            }}
          >
            变更数组state
          </button>
        </div>
      );
    };
  }
});
