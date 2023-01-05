# URL 参数
- URL 参数可以通过`DefaultQuery()`或`Query()`方法获取
- `DefaultQuery()`若参数不村则，返回默认值，`Query()`若不存在，返回空串
- `API ? name=zs`

```go
package main

import (
    "fmt"
    "net/http"

    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()
    r.GET("/user", func(c *gin.Context) {
        //指定默认值
        //http://localhost:8080/user 才会打印出来默认的值
        name := c.DefaultQuery("name", "骨头")
        c.String(http.StatusOK, fmt.Sprintf("hello %s", name))
    })
    r.Run()
}
```
不传递参数输出的结果：`hello 骨头`



访问：`http://localhost:8080/user?name=sb`
传递参数输出的结果：`hello sb`
