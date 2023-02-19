export const navbar = [
  { text: "Algorithm", link: "/algorithm/" },
  {
    text: "Web",
    children: [
      { text: "Html", link: "/web/html/" },
      { text: "Css", link: "/web/css/" },
      { text: "JavaScript", link: "/web/js/" },
      { text: "Go", link: "/web/go/" },
      { text: "Java", link: "/web/java/" },
      { text: "Mysql", link: "/web/database/mysql/" },
    ],
  },
  {
    text: "Linux",
    children: [
      { text: "Web部署", link: "/linux/web/" },
      { text: "Git", link: "/linux/git/" },
      { text: "Lua", link: "/linux/lua/" },
    ],
  },
  {
    text: "Cs",
    children: [
      { text: "数据库理论", link: "/cs/db/" },
      { text: "应用理论", link: "/cs/app/" },
    ],
  },
  { text: "Others", link: "/others/" },
];
