# 基础内容

## 基本语法

### 注释

```lua
-- 单行注释

--[[
    多行注释
]]
```

### 全局变量

在默认情况下，变量总是认为是全局的。

全局变量不需要声明，给一个变量赋值后即创建了这个全局变量，访问一个没有初始化的全局变量也不会出错，只不过得到的结果是：nil

如果你想删除一个全局变量，只需要将变量赋值为 nil。

这样变量 b 就好像从没被使用过一样。换句话说, 当且仅当一个变量不等于 nil 时，这个变量即存在。

```lua
-- 创建了一个全局变量
var="hello world"

-- 把它删除了
var=nil
```

## 数据类型

Lua 是动态类型语言，变量不要类型定义,只需要为变量赋值。 值可以存储在变量中，作为参数传递或结果返回。

| 数据类型 | 描述                                                                                                                                                                                       |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| nil      | 表示一个无效值（在条件表达式中相当于 false）                                                                                                                                               |
| boolean  | 包含两个值：false 和 true                                                                                                                                                                  |
| number   | 双精度类型的实浮点数                                                                                                                                                                       |
| string   | 字符串由一对双引号或单引号来表示                                                                                                                                                           |
| function | C 或 Lua 编写的函数                                                                                                                                                                        |
| userdata | 表示任意存储在变量中的                                                                                                                                                                     |
| thread   | 表示执行的独立线路，用于执行协同程序                                                                                                                                                       |
| table    | Lua 中的表（table）其实是一个"关联数组"（associative arrays），数组的索引可以是数字或者是字符串。在 Lua 里，table 的创建是通过"构造表达式"来完成，最简单构造表达式是{}，用来创建一个空表。 |

```lua
-- 可以使用type函数测试给定变量或者值的类型

print(type("Hello world"))      --> string
print(type(10.4*3))             --> number
print(type(print))              --> function
print(type(type))               --> function
print(type(true))               --> boolean
print(type(nil))                --> nil
print(type(type(X)))            --> string
```

## Lua 变量

变量在使用前，必须在代码中进行声明，即创建该变量。

编译程序执行代码之前编译器需要知道如何给语句变量开辟存储区，用于存储变量的值。

Lua 变量有三种类型：

- 全局变量
- 局部变量
- 表中的域

Lua 中的变量全是全局变量, 哪怕是语句块或是函数里，
除非用`local`显示声明为局部变量

局部变量的作用域为从声明位置开始到所在语句块结束。

```lua
-- test.lua 文件脚本
a = 5               -- 全局变量
local b = 5         -- 局部变量

function joke()
    c = 5           -- 全局变量
    local d = 6     -- 局部变量
end

joke()
print(c,d)          --> 5 nil

do
    local a = 6     -- 局部变量
    b = 6           -- 全局变量
    print(a,b);     --> 6 6
end

print(a,b)      --> 5 6
```

## 循环

### repeat...until 循环

如果条件判断语句（condition）为 false，循环会重新开始执行，直到条件判断语句（condition）为 true 才会停止执行, 像 do--while, 就是条件反过来

```lua
--[ 变量定义 --]
a = 10
--[ 执行循环 --]
repeat
   print("a的值为:", a)
   a = a + 1
until a > 15
```

### while

```lua
a=10
while a < 20
do
   print("a 的值为:", a)
   a = a+1
end
```

### for

#### step 型

```lua
for var=exp1,exp2,exp3 do
    <执行体>
end

--[[
var从exp1变化到exp2，每次变化以exp3为步长递增var，并执行一次"执行体"。exp3是可选的，如果不指定，默认为1
]]
```

#### foreach 型

```lua
days = {"Suanday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"}

for i,v in ipairs(days) do
    print(v)
end
```

i 是数组索引值，v 是对应索引的数组元素值。ipairs 是 Lua 提供的一个迭代器函数，用来迭代数组。

## 流程控制

