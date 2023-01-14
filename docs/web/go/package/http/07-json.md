# http/Json

## Json 与 Go struct

```go
// json
{
    "id": 123,
    "name": "Google",
    "country": "USA"
}

// go struct
type Company struct {
    ID int
    Name string
    Country string
}
```

## Tags

```go
type Company struct {
    ID int         `json:"id"`
    Name string    `json:"name"`
    Country string `json:"country"`
}
```

如果有不想序列化的字段，请使用`json:"-"`

### 类型映射

- Go `bool`: JSON `boolean`
- Go `float64`: JSON `Number`
- Go `string`: JSON `strings`
- Go `nil`: JSON `null`

### 对于未知结构的 JSON

- `map[string]interface{}` 可以存储任意 JSON 对象
- `[]interface{}` 可以存储任意的 JSON 数组

### 读写 JSON

#### 读取 JSON

- 需要一个解码器: `dec := json.NewDecoder(r.Body)`
  - 参数需实现 Reader 接口
- 在解码器上进行解码：`dec.Decode(&query)`

#### 写入 JSON

- 需要一个编码器： `enc := json.NewEncode(w)`
  - 参数需实现 Writer 接口
- 编码：`enc.Encode(results)`

#### Marshal() 和 Unmarshal()

- `Marshal()编码`：把 go struct 转化为 json 格式

  - `MarshalIndent()`: 带缩进

- `Unmarshal()解码`: 把 json 转化为 go struct

::: tip
如果处理的目标是 string 或 bytes, 使用 Marshal 与 Unmarshal 比较合适
如果处理的目标是 stream，使用 Encode, 和 Decode 比较合适
:::
