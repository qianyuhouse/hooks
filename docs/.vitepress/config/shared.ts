import fs from "fs";
import path from "path";
import { defineConfig } from "vitepress";
import vuejsx from "@vitejs/plugin-vue-jsx";

import { search as zhSearch } from "./zh";
import { DEMO_CONTAINER } from "../theme/DemoContainer";
import { createHighlighter } from "shiki";

import githubLight from "shiki/themes/github-light.mjs";
import githubDark from "shiki/themes/github-dark.mjs";

const highligher = await createHighlighter({
  langs: ["tsx", "javascript", "html"],
  themes: ["github-light", "github-dark"]
});

const DOCS_REGEX =
  /((?<apiName>(.*))\/)?index.(?<locale>((zh-CN)|(en-US))).md$/;
const PACKAGE_PATH = path.resolve(__dirname, "../../../src");
const SCRIPT_SETUP_TAG_OPEN_REGEXP = /^<script\s+.*?\bsetup\b.*?>$/is;

/**
 * title:
 * desc: Store the state into url query. By set the value to `undefined`, the attribute can be removed from the url query.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 将状态同步到 url query 中。通过设置值为 `undefined`, 可以从 url query 上彻底删除某个属性，从而使用默认值。
 */

const ATTRS_MATCHES = /\b(?<key>\w+)(="(?<value>[^"]*)")?/g;
const DOCS_DESC_MATCHES =
  /\*.*(?<key>((title\.zh-CN)|(title)|(desc)|(desc\.zh-CN))):(?<content>(.*))/g;
function parseAttrs(attrs: string) {
  const meta = {};
  let rez: RegExpExecArray | null = null;
  while ((rez = ATTRS_MATCHES.exec(attrs))) {
    const { key, value } = rez.groups as any;
    const newValue = value === void 0 ? true : value;
    if (Array.isArray(meta[key])) {
      meta[key].push(newValue);
    } else if (!meta[key]) {
      meta[key] = newValue;
    } else {
      meta[key] = [meta[key], newValue];
    }
  }
  return meta;
}

function parseDesc(content: string) {
  const meta = {};
  let rez: RegExpExecArray | null = null;
  while ((rez = DOCS_DESC_MATCHES.exec(content))) {
    const { key, content } = rez.groups as any;
    meta[key] = content;
  }
  return meta;
}

const TAG_NAME_SCRIPT = "script";
const TAG_NAME_STYLE = "style";

const createSfcRegexp = ({ customBlocks }) => {
  const sfcTags = Array.from(
    /* @__PURE__ */ new Set([TAG_NAME_SCRIPT, TAG_NAME_STYLE, ...customBlocks])
  ).join("|");
  return new RegExp(
    `^\\s*(?<content>(?<tagOpen><(?<type>${sfcTags})\\s?.*?>)(?<contentStripped>.*)(?<tagClose><\\/\\k<type>\\s*>))\\s*$`,
    "is"
  );
};

