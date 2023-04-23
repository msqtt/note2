# 单页应用

2010 年之后单页应用的崛起使 Javascript 流行。在这之前，网站主要是由 html、css 和一点 javascript 组成的，那一点 javascript 是用来写动画或则操作 dom(eg: removing, adding, moditying of html elements)，也仅此而已。在当时，jQuery 是完成这些事最流行的工具。

但是谁又知道，整个网站应用的渲染，都将会被 javascript 完成？在 Reach.js、Vue.js 前也有一些早期的库/框架用来写单页应用，Knockout.js Ember.js and Angular.js。它们大多数仍然活跃在现代的 web application 开发中。

在单页应用之前，浏览器会为了加载一个网站向 web server 请求 html 文件中所有被 linked
的所有文件。如果一个用户从一个页面导航到同域名的另一个页面，将在每一次导航都发送一个新的请求。

![image](https://user-images.githubusercontent.com/94043894/233555607-e5183800-9c84-45b5-a904-a4e4f2e8016a.png)

相反，单页应用 把全部的应用 用 javascript(知道如何把 html css 渲染出来)
封装起来了。对于大多数的单页应用，浏览器对于同一个域名仅仅请求一次 linked 了 javascript 的 html 文件。

![image](https://user-images.githubusercontent.com/94043894/233556687-b204d722-4804-4abd-be0a-758a369b3ff1.png)

单页应用中被请求的 html 仅仅只是请求 javascript(bundle.js) 的中间人，请求结束后 bundle.js
将会在 client 被处理/解决(resolved)，然后被渲染(render)在 html 里(id ="app")

```html{7,8}
<!DOCTYPE html>
<html>
  <head>
    <title>Hello HTML File which executes a React Application</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="./bundle.js"></script>
  </body>
</html>
```

从上面高亮的位置，React 将会接手`./bundle.js`中的那些 javascript。

```javascript{6}
import * as React from "react";
import ReactDOM from "react-dom";

const title = "Hello React";

ReactDOM.render(<div>{title}</div>, document.getElementById("app"));
```

在这个小的 React 应用中，只有一个变量 title 将被展示在 html div 元素里。然而，所有在 html div
标签中的内容都会被在 React 组件里的所有 html 结构取代，它的语法结构叫做`JSX`

这其实就是早期的模板引擎，但它只是在 client 被执行了，而不是在 server
，因此这不再是服务端渲染(server-side-rendering)

因为从 server 执行渲染到 client 执行，我们现在把此过程称为**客户端渲染(client-side-rendering)**。换句话说，再也不是 web server 直接提前渲染 html ，而它主要只是返回 用于在 client 执行 html 渲染的 javascript。通常，SPA 这个术语与客户端渲染应用(client-side rended application) 同义。

![image](https://user-images.githubusercontent.com/94043894/233562180-21417633-17ab-43e0-ad1a-4212486596b1.png)

如果 SPA 只从 web server 被请求一次，这意味着，当它从相同域名的一个页面导航到另一个页面时 不需请求其他的 html，它是如何运作的？

最初请求的 基础 spa 的 javascript
文件中封装了一个网站所有的页面。导航从一个页面到另一个页面不会发送任何请求到 web
server，而客户端路由(e.g. React Router for React) 从初始请求的 javascript 文件中接手渲染正确的页面的工作。

![image](https://user-images.githubusercontent.com/94043894/233602857-59bbf86b-ab2c-4ae0-9d6a-f24c8b505013.png)

简而言之，一个基础的单页应用使用客户端渲染/路由，而不是服务端渲染/路由，同时只从 web server
检索整个应用一次。单页应用之所以是单页，因为它请求把整个应用只使用一个请求，而且它只是一个 linked 了 javascript 文件的 html 页面。所有的 UI 页面都被封装并且被执行在了客户端。

可以说，在我们有单页应用之前，我们一直在多页应用上工作，因为对于每一个页面(e.g.
/about)，都有一个新的请求被发送到 web server 去检索它所有必要的文件。

然而，多页应用这个术语实际上不是一个新东西，因为在单页应用变得流行之前它就是默认的方案。

## 拆分代码 code splitting

我们已经知道了单页应用默认情况下是被装载在一个小 html 文件和一个 js 文件之中的。

javascript 文件刚开始还很小，但是当你的应用开始变得更大时，它开始增长体积了 😫，因为更多的 javascript 被打包到一个 bundle.js 文件里。这影响了 SPAs 用户的体验，因为从初始化加载时间到从 web server 传输 javascript 文件的时间最终都增长。当所有文件都被加载好了，用户就能从一个页面导航到另一个页面而毫无中断(good)， 但相反，初始化的加载时间也会降低用户的体验(bad)。

![image](https://user-images.githubusercontent.com/94043894/233610180-2c5ca78a-6fef-40ab-bdf5-46f5a690ebef.png)

请求整个应用的 javascript 文件，成为一个缺点一旦应用增长了体积。

对于一个更加复杂的单页应用，像**拆分代码(也叫 lazy loading 在 React + React Router)**的技术仅在当前页面，应用所被需要的一部分页面被使用(e.g. mywebsite.com/home)。当导航到下一个页面(e.g. mywebsite.com/about)，另一个请求被发送到 web server 来请求此页面的一部分。

![image](https://user-images.githubusercontent.com/94043894/233612968-c58ae641-0bb0-466f-8bef-4a1116272446.png)

如果回顾一下传统网站如何工作，你将会发现这与启用拆分代码的 SPAs 非常相似。

对于一个传统的网站，每一次用户导航到一个新路由，一个新的 html 文件(带有可选的 css js 和其他静态文件)会被加载。

对于 带有路由级别代码拆分 SPAs，每一次导航都会导致请求新的 javascript 文件。

我们仍然能把这叫做单页应用吗？或者说我们返回到了多页应用？你看技术最终会变得有多么模糊 💩。

拆分代码不需要像之前的场景一样全部发生在路由级别。比如，也可将更大的 React 组件提取到它独立的
javascript 包中，以至于这些包只在在它们实际被使用的时候才被加载。

![image](https://user-images.githubusercontent.com/94043894/233617753-b95f44be-d537-4f2c-8b5e-d9b54fe44aba.png)

然而，这导致了浏览器向 web server 请求重复(冗余)的代码。当用户导航到一个拆分代码的路由两次时同样也会发生，因为 从 web server 请求得到的同份代码也被加载了两次。因此，我们想要使用浏览器去缓存(储存在用户电脑的浏览器里)返回的结果。

![image](https://user-images.githubusercontent.com/94043894/233638933-e874a43b-7806-4307-8937-cdc17acf9aa1.png)

现在，如果打包好的 table.js 文件发生了变化，会发生什么？如果我们把新功能引入到 table(e.g. paginated view or tree view)，并且 caching 是启用的，我们在浏览器仍然会看到老版本的 table 组件。

这个问题的一个解决办法是：每一次应用新的更新，检查 bundled code 是否改变了。如果已经改变，它将得到一个带有 基于时间戳 hash 的新文件名(e.g. table.hash123.js)。

当浏览器使用缓存的文件名请求文件，它将使用缓存的版本。然而，如果文件已经改变那么它它会有一个新的哈希名，浏览器将请求新的文件，因为缓存的版本已经过时了。

另一个例子是拆分三方 javascript 库的代码。对于实例来说，当为 React 安装一个 包含了各种组件 UI
库，代码拆分也会被应用。每一个组件是一个独立的 javascript
文件。当从 UI 库中引入按钮组件，只有按钮的 javascript 被引入而不会引入其他组件。

对于把 React 应用或库打包进一个或多个(使用代码拆分 code splitting) javascript 文件的场景，有另一个技术叫做 **tree
shaking** 它能消除 dead code(未使用的代码 unused
code)，以至于那些代码不会被打包进最后的 bundle 中。

历史上，以下的 bundlers 被使用在 javascript:

- Grunt(2012)
- Gulp(2013)
- Webpack(2014+)
- Rollup(mainly libraries)
- esbuild(2020+)
- vite(2020+?不确定)
