---
title: 表单及html5
---

# HTML

### `<form></form>`表单

1. 可以将用户的数据提交给服务器

2. 一个页面可以有多个表单

> W3C 的 HTTP 协议规定 表单提交数据给服务器的格式为：`action?name=value&name=value&...`
>
> 后端中，java 可以 String split(”&“)方式 方便地获取数据

##### 属性

- **action**用来指定数据提交给哪个服务器（请求路径）
- **method** 用来指定表单提交数据的方式
  - get 若不填写表单默认采用 get，会将用户信息显示在浏览器的 url 栏
  - post 用户提交的信息不会显示在浏览器的地址栏，当用户信息有敏感信息必须使用 post

> 采用 get 的方式提交数据，其实相当于以超链接的方式`action?name=value&name=value&...`

### `<input>`输入标签

同一个表单的 input 要放在同一个 form 下，否则没有关联作用

##### type 控件

input 标签的 type 属性决定该标签的具体功能

- **text**用来输入文本信息
- **button** 普通按钮
- **checkbox** 方形多选框
- **radio**圆形单选框
- **email**邮件输入框（html5 新增）
- **passwd**秘密输入框
- **file** 文件上传专用
- **reset** 清空 text 框内容的按钮
- **submit**用来提交表单信息的按钮
- **hidden** 隐藏域，网页上看不见但在表单提交的时候，数据会自动提交给服务器

> 当使用 file 控件时，form 标签最好使用加上属性 `enctype="multipart/form-data"`目的是将一些数据上传到后台

##### name

1. **想要提交 input 中的信息，必须要在该 input 中加入 name 属性，否则无法提交**
2. 也有相当于 id 一样的功能用来被查找
3. 当多个 radio 的 name 一样时，只能选择一项

> 当 name 没有写的时候，该项不会 提交给服务器。
>
> 但是当 value 没有写的时候，value 的默认值是空字符串，会将空字符串提交给服务器

##### value

1. input 标签的 value 属性显示按钮上的文本
2. 提交给服务器的数据是 value 的值，radio checkbox 如需要提交数据，要手动加上 value

##### checked

若想让 radio 和 checkbox 默认被选上，需要加上 checked

##### readonly

用户无法修改，可以查看，提交

##### disabled

用户无法修改，可以查看，无法提交（即使有 name 也无法提交）

##### maxlenghth

用户可以输入的最大长度

### `<select></select>`选择标签

下拉菜单选项

##### 属性

- 同样需要指定**name**
- 如果想要默认中一项，需要加上 selected
- multiple 开启多选模式，按住 ctrl 多选
- size 默认在框内显示的条数

##### `<option>`选项

- 需要自定**value**

### `<textarea></textarea>`文本域

##### rows & cols

- 行宽和列高

##### name

- 提交数据需要指定 name

# HTML5

新的文档类型（DOCTYPE）声明非常简单：`<!DOCTYPE html>`

html5 默认编码为 UTF-8

新增内容：

- 新增语义元素`<header>, <footer>, <article>, and <section>`
- 新增表单控件比如数字、日期、时间、日历和滑块。
- 图像支持`<canvas>和<svg>`
- 多媒体支持`<video>和<audio>`
- 强大的新 API，比如用本地存储取代 cookie

#### 语义

八个新语义标签 header, section, footer, aside, nav, main, article, figure 都块级元素

可以把 CSS _display_ 属性设置为 _block_，以确保老式浏览器中正确的行为：

```css
header,
section,
footer,
aside,
nav,
main,
article,
figure {
  display: block;
}
```

> 所有浏览器，不论新旧，都会自动把未识别元素当做行内元素来处理。

自定义

可以通过浏览器向 HTML 添加新的自定义标签

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Creating an HTML Element</title>
    <script>
      document.createElement("myHero");
    </script>
    <style>
      myHero {
        display: block;
        background-color: #ddd;
        padding: 50px;
        font-size: 30px;
      }
    </style>
  </head>

  <body>
    <h1>My First Heading</h1>

    <p>My first paragraph.</p>

    <myHero>My First Hero</myHero>
  </body>
</html>
```

> IE8 以下不允许向未知的元素添加样式

#### 表单

- 灰色提示文本：placeholder
- 记忆输入下一次自动提示特性：autocomplete
- 设置表单必填：required
- 使用正则表达式：pattern
- 在表单中设置了必填。提交表单的时候不验证：novalidate（form 标签后使用） 或 formnovalidate（按钮）

- 输入控件 email, url, number, range, date 类，search, color, tel

- 下拉输入选择控件：list 和 datalist

- label 标签的 for 属性中填写的的 id 会把 label 和另一个元素绑定，若绑定 radio 则点击 label 也会选中 radio

#### 约束验证 API

1. willVAlidate 属性
   - 代表元素约束有没有被符合，若没有返回 false
2. **validity 属性**
   - 表示验证状态
3. validationMessage 属性
   - 描述与元素相关约束的失败信息
4. **checkValidity()方法**
   - 如果元素有没有满足它的任意约束，返回 false，其他情况返回 true
5. **setCustomValidity()方法**
   - 设置预定义信息
