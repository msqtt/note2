# database/CRUD

## 查询

`sql.DB` 用于查询的方法有

- `Query()` select 查询数据库，可以为 0 或多条结果
- `QueryRow()` 结果最多只能为 1 条
- `QueryContext()` 可以带上下文，截止时间，取消操作等
- `QueryRowContext()` 同上

### Query() QueryContext()

- 返回的类型： `type Rows struct{}`

- Rows 的方法：
  - `func(rs *Rows) Close() error` 查询后把结果关闭
  - `func(rs *Rows) ColumnTypes(){[]*ColumnTypes, error}` 返回查询结果列信息
  - `func(rs *Rows) Columns(){[]string, error}` 返回列名
- `func(rs *Rows)Err() error` 查询出现错误把错误返回
- `func(rs *Rows)Next() bool` 遍历结果集，每次读取一行，`false` 表示没有结果查询
- `func(rs *Rows)NextResultSet() bool` 如果没有下一个结果集返回`false`
- `func(rs *Rows)Scan(dest ...interface{}) error` 把结果赋到对应变量里

### QueryRow() QueryRowContext()

返回类型是 `type Row struct{}`

- `func(r *Row) Err() error`
- `func(r *Row) Scan(dest ...interface{}) error`

### 单笔查询

```go
func getOne(id int) (a app, err error){
  a := app{}
  // 用中括号表示其不是一个关键字
  err := db.QueryRow("select id, name, status, level, [order] from dbo.app where id=@id",
    sql.Named("id", id).Scan(&a.Id, &a.Name, &a.Status, &a.Level, &a.Order)
  )
  // db.QueryRow("select id, name, status, level, [order] from dbo.app where id=?",id)
  //      .Scan(&a.Id, &a.Name, &a.Status, &a.Level, &a.Order)
  return
}
```

### 多笔查询

```go
func getMany(id int)  (app []App, err error){
rows, err := db.Query("select id, name, status, level, [order] from dbo.app where id=@id",
    sql.Named("id", id))

    // db.Query("select id, name, status, level, [order] from dbo.app where id=?", id)


if err != nil {
 log.Fatalln(err.Error())
}
// 迭代器
for rows.Next() {
  a := app{}
  err = rows.Scan(&a.Id, &a.Name, &a.Status, &a.Level, &a.Order)
  if err != nil {
    log.Fatalln(err.Error())
  }
  apps = append(apps, a)
  }
  return
}
```

## 插入、删除、更新

`sql.DB` 用于更新的方法有:

- `Exec()`
- `ExecContext()`

```go
func (a *app) Update() (err error) {
  _, err = db.Exec("update dbo.app set name=@name, [order]=@order where id=@id",
    sql.Named("name", a.name), sql.Named("order", a.order), sql.Named("id", a.id))

    // db.Exec("update dbo.app set name=@name, [order]=? where id=?",
    //        a.name, a.order,  a.id)
  if err != nil {
    log.Fatalln(err.Error())
  }
  return
}
```

```go
func (a *app)Delete() (err error) {
  _, err = db.Exec("delete from dbo.app where id=@id", sql.Named("id", a.Id))

  // db.Exec("delete from dbo.app where id=?",  a.Id)
  if err != nil {
    log.Fatalln(err.Error())
  }
  return
}
```

## 预处理

### 什么是预处理？

普通 SQL 语句执行过程：

- 客户端对 SQL 语句进行占位符替换得到完整的 SQL 语句。
- 客户端发送完整 SQL 语句到 MySQL 服务端
- MySQL 服务端执行完整的 SQL 语句并将结果返回给客户端。

预处理执行过程：

1. 把 SQL 语句分成两部分，命令部分与数据部分。
2. 先把命令部分发送给 MySQL 服务端，MySQL 服务端进行 SQL 预处理。
3. 然后把数据部分发送给 MySQL 服务端，MySQL 服务端对 SQL 语句进行占位符替换。
4. MySQL 服务端执行完整的 SQL 语句并将结果返回给客户端。

为什么要预处理？

1. 优化 MySQL 服务器重复执行 SQL 的方法，可以提升服务器性能，提前让服务器编译，一次编译多次执行，节省后续编译的成本。
2. 避免 SQL 注入问题。

### 实现预处理

- `Prepare()`
- `PrepareContext()`

```go
// 预处理查询示例
func prepareQueryDemo() {
	sqlStr := "select id, name, age from user where id > ?"
	stmt, err := db.Prepare(sqlStr)
	if err != nil {
		fmt.Printf("prepare failed, err:%v\n", err)
		return
	}
	defer stmt.Close()
	rows, err := stmt.Query(0)
	if err != nil {
		fmt.Printf("query failed, err:%v\n", err)
		return
	}
	defer rows.Close()
	// 循环读取结果集中的数据
	for rows.Next() {
		var u user
		err := rows.Scan(&u.id, &u.name, &u.age)
		if err != nil {
			fmt.Printf("scan failed, err:%v\n", err)
			return
		}
		fmt.Printf("id:%d name:%s age:%d\n", u.id, u.name, u.age)
	}
}
```

