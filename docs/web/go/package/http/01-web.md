# http/Web 编程

## 简单的 web 服务器

用 go 的 http 包来构建一个简单的 hello world 服务器

```go
package main

import (
	"fmt"
	"log"
	"net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
	errForm := r.ParseForm()
	if errForm != nil {
		log.Fatalln(errForm)
	}
	fmt.Println(r.Form)
	_, err := fmt.Fprint(w, "Hello world 🐈")
	if err != nil {
	}
}

func main() {
	log.Println("Server start...")
	http.HandleFunc("/", helloHandler)
	err := http.ListenAndServe(":8888", nil)
	if err != nil {
		log.Fatalln(err)
		return
	}
}
```

上面的代码，要编写一个 Web 服务器很简单，只要调用 http 包的两个函数就可以了。

> Go 通过简单的几行代码就已经运行起来一个 Web 服务了，而且这个 Web 服务内部有支持高并发的特性

## Go Web 如何工作

### 概念

Go Web 工作方式的概念

- Request：用户请求的信息，用来解析用户的请求信息，包括 post、get、cookie、url 等信息

- Response：服务器需要反馈给客户端的信息

- Conn：用户的每次请求链接

- Handler：处理请求和生成返回信息的处理逻辑

### Http 包运行机制

| Web 工作模式流程图                                                                                              |
| --------------------------------------------------------------------------------------------------------------- |
| ![image](https://user-images.githubusercontent.com/94043894/184097043-e54bf410-b0d9-4fee-a012-b20a6ea65d58.png) |

1. 创建 Listen Socket, 监听指定的端口，等待客户端请求到来。

2. Listen Socket 接受客户端的请求，得到 Client Socket, 接下来通过 Client Socket 与客户端通信。

3. 处理客户端的请求，首先从 Client Socket 读取 HTTP 请求的协议头，如果是 POST 方法，还可能要读取客户端提交的数据，然后交给相应的 handler 处理请求，handler 处理完毕准备好客户端需要的数据，通过 Client Socket 写给客户端。

这整个的过程里面我们只要了解清楚下面三个问题，也就知道 Go 是如何让 Web 运行起来了

- 如何监听端口？
- 如何接收客户端请求？
- 如何分配 handler？

#### ListenAndServe（监听端口）

通过之前编写的代码可以发现 Go 是通过 `ListenAndServe` 来处理这些事情的

<b>源码如下：</b>

```go
func ListenAndServe(addr string, handler Handler) error {
	server := &Server{Addr: addr, Handler: handler}
	return server.ListenAndServe()
}
```

初始化了一个 server 对象，然后调用了该对象 ListenAndServe 方法

<b>源码如下：</b>

```go
func (srv *Server) ListenAndServe() error {
	if srv.shuttingDown() {
		return ErrServerClosed
	}
	addr := srv.Addr
	if addr == "" {
		addr = ":http" //http 默认端口：80
	}
	ln, err := net.Listen("tcp", addr)
	if err != nil {
		return err
	}
	return srv.Serve(ln)
}
```

`ListenAndServe`调用了`net.Listen("tcp", addr)`，也就是底层用 TCP 协议搭建了一个服务，最后调用`src.Serve`监控我们设置的端口。监控之后如何接收客户端的请求呢？

#### Server.Serve（接收客户端请求）

<b>部分源码如下：</b>

```go
func (srv *Server) Serve(l net.Listener) error {
	...

	ctx := context.WithValue(baseCtx, ServerContextKey, srv)
	for {
		rw, err := l.Accept()
		...

		connCtx := ctx
		if cc := srv.ConnContext; cc != nil {
			connCtx = cc(connCtx, rw)
			if connCtx == nil {
				panic("ConnContext returned nil")
			}
		}
		tempDelay = 0
		c := srv.newConn(rw)
		c.setState(c.rwc, StateNew, runHooks) // before Serve can return
		go c.serve(connCtx)
	}
}
```

这个函数里面起了一个`for{}`，首先通过`Listener`接收请求：`l.Accept()`，其次创建一个`Conn：c := srv.newConn(rw)`，最后单独开了一个`goroutine`，把这个请求的数据当做参数扔给这个 conn 去服务：`go c.serve(connCtx)`。这个就是高并发体现了，用户的每一次请求都是在一个新的`goroutine`去服务，相互不影响。

#### conn.serve（处理请求）

<b>部分源码如下：</b>

```go
func (c *conn) serve(ctx context.Context) {
    ...

	ctx, cancelCtx := context.WithCancel(ctx) c.cancelCtx = cancelCtx
	defer cancelCtx()

	c.r = &connReader{conn: c}
	c.bufr = newBufioReader(c.r)
	c.bufw = newBufioWriterSize(checkConnErrorWriter{c}, 4<<10)

	for {
		w, err := c.readRequest(ctx)
        ...

		// HTTP cannot have multiple simultaneous active requests.[*]
		// Until the server replies to this request, it can't read another,
		// so we might as well run the handler in this goroutine.
		// [*] Not strictly true: HTTP pipelining. We could let them all process
		// in parallel even if their responses need to be serialized.
		// But we're not going to implement HTTP pipelining because it
		// was never deployed in the wild and the answer is HTTP/2.
		serverHandler{c.server}.ServeHTTP(w, w.req)
		w.cancelCtx()
        ...

	}
}
```

- conn 首先会解析 request:`w, err := c.readRequest(ctx)`
- 然后获取相应的 handler 去处理请求：`serverHandler{c.server}.ServeHTTP(w, w.req)`

#### ServeHTTP

<b>部分源码如下：</b>

```go
func (sh serverHandler) ServeHTTP(rw ResponseWriter, req *Request) {
	handler := sh.srv.Handler
	if handler == nil {
		handler = DefaultServeMux
	}
	if req.RequestURI == "*" && req.Method == "OPTIONS" {
		handler = globalOptionsHandler{}
	}
    ...
	handler.ServeHTTP(rw, req)
}
```

`sh.srv.Handler`就是我们刚才在调用函数`ListenAndServe`时候的第二个参数，我们前面例子传递的是 nil，也就是为空，那么默认获取`handler = DefaultServeMux`,那么这个变量用来做什么的呢？对，这个变量就是一个路由器，它用来匹配 url 跳转到其相应的 handle 函数，那么这个我们有设置过吗？有，我们调用的代码里面第一句不是调用了`http.HandleFunc("/", helloHandle)`嘛。这个作用就是注册了请求`/`的路由规则，当请求 uri 为"/"，路由就会转到函数 helloHandle，DefaultServeMux 会调用 ServeHTTP 方法，这个方法内部其实就是调用 sayhelloName 本身，最后通过写入 response 的信息反馈到客户端。

### 总结

<b>详细的整个流程如下图所示：</b>

| 流程图                                                                                                          |
| --------------------------------------------------------------------------------------------------------------- |
| ![image](https://user-images.githubusercontent.com/94043894/184104915-4f852d3b-d750-4a98-939c-c643dbe279ee.png) |

## Go 的 http 包详解

Go 的 http 有两个核心功能：Conn、ServeMux

### Conn 的 goroutine

与我们一般编写的 http 服务器不同，Go 为了实现高并发和高性能，使用了 goroutines 来处理 Conn 的读写事件，这样每个请求都能保持独立，相互不会阻塞，可以高效的响应网络事件。这是 Go 高效的保证。

<b>Go 在等待客户端请求里面是这样写的：</b>

```go
c, err := srv.newConn(rw)
if err != nil {
	continue
}
go c.serve()
```

这里我们可以看到客户端的每次请求都会创建一个 Conn，这个 Conn 里面保存了该次请求的信息，然后再传递到对应的 handler，该 handler 中便可以读取到相应的 header 信息，这样保证了每个请求的独立性。

### ServeMux 的自定义

讲述`conn.server`的时候，其实内部是调用了 http 包默认的路由器，通过路由器把本次请求的信息传递到了后端的处理函数。那么这个路由器是怎么实现的呢？

<b>结构如下：</b>

```go
type ServeMux struct {
	mu sync.RWMutex   //锁，由于请求涉及到并发处理，因此这里需要一个锁机制
	m  map[string]muxEntry  // 路由规则，一个 string 对应一个 mux 实体，这里的 string 就是注册的路由表达式
	hosts bool // 是否在任意的规则中带有 host 信息
}
```

接着看一下 Handler 的定义

```go
type Handler interface {
	ServeHTTP(ResponseWriter, *Request)  // 路由实现器
}
```

`Handler` 是一个接口，但是前一小节中的 `helloHandler` 函数并没有实现 `ServeHTTP` 这个接口，为什么能添加呢？原来在 http 包里面还定义了一个类型 `HandlerFunc`,我们定义的函数 helloHandler 就是这个 `HandlerFunc` 调用之后的结果，这个类型默认就实现了 `ServeHTTP` 这个接口，即我们调用了 `HandlerFunc(f)`,强制类型转换 f 成为 `HandlerFunc` 类型，这样 f 就拥有了 `ServeHTTP` 方法。

```go
type HandlerFunc func(ResponseWriter, *Request)

// ServeHTTP calls f(w, r).
func (f HandlerFunc) ServeHTTP(w ResponseWriter, r *Request) {
	f(w, r)
}
```

路由器里面存储好了相应的路由规则之后，那么具体的请求又是怎么分发的呢？请看下面的代码，默认的路由器实现了`ServeHTTP`：

```go

func (mux *ServeMux) ServeHTTP(w ResponseWriter, r *Request) {
	if r.RequestURI == "*" {
		w.Header().Set("Connection", "close")
		w.WriteHeader(StatusBadRequest)
		return
	}
	h, _ := mux.Handler(r)
	h.ServeHTTP(w, r)
}
```

如上所示路由器接收到请求之后，如果是那么关闭链接，不然调用 `mux.Handler(r)`返回对应设置路由的处理 Handler，然后执行`h.ServeHTTP(w, r)`

也就是调用对应路由的 handler 的 ServerHTTP 接口，那么 `mux.Handler(r)`怎么处理的呢？

```go

func (mux *ServeMux) Handler(r *Request) (h Handler, pattern string) {
	if r.Method != "CONNECT" {
		if p := cleanPath(r.URL.Path); p != r.URL.Path {
			_, pattern = mux.handler(r.Host, p)
			return RedirectHandler(p, StatusMovedPermanently), pattern
		}
	}
	return mux.handler(r.Host, r.URL.Path)
}

func (mux *ServeMux) handler(host, path string) (h Handler, pattern string) {
	mux.mu.RLock()
	defer mux.mu.RUnlock()

	// Host-specific pattern takes precedence over generic ones
	if mux.hosts {
		h, pattern = mux.match(host + path)
	}
	if h == nil {
		h, pattern = mux.match(path)
	}
	if h == nil {
		h, pattern = NotFoundHandler(), ""
	}
	return
}
```

原来他是根据用户请求的 URL 和路由器里面存储的 map 去匹配的，当匹配到之后返回存储的 handler，调用这个 handler 的`ServeHTTP`接口就可以执行到相应的函数了。

通过上面这个介绍，我们了解了整个路由过程，Go 其实支持外部实现的路由器 `ListenAndServe`的第二个参数就是用以配置外部路由器的，它是一个 Handler 接口，即外部路由器只要实现了 Handler 接口就可以，我们可以在自己实现的路由器的`ServeHTTP`里面实现自定义路由功能。

如下代码所示，我们自己实现了一个简易的路由器：

```go
package main

import (
	"fmt"
	"net/http"
)

type MyMux struct {
}

func (p *MyMux) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path == "/" {
		helloHandler(w, r)
		return
	}
	http.NotFound(w, r)
	return
}

func helloHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello myroute!")
}

func main() {
	mux := &MyMux{}
	http.ListenAndServe(":9090", mux)
}
```

通过对 http 包的分析之后，现在让我们来梳理一下整个的代码执行过程。

- 首先调用 Http.HandleFunc
  按顺序做了几件事：

  1. 调用了 DefaultServeMux 的 HandleFunc

  2. 调用了 DefaultServeMux 的 Handle

  3. 往 DefaultServeMux 的 `map[string]muxEntry` 中增加对应的 handler 和路由规则

- 其次调用 `http.ListenAndServe(":9090", nil)`

  按顺序做了几件事情：

  1. 实例化 Server

  2. 调用 Server 的 `ListenAndServe()`

  3. 调用 `net.Listen("tcp", addr)`监听端口

  4. 启动一个 for 循环，在循环体中 Accept 请求

  5. 对每个请求实例化一个 Conn，并且开启一个 goroutine 为这个请求进行服务 `go c.serve()`

  6. 读取每个请求的内容 `w, err := c.readRequest()`

  7. 判断 handler 是否为空，如果没有设置 handler（这个例子就没有设置 handler），handler 就设置为 DefaultServeMux

  8. 调用 handler 的 ServeHttp

  9. 在这个例子中，下面就进入到 `DefaultServeMux.ServeHttp`

  10. 根据 request 选择 handler，并且进入到这个 handler 的 ServeHTTP

      `mux.handler(r).ServeHTTP(w, r)`

  11. 选择 handler：
      1. 判断是否有路由能满足这个 request（哈希表匹配 ServeMux 的 muxEntry）
      2. 如果有路由满足，调用这个路由 handler 的 ServeHTTP
      3. 如果没有路由满足，调用 NotFoundHandler 的 ServeHTTP
