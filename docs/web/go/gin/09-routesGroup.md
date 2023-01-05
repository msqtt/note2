# routes group
routes group 是为了管理一些相同的 URL

```go
package main

import (
   "github.com/gin-gonic/gin"
   "fmt"
)

// gin 的 helloWorld

func main() {
   // 1.创建路由
   // 默认使用了 2 个中间件 Logger(), Recovery()
   r := gin.Default()
   // 路由组 1 ，处理 GET 请求
   v1 := r.Group("/v1")
   // {} 是书写规范
   {
      v1.GET("/login", login)
      v1.GET("submit", submit)
   }
   v2 := r.Group("/v2")
   {
      v2.POST("/login", login)
      v2.POST("/submit", submit)
   }
   r.Run(":8000")
}

func login(c *gin.Context) {
   name := c.DefaultQuery("name", "jack")
   c.String(200, fmt.Sprintf("hello %s\n", name))
}

func submit(c *gin.Context) {
   name := c.DefaultQuery("name", "lily")
   c.String(200, fmt.Sprintf("hello %s\n", name))
}

```


::: tip
httprouter 会将所有路由规则构造一颗前缀树
:::
