---
title: HttpServlet类
tags:
  - Web
  - Java
---
# HttpServletRequest 对象
主要作用是获取Client 发送的各种信息
HttpServletRequest 是 ServletRequest 的子接口, ServletRequest只有一个接口

| 方法 | 作用 | 
| ---- | ---- |
|  getRequestURL()  |  获取 请求行完整URL  |
|  getRequestURI()  |  获取 请求行部分URL(资源名称部分,从项目站点名开始，到？前结束)|
|  getRequestString() | 获取 请求行中的参数部分 从？后开始| 
|  getMethod()  |  获取 客户端请求的方式  |
|  getProtocol()  |  获取 HTTP 版本号 |
|  getContextPath()  |  获取Webapp 名字  |
> 以上为常规方法，返回值为Stringbuffer

<br>

| 方法 | 作用 | 
| ---- | ----- |
|  **getParameter()**  |  获取指定名称的参数(重要)  |
|  getParameterValue   |  获取指定名称的参数的所有值  |(多用于复选框)
> 以上为特殊方法，返回值为String，getParameterValue 返回字符串数组

<br>

## 请求乱码问题

由于request接受客户端的参数，所有其默认的语言编码，默认编码为 ISO-8859(此编码不支持中文) 所以会出现乱码，因此需要设置request 的编码，以支持中文。

两种方式:

1. 设置request 中的编码方式，告诉服务器以何种方式解析数据
2. 在接受数据后再通过相应的编码格式还原

```java
//1.
request.setCharacterEncoding("UTF-8");    //只针对post有效

//2, 针对Tomcat7及以下GET请求的解决办法
String usrName = new String(request.getParameter("usrname").getBytes("ISO-8859-1"), "UTF-8");
```
> 1. Tomcat8 get 方法输入的中文不会乱码，post会。
> 2. Tomcat7 及以下 get 方法和 post 方法 都会乱码
> 2. 亲测 Tomcat10 post输入中文也不会乱码

## 请求转发
请求转发是一种服务器行为，当客户端请求到达后，服务器会进行转发，此时会将请求对象进行保存，**地址栏中的URL不会改变**，得到响应后，服务端再将响应发送给客户端，**从始至终只有一个请求发出**，达到多个资源协同响应的效果。

可以让请求从服务器跳转到客户端(或跳转到servlet)

特点：

1. 服务端行为
2. 地址栏不会发生改变
3. 从始至终只有一个请求
4. 数据可以共享

实现:
```java
request.getRequestDispatcher(url).forward(request, response);
// url 为要跳转到的 Servlet 或 html  
// 给另一个Servlet 传递request 和 response 对象
```
> 只能跳转一次，结果会返回，地址栏不变

## request 作用域(域对象)
通过该对象可以在一个请求中传递数据，作用范围：在一次请求中有效，即服务器跳转有效。

```java
//设置域对象内容
request.setAttribute(String name, Obeject value);
//获取域对象内容
request.getAttribute(String name);
//删除域对象内容
request.removeAttribute(String name);
```
request 域对象中的数据在一次请求中有效，即经过请求转发，request域中的数据依然存在，即在请求转发的过程中可以通过request来传输/共享数据。


# HttpServletResponse 对象
主要功能用于服务器对客户端的请求进行响应，将Web服务器处理后的结果返回客户端。service()方法中形参接受的是 HttpServletResponse接口的实例化对象，这个对象封装了向客户端发送数据，发送响应头，发送响应状态码的方法。


## 响应数据

接收到客户端请求后，可以通过 HttpServletResponse 对象直接进行响应，响应时需要获取输出流。

有两种形式:

- **getWrite() 获取字符流(只能响应回字符)**
- **getOutputStream()获取字节流(能响应一切数据)**

> 两者不能同时使用，因为response 对象只能响应一次，响应一次后该对象就消失了。

响应回的数据到客户端被浏览器解析

```java

//字符流
PrintWriter writer = response.getWrite();
writer.writer("Hello");
writer.writer("<h2>hello<h2>");

//字节流
ServletOutputStream out = response.getOutputStream();
out.writer("hello".getBytes());
out.writer("<h2>hello</h2>".getBytes());

```

## 响应乱码问题
如果响应数据中含有中文，则很有可能出现乱码问题
，这是**服务端**和**客户端**的**编码格式不同**造成的。
### getWrite()的字符乱码
对于getWrite()获取到的字符流必定会乱码，由于服务端在进行编码时默认会使用`ISO-8859-1`格式编码，该编码不支持中文。
要解决这种乱码问题，只能在服务端告知服务器使用一种能支持中文的编码格式，如`UTF-8`;

解决:

1. 设置服务端的编码
2. 设置客户端的编码
> 即设置客户端和服务端一致的编码格式，且支持中文

```java
// 单独设置客户端和服务端的编码格式
// 在获取输出流前设置服务端编码格式
response.setCharacterEncoding("UTF-8");
// 设置客户端的编码格式和响应的MINE类型
response.setHeader("content-type", "text/html;charset=UTF-8");



// 同时设置客户端和服务端的编码格式
response.setContentType("text/html;charset=UTF-8");
```

### getOutputStream()字节乱码
由于响应的是字节数据，若服务端与客户端编码不一致同样会出现乱码问题，解决方法与上面是一样的，需要同时设置服务端和客户端的编码格式。



## 重定向
重定向是一种服务端指导客户端的行为。客户端发出第一个请求被服务器接受处理后，服务器会进行响应，在响应的同时,服务器会给客户端一个新的地址，保存在location中( 下次请求的地址response.sendRedirect(url)),当客户端接收到响应后，会立刻，马上，自动根据服务给的新地址发起第二个请求，服务器接受请求并作出响应，重定向完成

重定向特点：

1. 服务端指导，客户端行为
2. 存在两次请求
3. 地址栏会发生改变
4. request 对象不共享(数据不共享)
> 如果不是隐私的信息，其实可以使用`resp.sendRedirect(url+"?xxx=xx");`的方式在重定向下传输数据


# 请求转发和重定向的区别
请求转发和重定向的比较:
 请求转发(req.getRequestDispatcher().forward(req, resp)) | 重定向(resp.sendRedirect())
 :-: | :-: 
 一次请求，数据在request 域中共享 | 两次请求， request 域中数据不共享 
 服务端行为 | 客户端行为 
 地址栏不改变 | 地址栏改变 
 绝对地址定位到站点后(无法跨域跳转) | 绝对地址可写到 http:// 