const sfcRegexp = createSfcRegexp({ customBlocks: [] });
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
// 使用示例
export const shared = defineConfig({
  title: "@vue-widget/hooks",
  rewrites(url) {
    const matches = url.match(DOCS_REGEX);
    if (!matches) return url;
    const { apiName, locale } = matches.groups as any;

    if (apiName) {
      return locale === "en-US"
        ? `reference/${apiName}/index.md`
        : `zh/reference/${apiName}/index.md`;
    }
    return locale === "en-US" ? `index.md` : `zh/index.md`;
  },
  srcDir: PACKAGE_PATH,
  markdown: {
    codeTransformers: [
      // We use `[!!code` in demo to prevent transformation, here we revert it back.
      {
        postprocess(code) {
          return code.replace(/\[\!\!code/g, "[!code");
        }
      }
    ],
    config(md) {
      // TODO: remove when https://github.com/vuejs/vitepress/issues/4431 is fixed
      const fence = md.renderer.rules.fence!;
      md.renderer.rules.fence = function (tokens, idx, options, env, self) {
        const { localeIndex = "root" } = env;
        const codeCopyButtonTitle = (() => {
          switch (localeIndex) {
            case "zh":
              return "复制代码";
            default:
              return "Copy code";
          }
        })();
        return fence(tokens, idx, options, env, self).replace(
          '<button title="Copy Code" class="copy"></button>',
          `<button title="${codeCopyButtonTitle}" class="copy"></button>`
        );
      };

      function createDemoRenderer(origin) {
        return (tokens, idx, options, env) => {
          var content = tokens[idx].content;
          if (/^<code(?=(\s|>|$))/i.test(content.trim())) {
            var meta = parseAttrs(content.trim()) as any;
            var dir = path.parse(env.realPath || env.path).dir,
              filePath = path.resolve(dir, meta.src),
              desc = {},
              name = capitalizeFirstLetter(path.parse(filePath).name),
              rawContent = fs
                .readFileSync(filePath, "utf-8")
                .replace(/^\/\*\*[\s\S]*?\*\//, (str) => {
                  desc = parseDesc(str);
                  return "";
                })
                .trim();

            // const transformed = transform(sourceText, filePath, idx);
            // var code = transformed.code.replace(
            //   "export default",
            //   `const ${name} =`
            // );
            // const match = `<script setup>\n${code}\n</script>`.match(sfcRegexp);
            const match =
              `<script setup>\nimport ${name} from "${filePath}";\n</script>`.match(
                sfcRegexp
              );

            if (match) {
              const sfcBlock = match.groups;
              const sfcBlockIndex = env.sfcBlocks.scripts.findIndex((block) =>
                SCRIPT_SETUP_TAG_OPEN_REGEXP.test(block.tagOpen)
              );
              if (sfcBlockIndex > -1) {
                const block = env.sfcBlocks.scripts[sfcBlockIndex];
                block.contentStripped =
                  block.contentStripped + sfcBlock?.contentStripped;
                block.content = `<script setup>\n${block.contentStripped}\n</script>`;
                env.sfcBlocks.scriptSetup = block;
              } else {
                env.sfcBlocks.scripts = [sfcBlock];
                env.sfcBlocks.scriptSetup = sfcBlock;
              }
            }

            const language = filePath.match(/\.(\w+)$/)?.[1];
            return `<${DEMO_CONTAINER} 
              language="${language}"  
              code="${encodeURIComponent(
                highligher.codeToHtml(rawContent, {
                  // @ts-ignore
                  lang: language,
                  defaultColor: false,
                  themes: {
                    "github-dark": githubDark,
                    "github-light": githubLight
                  }
                })
              )}" 
              metaString="${encodeURIComponent(JSON.stringify(desc))}"
              >
              <component :is="${name}" />
            </${DEMO_CONTAINER}>`;
          }
          return origin(tokens, idx, options, env);
        };
      }

      md.renderer.rules.html_inline = createDemoRenderer(
        md.renderer.rules.html_inline
      );
      md.renderer.rules.html_block = createDemoRenderer(
        md.renderer.rules.html_block
      );
    }
  },
  sitemap: {
    hostname: "https://vitepress.dev",
    transformItems(items) {
      return items.filter((item) => !item.url.includes("migration"));
    }
  },
  themeConfig: {
    // logo: { src: "/vitepress-logo-mini.svg", width: 24, height: 24 },
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" }
    ],

    search: {
      provider: "local",
      options: {
        locales: {
          ...zhSearch
        }
      }
    }
  },
  vite: {
    server: {
      port: 5176
    },
    resolve: {
      alias: {
        "@vue-widget/hooks": PACKAGE_PATH
      }
    },
    css: {
      modules: false,
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },

    plugins: [
      vuejsx({
        transformOn: true,
        mergeProps: true
      }) as any
    ]
  }
});
