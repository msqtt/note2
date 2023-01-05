# AOP
AOP(Aspect Oriented Programming)，意为：<mark>面向切面编程</mark>，通过预编译方式和运行期间动态代理实现程序功能的统一维护的一种技术，由 OOP（面向对象编程）发展而来

利用 AOP 可以对业务逻辑的各个部分进行隔离，从而使得业务逻辑各部分之间的<mark>耦合度</mark>降低，提高程序可重用性，同时提高了开发的效率

通俗描述：不通过修改源代码方式，在主干功能里面添加新功能

<strong>
例：登录功能
</strong>

<iframe frameborder="0" style="width:100%;height:463px;" src="https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&title=AOPLoginShow.drawio#Uhttps%3A%2F%2Fraw.githubusercontent.com%2Fmosqu1t0%2FSources%2Fmaster%2Fmap%2FAOPLoginShow.drawio"></iframe>

## AOP 底层原理
AOP 底层使用动态代理

有两种情况动态代理
1. <mark>有接口，使用 JDK 动态代理</mark>
    - 创建接口实现类代理对象，增强类的方法

<iframe frameborder="0" style="width:100%;height:203px;" src="https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&title=AOPJDK.drawio#Uhttps%3A%2F%2Fraw.githubusercontent.com%2Fmosqu1t0%2FSources%2Fmaster%2Fmap%2FAOPJDK.drawio"></iframe>

2. <mark>没有接口情况，使用 CGLIB 动态代理</mark>
    - 创建子类的代理对象，增强类的方法

<iframe frameborder="0" style="width:100%;height:203px;" src="https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&title=AOPCGLIB.drawio#Uhttps%3A%2F%2Fraw.githubusercontent.com%2Fmosqu1t0%2FSources%2Fmaster%2Fmap%2FAOPCGLIB.drawio"></iframe>

### AOP 底层实现（JDK 动态代理）


