# 集成 Gorm

## 下载包

```go
go get -u -v gorm.io/gorm
go get -u -v gorm.io/driver/mysql
```

## 创建模型

```go
package model

import "gorm.io/gorm"

type User struct {
	gorm.Model
    UserName string `json:"username"`
    Password string `json:"password"`
}
```

## 编写 Dao

```go
package dao

import (
	"blog/model"
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

//定义接口
type Manager interface {
	AddUser(user *model.User)
}

type manager struct {
	db *gorm.DB
}

//向外开放的接口实例（manager 结构体）
var Mgr Manager

//初始化数据库
func init() {
	dsn := "root:qwfpgjluy;@tcp(175.178.69.145:3306)/go_db?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Err happen when init db: ", err)
	}
	Mgr = &manager{db: db}
	db.AutoMigrate(&model.User{})
}

//实现接口
func (mgr *manager) AddUser(user *model.User) {
	mgr.db.Create(user)
}
```

> 使用实例化接口，因为只能使用实例化的 DB 操纵数据库

## 测

```go
package main

import (
	"blog/dao"
	"blog/model"
)

func main() {
	user := model.User{Username: "hello", Password: "world"}

	dao.Mgr.AddUser(&user)
}
```
