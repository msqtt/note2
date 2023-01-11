# 进阶内容

## Lua 元表 metatable

### 元方法

在 Lua table 中我们可以访问对应的 key 来得到 value 值，但是却无法对两个 table 进行操作。

因此 Lua 提供了元表(Metatable)，允许我们改变 table 的行为，每个行为关联了对应的元方法。

当 Lua 试图对两个表进行相加时，先检查两者之一是否有元表，之后检查是否有一个叫"**add"的字段，若找到，则调用对应的值。"**add"等即时字段，其对应的值（往往是一个函数或是 table）就是"元方法"。

有两个很重要的函数来处理元表:

```lua
-- 对指定table设置元表(metatable)，如果元表(metatable)中存在__metatable键值，setmetatable会失败 。
setmetatable(table,metatable)

-- 返回对象的元表(metatable)
getmetatable(table)
```

```lua
mytable = {}                          -- 普通表
mymetatable = {}                      -- 元表
setmetatable(mytable,mymetatable)     -- 把 mymetatable 设为 mytable 的元表

-- 可以简写为 mytable = setmetatable({},{})

getmetatable(mytable)
-- 返回mymetatable
```

#### `__index` 元方法

这是 metatable 最常用的键。

当你通过键来访问 `table` 的时候，如果这个键没有值，那么 Lua 就会寻找该`table`的`metatable`（假定有`metatable`）中的`__index` 键。如果`__index`包含一个表格，Lua 会在表格中查找相应的键。

我们可以在使用 lua 命令进入交互模式查看:

```lua
> other = { foo = 3 }
> t = setmetatable({}, { __index = other })
> t.foo
3
> t.bar
nil
-- 如果__index包含一个函数的话，Lua就会调用那个函数，table和键会作为参数传递给函数。
```

`__index` 元方法查看表中元素是否存在，如果不存在，返回结果为 nil；如果存在则由 `__index` 返回结果。

```lua
mytable = setmetatable({key1 = "value1"}, {
  __index = function(mytable, key)
    if key == "key2" then
      return "metatablevalue"
    else
      return nil
    end
  end
})

print(mytable.key1,mytable.key2)

-- value1    metatablevalue
```

我们可以将以上代码简单写成

```lua
mytable = setmetatable({key1 = "value1"}, { __index = { key2 = "metatablevalue" } })
print(mytable.key1,mytable.key2)
```

总结:

Lua 查找一个表元素时的规则，其实就是如下 3 个步骤

1. 在表中查找，如果找到，返回该元素，找不到则继续
2. 判断该表是否有元表，如果没有元表，返回 nil，有元表则继续。
3. 判断元表有没有`__index`方法，如果`__index`方法为`nil`，则返回`nil`；如果`__index`方法是一个表，则重复 1、2、3；如果`__index`方法是一个函数，则返回该函数的返回值。

#### `__newindex` 元方法

`__newindex` 元方法用来对表更新，`__index`则用来对表访问

<mark>当你给表的一个缺少的索引赋值，解释器就会查找`__newindex` 元方法：如果存在则调用这个函数而不进行赋值操作</mark>

1. Lua 解释器先判断这个 table 是否有元表；
2. 如果有了元表，就查找元表中是否有`__newindex` 元方法；如果没有元表，就直接添加这个索引，然后对应的赋值；
3. 如果有这个`__newindex` 元方法，Lua 解释器就执行它，而不是执行赋值；
4. 如果这个`__newindex` 对应的不是一个函数，而是一个 table 时，Lua 解释器就在这个 table 中执行赋值，而不是对原来的 table

```lua
mymetatable = {}
mytable = setmetatable({key1 = "value1"}, { __newindex = mymetatable })

print(mytable.key1)

mytable.newkey = "新值2"
print(mytable.newkey,mymetatable.newkey)

mytable.key1 = "新值1"
print(mytable.key1,mymetatable.key1)

--[[
value1
nil    新值2
新值1    nil
]]
```

