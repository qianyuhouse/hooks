/**
 * title: Multi-state management (split)
 * desc: useUrlState can handle multiple useUrlState updates simultaneously
 *
 * title.zh-CN: 多状态管理 (拆分)
 * desc.zh-CN: useUrlState 可以同时处理多个 useUrlState 更新
 */

import { useUrlState } from "@vue-widget/hooks";
import { defineComponent } from "vue";

export default defineComponent({
  setup(props, ctx) {
    const [page, setPage] = useUrlState({ page: "1" });
    const [pageSize, setPageSize] = useUrlState({ pageSize: "10" });
    return () => {
      return (
        <>
          <div>
            page: {page.value.page}
            <span style={{ paddingLeft: "8px" }}>
              <button
                onClick={() => {
                  setPage((s) => ({ page: Number(s.page) + 1 }));
                }}
              >
                +
              </button>
              <button
                onClick={() => {
                  setPage((s) => ({ page: Number(s.page) - 1 }));
                }}
              >
                -
              </button>
              <button
                onClick={() => {
                  setPage({ page: undefined });
                }}
              >
                reset
              </button>
            </span>
          </div>
          <br />
          <div>
            pageSize: {pageSize.value.pageSize}
            <span style={{ paddingLeft: "8px" }}>
              <button
                onClick={() => {
                  setPageSize((s) => ({ pageSize: Number(s.pageSize) + 1 }));
                }}
              >
                +
              </button>
              <button
                onClick={() => {
                  setPageSize((s) => ({ pageSize: Number(s.pageSize) - 1 }));
                }}
              >
                -
              </button>
              <button
                onClick={() => {
                  setPageSize({ pageSize: undefined });
                }}
              >
                reset
              </button>
            </span>
          </div>
          <div>
            <button
              onClick={async () => {
                await setPageSize({ pageSize: undefined });
                await setPage({ page: undefined });
              }}
            >
              reset all
            </button>
          </div>
        </>
      );
    };
  }
});