控制结构的条件表达式结果可以是任何值，Lua 认为 false 和 nil 为假，true 和非 nil 为真

::: tip
要注意的是 Lua 中 0 为 true
:::

lua 只有 if-else 型条件语句

```lua

if a == "hello world" then
    print("a说"..a)
elseif a
    print("a存在")
else
    print("a不存在")
end
```

## Lua 函数

在 Lua 中，函数是被看作是"第一类值（First-Class Value）"，函数可以存在变量里

function 可以以匿名函数（anonymous function）的方式通过参数传递

lua 的函数可以是多返回值的

```lua
function maximum (a)
    local mi = 1             -- 最大值索引
    local m = a[mi]          -- 最大值
    for i,val in ipairs(a) do
       if val > m then
           mi = i
           m = val
       end
    end
    return m, mi
end

print(maximum({8,10,23,12,5}))
```

### 可变参数

Lua 函数可以接受可变数目的参数，和 C 语言类似在函数参数列表中使用三点`（...)` 表示函数有可变的参数。

- Lua 将函数的参数放在一个叫 arg 的表中，`#arg`表示传入参数的个数。

例如，我们计算几个数的平均值:

```lua
function average(...)
   result = 0
   local arg={...}
   for i,v in ipairs(arg) do
      result = result + v
   end
   print("总共传入 " .. #arg .. " 个数")
   return result/#arg
end

print("平均值为",average(10,5,3,4,5,6))


--[[
总共传入 6 个数
平均值为	5.5
]]
```

## 运算符

运算符是一个特殊的符号，用于告诉解释器执行特定的数学或逻辑运算。Lua 提供了以下几种运算符类型

- 算术运算符
- 关系运算符
- 逻辑运算符
- 其他运算符

### 算术

| 操作符 | 描述   |
| ------ | ------ |
| +      | 加法   |
| -      | 减法   |
| \*     | 乘法   |
| /      | 除法   |
| %      | 取余   |
| ^      | 幂运算 |
| -      | 负号   |

### 关系

| 操作符 | 描述         |
| ------ | ------------ |
| ==     | 是否相等     |
| ~=     | 是否不等     |
| >      | 是否大于     |
| <      | 是否小于     |
| >=     | 是否大于等于 |
| <=     | 是否小于等于 |

### 逻辑

| 操作符 | 描述 |
| ------ | ---- |
| and    | 与   |
| or     | 或   |
| not    | 取反 |

### 其他

| 操作符 | 描述                 |
| ------ | -------------------- |
| ..     | 连接字符串           |
| #      | 返回字符串或数组长度 |

### 优先级别

```lua
^
not    - (unary)
*      /
+      -
..
<      >      <=     >=     ~=     ==
and
or
```

除了`^`和`..`外所有的二元运算符都是左连接的。

## Lua string

字符串由一对双引号或单引号来表示,可以用 2 个方括号 `[[]]` 来表示"一块"字符串, 就像 js 的"``"

在对一个数字字符串上进行算术操作时，Lua 会尝试将这个数字字符串转成一个数字, 而字符串连接使用的是 `..`

```lua
> print("2" + 6)
8.0
> print("2" + "6")
8.0
> print("2 + 6")
2 + 6
> print("-2e2" * "6")
-1200.0
> print("error" + 1)
stdin:1: attempt to perform arithmetic on a string value
stack traceback:
    stdin:1: in main chunk
    [C]: in ?

> print("a" .. 'b')
ab
> print(157 .. 428)
157428
>
```

使用 `#` 来计算字符串的长度，放在字符串前面

```lua
> len="www.liudanbing.com"
> #len
18
> print(#len)
18
>
```

### 字符串操作

Lua 提供了很多的方法来支持字符串的操作：

