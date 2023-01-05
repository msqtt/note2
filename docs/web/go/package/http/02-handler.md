# http/Handler

## 简单创建 web 应用的两种方法

函数：

```go
package main

import "net/http"

func main() {
	// handleFunc...

	http.ListenAndServe(":8080", nil) // 使用 DefaultServeMux
}
```

方法:

::: tip
其实函数 `ListenAndServe` 就是把 `server.ListenAndServe` 封装了一下
:::

```go
package main

import "net/http"

func main() {
	server := http.Server{
		Addr:    "localhost:8080",
		Handler: nil, // 使用 DefaultServeMux
	}
	// handleFunc...
	server.ListenAndServe()
}
```

## 使用 Https 对应两种方法

同上

函数:

```go
package main

import "net/http"

func main() {
	// handleFunc...

	http.ListenAndServe(":8080", nil) // 使用 DefaultServeMux
}
```

方法:

```go
package main

import "net/http"

func main() {
	server := http.Server{
		Addr:    "localhost:8080",
		Handler: nil, // 使用 DefaultServeMux
	}
	// handleFunc...
	server.ListenAndServeTLS("/", keyFile string)

}
```

> 详细的部分在 https 节

## Handler 总结

- Handler 是一个接口(`interface`)

- 定义了一个`ServeHTTP()`方法, 参数:
  - HTTPResponseWriter
  - 指向 Request struct 的指针, 包含请求的信息

> 如果赋值为 nil , 会默认使用`DefaultServeMux` handler, 是个多路复用器，会帮我们把请求 url 与加入 muxEntry 的 handler 匹配上

因此只要实现了`ServerHTTP()`方法，就是一个 handler, 我们可以自定义自己的 handler

### 多个 Handler

一般上, 我们的 web 应用有很多不同的 handler ，http 包提供的`DefaultServeMux`会为我们提供路由到其他 handler 的功能

1. `http.Handle(patten string, handler Handler)`, 将某个 Handler 附加到 `DefaultServeMux`

   - `http.Handle() `函数其实就是调用 `DefaultServeMux`(\*serverMUx) 上的 Handle 方法

2. `http.HandleFunc(patten string, Func)` 行为与`Handle`类似, 封装了一下，会帮我们把函数转为 `handler`
   - 参数 Func 与 Handler 的方法`ServerHTTP(http.ResponseWriter, *http.Request)`定义方式一样

同样 `http.HandleFunc` 调用 `DefaultServeMux` 的 `HandlerFunc()` 方法, 里面直接执行了 `Handle()`

::: tip
在执行`Handle()` 前，进行了强制类型转换 ，把 `func(Resp, \*req) `转换为 `http.HandlerFunc`类型 它实现了`Handler` 接口,而它的`ServerHTTP() `方法其实就是调用了自身函数，后面的行为都与之前的一模一样了
:::

```go
func HandleFunc(pattern string, handler func(ResponseWriter, *Request)) {
	DefaultServeMux.HandleFunc(pattern, handler)
}


func (mux *ServeMux) HandleFunc(pattern string, handler func(ResponseWriter, *Request)) {
	if handler == nil {
		panic("http: nil handler")
	}
	mux.Handle(pattern, HandlerFunc(handler))
}


type HandlerFunc func(ResponseWriter, *Request)

// ServeHTTP calls f(w, r).
func (f HandlerFunc) ServeHTTP(w ResponseWriter, r *Request) {
	f(w, r)
}
```

## 内置 Handlers

go 语言还提供了内置的 Handler

- NotFoundHandler
  - `func NotFoundHandler() Handler`, 返回一个 Handler, 它给每个请求都是"404 page not found"
- RedirectHandler
  - `func RedirectHandler(url string, code int) Handler` 返回一个 Handler, 把每个请求使用指定的状态码跳转到指定的 url
  - code 常见的有 `StatusMovePermanently`, `StatusFound`, `StatusSeeOther` 等
- StripPrefix
  - `func StripPrefix(prefix string, h handler) Handler` 返回一个 Handler, 它从请求 url 中去除指定请求，再调用另一个 Handler, 前缀不匹配就返回 404
- TimeoutHandler
  - `func TimeoutHandler(h Handler, dt time.Duration, msg string)` 返回一个 Handler, 它用来指定时间内运行传入的 handler, 如果超时，会把消息返回
- FileServer
  - `func FileServer(root FileSystem) Handler` 返回一个 Handler, 使用基于 root 的文件系统来响应请求
  - 实际使用时，我们一般委托给操作系统的文件系统

```go
type FileSystem interface {
    Open(name string) (File, error)
}

// 使用 os.Dir 这样一来，我们只要传入路径名称就可以了
type Dir string
func (d Dir) Open(name string)(File, error)
```
