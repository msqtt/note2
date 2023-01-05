# http/Middleware

## 什么是中间件

Go 语言中 Middleware 在 Handle 前，因此有：

```
[请求] --> [Middleware] --> [Handle]
[响应] <-- [Middleware] <-- [Handle]
```

## 创建中间件

前情提要：

- `func ListenAndServe(add string, handler Handler) error`
  - handler 如果是 nil: `DefaultServeMux`

```go
type Handler interface {
    ServeHttp(ResponseWriter, *Request)
}
```

```go
// 中间件既实现了Handler接口，其字段也是Handler, 类似链表，可以把多个中间件串起来
type MyMiddleware struct {
    Next http.Handler
}

func (m MyMiddleware)ServeHTTP(w http.ResponseWriter, r *http.Request) {
    // 在next handler 之前做事
    m.next.ServeHTTP(w, r)
    // 在 next handler 之后做事
}
```

## 中间件用途

- Logging
- 安全
- 请求超时
- 响应压缩

```go
package middleware

import "net/http"

type AuthMiddleware struct {
    Next http.Handler
}

func (am *AuthMiddleware) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    if am.Next == nil {
        am.Next = http.DefaultServeMux
    }
    auth := r.Header.Get("Authorization")
    if auth != "" {
        am.Next.ServeHTTP(w, r)
    } else {
        w.WriteHeader(http.StatusUnauthorized)
    }
}


// main.go
package main

import (
    "net/http"
    "middleware"
)

func main() {
    http.HandleFunc("/companies", func(w http.ResponseWriter, r *http.Request) {
        c := Company {
            ID: 123,
            Name: "Google",
            Country: "USA",
        }
        enc := json.NewEncoder(w)
        enc.Encode(c)
    })
    http.ListenAndServe(":8080", new(middleware.AuthMiddleware))
}
```
