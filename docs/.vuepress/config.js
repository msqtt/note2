import { defineUserConfig, defaultTheme } from "vuepress";
import { searchPlugin } from "@vuepress/plugin-search";
import markdownItKatex from "markdown-it-katex";

import { navbar } from "./configs/navbar";
import { sidebar } from "./configs/sidebar";

export default defineUserConfig({
  lang: "zh-CN",
  title: "📖Mosquito's Note📖",
  base: "/note2/",
  description: "是水属性的答辩",
  head: [
    [
      "link",
      { rel: "icon", href: "https://avatars.githubusercontent.com/u/94043894" },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css",
      },
    ],
  ],
  theme: defaultTheme({
    repo: "msqtt/note2",
    repoLabel: "Repo",
    docsBranch: "master",
    docsDir: "docs",
    editLink: true,
    editLinkText: "Edit ✍🏻️",
    lastUpdated: true,
    lastUpdatedText: "Last ⌚️",
    contributors: true,
    navbar,
    sidebar,
  }),
  plugins: [
    searchPlugin({
      // options
    }),
  ],
  extendsMarkdown: (md) => {
    md.use(markdownItKatex, { throwOnError: false, errorColor: "#cc0000" });
    md.linkify.set({ fuzzyEmail: false });
  },
});
