# 全栈应用

我们正在进入全栈应用的模式，它与 SPAs 同一时间变得流行。一个全栈应用包含 client (e.g. SPA)与 server 应用。如果公司正在寻找全栈开发者，它们经常想要一些人能够在两端创建 client-server 应用。有时 client 与 server 共享相同的编程语言(e.g. 用 javascript 写 React client，用 javascript 写 node.js server)，但也不是必须的。

Anyway，为什么我们需要全栈应用？全栈应用的需求由于单页应用在客户端的兴起而应运而生。

![image](https://user-images.githubusercontent.com/94043894/233665041-2123d5d9-77f5-49a7-965c-f2b298fd08e7.png)

目前为止，我们从 只使用 html/css/javascript 的传统网站到现代的 web 应用。

渲染静态内容还行，但是我们如何渲染动态内容呢，比如用户具体的内容像 post 的博客(参考 web 2.0，但是这次是客户端渲染)，在处理由客户端渲染接管的 SPA 时，是否仅从 Web 服务器向客户端 请求 JavaScript（和少量 HTML）？

![image](https://user-images.githubusercontent.com/94043894/233671965-686e165a-585b-42fb-bc08-1052accc8074.png)

SPA 应用(被封装到 javascript 文件)没有任何用户的具体数据。因为这只是页面的逻辑。

他们看起的样子和他们如何表现区间用户的交互。实际的数据不是嵌入到页面里的，因为它们也不是在服务端进行嵌入，而是仅仅保存在某个数据库里。当你从服务端渲染转换到客户端渲染，这些是你必须要做出的权衡。

所以，从 client 发送到 server 的另种请求必须包含 client
缺少数据，这样才能把空白的页面填上。客户端的模板引擎(e.g. JSX in React)
负责把这些内容(data)嵌入到结构(html)中。

![image](https://user-images.githubusercontent.com/94043894/233677511-980e107a-91a5-41a8-b3dd-950df4d1644d.png)

实质上，当处理客户端渲染应用时，有两次请求的往返：

1. 请求 javascript 应用本体
2. 请求需要用来填充的数据

一旦浏览器渲染完成所有内容，一个用户开始与应用交互(比如创建一篇博客)，JSON 是 client 与 server 之间通讯的首选格式。

server 通过读写数据库的方式来处理所有来自 client 的请求。

![image](https://user-images.githubusercontent.com/94043894/233775193-2a53b100-670f-4abe-8430-97874021d04c.png)

SPAs
从一开始就伴随着没有所有数据可供使用的警告。它们必须请求所有必要的数据来填充空白的部分。

最终，用户浏览该网页时，他们会注意到客户端渲染应用分为两种方式：

1. 第一种，几乎在任何地方都有加载 spinners，有时是整个页面都有一个加载 spinners，然后被成很多个小部件的加载
   spinners (请求瀑布，waterfall requests)。因为在渲染初始页面后，SPAs 开始请求数据。

2. 第二种，从一个路由到另一个路由是及时的(没有引入代码拆分，因为向 server 请求额外的 bundle，感觉有点慢 )。这是 SPA 给我们带来的好处。

除了往返获取额外的数据，客户端渲染应用不得不应对**状态管理( state mangagement
)**的挑战，因为用户的交互和数据都需要在 client 的某个地方被保存与管理。

请考虑使用 SPA 时会遇到的以下挑战：用户作为作者访问他们能发布博客的网站。在当前页面，用户可以看到他们发布的所有博客，并且这些博客在页面加载的时候需要被请求。这些被获取的博客在客户端的代码内存里被保存为状态。现在当一个用户开始与页面或数据交互，每篇博客都有一个按钮，它允许用户单独删除每一个条目。当用户点击删除按钮时，发生了什么？看看下面的场景：

一个用户点击了删除按钮，它发送了一个带有博客 id 作为内容(负载 payload)与相应指令(一般 http delete
就足够了)的请求到 application server 来删除博客。在 server 通过所有的权限认证之后(e.g.用户是否授权、博客是否存在、博客是否属于用户)，server 委托命令到数据库删除对应的博客。数据库确认命令成功执行后返回到 server 然后 server 发送一个 response 到 client。现在 client 不仅要从内存中的本地状态中移除该博客，还要再次从 server 获取所有的博客并更新内存中的博客。

当执行客户端路由时，对数据的请求可以通过状态管理来达到最小化。这意味着理想的情况下，一个用户从一个页面路由到另一个页面并再次返回初始页面时，不应该触发第二次初始页面所需数据的请求。它应该直接使用已经被缓存在 client 状态管理里的数据。

最后，client 与 server 之间的接口叫做 API。尽管在编程中有很多东西也叫 API，在这个例子中，对于两个远程的实体(client 与 server)来说这也是一个特别种类的 API，

## 前端与服务端的通讯

传统的全栈应用使用 **REST** 作为它们的 API 规范，它使用了 http 中的请求方式作为 CRUD
的操作指令。

当使用 REST API 时， 我们在 RESTful 资源上使用这些 http 方法。比如，一个 RESTful
资源可以是一篇博客的发布。一个用户能通过向 application server 发送 http GET 读取博客，或发送 http
post 请求创建新的博客。

![image](https://user-images.githubusercontent.com/94043894/233781593-959aa955-aad2-43f8-88e6-7fdbfe55d447.png)

使用 REST API 连接 client 与 server
应用不需要它们使用同一种编程语言实现。它们只需要提供一个库能够发送/接收 http 请求/响应。REST
是一种没有数据格式(过去也使用过 xml，现在使用 json)和编程语言约束的通讯的规范。

![image](https://user-images.githubusercontent.com/94043894/233782111-34c92b31-2483-4ff9-af22-a28667f66ccb.png)

对于 APIs 来说， REST 的一种现代替换方案是 在 client 与 server 之间使用 GraphQL。

GraphQL 也不受数据格式的限制，并且与 REST 相反它不受限于 http，但是我们大多数情况下也会在它上看到 http 和 json 的使用。

到目前为止讨论的技术，全栈应用把 client 和 server 解耦了，两者通过精选的 API(e.g. REST or GraphQL) 进行通讯。当 client 在浏览器为网页应用渲染了所有必要的东西时， server 应用处理来自 client 的读写数据请求。
