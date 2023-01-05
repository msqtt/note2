# SpringMVC 简介

## 什么是 MVC
MVC 是一种软件架构思想，将软件按照模型、视图、控制器来划分

M: Model，模型层，指工程文件中的 JavaBean，作用是处理数据

JavaBean 分为两类：
- 一类称为实体类 Bean：专门存储业务数据的，如 Student、User 等
- 一类称为业务处理 Bean：指 Service 或 Dao 对象，专门用于处理业务逻辑和数据访问

V: View，视图层，指工程中的 html 或 jsp 等页面，作用是与用户进行交互，展示数据

C：Controller，控制层，指工程中的 servlet，作用是接受请求和响应浏览器

MVC 的工作流程：
用户通过视图层发送请求到服务器，在服务器中请求被 Controller 接收，Controller 调用相应的 Model 层处理请求，处理完毕将结果返回到 Controller，Controller 再根据请求处理的结果找到相应的 View 视图，渲染数据后最终响应给浏览器


## 什么是 SpringMVC
SpringMVC 是 Spring 的一个后序产品，是 Spring 的一个子项目

SpringMVC 是 Spring 为表述层开发提供的一整套完备的解决方案。在表述层框架历经 Strust、WebWork、Strust2 等诸多产品的历代更迭后，目前业界普遍选择了 SpringMVC 作为 Java EE 项目表述层开发的<mark>首选方案</mark>

::: tip
三层架构分为表述层（或表示层）、业务逻辑层、数据访问层，表述层表示前台页面和后台 servlet
:::

## SpringMVC 的特点
- <mark>Spring 家族原生产品</mark>，与 IOC 容器等基础设施无缝对接
- 基于原生的 Servlet，通过了功能强大的<mark>前端控制器 DispatcherServlet</mark>，对请求和响应进行统一处理
- 表述层各细分领域需要解决的问题<mark>全方位覆盖</mark>，提供<mark>全面解决方案</mark>
- <mark>代码清新简洁</mark>，大幅度提升开发效率
- 内部组件化程度高，可插拔式组件<mark>即插即用</mark>，想要什么功能配置相应组件即可
- <mark>性能卓著</mark>，尤其适合现代大型、超大型互联网项目要求




