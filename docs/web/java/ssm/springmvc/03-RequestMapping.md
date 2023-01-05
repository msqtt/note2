# @RequestMapping 注解

## 功能

从注解名称上我们可以看到，`@RequestMapping`注解的作用就是请求和处理请求的控制器方法关联起来，建立映射关系

SpringMVC 接收到指定请求，就会来找到在映射关系中对应的控制器来处理这个请求


## 位置


```java
//@RequestMapping 的元注解
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
```


@RequestMapping 标识一个类：设置映射请求的请求路径的初始信息

@RequestMapping 标识一个方法：设置映射请求的请求路径的具体信息


```java
@Controller
@RequestMapping("/demo")
public class demoController {
//    此时请求映射所映射的请求的请求路径为：/demo/test
    @RequestMapping("/test")
    public String test(){
        return "test";
    }
}
```

## 属性

### value 属性

`@RequestMapping`注解的 value 属性通过请求的请求地址匹配请求映射

`@RequestMapping`注解的 value 属性是一个<strong>字符串类型的数组</strong>，表示该请求映射能够匹配多个请求地址所对应的请求

`@RequestMapping`注解的 value 属性必须设置，至少通过请求地址匹配请求映射


```java
@Controller
public class HelloController {
    @RequestMapping(value = {"test1", "test2"})
    public String test(){
        return "test";
    }
}
```

### method 属性

`@RequestMapping`注解的 method 属性通过请求的请求方式(get 或 post)匹配请求映射

`@RequestMapping`注解的 method 属性是一个 RequestMethod 类型的枚举数组，表示该请求映射能够匹配多种请求方式的请求

若当前请求的请求地址满足请求映射的 value 属性，但是请求方式不满足 method 属性，则浏览器报错 405: `Request method 'POST' not supported`

```java
@Controller
public class HelloController {
    @RequestMapping(value = "test", method = RequestMethod.POST)
    public String test(){
        return "test";
    }
}
```

::: tip
method 属性表示的是约束条件，即只有通过该条件发送请求才能被正确地处理（只满足其中一个条件即可）

默认表示没有限制，什么方式的请求都会被处理
:::

::: details 更多
1. 对于处理指定请求方式的控制器方法，SpringMVC 中提供了@RequestMapping 的派生注解处理 get 请求的映射
    - `@GetMapping` 处理 get 请求的映射
    - `@PostMapping` 处理 post 请求的映射
    - `@PutMapping` 处理 put 请求的映射
    - `@DeleteMapping` 处理 delete 请求的映射

2. 常用的请求方式有 get，post，put，delete
但是目前浏览器只支持 get 和 post，若在`form`表单提交时，为 method 设置了其他请求方式的字符串(put 或 delete)，则按照默认的请求方式 get 处理

若要发送 put 和 delete 请求，则需要通过 spring 提供的过滤器 HiddenHttpMethodFilter
:::

### params 属性

`@RequestMapping`注解的 params 属性通过请求的请求参数匹配请求映射

`@RequestMapping`注解的 params 属性是一个字符串类型数组，可以通过四种表达式设置请求参数和请求映射的匹配关系

- `param`: 要求请求映射所匹配的请求必须携带 param 请求参数
- `!param`: 要求请求映射所匹配的请求必须不能携带 param 请求参数
- `param = value`: 要求请求映射所匹配的请求必须携带 param 请求参数且`param`值等于`value`
- `param != value`: 要求请求映射所匹配的请求必须携带 param 请求参数但是 `param`值不等于`value`

```java
@Controller
public class HelloController {
    @RequestMapping(
            value = "test",
            params = {"user=admin", "password!=123456"}
    )
    public String test(){
        return "test";
    }
}
```

::: warning
`user=admin`,等号两边不能有空格
:::

### header 属性

`@RequestMapping`注解的 headers 属性通过请求的请求头信息匹配请求映射

`@RequestMapping`注解的 headers 属性是一个字符串类型的数组，可以通过四种表达式设置请求头信息和请求映射的匹配关系


- `header`: 要求请求映射所匹配的请求必须携带 header 请求头信息
- `!header`: 要求请求映射所匹配的请求必须不能携带 header 请求头信息
- `header = value`: 要求请求映射所匹配的请求必须携带 header 请求头信息且`header`值等于`value`
- `header != value`: 要求请求映射所匹配的请求必须携带 header 请求头信息但是 `header`值不等于`value`

::: tip
若当前请求满足`@RequestMapping`注解的 value 和 method 属性，但是不满足 header 属性，此时页面显示 404 错误，即资源未找到
:::

::: details
总结一下报错代码：
- value 不匹配：404
- method 不匹配：405
- params 不匹配：400
- headers 不匹配：404
:::

### SpringMVC 支持 ant 风格的路径

1. `?`: 表示任意单个字符
2. `*`: 表示任意 0 或多个字符
3. `**`: 表示任意的一层或多层目录

```java
@Controller
public class HelloController {
    @RequestMapping(
            value = "/abc?d*e/**/test",
            params = {"!user", "password!=123456"}
    )
    public String test(){
        return "test";
    }
}
```

::: warning
在使用`**`时，只能使用`/**/xxx`的方式
:::


### ×SpringMVC 支持路径中的占位符

原始方法：`/deleteUser?id=1`

rest 方法：`/deleteUser/1`

SpringMVC 路径中的占位符常用于 restful 风格中，当请求路径中将某些数据通过路径的方式传输到服务器中，就可以在相应的`@RequestMapping`注解的 value 属性中通过占位符号{xxx}表示传输的数据，在通过`@PathVariable`注解，将占位符所表示的数据赋值给控制器方法的形参

```html
<a th:href="@{/test/1}">test!</a>
```

```java
@Controller
public class HelloController {
    @RequestMapping("/test/{id}")
    public String test(@PathVariable("id")Integer id){
        System.out.println("id:"+id);
        return "test";
    }
}
```
