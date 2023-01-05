# SQL & MYSQL

名称|描述|简称
--|--|--
数据库|储存数据的仓库，数据是有组织的进行存储|DataBase(DB)
数据库管理系统|操作和管理数据库的大型软件|DataBase Management System(DBMS)
SQL|操作关系型数据库的编程语言，定义了一套操作关系型数据库统一标准|Structured Query Language(SQL)

> 即：数据库存放数据信息，数据库管理系统（Oracle, mysql 等）用于管理数据库，而程序员通过 sql 语言与 DBMS 的协助，控制数据库




## SQL 的基本书写规则

- SQL 语句以分号`;`结尾
- 关键字不区分大小写
- 字符串和日期常数需要使用单引号`'`扩起来
- 数字常数无需要加单引号（直接书写数字即可）
- 单词之间需要使用半角空格或者换行符进行分隔
- 注释：
    - 单行注释：`-- 注释内容 或 #注释内容（Mysql 特有）`
    - 多行注释：`/*注释内容*/`


例：
创建数据库
```sql
CREATE DATEBASE shop;
```

::: tip
database 也叫 schema , 表集的意思（模型）
:::


### 命名规则

数据库名称、表名和列名等可以使用以下三种字符
- 半角英文字母
- 半角数字
- 下划线

:::warning
名称必须以半角英文字母作为开头，不能重复
:::


## SQl 语句

### DDL （Data Definition Language, 数据定义语言）
&emsp;&emsp;用来创建或者删除存储数据用的数据库以及数据库中的表 等对象。

- CREAT：创建数据库和表对象
- DROP：删除数据库和表等对象
- ALTER：修改数据库和表等对象的结构

### DML （Data Manipulation Language, 数据操控语言）
&emsp;&emsp;用来查询或者变更表中的记录，完成数的增删改

- SELECT：查询表中的数据
- INSERT：向表中插入新数据
- UPDATE：更新表中的数据
- DELETE：删除表中的数据　

### DCL（Data Control Language, 数据控制语言）
&emsp;&emsp;用来确认或取消对数据库中的数据进行的变更

- COMMIT：确认对数据库中的数据进行的变更
- ROLLBACK：取消对数据库中的数据进行的变更
- GRANT：赋予用户操作权限
- REBOKE：取消用户的操作权限
