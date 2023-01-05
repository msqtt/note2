# http/Request

## HTTP 消息

回忆一下 HTTP 消息结构

- HTTP Request 和 HTTP Response (请求和响应)
  - 请求和(响应)行
  - 0 个或多个 Header
  - 空行
  - 可选消息体(Body)

```http
GET /index.html HTTP/1.1
Host: www.wtf.com
User-Agent: Mozilla/5.0
(空行)
```

## Request

go 语言中提供了表示 http request 的 struct `Request`， 表示客户端发送的 HTTP 请求消息

重要字段:

- URL
- Header
- Body
- Form、PostForm、MultipartForm

也可以通过 Request 方法访问请求中的 Cookie、URL、User Agent 等信息

Request 既可以代表发送到服务器的请求，又可以代表客户端发出的请求

### 请求 URL

- Request 的 URL 字段就代表了请求行(请求信息第一行) 里面的部分内容
- URL 字段是指向 url.URL 类型的一个指针，url.URL 是一个 struct:

```go
type URL struct {
    Scheme   string
    Opaque   string
    User     *Userinfo
    Host     string
    RawQuery string
    Fragment string
}
```

url 通用形式：`scheme://[userinfo@]host/path[?query][#fragment]`

- 不以斜杠开头的 URL 被解释为： `scheme:'opaque[?query][#fragment]`

#### Query

例如：`http://www.example.com/post?id=123&thread_id=456`

- r.URL.RawQuery 表示`id=123&thread_id=456`

  > 一般使用 Request 的 Form 字段来获取 Key-value 对

- r.URL.Query() 会提供查询字符串对应的 `map[string][]string`

```go
query := r.URL.Query()
id := query["id"] // 返回数组
id1 := query.Get("id")  // 返回数组第一个

```

#### URL Fragment

如果从浏览器发出的请求，那么你无法提取出 Fragment 字段的值

- 浏览器发出请求时，会把 fragment 部分去掉
- HTTP 客户端包发出的请求就会保留

#### Header

Request 和 Response 的 Header 是通过 Header 类型来描述的，它是一个 map, 用来描述 HTTP Header 里的 Key-Value 对

- Header map 的 key 是 string 类型，value 是`[]string`
- 设置 key 时，会创建一个空的`[]string `作为 value, value 里第一个元素就是新 header 的值
  - `r.Header `返回 map
  - `r.Header`["Accept-Encoding"] 返回指定 key 对应 value `[]string`类型
  - `r.Header.Get("Accept-Encoding")` 返回 string, 以`,`分隔

#### Body

请求和响应的 Bodies 都是使用 Body 字段表示的
Body 是一个 `io.ReadCloser` 接口

- 一个 Reader 接口
- 一个 Closer 接口

- Reader 接口定义了一个`Open([]byte) (int error)`方法，返回 byte 的数量，可选的错误

- Closer 接口定义了一个 Close 方法：
  - 没有参数，返回可选的错误

使用 Body 的 Read 方法，读取请求 body 内容

```go
func (w http.ResponseWriter, r *http.Request) {
    length := r.ContentLength
    body := make([]byte, length)
    r.Body.Read(body)
    fmt.Fprintln(w, string(body))
}
```

## 表单

一般 HTML 表单里面的数据会以 `name-value` 的形式，通过`POST`请求发送出去

- 它的数据内容会放在 POST 请求的 Body 里面

- 通过 POST 发送的 name-value 数据对的格式可以通过表单的 `Content Type` 来指定，也就是 `enctype` 属性:
  - 浏览器被要求至少要支持：`application/x-www-form-urlencoded`、`multipart/form-data`
  - HTML5 的话，还需要支持`text/plain`

1. `enctype` 默认值为 `application/x-www-form-urlencoded` 表示以 url 编码发送数据, 将查询字符串里的表单数据编码

