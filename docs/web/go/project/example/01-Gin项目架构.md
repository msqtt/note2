# 项目框架
## 安装 Gin

```go
go get -u -v github.com/gin-gonic/gin
```
## 规范包与目录
使用 mvc 设计模式
- handlers
- daoes
    > 数据库访问内容
- routers
    > API 与 handler 的对应
- models
- assets
- templates

## 初始化项目
```go
go mod init xxx
```
