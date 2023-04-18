# DDL

## 数据库

### 查询

```sql
-- 查询所有数据库
show databases

-- 查询当前数据库
select database();
```

### 创建

```sql
create database [if not exists] name [default charset] [collate 排列规则];
```

> 可以使用`create database test default charset utf8mb4`创建一个支持 utf-8 编码的数据库，因为中文字符中

### 删除

```sql
drop database [if exists] name;
```

### 使用

```sql
use name;
```

## 表

### 查询

```sql
-- 查询当前数据库所有表
show tables;


-- 查询表结构
desc name;


-- 查询指定表的建表语句
show create table name;
```

### 创建表

```sql
create table name (
字段1  字段类型 [comment 字段注解],
字段2  字段类型 [comment 字段注解],
字段3  字段类型 [comment 字段注解],
字段4  字段类型 [comment 字段注解]
)[comment 表注解]
```

### 拷贝表

```sql
create database bak;
use bak;

create table backup_shit as
    select * from real_db.shit;
```

### 字段类型

<strong>数字:</strong>
类型|大小
--|--
整形|
tinyint|1 byte
smallint|2 byte
mediumint|3 byte
int or integer|4 byte
bigint|8 byte
浮点数|
float|4 byte
double|8 byte
decimal|

> 其中 decimal 的范围依赖于 M(精度)和 D(标度)的值<br>
> 标示 double 和 decimal 的精度需要额外的两个参数, 例如我要表示 3 位整数 1 位小数`double(4, 1)`<br>
> 可以使用 unsigned 来标识该变量没有负取值

<br>

<strong>字符:</strong>
类型|大小|描述
--|--|--
char|0-255 Byte|定长字符串
varchar|0-65535 Byte|变长字符串
tinytext|0-255 Byte | 短文本字符串
blob|0-65535 Byte|二进制形式的长文本数据
text|0-65535 Byte|长文本数据
mediumblob|0-16777215 Byte| 二进制形式的中等长度文本数据
mediumtext|0-16777215 Byte| 中等长度文本数据
longblob|0-4294967295 Byte|二进制形式的极大文本数据
longtext|0-4294967295 Byte|极大文本数据

> char(n) 写死一个字段就是 n 个字节, varchar(n) 最大字节是 n 个字节,若少于 n 个字节则使用更少内存, 但是 char 性能 高于 varchar

### 删除表

```sql
DROP TABLE <表名>;
```

### 清空表

1. truncate 使用语法

truncate 的作用是清空表或者说是截断表，只能作用于表。truncate 的语法很简单，后面直接跟表名即可，例如：`truncate table tbl_name` 或者 `truncate tbl_name` 。

执行 truncate 语句需要拥有表的 drop 权限，从逻辑上讲，truncate table 类似于 delete 删除所有行的语句或 drop table 然后再 create table 语句的组合。为了实现高性能，它绕过了删除数据的 DML 方法，因此，它不能回滚。尽管 truncate table 与 delete 相似，但它被分类为 DDL 语句而不是 DML 语句。

2. truncate 与 drop,delete 的对比

上面说过 truncate 与 delete，drop 很相似，其实这三者还是与很大的不同的，下面简单对比下三者的异同。

- truncate 与 drop 是 DDL 语句，执行后无法回滚；delete 是 DML 语句，可回滚。
- truncate 只能作用于表；delete，drop 可作用于表、视图等。
- truncate 会清空表中的所有行，但表结构及其约束、索引等保持不变；drop 会删除表的结构及其所依赖的约束、索引等。
- truncate 会重置表的自增值；delete 不会。
- truncate 不会激活与表有关的删除触发器；delete 可以。
- truncate 后会使表和索引所占用的空间会恢复到初始大小；delete 操作不会减少表或索引所占用的空间，drop 语句将表所占用的空间全释放掉。

3. truncate 使用场景及注意事项

通过前面介绍，我们很容易得出 truncate 语句的使用场景，即该表数据完全不需要时可以用 truncate。如果想删除部分数据用 delete，注意带上 where 子句；如果想删除表，当然用 drop；如果想保留表而将所有数据删除且和事务无关，用 truncate 即可；如果和事务有关，或者想触发 trigger，还是用 delete；如果是整理表内部的碎片，可以用 truncate 然后再重新插入数据。

无论怎样，truncate 表都是高危操作，特别是在生产环境要更加小心，下面列出几点注意事项，希望大家使用时可以做下参考。

- truncate 无法通过 binlog 回滚。
- truncate 会清空所有数据且执行速度很快。
- truncate 不能对有外键约束引用的表使用。
- 执行 truncate 需要 drop 权限，不建议给账号 drop 权限。
- 执行 truncate 前一定要再三检查确认，最好提前备份下表数据。

### 更新表

```sql
ALTER TABLE <表名> ADD/MODIFY/CHANGE/DROP/RENAME TO COLUMN <列的定义>;
```

命令：`alter table testdata.what add column y_num int(10);`column 可以省略<br>
表示在 testdata.what 表的最后插入一列 y_num

MODIFY 只能修改字段类型<br>
CHANGE 可以修改的字段名,类型等<br>
DROP 删除字段<br>
RENAME TO 更改字段名字

### 更改表名

```sql
RENAME TABLE testdata.what to testdata.some;
```
