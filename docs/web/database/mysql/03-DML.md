
# DML

## 表

### 添加数据

```sql
 给指定字段添加数据
insert into 表名(字段1, 字段2, 字段3) values(值1, 值2);

 给全部字段添加数据
insert into 表名 values(值1, 值2, 值3);

 批量添加数据
insert into 表名(字段名1, 字段名2) values(值1, 值2),(值1, 值2);
insert into 表名 values(值1, 值2),(值1, 值2);
```


### 修改数据

```sql
UPDATE 表名 set 字段名=值1, 字段名2=值2,...[where 条件];
```

### 删除数据
 
```sql
delete from 表名 [where]
```
