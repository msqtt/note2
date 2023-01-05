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

> 可以使用`create database test default charset utf8mb4`创建一个支持utf-8编码的数据库，因为中文字符中

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

### 创建字段

```sql
create table name (
字段1  字段类型 [comment 字段注解],
字段2  字段类型 [comment 字段注解],
字段3  字段类型 [comment 字段注解],
字段4  字段类型 [comment 字段注解] 
)[comment 表注解]
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

> 其中decimal的范围依赖于M(精度)和D(标度)的值<br>
> 标示double 和 decimal的精度需要额外的两个参数, 例如我要表示3位整数1位小数`double(4, 1)`<br>
> 可以使用unsigned来标识该变量没有负取值


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

> char(n) 写死一个字段就是n个字节, varchar(n) 最大字节是n个字节,若少于n个字节则使用更少内存, 但是 char 性能 高于 varchar


### 删除表
```sql
DROP TABLE <表名>;
```

### 更新表


```sql
ALTER TABLE <表名> ADD/MODIFY/CHANGE/DROP/RENAME TO COLUMN <列的定义>;
```

命令：`alter table testdata.what add column y_num int(10);`column可以省略<br>
表示在testdata.what表的最后插入一列 y_num

MODIFY 只能修改字段类型<br>
CHANGE 可以修改的字段名,类型等<br>
DROP 删除字段<br>
RENAME TO 更改字段名字


### 更改表名

```sql
RENAME TABLE testdata.what to testdata.some;
```
