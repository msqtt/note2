# API 参数
可以通过 Context 的 Param 方法来获取 API 参数

`localhost:8000/xxx/zhangsan`

```go
package main

import (
    "net/http"
    "strings"

    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()
    r.GET("/user/:name/*action", func(c *gin.Context) {
        name := c.Param("name")
        action := c.Param("action")
        //截取/
        action = strings.Trim(action, "/")
        c.String(http.StatusOK, name+" is "+action)
    })
    //默认为监听 8080 端口
    r.Run(":8000")
}
```

访问：`http://localhost:8000/user/something/what`

输出结果：`something is what`