![image](https://user-images.githubusercontent.com/94043894/174562672-4c3dcdc2-5fdb-4ae8-893d-db5762dd29e2.png)

1. 使用 JDK 动态代理，使用 Proxy 类里面的方法创建代理对象


![image](https://user-images.githubusercontent.com/94043894/174563331-f97d427a-2128-4607-aa21-ebefe3dfc703.png)

2. 调用 newProxyInstans 方法

<strong>
该方法三个参数：
</strong>

<mark>1. 类加载器</mark>

<mark>2. 增强方法所在的类，这个类实现的接口，支持多个接口</mark>

<mark>3. 实现这个接口 InvocationHandler，创建代理对象，写增强的方法</mark>


<strong>
3. 编写 JDK 动态代理代码
</strong>

- 创建接口，定义方法


```java
public interface Dao {
    public int add(int a, int b);
    public String update(String id);
}
```

- 创建接口实现类，实现方法


```java
public class DaoImpl implements Dao{

    @Override
    public int add(int a, int b) {
        return a + b;
    }

    @Override
    public String update(String id) {
        return id;
    }
}
```

- 使用 Proxy 类创建接口代理对象

```java
public class JDKProxy {
    public static void main(String[] args) {
        Class[] interfaces = {Dao.class};
        DaoImpl daoimpl = new DaoImpl();
        Dao dao = (Dao) Proxy.newProxyInstance(JDKProxy.class.getClassLoader(), interfaces, new DaoProxy(daoimpl));
        int result = dao.add(1, 2);
        System.out.println("result:" + result);
    }
}

//创建代理对象代码
class DaoProxy implements InvocationHandler {

    //把创建的代理对象传递进来（有参构造）
    private Object obj;
    public DaoProxy(Object obj){
        this.obj = obj;
    }

    //增强的逻辑
    @Override
    public Object invoke(Object o, Method method, Object[] objects) throws Throwable {
         //方法之前
        System.out.println("Before..." + method.getName() + "传递参数：" + Arrays.toString(objects));

        //被增强的方法
        Object res = method.invoke(obj, objects);

        //方法之后
        System.out.println("After..." + obj);

        return res;
    }
}
```

## AOP 术语

1. 连接点
> 类里的哪些方法可以被增强，这些方法称为连接点

2. 切入点
> 实际被增强的方法，称为切入点

3. 通知（增强）
> 实际增强的逻辑部分称为通知（增强）
> 通知有多种类型
> - 前置通知
> - 后置通知
> - 环绕通知
> - 异常通知
> - 最终通知


4. 切面
> 指动作，把通知应用到切入点过程


## AOP 操作

### 基于 AspectJ 实现 AOP 操作
Spring 框架一般都是基于 AspectJ 实现 AOP 操作
> AspectJ 不是 Spring 组成部分，独立 AOP 框架，一般把 AspectJ 和 Spring 框架一起使用，进行 AOP 操作

#### 引入依赖：
- `spring-aspects-5.3.9.jar`
- `com.springsource.net.sf.cglib-2.2.0.jar`
- `com.springsource.org.aopalliance-1.0.0.jar`
- `com.springsource.org.aspectj.weaver-1.6.8.jar`

#### 切入点表达式
> 切入点表达式作用：知道对哪个类里面的哪个方法进行增强

<strong>
语法结构：
</strong>

`execution([权限修饰符][返回类型][类全路径][方法名称]([args]))`

例 1: 对`com.demo.dao.BookDao`类里面的`add()`方法进行增强
- `execution(* com.demo.dao.BookDao.add(..))`

例 2: 对`com.demo.dao.BookDao`类里面的所有方法进行增强
- `execution(* com.demo.dao.BookDao.*(..))`

例 3: 对`com.demo.dao`包里面的所有类的里面的所有方法进行增强
- `execution(* com.demo.dao.*.*(..))`

::: tip
`execution()`中第一个参数表示的是访问修饰符

若需要明确指出，也可以这样写
`execution(public com.demo.xxx)` or `execution(public com.demo.xxx)`
:::

::: tip
`方法(..)` 中 `..` 表示参数
:::

#### 基于注解实现

1. 创建类，在类里面定义方法

```java
public class User {
    public void add(){
        System.out.println("adding...");
    }
}
```

2. 创建增强类
    - 在增强类中里面，创建方法，让不同方法代表不同通知类型

```java
public class UserProxy {
    public void before(){
        System.out.println("before...");
    }
}
```

3. 进行通知配置
    1. 在 spring 配置文件中，开启注解扫描
    2. 使用注解创建 User 和 UserProxy 对象
    3. 在增强类上面添加注解`@Aspect`
    4. 在 spring 配置文件中开启生成代理对象

```java
//User.java
@Component("user")
public class User {
    public void add(){
        System.out.println("adding...");
    }
}


//UserProxy.java
@Component
public class UserProxy {
    public void before(){
        System.out.println("before...");
    }
}
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
                            ">
    <context:component-scan base-package="com.demo.aopanno"></context:component-scan>
    <aop:aspectj-autoproxy></aop:aspectj-autoproxy>

</beans>
```

##### 完全注解方式
完全注解方式只需要用配置类取代配置文件

```java
@Configuration
@ComponentScan(basePackages = {"com.demo"})
@EnableAspectJAutoProxy(proxyTargetClass = true)
public class Config {
}
```

::: tip
`@EnableAspectJAutoProxy(proxyTargetClass = true)` 等价于 `<aop:aspectj-autoproxy></aop:aspectj-autoproxy>`

表示开启生成代理对象
:::



4. 配置不同类型的通知
    1. 在增强类的里面，在作为通知方法上面添加通知类型注解，使用切入点表达式

```java
@Component
@Aspect
public class UserProxy {
    //前置通知
    @Before("execution(* com.demo.aopanno.User.add(..))")
    public void before(){
        System.out.println("before...");
    }

    //后置通知
    @AfterReturning("execution(* com.demo.aopanno.User.add(..))")
    public void afterReturn(){
        System.out.println("afterReturn...");
    }

    //最终通知
    @After("execution(* com.demo.aopanno.User.add(..))")
    public void after(){
        System.out.println("after...");
    }

    //异常通知
    @AfterThrowing("execution(* com.demo.aopanno.User.add(..))")
    public void afterThrow(){
        System.out.println("afterThrow...");
    }

    //环绕通知
    @Around("execution(* com.demo.aopanno.User.add(..))")
    public void around(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        System.out.println("around before...");

        proceedingJoinPoint.proceed();

        System.out.println("around after...");
    }

}
```

5. 公共切入点抽取
在多个通知中若要同一个切入点，就需要写多遍，可以使用抽取出这些重复的部分

```java
@Component
@Aspect
public class UserProxy {

    @Pointcut("execution(* com.demo.aopanno.User.add(..))")
    public void pointcut() {

    }

    @Before("pointcut()")
    public void before(){
        System.out.println("before...");
    }

    @After("pointcut()")
    public void after(){
        System.out.println("after...");
    }

    @AfterReturning("pointcut()")
    public void afterReturn(){
        System.out.println("afterReturn...");
    }

    @AfterThrowing("pointcut()")
    public void afterThrow(){
        System.out.println("afterThrow...");
    }

    @Around("pointcut()")
    public void around(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        System.out.println("around before...");

        proceedingJoinPoint.proceed();

        System.out.println("around after...");
    }
}
```


6. 有多个增强类对同一个方法进行增强，设置增强类优先级
    - 在增强类上添加注解`@Order(int)`，数字类型值越小，优先级越小


::: tip
只有发生异常时，`@AfterThrowing`才会执行
:::

::: warning
发生异常后，后置通知不会执行，环绕通知中的后置部分也不会执行，而最终通知总是会执行
:::


#### 基于配置文件实现

1. 创建两个类，增强类和被增强类

2. 在 spring 配置文件中创建两个类对象
```xml
<bean id="user" class="com.demo.aopxml.User"></bean>
<bean id="userProxy" class="com.demo.aopxml.UserProxy"></bean>
```

3. 在 spring 配置文件中配置切入点
```xml
<aop:config>
    <aop:pointcut id="p" expression="execution(* com.demo.aopxml.User.add(..))"/>

    <aop:aspect ref="userProxy">
        <aop:before method="before" pointcut-ref="p"/>
    </aop:aspect>
</aop:config>
```