以上实例中表设置了元方法 `__newindex`，在对新索引键`（newkey）`赋值时`（mytable.newkey = "新值2"）`，会调用元方法，而不进行赋值。而如果对已存在的索引键`（key1）`，则会进行赋值，而不调用元方法 `__newindex`

以下实例使用了 `rawset` 函数来更新表

```lua
mytable = setmetatable({key1 = "value1"}, {
  __newindex = function(mytable, key, value)
        rawset(mytable, key, "\""..value.."\"")

  end
})

mytable.key1 = "new value"
mytable.key2 = 4

print(mytable.key1,mytable.key2)

-- new value    "4"
```

#### 为表添加操作符

以下实例演示了两表相加操作

```lua
-- 计算表中最大值，table.maxn在Lua5.2以上版本中已无法使用
-- 自定义计算表中最大值函数 table_maxn
function table_maxn(t)
    local mn = 0
    for k, v in pairs(t) do
        if mn < k then
            mn = k
        end
    end
    return mn
end

-- 两表相加操作
mytable = setmetatable({ 1, 2, 3 }, {
  __add = function(mytable, newtable)
    for i = 1, table_maxn(newtable) do
      table.insert(mytable, table_maxn(mytable)+1,newtable[i])
    end
    return mytable
  end
})

secondtable = {4,5,6}

mytable = mytable + secondtable
    for k,v in ipairs(mytable) do
print(k,v)
end

--[[
    1
    2
    3
    4
    5
    6
]]
```

对应的操作列表如下:

| 模式       | 描述              |
| ---------- | ----------------- |
| `__add`    | 对应的运算符 '+'  |
| `__sub`    | 对应的运算符 '-'  |
| `__mul`    | 对应的运算符 '\*' |
| `__div`    | 对应的运算符 '/'  |
| `__mod`    | 对应的运算符 '%'  |
| `__unm`    | 对应的运算符 '-'  |
| `__concat` | 对应的运算符 '..' |
| `__eq`     | 对应的运算符 '==' |
| `__lt`     | 对应的运算符 '<'  |
| `__le`     | 对应的运算符 '<=' |

#### `__call` 元方法

`__call` 元方法在 `table` 被调用时调用。以下实例演示了计算表中元素的和

```lua
-- 计算表中最大值，table.maxn在Lua5.2以上版本中已无法使用
-- 自定义计算表中最大值函数 table_maxn
function table_maxn(t)
    local mn = 0
    for k, v in pairs(t) do
        if mn < k then
            mn = k
        end
    end
    return mn
end

-- 定义元方法__call
mytable = setmetatable({10}, {
  __call = function(mytable, newtable)
    sum = 0
    for i = 1, table_maxn(mytable) do
        sum = sum + mytable[i]
    end
    for i = 1, table_maxn(newtable) do
        sum = sum + newtable[i]
    end
    return sum
  end
})
newtable = {10,20,30}
print(mytable(newtable))

-- 70
```

#### `__tostring` 元方法

`__tostring` 元方法用于修改表的输出行为。以下实例我们自定义了表的输出内容

```lua
mytable = setmetatable({ 10, 20, 30 }, {
  __tostring = function(mytable)
    sum = 0
    for k, v in pairs(mytable) do
        sum = sum + v
    end
    return "表所有元素的和为 " .. sum
  end
})
print(mytable)

-- 表所有元素的和为 60
```

从本文中我们可以知道元表可以很好的简化我们的代码功能，所以了解 Lua 的元表，可以让我们写出更加简单优秀的 Lua 代码

### 元表案例

所有用于表示集合的 table 共享一个元表，并且在该元表中定义如何执行一个加法操作。首先创建一个常规的 table，准备用作集合的元表，然后修改 Set.new 函数，在每次创建集合的时候，都为新的集合设置一个元表

