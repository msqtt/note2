# MyBatis 简介

## MyBatis 历史
- MyBatis 最初是 Apache 的一个开源项目 iBatis, 2010年6月 这个项目由 Apache Software Foundation 迁移到了 Google Code。随着开发团队转投 Google Code 旗下，iBatis3.x 正式更名为 MyBatis。代码于 2013年11月 迁移到 Github

- iBatis 一词来源于“internet”和“abatis”的组合，是一个基于 Java 的持久层框架。iBatis 提供的持久层框架包括 SQL Maps 和 Data Access Objects（DAO）

## MyBatis 特性
1. MyBatis 是支持定制化 SQL、存储过程以及高级映射的优秀的持久层框架

2. MyBatis 避免了几乎所有的 JDBC 代码和手动设置参数以及获取结果集
3. MyBatis 可以使用简单的 XML 或注解用于配置和原始映射，将接口和 Java 的 POJO（Plain Old Java Objects，普通的 Java 对象）映射成数据库中的记录
4. MyBatis 是一个 半自动的 ORM（Object Relation Mapping）框架


## MyBatis 下载

[ Github ](https://github.com/mybatis/mybatis-3)


## 和其它持久层技术对比

- JDBC
    - SQL 夹杂在 Java 代码中耦合度高，导致硬编码内伤
    - 维护不易且实际开发需求中 SQL 有变化，频繁修改的情况多见
    - 代码冗长，开发效率低
- Hibernate 和 JPA
    - 操作简便，开发效率高
    - 程序中的长难复杂 SQL 需要绕过框架
    - 内部自动生产的 SQL，不容易做特殊优化
    - 基于全映射的全自动框架，大量字段的 POJO 进行部分映射时比较困难。
    - 反射操作太多，导致数据库性能下降
- MyBatis
    - 轻量级，性能出色
    - SQL 和 Java 编码分开，功能边界清晰。Java 代码专注业务、SQL 语句专注数据
    - 开发效率稍逊于 HIbernate，但是完全能够接受
