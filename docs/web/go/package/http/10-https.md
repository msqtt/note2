# http/Https

## http

http 是明文传输的，非常不安全，任何情况下都不建议使用

## https

比 http 添加了 TLS 层传输层，对数据进行了加密, 有 SSL 证书验证，是比较安全的方式

## Http Listener

- http.ListenAndServe 函数
- http.ListenAndServeTLS 函数

> go 提供了生成自定义证书的方式: 使用 `go run GOPATH:/src/crypto/tls/generate_cert.go -h` 查看帮助

当使用了 https，应用将自动从 HTTP/1.1 升级为 HTTP/2.0

## HTTP/2.0

- 请求多路复用
- Header 压缩
- 默认安全, 基本上只使用 https
- Server Push

### Server Push

```go
func handleHome(w http.ResponseWriter, r *http.Request) {
    if pusher, ok := w.(http.Pusher); ok {
        pusher.Push("/css/app.css", &http.PushOptions{
            Header: http.Header{"Content-Type": []string{"text/css"}},
        })
        t, _ := template.ParseFiles("layout.html", "home.html")
        t.ExecuteTemplate(w, "layout", "hello world")
    }
}
```