```lua
Set = {}
local mt = {} -- 集合的元表

-- 根据参数列表中的值创建一个新的集合
function Set.new(l)
    local set = {}
     setmetatable(set, mt)
    for _, v in pairs(l) do set[v] = true end
     return set
end

-- 并集操作
function Set.union(a, b)
    local retSet = Set.new{} -- 此处相当于Set.new({})
    for v in pairs(a) do retSet[v] = true end
    for v in pairs(b) do retSet[v] = true end
    return retSet
end

-- 交集操作
function Set.intersection(a, b)
    local retSet = Set.new{}
    for v in pairs(a) do retSet[v] = b[v] end
    return retSet
end

-- 打印集合的操作
function Set.toString(set)
     local tb = {}
     for e in pairs(set) do
          tb[#tb + 1] = e
     end
     return "{" .. table.concat(tb, ", ") .. "}"
end

function Set.print(s)
     print(Set.toString(s))
end
```

在上面列举的那些可以重定义的元方法都可以使用上面的方法进行重定义。现在就出现了一个新的问题，set1 和 set2 都有元表，那我们要用谁的元表啊？虽然我们这里的示例代码使用的都是一个元表，但是实际 coding 中，会遇到我这里说的问题，对于这种问题，Lua 是按照以下步骤进行解决的

1. 对于二元操作符，如果第一个操作数有元表，并且元表中有所需要的字段定义，比如我们这里的`__add` 元方法定义，那么 Lua 就以这个字段为元方法，而与第二个值无关；
2. 对于二元操作符，如果第一个操作数有元表，但是元表中没有所需要的字段定义，比如我们这里的`__add` 元方法定义，那么 Lua 就去查找第二个操作数的元表；
3. 如果两个操作数都没有元表，或者都没有对应的元方法定义，Lua 就引发一个错误。

以上就是 Lua 处理这个问题的规则，那么我们在实际编程中该如何做呢？比如`set3 = set1 + 8`这样的代码，就会打印出以下的错误提示

```lua
function Set.union(a, b)
     if getmetatable(a) ~= mt or getmetatable(b) ~= mt then
          error("metatable error.")
     end

    local retSet = Set.new{} -- 此处相当于Set.new({})
    for v in pairs(a) do retSet[v] = true end
    for v in pairs(b) do retSet[v] = true end
    return retSet
end
```

#### 如何保护元表

我们会发现，使用`getmetatable`就可以很轻易的得到元表，使用`setmetatable`就可以很容易的修改元表，那这样做的风险是不是太大了，那么如何保护我们的元表不被篡改呢？

在 Lua 中，函数`setmetatable`和`getmetatable`函数会用到元表中的一个字段，用于保护元表，该字段是`__metatable`。当我们想要保护集合的元表，是用户既不能看也不能修改集合的元表，那么就需要使用`__metatable`字段了；当设置了该字段时，`getmetatable`就会返回这个字段的值，而`setmetatable`则会引发一个错误；如以下演示代码：

```lua
function Set.new(l)
    local set = {}
     setmetatable(set, mt)
    for _, v in pairs(l) do set[v] = true end
     mt.__metatable = "You cannot get the metatable" -- 设置完我的元表以后，不让其他人再设置
     return set
end

local tb = Set.new({1, 2})
print(tb)

print(getmetatable(tb))
setmetatable(tb, {})

--[[
 {1, 2}
You cannot get the metatable
lua: test.lua:56: cannot change a protected metatable
]]
```

#### `__index`

下面通过一个实际的例子来说明`__index`的使用。假设要创建一些描述窗口，每个`table`中都必须描述一些窗口参数，例如颜色，位置和大小等，这些参数都是有默认值得，因此，我们在创建窗口对象时可以指定那些不同于默认值得参数