## SQL 注入问题

<mark>任何时候都不应该自己拼接 SQL 语句！</mark>

演示一个自行拼接 SQL 语句的示例，编写一个根据 name 字段查询 user 表的函数如下

```go
// sql注入示例
func sqlInjectDemo(name string) {
	sqlStr := fmt.Sprintf("select id, name, age from user where name='%s'", name)
	fmt.Printf("SQL:%s\n", sqlStr)
	var u user
	err := db.QueryRow(sqlStr).Scan(&u.id, &u.name, &u.age)
	if err != nil {
		fmt.Printf("exec failed, err:%v\n", err)
		return
	}
	fmt.Printf("user:%#v\n", u)
}
```

此时以下输入字符串都可以引发 SQL 注入问题：

```go
sqlInjectDemo("xxx' or 1=1#")
sqlInjectDemo("xxx' union select * from user #")
sqlInjectDemo("xxx' and (select count(*) from user) <10 #")
```

## 事务

### 什么是事务

事务：一个最小的不可再分的工作单元；通常一个事务对应一个完整的业务(例如银行账户转账业务，该业务就是一个最小的工作单元)，同时这个完整的业务需要执行多次的 `DML(insert、update、delete)`语句共同联合完成

A 转账给 B，这里面就需要执行两次 update 操作。

> 在 MySQL 中只有使用了 `Innodb` 数据库引擎的数据库或表才支持事务。事务处理可以用来维护数据库的完整性，保证成批的 SQL 语句要么全部执行，要么全部不执行。

### 事务的 ACID

通常事务必须满足 4 个条件（ACID）：原子性（Atomicity，或称不可分割性）、一致性（Consistency）、隔离性（Isolation，又称独立性）、持久性（Durability）。

| 条件   | 解释                                                                                                                                                                                                                                                            |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 原子性 | 一个事务（transaction）中的所有操作，要么全部完成，要么全部不完成，不会结束在中间某个环节。事务在执行过程中发生错误，会被回滚（Rollback）到事务开始前的状态，就像这个事务从来没有执行过一样。                                                                   |
| 一致性 | 在事务开始之前和事务结束以后，数据库的完整性没有被破坏。这表示写入的资料必须完全符合所有的预设规则，这包含资料的精确度、串联性以及后续数据库可以自发性地完成预定的工作。                                                                                        |
| 隔离性 | 数据库允许多个并发事务同时对其数据进行读写和修改的能力，隔离性可以防止多个事务并发执行时由于交叉执行而导致数据的不一致。事务隔离分为不同级别，包括读未提交（Read uncommitted）、读提交（read committed）、可重复读（repeatable read）和串行化（Serializable）。 |
| 持久性 | 事务处理结束后，对数据的修改就是永久的，即便系统故障也不会丢失。                                                                                                                                                                                                |

### 事务方法

Go 语言中使用以下三个方法实现 MySQL 中的事务操作。

```go

// 开始事务
func (db *DB) Begin() (*Tx, error)

// 提交
func (tx *Tx) Commit() error

// 回滚
func (tx *Tx) Rollback() error
```

```go
// 事务操作示例
func transactionDemo() {
	tx, err := db.Begin() // 开启事务
	if err != nil {
		if tx != nil {
			tx.Rollback() // 回滚
		}
		fmt.Printf("begin trans failed, err:%v\n", err)
		return
	}
	sqlStr1 := "Update user set age=30 where id=?"
	ret1, err := tx.Exec(sqlStr1, 2)
	if err != nil {
		tx.Rollback() // 回滚
		fmt.Printf("exec sql1 failed, err:%v\n", err)
		return
	}
	affRow1, err := ret1.RowsAffected()
	if err != nil {
		tx.Rollback() // 回滚
		fmt.Printf("exec ret1.RowsAffected() failed, err:%v\n", err)
		return
	}

	sqlStr2 := "Update user set age=40 where id=?"
	ret2, err := tx.Exec(sqlStr2, 3)
	if err != nil {
		tx.Rollback() // 回滚
		fmt.Printf("exec sql2 failed, err:%v\n", err)
		return
	}
	affRow2, err := ret2.RowsAffected()
	if err != nil {
		tx.Rollback() // 回滚
		fmt.Printf("exec ret1.RowsAffected() failed, err:%v\n", err)
		return
	}

	fmt.Println(affRow1, affRow2)
	if affRow1 == 1 && affRow2 == 1 {
		fmt.Println("事务提交啦...")
		tx.Commit() // 提交事务
	} else {
		tx.Rollback()
		fmt.Println("事务回滚啦...")
	}

	fmt.Println("exec trans success!")
}
```
