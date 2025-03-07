import type { DefaultTheme } from "vitepress";
export function sidebarReference(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "Reference",
      items: [
        {
          text: "State",
          items: [
            { text: "useState", link: "useState/index.html" },
            { text: "useSetState", link: "useSetState/index.html" },
            { text: "useUrlState", link: "useUrlState/index.html" },
            { text: "useCookieState", link: "useCookieState/index.html" }
          ]
        },
        {
          text: "Effect",
          items: [
            { text: "useEffect", link: "useEffect/index.html" }
          ]
        }
      ]
    },
    
  ];
}