```lua
Windows = {} -- 创建一个命名空间

-- 创建默认值表
Windows.default = {x = 0, y = 0, width = 100, height = 100, color = {r = 255, g = 255, b = 255}}

Windows.mt = {} -- 创建元表

-- 声明构造函数
function Windows.new(o)
     setmetatable(o, Windows.mt)
     return o
end

-- 定义__index元方法
Windows.mt.__index = function (table, key)
     return Windows.default[key]
end

local win = Windows.new({x = 10, y = 10})
print(win.x)               -- >10 访问自身已经拥有的值
print(win.width)          -- >100 访问default表中的值
print(win.color.r)          -- >255 访问default表中的值
```

在实际编程中，`__index`元方法不必一定是一个函数，它还可以是一个`table`。当它是一个函数时，Lua 以`table`和不存在 key 作为参数来调用该函数，这就和上面的代码一样；当它是一个`table`时，Lua 就以相同的方式来重新访问这个`table`，所以上面的代码也可以是这样的

```lua
-- 定义__index元方法
Windows.mt.__index = Windows.default
```

#### `__newindex` 元方法

```lua
local tb1 = {}
local tb2 = {}

tb1.__newindex = tb2
tb2.__newindex = tb1

setmetatable(tb1, tb2)
setmetatable(tb2, tb1)

tb1.x = 10
```

发现什么问题了么？是不是循环了，在 Lua 解释器中，对这个问题，就会弹出错误消息，错误消息`loop in settable`

有的时候，我们就不想从`__index`对应的元方法中查询值，我们也不想更新`table`时，也不想执行`__newindex`对应的方法，或者`__newindex`对应的`table`。那怎么办？

在 Lua 中，当我们查询`table`中的值，或者更新`table`中的值时，不想理那该死的元表，我们可以使用`rawget`函数，调用`rawget(tb, i)`就是对`table tb`进行了一次“原始的（raw）”访问，也就是一次不考虑元表的简单访问；

你可能会想，一次原始的访问，没有访问`__index`对应的元方法，可能有性能的提升，其实一次原始访问并不会加速代码执行的速度。对于`__newindex`元方法，可以调用`rawset(t, k, v)`函数，它可以不涉及任何元方法而直接设置`table t`中与`key k`相关联的`value v`

## Lua 协同程序(coroutine)

### 什么是协程(coroutine)？

#### 线程

首先复习一下多线程。我们都知道线程——Thread。每一个线程都代表一个执行序列。

当我们在程序中创建多线程的时候，看起来，同一时刻多个线程是同时执行的，不过实质上多个线程是并发的，因为只有一个 CPU，所以实质上同一个时刻只有一个线程在执行。

在一个时间片内执行哪个线程是不确定的，我们可以控制线程的优先级，不过真正的线程调度由 CPU 的调度决定。

#### 协程

协程跟线程都代表一个执行序列。不同的是，协程把线程中不确定的地方尽可能的去掉，执行序列间的切换不再由 CPU 隐藏的进行，而是由程序显式的进行。

所以，使用协程实现并发，需要多个协程彼此协作。

### 基本语法

| 方法                  | 描述                                                                                                               |
| --------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `coroutine.create()`  | 创建 coroutine，返回 coroutine， 参数是一个函数，当和 resume 配合使用的时候就唤醒函数调用                          |
| `coroutine.resume()`  | 重启 coroutine，和 create 配合使用                                                                                 |
| `coroutine.yield()`   | 挂起 coroutine，将 coroutine 设置为挂起状态，这个和 resume 配合使用能有很多有用的效果                              |
| `coroutine.status()`  | 查看 coroutine 的状态 注：coroutine 的状态有三种：dead，suspend，running，具体什么时候有这样的状态请参考下面的程序 |
| `coroutine.wrap（）`  | 创建 coroutine，返回一个函数，一旦你调用这个函数，就进入 coroutine，和 create 功能重复                             |
| `coroutine.running()` | 返回正在跑的 coroutine，一个 coroutine 就是一个线程，当使用 running 的时候，就是返回一个 corouting 的线程号        |

### coroutine 库讲解

#### coroutine.create(f)

传一个函数，用来创建协程。返回一个`thread`对象

#### coroutine.isyieldable()

