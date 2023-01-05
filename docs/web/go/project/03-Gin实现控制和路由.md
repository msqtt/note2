# 实现控制和路由

## 控制器 controller

```go
package handler

import (
	"blog/dao"
	"blog/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

func AddUser(c *gin.Context) {
	var user model.User
	if err := c.Bind(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	dao.Mgr.AddUser(&user)
}

func ListUser(c *gin.Context) {
	c.HTML(200, "user.html", nil)
}
```

## 路由 router

```go
package router

import (
	"blog/handler"

	"github.com/gin-gonic/gin"
)

func Start() {
	e := gin.Default()
	e.LoadHTMLGlob("templates/*")
	e.Static("/assets", "./assets")
	e.GET("/user", handler.ListUser)
	e.POST("/user", handler.AddUser)
	e.Run(":80")
}
```
