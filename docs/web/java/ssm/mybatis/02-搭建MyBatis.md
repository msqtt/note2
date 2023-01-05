# 搭建 MyBatis

## 开发环境

- IDE: idea 2022.1
- 构建工具：maven 3.8.1
- MySQL 版本：MySQL 5.6
- MyBatis 版本：MyBatis 3.5.10

## 创建 maven 工程

- 打包方式：jar
- 引入依赖


```xml
<dependencies>
    <!-- mybatis -->
    <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis</artifactId>
        <version>3.5.10</version>
    </dependency>
    <!-- junit 测试 -->
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
        <scope>test</scope>
    </dependency>
    <!-- MySQL 驱动 -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>5.1.3</version>
    </dependency>
</dependencies>
```

## 创建 MyBatis 的核心配置文件

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
 PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
 "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
 <environments default="development">
 <environment id="development">
 <transactionManager type="JDBC"/>
 <dataSource type="POOLED">
 <property name="driver" value="${driver}"/>
 <property name="url" value="${url}"/>
 <property name="username" value="${username}"/>
 <property name="password" value="${password}"/>
 </dataSource>
 </environment>
 </environments>
 <mappers>
 <mapper resource="org/mybatis/example/BlogMapper.xml"/>
 </mappers>
</configuration>
```

::: tip
习惯上命名为`mybatis-config.xml`，这个文件名仅仅只是建议，并非强制要求。将来整合 Spring 之后，这个配置文件可以省略，所以操作时可以直接复制、粘贴。

核心配置文件主要用于配置连接数据库的环境以及 MyBatis 的全局配置信息

核心配置文件存放的位置是`src/main/resources`目录下
:::


## 建表

```sql
CREATE TABLE `usr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `sex` char(1) DEFAULT NULL,
  `email` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
```

## 创建 mapper 接口

```java
public interface UserMapper {
	/**
	* 添加用户信息
	*/
	int insertUser();
}
```


## 创建 MyBatis 的映射文件

- 相关概念：ORM（Object Relationship Mapping）对象关系映射。
    - 对象：Java 的实体类对象
    - 关系：关系型数据库
    - 映射：二者之间的对应关系

Java 概念|数据库概念
--|--
类|表
属性|字段/列
对象|记录/行

- 映射文件的命名规则
    - 表所对应的实体类的`类名+ Mapper.xml`
    - 例如：表`t_user`，映射的实体类为 User，所对应的映射文件为`UserMapper.xml`
    - 因此一个映射文件对应一个实体类，对应一张表的操作
    - MyBatis 映射文件用于编写 SQL，访问以及操作表中的数据
    - MyBatis 映射文件存放的位置是`src/main/resources/mappers`目录下
- MyBatis 中可以面向接口操作数据，要保证两个一致
    - mapper 接口的全类名和映射文件的命名空间（namespace）保持一致
    - mapper 接口中方法的方法名和映射文件中编写 SQL 的标签的 id 属性保持一致


```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
 PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
 "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="org.mybatis.example.BlogMapper">
 <select id="selectBlog" resultType="Blog">
 select * from Blog where id = #{id}
 </select>
</mapper>
```

## 通过 jnuit 测试功能

- <strong>SqlSession</strong>：代表 Java 程序和数据库之间的会话。（HttpSession 是 Java 程序和浏览器之间的会话）
- <strong>SqlSessionFactory</strong>：是“生产”SqlSession 的“工厂”
- <strong>工厂模式</strong>：如果创建某一个对象，使用的过程基本固定，那么我们就可以把创建这个对象的相关代码封装到一个“工厂类”中，以后都使用这个工厂类来“生产”我们需要的对象

```Java
public class UserMapperTest {
    @Test
    public void testInsertUser() throws IOException {
        //读取 MyBatis 的核心配置文件
        InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
        //获取 SqlSessionFactoryBuilder 对象
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        //通过核心配置文件所对应的字节输入流创建工厂类 SqlSessionFactory，生产 SqlSession 对象
        SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(is);
        //获取 sqlSession，此时通过 SqlSession 对象所操作的 sql 都必须手动提交或回滚事务
        //SqlSession sqlSession = sqlSessionFactory.openSession();
	    //创建 SqlSession 对象，此时通过 SqlSession 对象所操作的 sql 都会自动提交
		SqlSession sqlSession = sqlSessionFactory.openSession(true);
        //通过代理模式创建 UserMapper 接口的代理实现类对象
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        //调用 UserMapper 接口中的方法，就可以根据 UserMapper 的全类名匹配元素文件，通过调用的方法名匹配映射文件中的 SQL 标签，并执行标签中的 SQL 语句
        int result = userMapper.insertUser();
        //提交事务
        //sqlSession.commit();
        System.out.println("result:" + result);
    }
}
```
::: tip
此时需要手动提交事务，如果要自动提交事务，则在获取 sqlSession 对象时，使用`SqlSession sqlSession = sqlSessionFactory.openSession(true);`，传入一个 Boolean 类型的参数，值为 true，这样就可以自动提交
:::


::: warning
如果 insert 中文的时候，变成`???`,一般有两种情况：
1. 数据库本身设置
2. 连接数据库时，jdbc 的编码设置

如果是第一种：
用 `show variables like '%character%'` 查看自身的 mysql 设置

第二种：
```xml
<property name="url" value="jdbc:mysql://175.178.69.145:3306/mybatis?useUnicode=true&amp;characterEncoding=utf-8"/>

<!--
如果 url 写在 value 里 & 需要转义
&amp;表示 符号& -->
```
:::

## 加入 log4j 日志功能

### 加入依赖
```xml
<!-- log4j 日志 -->
<dependency>
<groupId>log4j</groupId>
<artifactId>log4j</artifactId>
<version>1.2.17</version>
</dependency>
```

### 加入 log4 的配置文件
1. `log4j`的配置文件名为`log4j.xml`,存在的位置是`src/main/resources`目录下
日志的级别：`FATAL（致命）>ERROR（错误）>WARN（警告）>INFO（信息）>DEBUG（调试）` 从左到右打印的内容越来越详细

::: tip
越来越详细，因为后面的级别的显示信息包括前面级别的信息
:::

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE log4j:configuration SYSTEM "log4j.dtd">
<log4j:configuration xmlns:log4j="http://jakarta.apache.org/log4j/">
    <appender name="STDOUT" class="org.apache.log4j.ConsoleAppender">
        <param name="Encoding" value="UTF-8" />
        <layout class="org.apache.log4j.PatternLayout">
			<param name="ConversionPattern" value="%-5p %d{MM-dd HH:mm:ss,SSS} %m (%F:%L) \n" />
        </layout>
    </appender>
    <logger name="java.sql">
        <level value="debug" />
    </logger>
    <logger name="org.apache.ibatis">
        <level value="info" />
    </logger>
    <root>
        <level value="debug" />
        <appender-ref ref="STDOUT" />
    </root>
</log4j:configuration>

```