如果正在运行的协程可以让出，则返回真，值得注意的是，只有主协程(线程)和 c 函数中是无法让出的。

#### coroutine.resume(co, [,val1,...])

这是一个非常重要的函数，用来启动或再启动一个协程，使其由挂起状态变为运行状态

resume 函数相当与在执行协程中的方法。参数`val1...`是执行协程 co 时传递给协程的方法。

<b>首次执行协程 co 时，参数`Val1...`会传递给协程 co 的函数</b>

<b>再次执行协程 co 时，参数`Val1...`会作为给协程 co 中上一次 yeild 的返回值。</b>

resume 函数返回什么呢？有 3 种情况:

1. 如果协程 co 的函数执行完毕，协程正常终止，resume 返回 true 和函数的返回值

2. 如果协程 co 的函数执行过程中，协程让出了（调用了 yeild()方法），那么 resume 返回 true 和协程中调用 yeild 传入的参数

3. 如果协程 co 的函数执行过程中发生错误，resume 返回 false 与错误消息

> 以看到 resume 无论如何都不会导致程序崩溃。它是在保护模式下执行的

#### coroutine.status(co)

返回一个字符串，表示协程的状态。有 4 种状态:

1. running。如果在协程的函数中调用 status，传入协程自身的句柄，那么执行到这里的时候会返回 running 状态

2. suspended。如果协程还未结束，即自身调用了 yeild 或还没开始运行，那么就是 suspended 状态

3. normal。如果协程 A resume 协程 B 时，协程 A 处于的状态为 normal。在协程 B 的执行过程中，协程 A 就一直处于 normal 状态。因为它这时候既不是挂起状态、也不是运行状态

#### coroutine.wrap(f)

`wrap()`也是用来创建协程的。只不过这个协程的句柄是隐藏的。跟`create()`的区别在于

1. `wrap()`返回的是一个函数，每次调用这个函数相当于调用`coroutine.resume()`。

2. 调用这个函数相当于在执行`resume()`函数。

3. 调用这个函数时传入的参数，就相当于在调用`resume`时传入的除协程的句柄外的其他参数。

4. 调用这个函数时，跟`resume`不同的是，它并不是在保护模式下执行的，若执行崩溃会直接向外抛出。

#### coroutine.yield(···)

使正在执行的函数挂起。

- `yeild`的参数会作为`resume`的额外返回值。

- 同时，如果对该协程不是第一次执行`resume`，`resume`函数传入的参数将会作为`yield`的返回值。

#### coroutine.running()

返回当前正在执行的线程 ID

### 以下实例演示了以上各个方法的用法

简单实用`resume、yield`，如下

```lua
--创建一个协程coco
coco = coroutine.create( function (a, b)
    print ("resume args:"..a..","..b)
    --协程被挂起
    yreturn = coroutine.yield() -- yreturn 应该是下次resume唤醒传递进来的参数
    print ("yretur:"..yreturn)

end)

--第一次启动coco协程
print (coroutine.resume(coco,0,1))
--第二次启动coco协程
print (coroutine.resume(coco, "第二次传递的参数,作为上一次yield的返回值"))

--[[
  resume args:0,1
  true
  yretur:第二次传递的参数,作为上一次yield的返回值
  true
]]
```

简单使用 wrap，如下:

```lua
coco2 = coroutine.wrap(function (a, b)
            print ("warp resume args:"..a..","..b)
            yreturn = coroutine.yield()
            print ("continue "..yreturn)
end)

print (type(coco2))

coco2(0,1)
coco2(3)

--[[
  function
  warp resume args:0,1
  continue 3
]]
```

多个协程配合使用

