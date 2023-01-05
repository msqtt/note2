# SpringMVC 的视图

SpringMVC 中的视图是 View 接口，视图的作用渲染数据，将模型 Model 中的数据展示给用户

SpringMVC 视图的种类很多，默认有<strong>转发视图 InternalResourceView</strong> 和<strong>重定向视图 RedirectView</strong>

当工程引入 jstl 的依赖，转发视图会自动转换为 JstlView

若使用的视图技术为 Thymeleaf，在 SpringMVC 的配置文件中配置了 Thymeleaf 的视图解析器，由此视图解析器解析之后所得到的是 ThymeleafView


## ThymeleafVIew
当控制器方法中所设置的视图名称没有任何前缀时，此时的视图名称会被 SpringMVC 配置文件中所配置的视图解析器解析，视图名称拼接视图前缀和视图后缀所得到的最终路径，会通过转发的方式实现跳转

```java
@RequestMapping("/test")
public String testHello(){
    return "hello";
}
```

![image](https://user-images.githubusercontent.com/94043894/176602263-73570be1-f3d5-4764-b4d0-ffe1a54db9cf.png)


## 转发视图
SpringMVC 中默认的转发视图是 InternalResourceView

SpringMVC 中创建转发视图的情况：

当控制器方法中所设置的视图名称以`forward:`为前缀时，创建 InternalResourceView 视图，此时的视图名称不会被 SpringMVC 配置文件所配置文件中所配置的视图解析器解析，而是会将前缀`forward:`去掉，剩余部分作为最终路径通过转发的方式实现跳转

例如：`forward:/`, `foward:/employee`


```java
@RequestMapping("/testForward")
public String testModel(){
    return "forward:/test";
}
```

![image](https://user-images.githubusercontent.com/94043894/176609371-32261118-6f3b-4d36-80ab-9d6e04d07d4d.png)




## 重定向视图

SpringMVC 中默认的重定向视图是 RedirectView

当控制器方法中所设置的视图名称以`redirect:`为前缀时，创建 RedirectView 视图，此时的视图名称不会被 SpringMVC 配置文件中所配置的视图解析器解析，而是会将前缀`redirect:`去掉，剩余部分作为最终路径通过重定向的方式实现跳转

例如：`redirect:/`, `redirect:/employee`

```java
@RequestMapping("/testRedirect")
public String testRedirect(){
    return "redirect:/test";
}
```

![image](https://user-images.githubusercontent.com/94043894/176612981-d5b34b24-d640-4db7-bf27-468172b1c661.png)

![image](https://user-images.githubusercontent.com/94043894/176613420-8a55a251-c4b3-4a6d-b34f-3a49b0d897e0.png)


::: tip
重定向视图在解析时，会先将`redirect:`前缀去掉，然后会判断剩余部分是否以`/`开头，若是则会自动拼接上下文路径
:::

## 视图控制器 view-controller
当控制器方法中，仅仅用来实现页面跳转，即只需要设置视图名称时，可以将处理器方法使用`view-controller`标签进行表示

```xml
<mvc:view-controller path="/" view-name="index"></mvc:view-controller>
```
::: tip
`path`: 设置处理的请求地址
`view-name`: 设置请求地址所对应的视图名称
:::

::: tip
当 SpringMVC 中设置任何一个`view-controller`时，其他控制器中的请求映射将全部失效，此时需要在 SpringMVC 的核心配置文件中设置开启 mvc 注解驱动的标签：
`<mvc:annotation-driven/>`
:::

## 视图解析器 InternalResourceViewResolver

其他配置文件和普通的 MVC 工程一样，只需要把 ThymeleafViewResolver 的部分修改

``` xml
<!-- SpringMVC.xml -->

<!-- 自动扫描包 -->
<context:component-scan base-package="com.demo.controller"></context:component-scan>

<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
    <property name="prefix" value="/WEB-INF/templates/"/>
    <property name="suffix" value=".jsp"/>
</bean>
```

```html
<!-- index.jsp -->
<a href="${pageContext.request.contextPath}/success">Success!</a><br>
```
