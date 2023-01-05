# http/Template

Web 模板就是预先设计好的 HTML 页面，它可以被模板引擎反复的使用，来产生 HTML 页面

模板引擎可以合并模板上下文数据，产生最终的 HTML

> 模板 + 数据 --模板引擎--> HTML

## 模板简介

两种理想的模板引擎

1. 无逻辑模板引擎

   - 通过占位符，动态数据被替换到模板中
   - 不做任何逻辑处理，只做字符串替换
   - 处理完全由 handler 来完成
   - 目标是展示层和逻辑层完全分离

2. 逻辑嵌入模板引擎
   - 编程语言被嵌入到模板中
   - 在运行时出模板引擎来执行
   - 功能强大
   - 逻辑代码遍布 handler 和模板，难以维护

Go 的标准库提供了`text/template(通用模板引擎)`，`html/template(HTML模板引擎)` 两个模板库

Go 模板引擎主要使用的是 `text/template`, HTML 相关的部分使用了`html/template` 是个混合体

模板可以完全无逻辑，但又具有足够的嵌入特性，和大多数模板引擎一样，Go Web 的模板位于无逻辑和嵌入逻辑之间的某个地方

::: tip
`text/template` 和 `html/template` 这两个包的部分函数看起来非常相似，实际功能也确实如此。通常，使用 `html/template` 来呈现网站。
`html/template` 包是对 `text/template` 包的包装。所有模板示例都对 `html/template` 包同样适用，除了 import 语句无需其他任何修改。HTML 模板提供了上下文感知安全性的额外好处。这可以防止诸如 JavaScript 注入之类的事情。
:::

### 模板的工作原理

在 Web 应用中，通常是由 handler 来处理模板引擎

1. handler 调用模板引擎，并将使用的模板传递给引擎

   - 通常是一组模板文件和动态数据

2. 模板引擎生成的 HTML，并将其写入到 ResponseWriter

3. ResponseWriter 再将它加入到 HTTP 响应中，返回给客户端

### 关于模板

模板必须是可读的文本格式，扩展名任意。对于 Web 应用通常就是 HTML

模板里一般会内嵌一些命令，叫做 action, action 位于两层花括号之间

```
{{ . }}
```

- action 可以由命令模板引擎将其替换成一个值

### 使用模板引擎

1. 解析模板源(可以是字符串或模板文件)， 从而创建一个解析好的模板的 struct

2. 执行解析好的模板，并传入 ResponseWriter 和数据。
   - 这会触发模板引擎组合解析好的模板和数据，来产生最终的 HTML，并将它传递给 ResponseWriter

```go
// hello.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width-device-width, initial-scale-1.0">
    <title>Template</title>
</head>

<body>
    {{ . }}
</body>
</html>

// main.go
package main

import (
    "net/http"
    "text/template"
)
// main...

func process(w http.ResponseWriter, r *http.Request) {
    t, _ := template.ParseFiles("hello.html")
    t.Execute(w, "Hello World")
}
```

## 解析模板

解析模板有三个方法：

1. `ParseFiles()`

2. `ParseGlob()`
3. `Parse()`

### ParseFiles()

- 解析模板文件，并创建一个解析好的模板 struct, 后续可以被执行
- `ParseFiles()` 函数其实是 Template struct 上 `ParseFiles()` 方法的简便调用
- 调用`ParseFiles()` 后， 会创建一个新的模板，模板的名字是文件名
- `New()`函数 用以创建模板
- `ParseFiles()` 的参数数量可变，但只返回一个模板
  - 当解析多个文件时，第一个文件作为返回的模板(名，内容)，其余的作为 map,相当与模板集，供后续执行使用

```go
func main() {
    // 方法一
    // t, _ := template.ParseFiles("hello.html")

    // 方法二
    t := template.New("hello.html") // 模板的名字
    t, _ := t.ParseFiles("hello.html")
}
```

### ParseGlob

- 使用模式匹配来解析特定的文件

```go
func main() {
    t, _ := template.ParseGlob("*.html") // 匹配目录下的所有html文件，返回的模板名字为第一个模板的名字
}
```

### Parse

- 可以解析字符串模板，其它的方式最终都会调用 Parse

### Lookup 方法

- 通过模板名来寻找模板，如果没找到就返回 `nil`

### Must 函数

- 可以包裹一个函数，返回到一个模板的指针和一个错误
  - 如果错误不为`nil`, 那么就 `panic`

一般来说，一个 web 应用，如果模板没加载成功，那应用就寄了，所以使用 Must 可以简化我们 Parse 模板时的错误处理，如果失败可以直接 panic 了

## 执行模板