| 函数                                                   | 描述                                                                                                                                          |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `string.upper(argument)`                               | 字符串全部转为大写字母                                                                                                                        |
| `string.lower(argument)`                               | 字符串全部转为小写字母                                                                                                                        |
| `string.gsub(mainString,findString,replaceString,num)` | 在字符串中替换, mainString 为操作字符串，findString 为要被替换的字符串，replaceString 为要替换成的字符串 num 替换次数（可以忽略，则全部替换） |
| `string.find(str, substr, [init, [end]])`              | 在 str 中查找 substr, init 为开始查找位置，end 为结束索引,返回开始和结束位置，不存在返回 nil                                                  |
| `string.reverse(arg)`                                  | 反转字符串                                                                                                                                    |
| `string.format(...)`                                   | 放回一个格式化字符串，相当于 sprintf                                                                                                          |
| `string.char(arg) 和 string.byte(arg[,int]) `          | char 将整型数字转成字符并连接, byte 转换字符为整数值(可以指定某个字符，默认第一个字符)                                                        |
| `string.len(arg)`                                      | 计算字符串长度，不是有`#`了吗 :poop:                                                                                                          |
| `string.rep(str, n))`                                  | 返回 n 个 str 拼接在一起的字符串                                                                                                              |

## Lua 数组

Lua 数组的索引键值可以使用整数表示，数组的大小不是固定的。

### 一维数组

一维数组是最简单的数组，其逻辑结构是线性表

```lua
array = {"Lua", "Tutorial"}

for i= 0, 2 do
   print(array[i])
end
--[[
    nil
    lua
    Tutorial
]]
```

<mark>在 Lua 索引值是以 1 为起始，但你也可以在 0 储存。除此外我们还可以以负数为数组索引值</mark>

```lua
array = {}

for i= -2, 2 do
   array[i] = i *2
end

for i = -2,2 do
   print(array[i])
end
--[[
    -4
    -2
    0
    2
    4
]]
```

### 多维数组

多维数组即数组中包含数组或一维数组的索引键对应一个数组

```lua
-- 初始化数组
array = {}
for i=1,3 do
   array[i] = {}
      for j=1,3 do
         array[i][j] = i*j
      end
end

-- 访问数组
for i=1,3 do
   for j=1,3 do
      print(array[i][j])
   end
end

-- 行三列的阵列二维数组
```

## Lua 迭代器

迭代器（iterator）是一种对象，它能够用来遍历标准模板库容器中的部分或全部元素，每个迭代器对象代表容器中的确定的地址

在 Lua 中迭代器是一种支持指针类型的结构，它可以遍历集合的每一个元素

泛型 for 在自己内部保存迭代函数，实际上它保存三个值：迭代函数、状态常量、控制变量

泛型 for 迭代器提供了集合的 key/value 对，语法格式如下

```lua
for k, v in pairs(t) do
    print(k, v)
end
```

::: tip
ipairs 与 pairs 的区别：

- ipairs 遍历时遇到 nil 就退出
- pairs 直到遍历完 table 所有元素才退出
  :::

下面我们看看范性 for 的执行过程：

- 首先，初始化，计算 in 后面表达式的值，表达式应该返回范性 for 需要的三个值：<b>迭代函数、状态常量、控制变量</b>；与多值赋值一样，如果表达式返回的结果个数不足三个会自动用 nil 补足，多出部分会被忽略。
- 第二，将状态常量和控制变量作为参数调用迭代函数（注意：对于 for 结构来说，状态常量没有用处，仅仅在初始化时获取他的值并传递给迭代函数）。
- 第三，将迭代函数返回的值赋给变量列表。
- 第四，如果返回的第一个值为 nil 循环结束，否则执行循环体。
- 第五，回到第二步再次调用迭代函数

在 Lua 中我们常常使用函数来描述迭代器，每次调用该函数就返回集合的下一个元素。Lua 的迭代器包含以下两种类型:

- 无状态的迭代器
- 多状态的迭代器

### 无状态的迭代器

无状态的迭代器是指不保留任何状态的迭代器，因此在循环中我们可以利用无状态迭代器避免创建闭包花费额外的代价。

