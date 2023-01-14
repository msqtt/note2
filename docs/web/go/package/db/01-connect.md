# database/连接数据库

1. 数据库驱动, 需要加载目标数据库的驱动，驱动里包含着与该数据库交互的逻辑

   - mysql 的话，推荐[这个](https://github.com/go-sql-driver/mysql)

2. 使用 `sql.Open()`

   - 数据库驱动的名称
   - 数据源连接
   - 得到一个指向 `sql.DB` struct 的指针

3. 使用`sql.DB` 来操作数据库，它代表了 0 个或多个底层连接的
   池，这些连接由 sql 包维护，sql 包会自动创建和释放这些连接
   - 它对于多个 goroutine 并发的使用是安全的

```go
import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
   // DSN:Data Source Name
	dsn := "user:password@tcp(127.0.0.1:3306)/dbname"
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		panic(err)
	}
	defer db.Close()  // 注意这行代码要写在上面err判断的下面
}
```

## Open()

- `Open()`函数并不会连接数据库, 甚至不会验证其参数，它只是把后续连接到数据库所必需的 `struct`
  给设置好了
- 它只是用以处理数据库，而不是实际的连接，而真正的连接是在被需要的时候才进行懒设置的,
- `sql.DB` 不需要进行关闭(也可以关闭)
- 这个抽象包含了数据库连接的池，并且会对此进行维护
- 在使用`sql.DB`的时候，可以对它的全局变量进行使用，也可以传递到数据库里

## 如何获得驱动

正常的做法是使用`sql.Register()`函数，数据库驱动的名称和一个实现了`driver.Driver`接口的
struct，来注册数据库的驱动，例：

`sql.Register("mysql", &drv{})`

::: tip
我们之所以没有写这条语句，是因为 mysql 的驱动，在这个包被引入的时候进行了自我注册
:::

## PingContext()

`(* DB)func PingContext()`函数

```go
ctx := context.Background()
err := db.PingContext(ctx)
if err != nil {
  log.Fataln(err.Error())
}
fmt.Println("Connected!")
```

`db.PingContext()` 函数是用来验证数据库连接是否仍然有效，如有必要则建立一个连接

- 需要一个 `Context`
  类型参数，这种类型可以携带截止时间、取消信号和其他其他请求范围的值，并且可以横跨 API 边界和进程
- 上例创建 context 使用的是 context.Background()
  函数。该函数返回一个非 nil 的空 Context，它不会被取消，它没有值，没有截止时间
- 它通常用在 main 函数、初始化或测试中，作为请求的顶级 Context

### Ping()

也可以直接使用`Ping()`验证,没有特殊要求的话，推荐使用这个 :relaxed:

```go
err := db.Ping()
if err != nil {
  log.Fataln(err)
}
lgo.Println("Connected!")
```

## SetMaxOpenConns()

```go
func (db *DB) SetMaxOpenConns(n int)
```

`SetMaxOpenConns`设置与数据库建立连接的最大数目。 如果 n 大于 0 且小于最大闲置连接数，会将最大闲置连接数减小到匹配最大开启连接数的限制。 如果 n<=0，不会限制最大开启连接数，默认为 0（无限制）。

## SetMaxIdleConns()

```go
func (db *DB) SetMaxIdleConns(n int)
```

`SetMaxIdleConns`设置连接池中的最大闲置连接数。 如果 n 大于最大开启连接数，则新的最大闲置连接数会减小到匹配最大开启连接数的限制。 如果 n<=0，不会保留闲置连接。
