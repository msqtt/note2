
# DQL
## 数据查询
查询关键字：select

<strong>语法：</strong>

```sql
select
    字段列表
from
    表名列表
where
    条件列表
group by
    分组字段列表
having
    分组后条件列表
order by
    排序字段列表
limit
    分页参数
```

### 基本查询

```sql
查询多个字段
select 字段 1,字段 2,字段 3,... from 表名；

select * from 表名；

设置别名
select 字段 1[as 别名 1],字段 2【as 别名】,... from 表名；

 去除重复查询记录
select distinct 字段列表 from 表名；
```



### 条件查询

```sql
select 字段列表 from 表名 where 条件列表
```

<strong>条件：</strong>

比较运算符|描述
--|--
`>`|大于
`>=`|大于等于
`<`|小于
`<=`|小于等于
`=`|等于
`<>`|`!=`
`between...and...`|在某个范围之内（含最小、最大值）
`in(...)`|在 in 之后的列表中的值，多选一
`like 占位符`|模糊匹配（`_`匹配单个字符，`%` 匹配任意个字符）
`is NULL`|是 NULL

逻辑运算符|描述
--|--
AND 或 `&&`|并且
OR 或 `||`|或
NOT 或 `!`|非，不是

### 函数

#### 汇总

函数|说明
--|--
AVG()|返回某列的平均值
COUNT()|返回某列的行数
MAX()|返回某列的最大值
MIN()|返回某列的最小值
SUM()|返回某列值之和

> AVG() 会忽略 NULL 行

可以使用 distinct 可以汇总不同的值


例：

```sql
select avg(distinct age) from emp;
```

#### 文本处理
函数|说明
--|--
LEFT()|左边的字符
RIGHT()|右边的字符
LOWER()|转换为小写字符
UPPER()|转换为大写字符
LTRIM()|去除左边的空格
RTRIM()|去除右边的空格
LENGTH()|长度
SOUNDEX()|转换为语音值

其中，SOUNDEX()可以将一个字符串转换为描述其语音表示的字母数字模式

```sql
select *
from mytable
where soundex(col1) = soundex('apple')
```



### 分组查询

语法：
```sql
select 字段列表 from 表名 【where 条件】
group by 分组字段名 【having 分组后过滤条件】;
```

> where 与 having 区别：
> 1. 执行时机不同：where 是分组之前进行过滤，不满足 where 条件，不参与分组；而 having 是分组之后对结果进行过滤。
> 2. 判断条件不同：where 不能对聚合函数进行判断，而 having 可以

> 注意：
> - 执行顺序：where > 聚合函数 > having
> - 分组之后，查询的字段一般为聚合函数和分组字段，查询其他字段无任何意义

例：
```sql
select gender, avg(age) from emp group by gender;
```

### 排序查询


语法：
```sql
select 字段列表 from 表名 order by 字段 1 排序方式 1, 字段 2, 排序方式 2;
```
排列方式：
- ASC: 升序
- DESC: 升序

> 注意：如果是多字段排序，当第一个字段值相同时，才会根据第二个字段进行排序。

例：
```sql
select * from emp order by age;
```

### 分页查询

语法：

```sql
select 字段列表 from 表名 limit 起始索引，查询记录数；

```

> - 起始索引从 0 开始，起始索引=（查询页码-1） * 每页显示记录数
> - 分页查询住不同数据库有不同的实现，mysql 中是 LIMIT
> - 如果查询的是第一页数据，起始索引可以省略，直接简写成 limit10

## DQL 执行顺序

```sql
from
    表名列表
where
    条件列表
group by
    分组字段控制
having
    分组后后条件判断
select
    字段列表
order by
    排列字段列表
limit
    分页参数

```
