# Cookie 的使用
- 测试服务端发送 cookie 给客户端，客户端请求时携带 cookie

```go
package main

import (
   "github.com/gin-gonic/gin"
   "fmt"
)

func main() {
   // 1.创建路由
   // 默认使用了 2 个中间件 Logger(), Recovery()
   r := gin.Default()
   // 服务端要给客户端 cookie
   r.GET("cookie", func(c *gin.Context) {
      // 获取客户端是否携带 cookie
      cookie, err := c.Cookie("key_cookie")
      if err != nil {
         cookie = "NotSet"
         // 给客户端设置 cookie
         //  maxAge int, 单位为秒
         // path,cookie 所在目录
         // domain string,域名
         //   secure 是否智能通过 https 访问
         // httpOnly bool  是否允许别人通过 js 获取自己的 cookie
         c.SetCookie("key_cookie", "value_cookie", 60, "/",
            "localhost", false, true)
      }
      fmt.Printf("cookie 的值是： %s\n", cookie)
   })
   r.Run(":8000")
}
```

> Cookie 的缺点，不安全，明文，增加带宽消耗，可以被禁用，cookie 有上限

