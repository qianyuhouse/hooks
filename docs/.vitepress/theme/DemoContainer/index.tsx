import * as virepress from "vitepress";
import { computed, defineComponent, onMounted, ref } from "vue";
import CodeIcon from "./CodeIcon";
import CopyIcon from "./CopyIcon";
export const DEMO_CONTAINER = "DemoContainer";

export default defineComponent({
  name: DEMO_CONTAINER,
  props: {
    code: String,
    language: String,
    metaString: {
      type: String,
      default: () =>
        encodeURIComponent(
          JSON.stringify({
            title: "",
            desc: "",
            "title.zh-CN": "",
            "desc.zh-CN": ""
          })
        )
    }
  },
  setup(props, { slots }) {
    const viteStates = virepress.useData();
    const code = ref();
    const codeHeight = ref<number | null>(null);
    const collapse = ref(false);

    onMounted(() => {
      codeHeight.value = code.value.offsetHeight;
      collapse.value = true;
    });

    const meta = computed(() => {
      const suffix = "zh-CN";
      const isCN = viteStates.lang.value === "zh-CN";
      const _meta = JSON.parse(decodeURIComponent(props.metaString));
      return Object.fromEntries(
        Object.keys(_meta)
          .filter((str) => !str.endsWith(suffix))
          .map((key) => [key, _meta[isCN ? `${key}.${suffix}` : key]])
      );
    });

    return () => {
      const { title, desc } = meta.value;

      return (
        <div class="toolcab-demo-container">
          <div class="toolcab-demo-item">{slots?.default?.()}</div>
          {(title || desc) && (
            <div class="toolcab-demo-detail">
              {title && <div class="toolcab-demo-title">{title}</div>}
              {desc && <div class="toolcab-demo-desc">{desc}</div>}
            </div>
          )}
          {props.code && (
            <div
              class={[
                "toolcab-demo-code",
                {
                  [`toolcab-demo-code-${props.language}`]: props.language,
                  "toolcab-demo-code-borderless": !desc
                }
              ]}
            >
              <div class="toolcab-demo-code-toolbar">
                <CopyIcon />
                <CodeIcon onClick={() => (collapse.value = !collapse.value)} />
              </div>
              <div
                ref={code}
                class="toolcab-demo-code-content"
                style={[
                  collapse.value
                    ? {
                        height: 0,
                        overflow: "hidden"
                      }
                    : {
                        height: codeHeight.value
                          ? `${codeHeight.value}px`
                          : "auto"
                      },
                  {
                    transition: "height .3s ease-in-out"
                  }
                ]}
              >
                <div
                  class="toolcab-demo-code-content-inner"
                  v-html={decodeURIComponent(props.code)}
                />
              </div>
            </div>
          )}
        </div>
      );
    };
  }
});
