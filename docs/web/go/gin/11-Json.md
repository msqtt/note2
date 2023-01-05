# Json 数据解析和绑定
客户端传参，后端接收并解析到结构体

```go
package main

import (
   "github.com/gin-gonic/gin"
   "net/http"
)

// 定义接收数据的结构体
type Login struct {
   // binding:"required"修饰的字段，若接收为空值，则报错，是必须字段
   User    string `form:"username" json:"user" uri:"user" xml:"user" binding:"required"`
   Pssword string `form:"password" json:"password" uri:"password" xml:"password" binding:"required"`
}

func main() {
   // 1.创建路由
   // 默认使用了 2 个中间件 Logger(), Recovery()
   r := gin.Default()
   // JSON 绑定
   r.POST("loginJSON", func(c *gin.Context) {
      // 声明接收的变量
      var json Login
      // 将 request 的 body 中的数据，自动按照 json 格式解析到结构体
      if err := c.ShouldBindJSON(&json); err != nil {
         // 返回错误信息
         // gin.H 封装了生成 json 数据的工具
         c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
         return
      }
      // 判断用户名密码是否正确
      if json.User != "root" || json.Pssword != "admin" {
         c.JSON(http.StatusBadRequest, gin.H{"status": "304"})
         return
      }
      c.JSON(http.StatusOK, gin.H{"status": "200"})
   })
   r.Run(":8000")
}
```
