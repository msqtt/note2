# HTML 模板渲染
gin 支持加载 HTML 模板，然后根据模板参数进行配置并返回相应的数据，本质上就是字符串替换
`LoadHTMLGlob()`方法可以加载模板文件

```go
package main

import (
    "net/http"

    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()
    r.LoadHTMLGlob("tem/*")
    r.GET("/index", func(c *gin.Context) {
        c.HTML(http.StatusOK, "index.html", gin.H{"title": "我是测试", "ce": "123456"})
    })
    r.Run()
}
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{.title}}</title>
</head>
    <body>
        fgkjdskjdsh{{.ce}}
    </body>
</html>
```


## 多级目录

如果你的 html 在第 3 级目录里，使用`r.LoadHTMLGlob("tem/**/*")`


## html 嵌套


```go
package main

import (
    "net/http"

    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()
    r.LoadHTMLGlob("tem/**/*")
    r.GET("/index", func(c *gin.Context) {
        c.HTML(http.StatusOK, "user/index.html", gin.H{"title": "我是测试", "address": "www.5lmh.com"})
    })
    r.Run()
}
```
user/index.html 文件代码：

```html
{{ define "user/index.html" }}
{{template "public/header" .}}
        fgkjdskjdsh{{.address}}
{{template "public/footer" .}}
{{ end }}

```

`public/header.html`文件代码：

```go
{{define "public/header"}}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{.title}}</title>
</head>
    <body>

{{end}}
```

`public/footer.html`文件代码：

```go
{{define "public/footer"}}
</body>
</html>
{{ end }}
```

## 引入静态文件目录
比如引入`css, js` 等静态文件

```go
r.Static("/assets", "./assets")
```

例如，我要访问`abc.css`, 则访问`/assets/abc.css`

> 第一个参数是访问静态文件的前缀，第二个参数是静态文件的存放目录的

