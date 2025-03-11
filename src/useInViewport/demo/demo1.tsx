/**
 * title: Default usage
 * desc: Observe if the element is visible.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 监听元素是否在可见区域内
 */

import { useInViewport, useRef, useState } from "@vue-widget/hooks";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const ref = useRef(null);
    const [show, setShow] = useState(true);
    const options = useRef({ threshold: 0.5 });
    const [inViewport] = useInViewport(ref, options);

    return () => {
      return (
        <div>
          <div style={{ display: "flex", gap: "16px", marginBottom: "12px" }}>
            <button onClick={() => setShow(!show.value)}>
              {show.value ? "Hide" : "Show"} content
            </button>
            <button
              onClick={() => {
                const threshold = Number(Math.random().toFixed(2));
                options.value.threshold = threshold;
                console.log("current threshold: ", threshold);
              }}
            >
              Change threshold in options ({options.value.threshold})
            </button>
          </div>
          <div
            style={{
              width: "300px",
              height: "300px",
              overflow: "scroll",
              border: "1px solid"
            }}
          >
            scroll here
            <div style={{ height: "800px" }}>
              {show.value && (
                <div
                  ref={ref}
                  style={{
                    border: "1px solid",
                    height: "100px",
                    width: "100px",
                    textAlign: "center",
                    marginTop: "80px"
                  }}
                >
                  observer dom
                </div>
              )}
            </div>
          </div>
          <div
            style={{
              marginTop: "16px",
              color: inViewport.value ? "#87d068" : "#f50"
            }}
          >
            inViewport: {inViewport.value ? "visible" : "hidden"}
          </div>
        </div>
      );
    };
  }
});
