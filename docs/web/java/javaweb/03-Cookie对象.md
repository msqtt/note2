---
title: Cookie
tags:
  - Web
  - Java
---
# Cookie 对象
Cookie 是浏览器提供的一种技术，通过服务器能将一些只须保存在客户端，或者在客户端进行处理的数据，放在本地的计算机上，不需要通过网络传输，因而提高网页的处理效率，并且能够减少服务器的负载，但是由于Cookie 是服务端保存客户端的信息，所以其安全性也是很差的。例：常见的记住密码则可以通过Cookie 来实现。

专门操作Cookie 的类`javaxx.servlet.http.Cookie`，随着服务器的响应发送给客户端，保存在浏览器，当下次再访问服务器时把cookie再带回服务器。

**Cookie 的格式**：键值对用`=`链接，多个键值对间通过`;`隔开


## Cookie 的创建和发送
通过 `new Cookie("key", "value");`来创建一个cookie对象，要想将cookie随响应发送到客户端，需要先添加到response对象中，`response.addCookie(cookie);`此时该cookie对象则随着响应发送至了客户端。在浏览器上可以看见。
```java
//创建
Cookie cookie = new Cookie("name", "admin");
//发送
response.addCookie(cookie);
```

## Cookie 的获取
在服务端只提供了一个`getCookies()`的方法来获取客户端回传的所有cookie 组成的一个数组，如果需要获取单个cookie则需要通过遍历，`getName(`)获取Cookie的名称，`getValue()`获取cookie的值

```java
//获取cookie数组
Cookie cookies = request.getCookies();
//判断数组是否为空
if (cookies != null && cookies.length() > 0){
        //遍历数组
        for (Cookie cookie : cookies){
                System.out.println(cookie.getName());
                System.out.println(cookie.getValue());
            }
    }
```

## Cookie 设置到期时间
除了Cookie的名称和内容外，我们还需要关心一个信息，到期时间，到期时间用来指定该cookie何时失效。默认为当前浏览器关闭即失效，我们可以手动指定到期时间，通过setMaxAge(int time);方法设定cookie 的最大有效时间，以秒为单位。

**到期时间的取值:**

- 负整数

  若为负整数，表示不储存该cookie。cookie 的 maxAge属性的默认值就是-1，表示只在浏览器中存活，一旦关闭浏览器窗口，那么cookie就会消失
- 正整数

  若大于0的整数，表示存储的秒数。表示cookie对象可存活指定的秒数。当生命大于0时，浏览器会把Cookie保存到硬盘上，就算关闭浏览器，就算重启客户端电脑，cookie也会存活相应的时间。
- 零

  若为0，表示删除该cookie。cookie生命等于0是一个特色的值，它表示cookie被作废，也就是说，如果原来浏览器已经保存了这个cookie，那么可以说通过设置`setMaxAge(0)`来删除这个cookie。无论在浏览器内存中还是在客户端的硬盘上都会删除这个cookie

**设置cookie对象指定的时间后失效**
```java
//创建cookie对象
Cookie cookie = new Cookie("name", "admin");
//设置cookie的存活时间
cookie.setMaxAge(30);
//返回cookie
resp.addCookie(cookie);
```

## Cookie的注意点
1. Cookie保存在当前浏览器中

   在一般的站点中常常有记住用户名这样一个操作，该操作只是将信息保存在本机上，换电脑以后这些信息就无效了，而且cookie 无法跨浏览器。

2. Cookie存中文问题

   cookie 中不能出现中文，如果有中文则通过`URLEncoder.encode()`来进行编码，获取时通过`URLDecoder.decode()`解码

```java
String name = "名字";
String value = "小明";
//编码
name = URLEncoder.encode(name);
value = URLEncoder.encode(value);
//创建cookie对象
Cookie cookie = new Cookie(name, value);
resp.addCookie(cookie);
```
```java
//获取时通过URLEncoder.decode()来解码
String name = URLdecoder.decode(cookie.getName());
String value = URLdecoder.decode(cookie.getValue());
```
3. 同名Cookie问题
   
   如果服务器端发送重复的Cookie那么会覆盖原有的cookie
4. 浏览器存放cookie 的数量

   不同的浏览器对Cookie也有限定，cookie的存储有上限(大小在4kb左右)。Cookie是存在客户端(浏览器里)的，而且一般是由服务器创建和设定。后期结合Session来实现回话追踪。

## Cookie 的路径
Cookie 的setPath设置cookie路径，这个路径直接决定了服务器的请求是否会从浏览器中加载某些cookie。

1. 当服务器下任何项目的任意资源都可获取cookie对象
```java
Cookie cookie = new Cookie("name", "value");

cookie.setPath("/");
resp.addCookie(cookie);
```
2. 当前项目下的资源可获取Cookie对象(默认不设置Cookie的path)
```java
Cookie cookie = new Cookie("name", "value");

cookie.setPath("/test1");
resp.addCookie(cookie);
```
3. 指定项目下的资源可获取Cookie对象
```java
Cookie cookie = new Cookie("name", "value");

cookie.setPath("/test2");
resp.addCookie(cookie);
```
4. 指定目录下的资源可获取Cookie对象
```java
Cookie cookie = new Cookie("name", "value");

cookie.setPath("/test2/cook4");
resp.addCookie(cookie);
```

&emsp;&emsp;如果设置path，且当前访问的路径包含了cookie的路径(当前访问路径在cookie路径基础上要比cookie的范围小) cookie就会加载到request对象之中

&emsp;&emsp;总结：当访问的路径包含了cookie的路径时，则该请求将带上该cookie；如果访问路径不包含cookie路径，则该请求不会携带该cookie
