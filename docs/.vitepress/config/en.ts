import { createRequire } from "module";
import { defineConfig, type DefaultTheme } from "vitepress";
import { sidebarReference } from "./reference";

const require = createRequire(import.meta.url);
const pkg = require("vitepress/package.json");

export const en = defineConfig({
  lang: "en-US",
  description: "Hooks used in Vue.",

  themeConfig: {
    nav: nav(),

    sidebar: {
      "/reference/": { base: "/reference/", items: sidebarReference() }
    }

    // editLink: {
    //   pattern: "https://github.com/vuejs/vitepress/edit/main/docs/:path",
    //   text: "Edit this page on GitHub"
    // },

    // footer: {
    //   message: "Released under the MIT License.",
    //   copyright: "Copyright © 2019-present Evan You"
    // }
  }
});

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: "Reference",
      link: "/reference/useUrlState",
      activeMatch: "/reference/"
    }
  ];
}
