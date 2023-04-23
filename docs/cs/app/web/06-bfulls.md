# 全栈应用之后

如果所有的这些还没有使你迷惑的话，请尝试了解全栈应用的最新发展。学习了从传统网站到全栈应用的全部发展，你可能已经注意到了从 X 转换到 Y 经常会使事件更加复杂ヽ(´･д･｀)ﾉ...

- 服务端路由(X) 到 客户端路由(Y)
  - 过大的 bundle 体积问题可以被代码拆分技术解决
- 服务端渲染(X) 到 客户端渲染(Y)
  - 对于数据的额外(waterfall)请求
    - 额外数据的获取与状态管理
    - 留给用户很多的加载 spinners

接下来，我想要给你展示两个方法，它们的理念(SSR, SSG)不是新的，但是非常的强大 ┗|_｀ 0′_|┛(super powerful)。使用现代库(React)和顶层的框架(meta frameworks on top，Next.js, Gatsby.js) 使这些方法成为可能。
我是一个 React 开发者，这是为什么对于这些技术的建议有偏心，但是我很确定你也能根据你的喜好找到相似的技术。

## 服务端渲染 2.0(SSR)

我们之前已经学过关于 Web2.0 的服务端渲染。在稍后的时间点，全栈应用解藕了 client 和 server 并引进了
客户端渲染。因此何不进一步学习如何使用 React 来写 服务端渲染？

当我们使用基于 React 之上的 Next.js 流行框架，你仍然在开发 React
应用，但是你使用 Next.js 实现的所有东西都会变成服务端渲染的。在 Next.js 中，你实现了每一个页面(e.g.
/about, /home)，当一个用户从页面导航到另一个页面时，只有一部分被渲染 React
被发送到浏览器。它的伟大之处是：你已经能够请求数据来填充服务器上的空白，使用 React
插入数据并将其毫无间隙地发送到 client。

![image](https://user-images.githubusercontent.com/94043894/233791600-011d6fd2-75bb-4f74-b7da-71d833290bb4.png)

这与客户端渲染是不同的，因为 React
只接管了客户端，并且只有在在客户端没有数据的情况下，才开始请求数据来填补空白。

使用 SSR React，你能够在服务器上的 React 中插入数据，也可以选择在 client 等应用加载完后，再获取数据。客户端渲染与服务端渲染两个选项可以被混合使用。

- 优点：client 接收 已经填写了数据的 html(针对 UX 与 SEO 改进)
- 缺点：client 可能需要等待更长的时间，因为填充的 html 是在服务器上动态创建的(http
  缓存最大限度地减少了这个问题)

## 静态网站生成(Static Site Generation SSG)

传统的网站使用从 web server 获取的静态文件在浏览器上渲染。我们已经学习过，既没有 application server
的参与也没有服务端渲染的参与。传统网站的方法是很简单的，因为一个 web server
只是托管你的文件并且对于每一个 URL，用户访问浏览器时，都会发起一个请求来获取必要的文件。那么我们如何使用 React
来写 Static files?

React 本身不是为了静态文件而制作的。相反，React 只是动态在客户端创建应用的 javascript 文件。

然而，Gatsby.js 是一个 基于 React 之上的框架，它被用来制作 SSG React 应用。 Gatsby 使用 React
应用并把它编译为静态 html 与 javascript 文件。然后，所有这些文件能被托管在 web server
上。如果用户访问 url ，静态文件被返回给浏览器。

![image](https://user-images.githubusercontent.com/94043894/233822569-89f27057-bbc1-46cf-b36b-b97b3b7e12d0.png)

相反于服务端渲染的 React，静态文件不是当用户发送请求时立即被创建的，而是在 build time
时就被创建好的。这可能对经常改变数据的动态内容来说是个缺点(e.g. 电子商务
eCommerce)，然而对于营销页面或者博客这种内容不会经常变动网站来说，只 build
一次或许是个完美的方案。
