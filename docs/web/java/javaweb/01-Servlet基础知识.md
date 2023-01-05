---
tital: Servlet知识
tags:
  - Web
  - Java
---

# Servlet


## Servlet类的映射
映射一个类的方法有两个

1. 写注解, 让tomcat知道应该调用那个类
```java
@WebServlet("/webxxx")
```

2. 编辑web.xml, 把映射信息写入
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    <servlet>
        <servlet-name>HelloServlet</servlet-name>
        <servlet-class>com.servlet.HelloServlet</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>HelloServlet</servlet-name>
        <url-pattern>/hello</url-pattern>
    </servlet-mapping>
</web-app>
```

## Servlet 的生命周期
1. `init()` 创建servlet 实例对象时执行, 只会执行一次
2. `service()` 当有请求访问servlet 时执行, 可执行多次
3. `destroy()` servlet 实例对象删除后执行, 执行一次

## Servlet 生命周期
1. Web Client 向 Servlet 容器(tomcat) 发出 Http 请求
2. Servlet 接受 Web Client 的请求
3. Servlet 容器创建一个 HttpServletRequest 对象 , 将 Web Client 请求的信息封装到这个对象中
4. Servlet 容器创建一个HttpServletResponse 对象
5. Servlet 容器调用HttpServlet对象 service方法， 把 Request 和 Response 作为参数，传给HttpServlet
6. HttpServlet 调用 HttpServletRequest  对象的有关方法， 获取Http请求信息
7. HttpServlet 调用 HttpServletResponse 对象的有关方法，生成响应数据
8. Servlet 容器 把HttpServlet 的响应结果传给Web Client
