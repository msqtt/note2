---
title: HttpSession对象
tags:
  - Web
  - Java
---
# HttpSession对象
&emsp;&emsp;**HttpSession对象** 是javax.servlet.http.HttpSession的实例，该接口并不像HttpServletRequest或HttpSerletResponse还存在一个父接口，该接口只是一个纯粹的接口。这因为session本身就属于HTTP协议的范畴。

&emsp;&emsp;对于服务器而言每一个连接到它的客户端都是一个session，servlet容器使用此接口创建HTTP客户端和HTTP服务器之间的会话。会话将保留指定的时间段，跨多个连接或来自用户的页面请求。一个会话通常对应于一时间和最后一次访问时间。在整个session中，最重要的就是属性的操作。

&emsp;&emsp;session 无论客户端还是服务端都可以感知到，若重新打开一个新的浏览器，则无法取得之前设置的session，因为每一个session只保存在当前浏览器中，并在相关的页面取得。

&emsp;&emsp;Session 的作用就是为了标识一次会话，或者说确认一个用户；并且在一次会话（一个用户的多次请求）期间共享数据。
我们可以通过request.getSession()方法，来获取当前会话的session对象。

> 客户端与服务端进行一次会话以后，每一次请求都要在cookie中带上服务端创建的sessionid

```java
//获取一个session对象，若session对象存在则获取，不存在则创建
HttpSession session = request.getSession();
//获取session的会话标识符
String id = session.getId();
System.out.println(session.getCreationTime());
//获取最后一次访问时间
System.out.println(session.getLastAccessedTime());
//判断是否是新的session对象
System.out.println(session.isNew());
```
## Session 对象作用域
&emsp;&emsp;Session 用来表示一次会话，在一次会话中数据是可以共享的，这时session作为域对象存在，可以通过setAttribute(name, value)方法向域对象中添加数据，通过getAttribute(name)从域对象中获取数据，通过removeAttribute(name)从域对象中移除数据。
```java
//获取一个session对象，若session对象存在则获取，不存在则创建
HttpSession session = request.getSession();

//设置session域对象
session.setAttribute("uname", "admin");

//获取指定名称的session域对象
String uname = (String) request.getAttribute("uname");

session.removeAttribute("uname");

```

&emsp;&emsp;数据储存在session域对象中，当session对象不存在了，或者是两个不同的session对象时，数据也不能共享了。这就不得不谈session的生命周期

## Session 对象的销毁
### 默认时间到期
&emsp;&emsp;当用户第一次请求servlet 并且操作 session 时，session 对象生成，Tomcat中session默认的存活时间为30min，即你不操作界面的时间，一旦有操作，session会重新计时。

&emsp;&emsp;session 默认到期时间可以到Tomcat中的conf 目录下的web.xml文件中修改。
```xml
<!-- session 默认的最大不活动时间，单位：分钟 -->
<session-config>
    <session-timeout>30</session-timeout>
</session-config>
```

### 自己设置到期时间
&emsp;&emsp;除了以上方法，也可以在程序中自己设置session的生命周期，通过session.setMaxinactiverval(int) 来设定session的最大不活动时间，单位为秒
```java
//获取指定名称的session域对象
HttpSession session = request.getSession();
//设置session的最大不活动时间
session.setMaxInactiverval(15);
```
&emsp;&emsp;也可以使用`getMaxInactiverval()`方法来查看当前session对象的最大不活动时间。

### 立即失效
&emsp;&emsp;或者我们也可以通过session.invalidate()的方法让session立刻失效
```java
//销毁session对象
session.invalidate();
```

### 关闭浏览器
&emsp;&emsp;从前面的JESSION可知道，session的底层依赖cookie实现，并且该cookie的有效时间为关闭浏览器，从而session在浏览器关闭时也失效了(因为没有JESSION再与之对应)

### 关闭服务器


## ServletContext 对象
&emsp;&emsp;每一个web应用都有且仅有一个ServletContext对象，又称Application对象，从名称中可知，该对象是与应用程序相关信息。例如可以通过`getSerInfo()`方法获取当前服务器的信息，`getRealPath(String path)`获取资源的真实路径等。


### ServletContext 对象的获取
```java
//通过
ServletContext servletContext1 = req.getServletContext();

//通过session对象获取
ServletContext servletContext2 = req.getSession().getServletContext();

//通过ServletConfig对象获取
ServletContext servletContext3 = getServletConfig.getServletContext();

//直接获取(只能在servlet方法中获取)

ServletContext servletContext4 = getServletContext();
```
```java
//常用方法
//1.获取当前服务器的版本信息
String servletInfo = request.getServletContext.getServletInfo();
System.out.println("当前服务器的版本信息：" + servletInfo);
//2.获取项目的真实路径
String realPath = request.getServletContext().getRealPath("/");
System.out.println("" + realPath);
```

## ServletContext 对象
&emsp;&emsp;每一个web应用都有且仅有一个ServletContext对象，又称Application对象，从名称中可知，该对象是与应用程序相关信息。例如可以通过`getSerInfo()`方法获取当前服务器的信息，`getRealPath(String path)`获取资源的真实路径等。


### ServletContext 对象的获取
```java
//通过
ServletContext servletContext1 = req.getServletContext();

//通过session对象获取
ServletContext servletContext2 = req.getSession().getServletContext();

//通过ServletConfig对象获取
ServletContext servletContext3 = getServletConfig.getServletContext();

//直接获取(只能在servlet方法中获取)

ServletContext servletContext4 = getServletContext();
```
```java
//常用方法
//1.获取当前服务器的版本信息
String servletInfo = request.getServletContext.getServletInfo();
System.out.println("当前服务器的版本信息：" + servletInfo);
//2.获取项目的真实路径
String realPath = request.getServletContext().getRealPath("/");
System.out.println("" + realPath);
```

### ServletContext 域对象
&emsp;&emsp;ServletContext也可以当作域对象来使用，通过向ServletContext中储存数据，可以使得整个应用程序共享某些数据。当然不建议存放过多数据，因为ServletContext中的数据一旦存储进去没有手动移除将会一直保存。
```java
//获取ServletContext对象
SevletContext servletContext = req.getServletContext();
//设置域对象
servletContext.setAttribute("name", "admin");
//获取域对象
String name = (String) servletContext.getAttribute("name");
// 移除域对象
servletContext.removeAttribute("name");
```
> servlet的三大域对象
>
> 1.request域对象<br>
> 在一次请求中有效。请求转发有效，重定向失效。
> 
> 2.session域对象<br>
> 在一次会话中有效。请求转发和重定向有效，session销毁后失效
>
> 3.servletContext域对象<br>
> 在整个应用程序中有效。服务器关闭后失效

> 领域越大，占用内存的时间越长，尽量使用范围小的域对象
