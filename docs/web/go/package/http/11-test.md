# http/TestAndProfiling

## 测试 Model 层

- `xxx_test.go`

  - 测试代码所在文件的名称以`_test` 结尾
  - 对于生产编译，不会包含以`_text` 结尾的文件
  - 对于测试编译，会包含以`_text` 结尾的文件

- `func TestUpdateModifiedTime(t *testing.T){...}`, 测试函数约定:
  - 测试函数名以 Test 开头（需要导出)
  - 函数名需要表达出被验证的特性
  - 测试函数的参数类型是 `*testing.T`, 它会提供测试相关的一些工具

> 如果出现错误，使用`T.Errorf()`等工具抛出，否则测试成功

测试 cli 执行：`go test request/model`

## 测试 Controller 层

为了尽量保证单元测试的隔离性，测试不要使用例如数据库、外部 API、文件系统等外部资源

- 模拟请求和响应
- 需要使用`net/http/httptest`提供的功能

### NewRequest 函数

- `func NewRequest(method url string, body io.Reader)(*Request, error)`
  - method: HTTP Method
  - url: 请求的 URL
  - body: 请求的 body
  - 返回的 `*Request` 可以传递给 handler 函数

```go
type ResponseRecorder {
    Code int // 状态码
    HeaderMap http.Header // 响应的header
    Body *bytes.Buffer // 响应的body
    Flushed bool // 缓存是否被flush了
}
```

- 用于捕获从 handler 返回的响应，只是做记录
- 可以用于测试断言

## Profiling 性能分析

### 能分析什么

- 内存消耗
- CPU 使用
- 阻塞的 goroutine
- 执行追踪

- 还有一个 Web 界面：应用的实时数据

### 如何分析

先在项目中 `import _ "net/http/pprof`

设置一些监听的 URL,它们会提供各类诊断信息
cli 工具：

- `go tool pprof http://localhost:8000/debug/pprof/heap` 内存
  - 从应用获取内存 dump: 应用在使用哪些内存，它们会去哪
- `go tool pprof http://localhost:8000/debug/pprof/profile` CPU
  - CPU 的快照，可以看到谁在用 CPU
- `go tool pprof http://localhost:8000/debug/pprof/block` goroutine
  - 看到阻塞的 goroutine
- `go tool pprof http://localhost:8000/debug/pprof/trace?secons=5` trace
  - 监控这段时间内，什么在执行，什么在调用

使用 web 监控
直接打开网址： `http://localhost:8000/debug/pprof` - 是个快照，只显示刷新页面时的数据

::: tip
为了防止中间件或 handler 与 性能监控冲突，在 goroutine 多开个 server

假设 web 是这个：`http.ListenAndServe(":8080", new(middleware.AuthMiddleware))`，那么可以启用 8000 端口
`go http.ListenAndServe(":8000", nil)` 专门用来监控
:::