```lua
function status()
    print("Co1's status:"..coroutine.status(co1)..",".."co2's status:"..coroutine.status(co2))
end

co1 = coroutine.create(function (a)
        print ("arg is :"..a)
        status()
        local stat, rere = coroutine.resume(co2, "2")
        print ("resume's return is "..rere)
        status()
        local stat2,rere2 = coroutine.resume(co2, "4")
        print ("resume's return is"..rere2)
        local arg = coroutine.yield("6")
end)

co2 = coroutine.create(function (a)
        print ("arg is :"..a)
        status()
        local rey = coroutine.yield("3")
        print ("yeild's return is ".. rey)
        status()
        coroutine.yield("5")
end)

stat,main_ret = coroutine.resume(co1, "1")
status()
print ("last return is "..main_ret)

--[[
  arg is :1
  Co1's status:running,co2's status:suspended
  arg is :2
  Co1's status:normal,co2's status:running
  resume's return is 3
  Co1's status:running,co2's status:suspended
  yeild's return is 4
  Co1's status:normal,co2's status:running
  resume's return is5
  Co1's status:suspended,co2's status:suspended
  last return is 6
]]
```

> 感觉上 lua 的 coroutine 挺麻烦的, 没想到怎么写才比较优雅, 我可能是懒得动脑吧 :poop:

## Lua 文件 I/O

Lua I/O 库用于读取和处理文件。分为简单模式（和 C 一样）、完全模式。

- 简单模式（simple model）拥有一个当前输入文件和一个当前输出文件，并且提供针对这些文件相关的操作。
- 完全模式（complete model） 使用外部的文件句柄来实现。它以一种面对对象的形式，将所有的文件操作定义为文件句柄的方法

简单模式在做一些简单的文件操作时较为合适。但是在进行一些高级的文件操作的时候，简单模式就显得力不从心。例如同时读取多个文件这样的操作，使用完全模式则较为合适。

打开文件操语句如下：

```lua
file = io.open (filename [, mode])
```

| 模式 | 描述                                                                                                                                     |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| r    | 以只读方式打开文件，该文件必须存在。                                                                                                     |
| w    | 打开只写文件，若文件存在则文件长度清为 0，即该文件内容会消失。若文件不存在则建立该文件。                                                 |
| a    | 以附加的方式打开只写文件。若文件不存在，则会建立该文件，如果文件存在，写入的数据会被加到文件尾，即文件原先的内容会被保留。（EOF 符保留） |
| r+   | 以可读写方式打开文件，该文件必须存在。                                                                                                   |
| w+   | 打开可读写文件，若文件存在则文件长度清为零，即该文件内容会消失。若文件不存在则建立该文件。                                               |
| a+   | 与 a 类似，但此文件可读可写                                                                                                              |
| b    | 二进制模式，如果文件是二进制文件，可以加上 b                                                                                             |
| +    | 号表示对文件既可以读也可以写                                                                                                             |

### 简单模式

```lua
-- 以只读方式打开文件
file = io.open("test.lua", "r")

-- 设置默认输入文件为 test.lua
io.input(file)

-- 输出文件第一行
print(io.read())

-- 关闭打开的文件
io.close(file)

-- 以附加的方式打开只写文件
file = io.open("test.lua", "a")

-- 设置默认输出文件为 test.lua
io.output(file)

-- 在文件最后一行添加 Lua 注释
io.write("--  test.lua 文件末尾注释")

-- 关闭打开的文件
io.close(file)
```

`io."x"` 方法，其中 `io.read()` 中我们没有带参数，参数可以是下表中的一个

| 模式          | 描述                                                                  |
| ------------- | --------------------------------------------------------------------- |
| "\*n"         | 读取一个数字并返回它。例：`file.read("*n")`                           |
| "\*a"         | 从当前位置读取整个文件。例：`file.read("*a")`                         |
| "\*l"（默认） | 读取下一行，在文件尾 (EOF) 处返回 nil。例：`file.read("*l")`          |
| number        | 返回一个指定字符个数的字符串，或在 EOF 时返回 nil。例：`file.read(5)` |

其他的 io 方法有：

