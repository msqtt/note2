
# Spring-Framework

这里主要以 Spring 5 为例

## Spring 是什么
1. Spring 是一个轻量级的开源 JavaEE 框架
2. Spring 可以解决企业应用开发的复杂性
3. Spring 有两个核心部分：IOC 和 Aop
    - IOC: 控制反转，把创建对象过程交给 spring 进行
    - Aop: 面向切面，不修改源代码进行功能增强


## Spring 特点
1. 方便解耦，简化开发
2. Aop 编程的支持
3. 方便进行事务操作
4. 方便程序测试
5. 方便与其他框架整合
6. 降低 API 开发难度
7. 源码的设计显示出 Java 造诣高深的能力


## 入门案例
1. 下载 Spring5
    - https://repo.spring.io/artifactory/release/org/springframework/spring/

2. 创建工程


3. 导入 jar 包

    - Jar 包的结构：

<iframe frameborder="0" style="width:100%;height:433px;" src="https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&title=SpringJarSort.drawio#Uhttps%3A%2F%2Fraw.githubusercontent.com%2Fmosqu1t0%2FSources%2Fmaster%2Fmap%2FSpringJarSort.drawio"></iframe>



::: tip
一般地只需要导入基础的 Beans, Core, Context, Expression 等包就足够了
:::

::: warn
如果报错，可能是没有导入日志包`commons-logging-xx.jar`导致的
:::



4. 创建普通类，在这个类创建普通方法

5. 创建 Spring 配置文件，在配置文件配置创建的对象

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="user" class="com.demo.test.testm.User"> </bean>
</beans>
```
::: warn
在新版本的 spring 中，配置文件应该放在`src/main/resources`下，否则找不到
:::

6. 代码编写

```java
package com.demo.test;

import com.demo.test.testm.User;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class TestUser {
    @Test
    public void testAdd(){
        ApplicationContext context = new ClassPathXmlApplicationContext("bean1.xml");
        User user = context.getBean("user", User.class);
        System.out.println(user);
        user.add();
    }
}
```

7. 代码运行成功
