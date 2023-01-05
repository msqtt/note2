export const go = {
  "/web/go/": [
    {
      text: "基础",
      collapsible: true,
      children: [
        "/web/go/01-包变量函数",
        "/web/go/02-流程与控制",
        "/web/go/03-更多类型",
      ],
    },
    {
      text: "接口与方法",
      collapsible: true,
      children: ["/web/go/04-方法和接口"],
    },
    {
      text: "并发",
      collapsible: true,
      children: ["/web/go/05-并发"],
    },
    {
      text: "包与指令",
      collapsible: true,
      children: [
        "/web/go/package/01-编译",
        "/web/go/package/http/01-web",
        "/web/go/package/http/02-handler",
        "/web/go/package/http/03-request",
        "/web/go/package/http/04-response",
        "/web/go/package/http/05-template",
        "/web/go/package/http/06-route",
        "/web/go/package/http/07-json",
        "/web/go/package/http/08-middleware",
        "/web/go/package/http/09-context",
        "/web/go/package/http/10-https",
        "/web/go/package/http/11-test",
      ],
    },

    {
      text: "项目实现",
      collapsible: true,
      children: [
        "/web/go/project/01-Gin项目架构",
        "/web/go/project/02-Gin集成Gorm",
        "/web/go/project/03-Gin实现控制和路由",
      ],
    },
    {
      text: "Gin",
      collapsible: true,
      children: [
        "/web/go/gin/01-简介",
        {
          text: "路由",
          collapsible: true,
          children: [
            "/web/go/gin/02-基本路由",
            "/web/go/gin/03-Restful",
            "/web/go/gin/04-API参数",
            "/web/go/gin/05-URL参数",
            "/web/go/gin/06-表单参数",
            "/web/go/gin/07-单文件上传",
            "/web/go/gin/08-多文件上传",
            "/web/go/gin/09-routesGroup",
            "/web/go/gin/10-notFound",
          ],
        },
        {
          text: "数据解析与绑定",
          collapsible: true,
          children: [
            "/web/go/gin/11-Json",
            "/web/go/gin/12-表单",
            "gin/13-Uri",
          ],
        },
        {
          text: "渲染",
          collapsible: true,
          children: [
            "/web/go/gin/14-数据渲染",
            "/web/go/gin/15-HTML模板",
            "/web/go/gin/16-重定向",
            "/web/go/gin/17-同步异步",
          ],
        },
        {
          text: "中间件",
          collapsible: true,
          children: [
            "/web/go/gin/18-全局中间件",
            "/web/go/gin/19-Next方法",
            "/web/go/gin/20-局部中间件",
            "/web/go/gin/21-三方中间件",
          ],
        },
        {
          text: "会话控制",
          collapsible: true,
          children: [
            "/web/go/gin/22-Cookie介绍",
            "/web/go/gin/23-Cookie使用",
            "/web/go/gin/24-session",
          ],
        },
        {
          text: "其他",
          collapsible: true,
          children: ["/web/go/gin/25-log"],
        },
      ],
    },
    {
      text: "Gorm",
      collapsible: true,
      children: [
        {
          text: "入门指南",
          collapsible: true,
          children: [
            "/web/go/gorm/01-gorm",
            "/web/go/gorm/02-模型",
            "/web/go/gorm/03-惯例",
            "/web/go/gorm/04-连接数据库",
          ],
        },
        {
          text: "CRUD接口",
          collapsible: true,
          children: [
            "/web/go/gorm/05-创建",
            "/web/go/gorm/06-查询",
            "/web/go/gorm/07-更新",
            "/web/go/gorm/08-删除",
          ],
        },
        {
          text: "关联",
          collapsible: true,
          children: [
            "/web/go/gorm/09-属于",
            "/web/go/gorm/10-一对一",
            "/web/go/gorm/11-一对多",
            "/web/go/gorm/12-多对多",
            "/web/go/gorm/13-关联",
            "/web/go/gorm/14-预加载",
          ],
        },
        {
          text: "教程",
          collapsible: true,
          children: [
            "/web/go/gorm/15-链式操作",
            "/web/go/gorm/16-错误处理",
            "/web/go/gorm/17-钩子",
            "/web/go/gorm/18-事务",
            "/web/go/gorm/19-sql构造器",
            "/web/go/gorm/20-数据库迁移",
            "/web/go/gorm/21-通用数据库接口",
          ],
        },
      ],
    },
  ],
};
