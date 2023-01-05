# HttpMessageConverter
HttpMessageConverter，报文信息转换器，将请求报文转换为 Java 对象，或将 Java 对象转换为响应报文

HttpMessageConverter 提供了两个注解和两个类型：

两个注解：
- `@RequestBody`
- `@ResponseBody`

两个类型：
- `RequestEntity`
- `ResponseEntity`



## @RequestBody

`@RequestBody` 可以获取请求体，需要在控制器方法设置一个形参，使用`@RequestBody`进行标识，当前请求的请求体就会为当前请求的请求体就会为当前注解所标识的形参赋值

```html
<form th:action="@{/requestBody}" method="post">
    <input type="text" name="name"><br>
    <input type="text" name="email"><br>
    <input type="submit">
</form>
```

```java
@RequestMapping(value = "/requestBody", method = RequestMethod.POST)
public String requestBody(@RequestBody String requestBody){
    System.out.println("requestBody:" + requestBody);

    return "success";
}
```

## RequestEntity
RequestEntity 封装请求报文的一种类型，需要在控制器方法的形参中设置该类型的形参，当前请求的请求报文就会赋值给该形参，可以通过 getHeaders()获取请求头信息，通过 getBody()获取请求体信息

```java
@PostMapping("/requestEntity")
public String requestEntity(RequestEntity<String> requestEntity){
    System.out.println("requestHeaders:" + requestEntity.getHeaders());
    System.out.println("requestBody:" + requestEntity.getBody());

    return "success";
}
```



## @ResponseBody
`@ResponseBody`用于标识一个控制器方法，可以将该方法的返回值直接作为响应报文的响应体响应到浏览器


```java
@RequestMapping("/testResponseBody")
@ResponseBody
public String testResponseBody(){
    return "success";
}
```

## SpringMVC 处理 json

`@ResponseBody`处理 json 的步骤：

- 导入 Jackson 依赖
```xml
<!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-databind -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.13.3</version>
</dependency>
```

- 开启 mvc 注解驱动
在 SpringMVC 的核心配置文件中开启 mvc 的注解驱动，此时在 HandlerAdaptor 中会自动装配一个消息转换器：MappingJackson2HttpMessageConverter，可以将响应到浏览器的 Java 对象转换为 Json 格式的字符串

```xml
<mvc:annotation-driven />
```

- 在处理器方法上使用`@ResponseBody`注解进行标识

- 将 Java 对象直接作为控制器方法的返回值返回，就会自动转换为 Json 格式的字符串

```Java
@RequestMapping("/json")
@ResponseBody
public User json(){

    return new User("sb", "123");
}
```
## SpringMVC 处理 ajax

- 请求超连接：

```html
<div id="app"><a th:href="@{/testAjax}" @click="testAjax">testAjax</a></div>
```

- 通过 vue 和 axios 处理点击事件

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<script type="text/javascript">
    var vue = new Vue({
        el:"#app",
        methods:{
            testAjax:function (event){
                axios({
                    method:"post",
                    url:event.target.href,
                    params:{
                        username:"admin",
                        password:"123456"
                    }
                }).then(function (e){
                    alert(e.data);
                })
                event.preventDefault();
            }
        }
    })
</script>
```

- 控制器方法

```java
@RequestMapping(value = "/testAjax" ,method = RequestMethod.POST)
@ResponseBody
public String testAjax(String username, String password){
    System.out.println("usr:" + username);
    System.out.println("passwd:" + password);

    return "yep";
}
```

## @RestController 注解

`@RestController`注解是 springMVC 提供的一个复合注解，标识在控制器的类上，就相当于为类添加了`@Controller`注解，并且为其中的每个方法添加了`@ResponseBody`注解

## ResponseEntity
ResponseEntity 用于控制器方法的返回值类型，该控制器方法的返回值就是响应到浏览器的响应报文


```java
ResponseEntity<byte[]> responseEntity = new ResponseEntity<>(bytes, headers, statusCode);
```

- `bytes`: 请求体
- `headers`: 请求头
- `statusCode`: 响应码


