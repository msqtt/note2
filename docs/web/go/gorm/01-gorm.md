# gorm

对象关系映射(Object Relational Mapping) 模式，是为了解决面向对象与关系数据库(如mysql数据厍)存在的互不匹配的现象的技术。

简单来说, ORM 通过使用描述对象和数据库之间映射的元数据，将程序中的对象自动持久化到关系数据库中。

## 概述
一个神奇的，对开发人员友好的 Golang ORM 库

- 全特性 ORM (几乎包含所有特性)
- 模型关联 (一对一， 一对多，一对多（反向）， 多对多， 多态关联)
- 钩子 (Before/After Create/Save/Update/Delete/Find)
- 预加载
- 事务
- 复合主键
- SQL 构造器
- 自动迁移
- 日志
- 基于GORM回调编写可扩展插件
- 全特性测试覆盖
- 开发者友好


## 安装
```go
go get -u gorm.io/gorm

// go get -u gorm.io/driver/mysql
```


## 快速开始

```go
package main

import (
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type Product struct {
	gorm.Model
	Code  string
	Price uint
}

func main() {
	dsn := "username:password@tcp(175.178.69.145:3306)/go_db?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
        log.Fatal(err)
	}

	//自动检查 Product 结构是否变化，变化则进行迁移 (若不存在表，会创建)
	db.AutoMigrate(&Product{})

	// insert
	db.Create(&Product{Code: "what", Price: 1000})

	// select
	var product Product
	db.First(&product, 1)
	db.First(&product, "code = ?", "what")

	// updata
	db.Model(&product).Update("Price", 200)

	// 删
	db.Delete(&product)
}
```