- `io.tmpfile()`:返回一个临时文件句柄，该文件以更新模式打开，程序结束时自动删除
- `io.type(file)`:检测 obj 是否一个可用的文件句柄
- `io.flush()`:向文件写入缓冲中的所有数据
- `io.lines(optional file name)`:返回一个迭代函数,每次调用将获得文件中的一行内容,当到文件尾时，将返回 nil,但不关闭文件

### 完全模式

通常我们需要在同一时间处理多个文件。我们需要使用 `file:function_name` 来代替 `io.function_name` 方法。以下实例演示了如同同时处理同一个文件

```lua
-- 以只读方式打开文件
file = io.open("test.lua", "r")

-- 输出文件第一行
print(file:read())

-- 关闭打开的文件
file:close()

-- 以附加的方式打开只写文件
file = io.open("test.lua", "a")

-- 在文件最后一行添加 Lua 注释
file:write("--test")

-- 关闭打开的文件
file:close()
```

read 的参数与简单模式一致。

其他方法:

- `file:seek(optional whence, optional offset)`:设置和获取当前文件位置,成功则返回最终的文件位置(按字节),失败则返回 nil 加错误信息。参数 whence 值可以是:
  - `"set"`: 从文件头开始
  - `"cur"`: 从当前位置开始[默认]
  - `"end"`: 从文件尾开始
  - `offset`:默认为 0
    不带参数`file:seek()`则返回当前位置,`file:seek("set")`则定位到文件头,`file:seek("end")`则定位到文件尾并返回文件大小
- `file:flush()`:向文件写入缓冲中的所有数据

```lua
for line in io.lines("main.lua") do

　　print(line)

end
```

以下实例使用了 `seek` 方法，定位到文件倒数第 25 个位置并使用 `read` 方法的 `*a` 参数，即从当期位置(倒数第 25 个位置)读取整个文件。

```lua
-- 以只读方式打开文件
file = io.open("test.lua", "r")

file:seek("end",-25)
print(file:read("*a"))

-- 关闭打开的文件
file:close()
```

## Lua 面向对象

### 类

在 C 中，如果一个类没有进行实例化，那这个类中对应的操作，基本就是一堆“没有用”的代码；而<b>Lua 则不一样，即使你不实例化一个“类”，你照样也可以使用“类”名直接调用它的方法</b>（对于 C++，请忽视静态的方法）；

在 Lua 中则没有类的概念，而我们都是通过 Lua 现有的支持，去模拟类的概念。<b>在 Lua 中，要表示一个类，只需创建一个专用作其他对象的原型（prototype）</b>。原型也是一种常规的对象，也就是说我们可以直接通过原型去调用对应的方法。当其它对象（类的实例）遇到一个未知操作时，原型会先查找它。

在 Lua 中实现原型是非常简单的，比如有两个对象 a 和 b，要让 b 作为 a 的原型，只需要以下代码就可以完成:

```lua
setmetatable(a, {__index = b})
```

设置了这段代码以后，a 就会在 b 中查找所有它没有的操作。若将 b 称为是对象 a 的“类”，就仅仅是术语上的变化。现在我就从最简单的开始，要创建一个实例对象，必须要有一个原型，就是所谓的“类”，看以下代码

```lua
local Account = {}  -- 一个原型

function Account:new(o)  -- 这里是冒号哦
     o = o or {}  -- 如果用户没有提供table，则创建一个
     setmetatable(o, self)
     self.__index = self
     return o
end
```

首先使用`Account:new`创建了一个新的实例对象，并将`Account`作为新的实例对象 a 的元表。再当我们调用`a:display`函数时，就相当于`a.display(a)`，冒号就只是一个“语法糖”，只是一种方便的写法，而`形参self接住了a`, 我们创建了一个实例对象 a，当调用`display`时，就会查找 a 中是否有`display`字段，没有的话，就去搜索它的元表，所以，最终的调用情况如下

```lua
getmetatable(a).__index(display(a))
```

