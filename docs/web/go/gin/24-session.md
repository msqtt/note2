# Sessions

`gorilla/sessions`为自定义 session 后端提供 cookie 和文件系统 session 以及基础结构。

主要功能是：

- 简单的 API：将其用作设置签名（以及可选的加密）cookie 的简便方法。
- 内置的后端可将 session 存储在 cookie 或文件系统中。
- Flash 消息：一直持续读取的 session 值。
- 切换 session 持久性（又称“记住我”）和设置其他属性的便捷方法。
- 旋转身份验证和加密密钥的机制。
- 每个请求有多个 session，即使使用不同的后端也是如此。
- 自定义 session 后端的接口和基础结构：可以使用通用 API 检索并批量保存来自不同商店的 session。


代码：

```go
package main

import (
    "fmt"
    "net/http"

    "github.com/gorilla/sessions"
)

// 初始化一个 cookie 存储对象
// something-very-secret 应该是一个你自己的密匙，只要不被别人知道就行
var store = sessions.NewCookieStore([]byte("something-very-secret"))

func main() {
    http.HandleFunc("/save", SaveSession)
    http.HandleFunc("/get", GetSession)
    err := http.ListenAndServe(":8080", nil)
    if err != nil {
        fmt.Println("HTTP server failed,err:", err)
        return
    }
}

func SaveSession(w http.ResponseWriter, r *http.Request) {
    // Get a session. We're ignoring the error resulted from decoding an
    // existing session: Get() always returns a session, even if empty.

    //　获取一个 session 对象，session-name 是 session 的名字
    session, err := store.Get(r, "session-name")
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    // 在 session 中存储值
    session.Values["foo"] = "bar"
    session.Values[42] = 43
    // 保存更改
    session.Save(r, w)
}
func GetSession(w http.ResponseWriter, r *http.Request) {
    session, err := store.Get(r, "session-name")
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    foo := session.Values["foo"]
    fmt.Println(foo)
}
```

`删除 session` 的值：

```go
// 删除
// 将 session 的最大存储时间设置为小于零的数即为删除
session.Options.MaxAge = -1
session.Save(r, w)
```
