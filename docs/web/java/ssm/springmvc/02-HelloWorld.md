# HelloWorld
创建一个简单的项目，快速了解 SpringMVC

## 开发环境

IDE: idea 2022.1

构建工具：maven 3.8.1

服务器：<mark>tomcat 8.5</mark>

Spring 版本：5.3.21


## 创建 maven 工程
### 添加 web 模块

- `project/src/main/`下新建`webapp`文件夹
![image](https://user-images.githubusercontent.com/94043894/175803479-623703cc-93d8-4c7b-ac41-0661c6ff0865.png)

- `Project Structure`>`Modules`>`Web`>`Deployment Descriptors`新建`web.xml`

![image](https://user-images.githubusercontent.com/94043894/175804154-b3d30959-1401-4210-b191-f199bd39c8dc.png)

::: warning
注意路径为`Project/src/main/webapp/WEB-INF/web.xml`
:::



完成后：

![image](https://user-images.githubusercontent.com/94043894/175804078-da5d45e7-20a9-4a98-8dea-d3628dafba2c.png)

### 打包方式

```xml
<groupId>org.example</groupId>
<artifactId>MVCHelloWorld</artifactId>
<version>1.0-SNAPSHOT</version>
<packaging>war</packaging>
```
### 引入依赖

```xml
<!-- springmvc -->
<dependencies>
    <!-- https://mvnrepository.com/artifact/org.springframework/spring-webmvc -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>5.3.21</version>
    </dependency>
<!-- 日志 -->
    <!-- https://mvnrepository.com/artifact/ch.qos.logback/logback-classic -->
    <dependency>
        <groupId>ch.qos.logback</groupId>
        <artifactId>logback-classic</artifactId>
        <version>1.3.0-alpha16</version>
        <scope>test</scope>
    </dependency>
<!-- serlet-API -->
    <!-- https://mvnrepository.com/artifact/javax.servlet/javax.servlet-api -->
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>javax.servlet-api</artifactId>
        <version>4.0.1</version>
        <scope>provided</scope>
    </dependency>
<!-- thymeleaf -->
    <!-- https://mvnrepository.com/artifact/org.thymeleaf/thymeleaf-spring5 -->
    <dependency>
        <groupId>org.thymeleaf</groupId>
        <artifactId>thymeleaf-spring5</artifactId>
        <version>3.1.0.M2</version>
    </dependency>
</dependencies>
```

## 配置 web.xml

注册 SpringMVC 的前端控制器 DispatcherServlet


### 默认配置方式
此配置作用下，SpringMVC 的配置文件位于 WEB-INF 下，默认名称为`<servlet-name>-servlet.xml`，例如，以下配置所对应 SprignMVC 的配置文件位于 WEB-INF 下，文件名为 `springMVC-servlet.xml
`
```xml
<servlet>
    <servlet-name>SpringMVC</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>SpringMVC</servlet-name>
    <url-pattern>/</url-pattern>
</servlet-mapping>
```

::: tip
`<url-pattern>`标签中使用`/`和`/*`的区别：
- `/`所匹配的请求可以是`/login`或`.html`或`.js`或`.css`方式的请求路径，但不能匹配`.jsp`请求路径请求
因此就可以避免在访问 jsp 页面时，该请求被 DispatcherServlet 处理，从而找不到相应的页面
- `/*`则能够匹配所有请求，例如在使用过滤器时，若需要对所有请求进行过滤，就需要使用`/*`写法
:::

### ×扩展配置方式

```xml
<!-- web.xml -->
<servlet>
    <servlet-name>SpringMVC</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
<!--        配置 SpringMVC 配置文件的位置和名称-->
    <init-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:springMVC.xml</param-value>
    </init-param>
<!--        将前端控制器 DispatcherServlet 的初始化时间提前到服务器启动时，减少第一次访问的启动时间-->
    <load-on-startup>1</load-on-startup>
</servlet>
<servlet-mapping>
    <servlet-name>SpringMVC</servlet-name>
    <url-pattern>/</url-pattern>
</servlet-mapping>
```
::: tip
可以在 maven 的默认路径下创建外部的配置文件
:::


## 创建请求控制器
由于前端控制器对浏览器发送的请求进行了统一的处理，但是具体的请求有不同的处理过程，因此需要创建处理具体请求的类，即请求控制器

请求控制器中每一个处理请求的方法成为控制器方法

因为 SpringMVC 的控制器由一个 POJO（普通的 Java 类）担任，因此需要通过`@Controller`注解将其标识为一个控制层组件，交给 Spring 的 IOC 容器管理，此时 SpringMVC 才能够识别控制器的存在

```java
@Controller
public class HelloController {
}
```

## 创建 springMVC 配置文件

```xml
<!--自动扫描包-->
<context:component-scan base-package="com.demo.controller"></context:component-scan>

<bean id="viewResolver" class="org.thymeleaf.spring5.view.ThymeleafViewResolver">
    <property name="order" value="1"/>
    <property name="characterEncoding" value="UTF-8"/>
    <property name="templateEngine">
        <bean class="org.thymeleaf.spring5.SpringTemplateEngine">
            <property name="templateResolver">
                <bean class="org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver">
<!--视图前缀-->
                    <property name="prefix" value="/WEB-INF/templates/"/>
<!--视图后缀-->
                    <property name="suffix" value=".html"/>
                    <property name="templateMode" value="HTML5"/>
                    <property name="characterEncoding" value="UTF-8"/>
                </bean>
            </property>
        </bean>
    </property>
</bean>
```


<strong>
处理静态资源：
</strong>

```xml
<!--处理静态资源，例如 html、js、css、jpg
    若只设置该标签，则只能访问静态资源，其他请求这无法访问
    此时必须设置<mvc:aannotation-driven/>
-->
<mvc:default-servlet-handler/>

<!--开启 mvc 注解驱动-->

<mvc:annotation-driven>
    <mvc:message-converters>
        <bean class="org.springframework.http.converter.StringHttpMessageConverter">
            <property name="defaultCharset" value="UTF-8"/>
            <property name="supportedMediaTypes">
                <list>
                    <value>text/html</value>
                    <value>application/json</value>
                </list>
            </property>
        </bean>
    </mvc:message-converters>
</mvc:annotation-driven>
```

## 测试 HelloWorld

### 实现对首页的访问

```java
@Controller
public class HelloController {
//    "/" --> /WEB-INF/templates/index.html
    @RequestMapping("/")
    public String index(){
//        返回视图名称
        return "index";
    }
}
```

### 通过超链接跳转到指定页面

```java
//HelloController.java
@Controller
public class HelloController {
//    "/" --> /WEB-INF/templates/index.html
    @RequestMapping("/")
    public String index(){
//        返回视图名称
        return "index";
    }

    @RequestMapping("target")
    public String target(){
        return "target";
    }
}
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en" xml:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<h1>helloworld</h1>
<a th:href="@{/target}">to target</a>
</body>
</html>
```


## 总结
浏览器发送请求，若请求地址符合前端控制器的`url-pattern`，该请求就会被前端控制器`DispatcherServlet`处理。

前端控制器会读取 SpringMVC 的核心配置文件，通过<strong>扫描组件</strong>找到控制器，将请求和控制器中`@RequestMapping`注解的 value 属性值进行匹配，若匹配成功，该注解所标识的控制器方法就是处理请求的方法。

处理请求的方法需要返回一个字符串类型的视图名称，该视图名称会被<strong>视图解析器</strong>解析，加上<mark>前缀和后缀组成视图的路径</mark>，通过 Thymeleaf 对视图进行渲染，最终<mark>转发</mark>视图所对应的页面

::: tip
因为跳转到页面后，地址栏不会更改为`WEB-INF/templates/target.html`

因此可以说明是通过转发的方式跳转视图页面的
:::

