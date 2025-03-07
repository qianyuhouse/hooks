/**
 * title: Use the option property to configure Cookie
 * desc: 'Available options: defaultValue、expires、path、domain、secure、sameSite etc.'
 *
 * title.zh-CN: 使用 option 配置 Cookie
 * desc.zh-CN: 可配置属性：默认值、有效时间、路径、域名、协议、跨域等，详见 Options 文档。
 */

import { useCookieState } from "@vue-widget/hooks";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const [value, setValue] = useCookieState("useCookieStateOptions", {
      path: "/",
      defaultValue: "0",
      expires: (() => new Date(+new Date() + 10000))()
    });

    return () => {
      return (
        <>
          <p>{value.value}</p>
          <button
            type="button"
            onClick={() =>
              setValue((v) => String(Number(v) + 1), {
                expires: (() => new Date(+new Date() + 10000))()
              })
            }
          >
            inc + (10s expires)
          </button>
          <button
            type="button"
            onClick={() =>
              setValue((v) => String(Number(v) - 1), {
                expires: (() => new Date(+new Date() + 10000))()
              })
            }
          >
            dec - (10s expires)
          </button>
          <button type="button" onClick={() => setValue("0")}>
            reset
          </button>
        </>
      );
    };
  }
});
