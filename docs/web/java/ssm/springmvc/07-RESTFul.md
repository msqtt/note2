# RESTFul

## RESTFul 简介

RESTFul 是一种软件架构思想

REST: `Representational State Transfer`,表现层资源资源状态转移

- 资源
> 资源是一种看待服务器的方式，即，将服务器看作是由很多离散的资源组成.每个资源组成.每个资源是服务器上一个可命名的抽象概念.因为资源是一个抽象的概念，所以它不仅仅能代表服务器文件系统中的一个文件、数据库中的一张表等等具体的东西，可以将资源设计的要多抽象有多抽象，只要想象力允许并且客户端应用开发者能够理解.与面向对象设计类似，资源是以名词为核心来组织的，首先关注的是名词.一个资源可以由一个或多个 URL 来标识.URL 既是资源的名称，也是资源在 web 上的地址，对某个资源感兴趣的客户端应用，可以通过资源的 URL 既是资源的名称与其进行交互

- 资源的表述
> 资源的表述是一段对于资源在某个特定时刻的状态的描述.可以在客户端，服务端之间转移（交换）.资源的表述可以有多种格式，例如`HTML/XML/JSON/纯文本/图片/视频/音频`等等.资源的表述格式可以通过协商机制来确定.请求-相应方向的表述通常使用不同的格式。

- 状态转移
> 状态转移说的是：在客户端和服务端之间转移(transfer)代表资源状态的表述.通过转移和操作资源的表述，来间接实现操作资源的目的。

## RESTFul 的实现
具体说，就是 HTTP 协议里面，四个表示操作方式的动词：`GET`, `POST`, `PUT`, `DELETE`

它们分别对应四种基本操作：`GET 用来获取资源`,`POST 用来新建资源`,`PUT 用来更新资源`,`DELETE 用来删除资源`

REST 风格提倡 URL 地址使用统一的风格设计，从前到后各个单词使用斜杠分开，不使用问号键值对方式携带请求参数，而是将要发送给服务器的数据作为 URL 地址的一部分，以保证整体风格的一致性。


操作|传统方式|REST 风格
--|--|--
查询操作|`getUserById?id=1`|`user/1`, get 请求方式
保存操作|`saveUser`|`user`, post 请求方式
删除操作|`deleteUser?id=1`|`user/1`, delete 请求方式
更新操作|`updateUser`|`user`, put 请求方式

## HiddenHttpMethodFilter

在浏览器中除了使用`ajax`外，默认只能使用表单提交`GET`和`POST`请求。

其他请求方式都默认变为`GET`

因此可以使用`HiddenHttpMethodFilter`过滤器模拟除了`GET`和`POST`外的请求方式


### 实现原理

以`PUT`举例：

1. 通过在前端表单内放一个`<input type="hidden" name="_method" value="PUT"/>`隐藏标签，传输类似`_method=PUT`的 param
2. `HiddenHttpMethodFilter`在`Servlet`识别请求前，把请求类的请求方式伪装为`PUT`
3. `Servlet`识别到的请求方式为`PUT`,相应的`Controller`处理请求



![image](https://user-images.githubusercontent.com/94043894/176838688-209e6751-b583-4a4b-9605-d58d187bc04c.png)


![image](https://user-images.githubusercontent.com/94043894/176854346-2cbd0a88-b4b2-4815-a5d7-31ed96b80a23.png)

### 注册过滤器

```xml
<!-- web.xml -->
<filter>
    <filter-name>HiddenHttpMethodFilter</filter-name>
    <filter-class>org.springframework.web.filter.HiddenHttpMethodFilter</filter-class>
</filter>
<filter-mapping>
    <filter-name>HiddenHttpMethodFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

::: warning
任何过滤器必须要配置在`CharacterEncodingFilter`前面，因为一旦其他过滤器使用获取了 request 对象，`CharacterEncodingFilter`就会失效
:::