2. `enctype` 为 `multipart/form-data`：
   - 每一个`name-value` 对都会被转换为一个`MIME` 消息部分
   - 每一个部分都有自己的 `Content Type` 和 `Content Dispostion`

如何选择`enctype`

- 简单文本使用 表单 URL 编码
- 大量数据，例如上传数据：`multipart-MIME`
  - 可以把二进制数据通过选择 `Base64` 编码，来当作文本进行发送

### Form

Request 上的函数允许我们从 URL/Body 中获取数据，通过这些<mark>字段</mark>:

- `Form`, 实际上是 `map[string][]string` 即一个 key 可以对应多个 value
  - 如果表单和 URL 里有同样的 key, 那么它们都会放在一个 `slice` 里: 表单里的值靠前，URL 的值靠后
- `PostForm`
  - 和 Form 类似，但 PostForm 只会返回 表单里的 value
- `MultipartForm`
  - 需要先调用`ParseMultipartForm()`方法才能使用 `MultipartForm`
  - `ParseMultipartForm()` 该方法在必要时调用`ParseForm()`方法
  - 参数是需要读取的数据长度(字节数), 返回类型是一个 struct , 这个 struct 里有两个 map:
    1. key 是 `string`, value 是`[]string`
    2. key 是 `string`, value 是 文件

::: tip
其中 Form 和 PostForm 字段只支持 enctype 为`application/x-www-form-urlencoded`的请求，如果 enctype 为`multipart/form-data`只能使用 MultipartForm 字段获取数据
:::

用法:

1. 先调用 `ParseForm` 或 `ParseMultipartForm` 来解析 `Request`
2. 然后相应的访问 `Form`、`PostForm` 或 `MultipartForm` 字段

### FormValue() & PostFormValue()

这两个方法里自动调用了 `ParseMultipartForm()`, 而`ParseMultipartForm()` 会自动调用`ParseForm()`因此无需手动调用`ParseForm`

- `FormValue()` 方法会返回 Form 字段中指定 key 对应的第一个 value
- `PostFormValue()` 方法只会返回 PostForm 字段(表单中的 value)中指定 key 对应的第一个 value

### 上传文件

`multipart/form-data` 最常见的例子就是上传文件

```go
func exampleHandlerFunc(w http.ResponseWriter, r *http.Request) {
    r.ParseMultipartForm(1024)
    fileHeader := r.MultipartForm.File["uploader-name"][0] // map[string][]FileHeader
    file, err := fileHeader.Open()
    if err == nil {
        data, err := ioutil.ReadAll(file)
        if err == nil {
            fmt.Fprintln(w, string(data))
        }
    }

}
```

为了简便，go 提供了类似的 `Form()` 的 `FormFile()` 方法， 它只返回第一个 file 与 fileHeader, 且自动调用 `ParseMultipartForm()`

```go
func exampleHandlerFunc(w http.ResponseWriter, r *http.Request) {
    file, _, err := r.FormFile( "uploader-name" ) // 忽略了 FileHeader
    if err == nil {
        data, err := ioutil.ReadAll(file)
        if err == nil {
            fmt.Fprintln(w, string(data))
        }
    }

}

```

#### MultiparReader()

- `func(r *Request) MultiparReader()(*multipart.Reader, error)`
- 如果请求是 `multipart/form-data` 或 `multipart` 混合的 POST 请求：

  - MultiparReader 返回一个 MIHE multipart Reader
  - 否则返回一个 nil 和一个错误

可以使用该方法代替 `ParseMultipartForm()` 来把请求的 body 作为 stream 进行处理， 而不是作为对象处理，不是一次性获取整个 map, 逐个检查来自表单的值，然后每次处理一个

### POST Json

- 不是所有的 POST 请求都来自 Form
- 客户端 会以不同的方式对 POST 请求编码
  - jQuery 通常使用 `application/x-www-form-urlencoded`
  - Angular 是 `application/json`

ParseForm 无法处理 `application/json`