每一次迭代，迭代函数都是用两个变量（状态常量和控制变量）的值作为参数被调用，一个无状态的迭代器只利用这两个值可以获取下一个元素。

这种无状态迭代器的典型的简单的例子是 ipairs，他遍历数组的每一个元素。

以下实例我们使用了一个简单的函数来实现迭代器，实现 数字 n 的平方

```lua
function square(iteratorMaxCount,currentNumber)
   if currentNumber<iteratorMaxCount
   then
      currentNumber = currentNumber+1
   return currentNumber, currentNumber*currentNumber
   end
end

for i,n in square,3,0
do
   print(i,n)
end

--[[
    1    1
    2    4
    3    9
]]
```

当 Lua 调用`ipairs(a)`开始循环时，他获取三个值：迭代函数 iter、状态常量 a、控制变量初始值 0；然后 Lua 调用`iter(a,0)`返回`1,a[1]`（除非`a[1]=nil`）；第二次迭代调用`iter(a,1)`返回 2,`a[2]`……直到第一个`nil`元素

### 多状态的迭代器

很多情况下，迭代器需要保存多个状态信息而不是简单的状态常量和控制变量，最简单的方法是使用闭包，还有一种方法就是将所有的状态信息封装到`table`内，将`table`作为迭代器的状态常量，因为这种情况下可以将所有的信息存放在`table`内，所以迭代函数通常不需要第二个参数。

以下实例我们创建了自己的迭代器

```lua
array = {"Lua", "Tutorial"}

function elementIterator (collection)
   local index = 0
   local count = #collection
   -- 闭包函数
   return function ()
      index = index + 1
      if index <= count
      then
         --  返回迭代器的当前元素
         return collection[index]
      end
   end
end

for element in elementIterator(array)
do
   print(element)
end
```

## Lua table

table 是 Lua 的一种数据结构用来帮助我们创建不同的数据类型，如：数组、字典等。

Lua table 使用关联型数组，你可以用任意类型的值来作数组的索引，但这个值不能是 nil。

Lua table 是不固定大小的，你可以根据自己需要进行扩容。

Lua 也是通过`table`来解决模块`（module）`、包`（package`和对象`（Object）`的。 例如`string.format`表示使用"format"来索引`table string`。

### Table(表)的构造

构造器是创建和初始化表的表达式。表是 Lua 特有的功能强大的东西。最简单的构造函数是`{}`，用来创建一个空表。可以直接初始化数组

```lua
-- 初始化表
mytable = {}

-- 指定值
mytable[1]= "Lua"

-- 移除引用
mytable = nil
-- lua 垃圾回收会释放内存
```

当我们为 `table a` 并设置元素，然后将 `a` 赋值给 `b`，则 `a` 与 `b` 都指向同一个内存。如果 `a` 设置为 `nil` ，则 `b` 同样能访问 `table` 的元素。如果没有指定的变量指向 a，Lua 的垃圾回收机制会清理相对应的内存。

### Table 操作

| 操作符                                        | 描述                                                                                                                                      |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| ..                                            | 连接字符串                                                                                                                                |
| `table.concat(table[, sep [, start[, end]]])` | concat 是 concatenate(连锁, 连接)的缩写, 列出参数中指定 table 的数组部分从 start 位置到 end 位置的所有元素, 元素间以指定的分隔符(sep)隔开 |
| `table.insert (table, [pos,] value)`          | table 的数组部分指定位置(pos)插入值为 value 的一个元素. pos 参数可选, 默认为数组部分末尾                                                  |
| `table.remove (table [, pos])`                | 返回 table 数组部分位于 pos 位置的元素. 其后的元素会被前移. pos 参数可选, 默认为 table 长度, 即从最后一个元素删起                         |
| `table.sort (table [, comp])`                 | 对给定的 table 进行升序排序。                                                                                                             |

## Lua 模块与包