1. `Execute()`

   - 参数是 ResponseWriter、数据
   - 单模板：很适用
   - 模板集：只用第一个模板

2. `ExecuteTemplate()`
   - 参数是：ResponseWriter、模板名、数据
   - 模板集：很适用

```go
func process(w http.ResponseWriter, r *http.Request) {
    t, _ := template.ParseFiles("t1.html")
    t.Execute(w, "Hello World")

    ts, _ := template.ParseFiles("t1.html", "t2.html")
    ts.ExecuteTemplate(w, "t2.html", "Hello World")
}
```

## 解析和执行的综合例子

```go
package main

import (
    "html/template"
    "log"
    "net/http"
)

func main() {
    templates := loadTemplates()
    http.HandlerFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fileName := r.URL.Path[1:]
        t := templates.Lookup(fileName)
        if t != nil {
            err := t.Execute(w, nil)
            if err != nil {
                log.Fatalln(err.Error())
            }
        } else {
            w.WriteHeader(http.StatusNotFound)
        }
    })
    http.Handle("/css/", http.FileServer(http.Dir("wwwroot")))
    http.Handle("/img/", http.FileServer(http.Dir("wwwroot")))
    http.ListenAndServe(":8080", nil)
}

func loadTemplates() *template.Template {
    result := template.New("templates")
    template.Must(result.ParseGlob("templates/*.html"))
    return result
}
```

## Action

Action 就是 Go 模板中嵌入的命令，位于两组花括号之间 `{{ xxx }}`

- `.` 就是一个 Action， 而且是最重要的一个。它代表了传入模板的数据

Action 主要可以分为五类：

1. 条件类
1. 迭代/遍历类
1. 设置类
1. 包含类
1. 定义类

### 条件类

```go
{{ if arg }}
    some content
{{ end }}


// 可以使用 else
{{ if arg }}
    some content
{{ else }}
    other content
{{ end }}
```

```go
// tmpl.html
{{ if . }}
    Number is greater than 5!
{{ else }}
    Number is 5 or less!
{{ end }}

func process(w http.ResponseWriter, r *http.Request) {
    t, _ := template.ParseFiles("tmpl.html")
    rand.Seed(time.Now().Unix())
    t.Execute(w, rand.Intn(10) > 5)
}
```

### 迭代/遍历类

这类 Action 用来遍历数组、slice、map 或 channel 等数据结构

```go
{{ range array}}
    Dot is set to the element {{ . }} // 这里的. 表示不是传入的上下问数据，而是遍历array里的元素
{{ end }}
```

```go
// tmpl.html
<ul>
{{ range . }}
    <li> {{ . }} </li>
{{ end }}
</ul>

func process(w http.ResponseWriter, r *http.Request) {
    t, _ := template.ParseFiles("tmpl.html")
    daysOfWeek := []string{"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"}
    t.Execute(w, daysOfWeek)
}
```

回落机制

如果 array 为 空， 可以执行 else

```go
{{ range array}}
    Dot is set to the element {{ . }}
{{ else }}
    The array is Empty
{{ end }}
```

### 设置类

它允许在指定范围内，让 `.` 来表示其它指定的值

```go
{{ with arg }}
    Dot is set to arg {{ . }}
{{ end }}
```

```go
// tmpl.html
<div>The dot is {{ . }}</div>
<div>
{{ with "world"}}
Now the dot is set to {{ . }}
{{ end }}
</div>
<div>The dot is {{ . }} again</div>

func process(w http.ResponseWriter, r *http.Request) {
    t, _ := template.ParseFiles("tmpl.html")
    t.Execute(w, "hello")
}
```

回落机制

如果 arg 为 "", 执行 else

```go
<div>The dot is {{ . }}</div>
{{ with "" }}
Now the dot is set to {{ . }}
{{ else }}
The dot is still {{ . }}
{{ end }}
<div>The dot is {{ . }} again</div>
```

### 包含类

允许在模板中包含其它的模板

```go
{{ template "name" }}
```

```go
// t1.html
<div>This is t1.html</div>
<div>This is the value of the dot in t1.html - [{{ . }}]</div>
<hr />
{{ template "t2.html" }}
<hr />
<div>This is t1.html after</div>

// t2.html
<div style="background-color: yellow;">
    This is t2.html <br>
    This is the value of the dot in t2 html - [{{ . }}]
</div>

func process(w http.ResponseWriter, r *http.Request) {
    t, _ := template.ParseFiles("t1.html", "t2.html")
    t.Execute(w, "hello world")
}
```

<mark>注意：上面的例子，t2.html 中`.` 的位置为空，这是因为没有传入上下文数据数据</mark>

如果要传入参数：

```go
{{ template "name" arg }}
```

### 定义类

define action
