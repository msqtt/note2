# 404 页面

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
        name := c.DefaultQuery("name", "枯藤")
        c.String(http.StatusOK, fmt.Sprintf("hello %s", name))2020-08-05 09:22:11 星期三
    })
    r.NoRoute(func(c *gin.Context) {
        c.String(http.StatusNotFound, "404 not found2222")
    })
    r.Run()
}
```