模块类似于一个封装库，从 Lua 5.1 开始，Lua 加入了标准的模块管理机制，可以把一些公用的代码放在一个文件里，以 API 接口的形式在其他地方调用，有利于代码的重用和降低代码耦合度

Lua 的模块是由变量、函数等已知元素组成的 table，因此创建一个模块很简单，就是创建一个 table，然后把需要导出的常量、函数放入其中，最后返回这个 table 就行。以下为创建自定义模块 `module.lua`，文件代码格式如下：

```lua
-- 文件名为 module.lua
-- 定义一个名为 module 的模块
module = {}

-- 定义一个常量
module.constant = "这是一个常量"

-- 定义一个函数
function module.func1()
    io.write("这是一个公有函数！\n")
end

local function func2()
    print("这是一个私有函数！")
end

function module.func3()
    func2()
end

return module
```

由上可知，模块的结构就是一个 table 的结构，因此可以像操作调用 table 里的元素那样来操作调用模块里的常量或函数。

上面的 func2 声明为程序块的局部变量，即表示一个私有函数，因此是不能从外部访问模块里的这个私有函数，必须通过模块里的公有函数来调用.

### require 函数

Lua 提供了一个名为`require`的函数用来加载模块。要加载一个模块，只需要简单地调用就可以了

```lua
require("<模块名>")

require "<模块名>"
```

执行 require 后会返回一个由模块常量或函数组成的 table，并且还会定义一个包含该 table 的全局变量

```lua
-- test_module.lua 文件
-- module 模块为上文提到到 module.lua
require("module")

print(module.constant)

module.func3()
```

或者给加载的模块定义一个别名变量，方便调用

```lua
-- test_module2.lua 文件
-- module 模块为上文提到到 module.lua
-- 别名变量 m
local m = require("module")

print(m.constant)

m.func3()
```

### 加载机制

对于自定义的模块，模块文件不是放在哪个文件目录都行，函数 require 有它自己的文件路径加载策略，它会尝试从 Lua 文件或 C 程序库中加载模块。

require 用于搜索 Lua 文件的路径是存放在全局变量 `package.path` 中，当 Lua 启动后，会以环境变量 `LUA_PATH` 的值来初始这个环境变量。如果没有找到该环境变量，则使用一个编译时定义的默认路径来初始化。

当然，如果没有 `LUA_PATH` 这个环境变量，也可以自定义设置，在当前用户根目录下打开 `.profile` 文件（没有则创建，打开 `.bashrc` 文件也可以），例如把 "~/lua/" 路径加入 `LUA_PATH` 环境变量里：

```bash
#LUA_PATH
export LUA_PATH="~/lua/?.lua;;"
# 文件路径以 ";" 号分隔，最后的 2 个 ";;" 表示新加的路径后面加上原来的默认路径。
```

接着，更新环境变量参数，使之立即生效。

这时假设 `package.path` 的值是

```
/Users/aceld/lua/?.lua;
./?.lua;
/usr/local/share/lua/5.1/?.lua;
/usr/local/share/lua/5.1/?/init.lua;
/usr/local/lib/lua/5.1/?.lua;
/usr/local/lib/lua/5.1/?/init.lua
```

那么调用 `require("module")` 时就会尝试打开以下文件目录去搜索目标。

```lua
/Users/aceld/lua/module.lua;
./module.lua
/usr/local/share/lua/5.1/module.lua
/usr/local/share/lua/5.1/module/init.lua
/usr/local/lib/lua/5.1/module.lua
/usr/local/lib/lua/5.1/module/init.lua
```

如果找过目标文件，则会调用 `package.loadfile` 来加载模块。否则，就会去找 C 程序库。

搜索的文件路径是从全局变量 `package.cpath` 获取，而这个变量则是通过环境变量 `LUA_CPATH` 来初始。

搜索的策略跟上面的一样，只不过现在换成搜索的是 so 或 dll 类型的文件。如果找得到，那么 `require` 就会通过 `package.loadlib` 来加载它。
