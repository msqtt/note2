# http/Response

## ResponseWriter

从服务器向客户端返回响应需要使用 ResponseWriter

- ResponseWriter 是一个接口, handler 使用它来返回响应
- ResponseWriter 是由非导出的`http.response` struct 支撑的

  - 在原码中, `*http.response` 实现了 `ResponseWriter`接口， 那么可以说 handlerFunc 的 `w http.ResponseWriter`参数也是按引用传递

### Write()

`Write()`方法 接受 一个 `[]byte` 作为参数，然后把它写入到 HTTP 响应的 Body 里面

如果在 Write 方法被调用时，header 里面没有设置 `content-type`, 那么数据的前 512 字节就会被用来检测 `content-type`

即 html 代码会被检测为 `Content-type: text/html; charset=utf-8`

### WriteHeader()

`WriteHeader()` 方法接受一个整数类型(HTTP 状态码) 参数，并把它作为 HTTP 响应的状态码返回

- 如果该方法没有被显式调用，那么在第一次调用 `Write()` 方法前，会隐式调用`WriteHeader(http.StatusOk)`

因此, `WriteHeader()` 主要用来发送错误类的 HTTP 状态码

调用完 WriteHeader 方法后，仍然可以写入到 ResponseWriter,但无法再修改 header 了

### Header()

`Header()` 方法返回 headers 的 map, 可以进行修改

修改后的 headers 将会体现在返回给客户端的 HTTP 响应里

::: warning
`Header()` 必须在 `WriteHeader()`前调用, `WriteHeader()` 调用后就无法修改 headers 里的值了
:::

```go
func exampleHandlerFunc(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Localtion", "https://google.com")
    w.WriteHeader(302)
}

func exampleHandlerFunc(w http.ResponseWriter, r *http.Request) {
    w.Header().set("Content-Type", "application/json")
    post := &Post{
        User: "user"
        Threads: []string{"first", "second", "third"},
    }
    json, _ := json.Marshal(post)
    w.Write(json)
}
```

## 内置 Response

- NotFound 函数, 包装一个 404 状态码和一个额外的信息
- ServeFile 函数， 从文件系统提供文件，返回给请求者
- ServeContent 函数，它可以把实现了 io.ReadSeeker 接口的任何东西里面的内容返回给请求者
  - 还可以处理 Range 请求(范围请求)，如果只请求了资源的一部分内容，那么 ServeContent 就可以如此响应。而 ServeFile 或 io.Copy 则不行
- Redirect 函数，告诉客户端重定向到另一个 URL
