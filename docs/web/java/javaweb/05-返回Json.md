---
title: Json
tags:
  - Web
  - Java
---
# 返回Json
## 直接返回纯文本

优点是简单，缺点是要手动重写toString方法，如果有很多类要传输，需要重写所有的类
```java
package com.updownloadfiles.servlet;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/json")
public class Json extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
       resp.setContentType("text/json;charset=UTF-8"); //设置返回的头文件为json
       resp.setCharacterEncoding("UTF-8");
       PrintWriter out = resp.getWriter();
       String str = "{\"年龄\":\"admin\", \"年龄\":\"18\"}";

       out.println(str);
       out.flush();
       out.close();
    }
}
```

## 使用三方jar
有很多已经完善好的包可以使用(fastjson, gson，jackson等)，快捷方便地把对象转换为json格式

仅以fastjson为例
```java
package com.xxxx.servlet;

import com.alibaba.fastjson.JSON;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;

@WebServlet("/json")
public class Json extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html");
        resp.setCharacterEncoding("UTF-8");

        HashMap usr = new HashMap();
        usr.put("admin", "123");
        usr.put("mosquito", "255");

        String json = JSON.toJSONString(usr);

        PrintWriter out = resp.getWriter();

        System.out.println(json);
        out.print(json);

        out.flush();
        out.close();
    }
}
```
