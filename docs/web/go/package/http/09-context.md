# http/Context

## Request Context

- `func (*Request) Context() context.Context`
    - 返回当前请求的上下文

- `func (*Request) WithContext(ctx context.Context) context.Context`
    - 基于 Context进行"修改", 实际上创建新的一个Context

### context.Context

```go
type Context interface {
    Deadline() (deadline time.Time, ok bool)
    Done() <-chan struc{}
    Err() error
    Value(key interface{}) interface{}
}
```
这些方法都是用于读取，不能进行设置

## Context API-返回新的Context

- `WithCancel()`, 它有一个`CancelFunc()` 执行会往Done里发送信号
- `WithDeadline()`, 带有一个时间戳(time.Time), 时间一到，Done就会收到信号
- `WithTimeout()`, 带有一个具体的时间段(time.Duration), 时间一到，Done就会收到信号
- `WithValue()` 在里面可以添加一些值, 返回新的Context


```go
package middleware

import (
    "net/http"
    "context"
    "time"
)

type TimeoutMiddleware struct {
    Next http.Handler
}

func (tm TimeoutMiddleware) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    if tm.Next == nil {
        tm.Next = http.DefaultServeMux
    }
    ctx := r.Context()
    ctx, _ := context.WithTimeout(ctx, 3*time.Second)
    r.WithContext(ctx)
    ch := make(chan struct{})

    go func() {
        tm.Next.ServeHTTP(w, r)
        ch <- struct{}{}
    }()

    select {
        case <-ch:
            return;
        case <-ctx.Done():
            w.WriteHeader(http.StatusRequestTimeout)
    }
    ctx.Done()
}

```