所以，其实我们可以看到的是，实例对象 a 表中并没有 display 方法，而是继承自`Account`方法的，但是传入`display`方法中的`self`确是 a。这样就可以让`Account`（这个“类”）定义操作。除了方法，a 还能从`Account`继承所有的字段。

继承不仅可以用于方法，还可以作用于字段。因此，一个类不仅可以提供方法，还可以为实例中的字段提供默认值。看以下代码：

```lua
local Account = {value = 0}
function Account:new(o)  -- 这里是冒号哦
     o = o or {}  -- 如果用户没有提供table，则创建一个
     setmetatable(o, self)
     self.__index = self
     return o
end

function Account:display()
     self.value = self.value + 100
     print(self.value)
end

local a = Account:new() -- 这里使用原型Account创建了一个对象a
a:display() --100
a:display() --200
```

```lua
-- self.value = self.value + 100
a.value = getmetatable(a).__index(value) + 100
```

第一次调用`display`时，等号左侧的`self.value`就是`a.value`，就相当于在 a 中添加了一个新的字段`value`；当第二次调用`display`函数时，由于 a 中已经有了`value`字段，所以就不会去`Account`中寻找`value`字段了

### 继承

由于类也是对象（准确地说是一个原型），它们也可以从其它类（原型）获得（继承）方法。这种行为就是继承，可以很容易的在 Lua 中实现。现在我们有一个类:

```lua
local CA = {value = 0}

function CA:new(o)
     o = o or {}
     setmetatable(o, self)
     self.__index = self
     return o
end

function CA:display()
     print(self.value)
end

function CA:addValue(v)
     self.value = self.value + v
end
```

现在需要从这个`CA`类派生出一个子类`CLittleA`，则需要创建一个空的类，从基类继承所有的操作

```lua
local CLittleA = CA:new()
```

现在，我创建了一个`CA`类的一个实例对象，在 Lua 中，现在`CLittleA`既是`CA`类的一个实例对象，也是一个原型，就是所谓的类，就相当于`CLittleA`类继承自`CA`类。再如下面的代码

```lua
local s = CLittleA:new{value1 = 10}
```

`CLittleA`从`CA`继承了`new`；不过，在执行`CLittleA:new`时，它的`self`参数表示为`CLittleA`，所以 s 的元表为`CLittleA`，`CLittleA`中字段`__index`的值也是`CLittleA`。

然后，我们就会看到，s 继承自`CLittleA`，而`CLittleA`又继承自`CA`。当执行`s:display`时，Lua 在 s 中找不到`display`字段，就会查找`CLittleA`；

如果仍然找不到`display`字段，就查找`CA`，最终会在`CA`中找到`display`字段。

可以这样想一下，如果在`CLittleA`中存在了`display`字段，那么就不会去`CA`中再找了。所以，我们就可以在`CLittleA`中重定义`display`字段，从而实现特殊版本的`display`函数

### 封装

思想就是通过两个`table`来表示一个对象。一个`table`用来保存对象的私有数据；另一个用于对象的操作。对象的实际操作时通过第二个`table`来实现的。为了避免未授权的访问，保存对象的私有数据的表不保存在其它的`table`中，而只是保存在方法的`closure`中。看一段代码:

```lua
function newObject(defaultName)
     local self = {name = defaultName}
     local setName = function (v) self.name = v end
     local getName = function () return self.name end
     return {setName = setName, getName = getName}
end

local objectA = newObject("Jelly")
objectA.setName("JellyThink") -- 这里没有使用冒号访问
print(objectA.getName())
```

这种设计给予存储在`self table`中所有东西完全的私密性。当调用`newObject`返回以后，就无法直接访问这个`table`了。只能通过`newObject`中创建的函数来访问这个`self table`；

也就相当于`self table`中保存的都是私有的，外部是无法直接访问的。大家可能也注意到了，我在访问函数时，并没有使用冒号，这个主要是因为，可以直接访问的`self table`中的字段，所以是不需要多余的`self`字段的，也就不用冒号了。
