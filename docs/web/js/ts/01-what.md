# 简介

## 什么是 TypeScript

> Typed JavaScript at Any Scale.
> 添加了类型系统的 JavaScript，适用于任何规模的项目。

以上描述是[官网](https://www.typescriptlang.org/)对于 TypeScript 的定义。

它强调了 TypeScript 的两个最重要的特性——类型系统、适用于任何规模。

### TypeScript 的特性

#### 类型系统

我们知道，JavaScript 是一门非常灵活的编程语言：

- 它没有类型约束，一个变量可能初始化时是字符串，过一会儿又被赋值为数字。
- 由于隐式类型转换的存在，有的变量的类型很难在运行前就确定。
- 基于原型的面向对象编程，使得原型上的属性或方法可以在运行时被修改。
- 函数是 JavaScript 中的一等公民，可以赋值给变量，也可以当作参数或返回值。

这种灵活性就像一把双刃剑，一方面使得 JavaScript 蓬勃发展，无所不能，从 2013 年开始就一直蝉联最普遍使用的编程语言排行榜冠军；另一方面也使得它的代码质量参差不齐，维护成本高，运行时错误多。

TypeScript 的类型系统，在很大程度上弥补了 JavaScript 的缺点。

#### 静态类型

类型系统按照「类型检查的时机」来分类，可以分为动态类型和静态类型。

动态类型是指在运行时才会进行类型检查，这种语言的类型错误往往会导致运行时错误。JavaScript 是一门解释型语言，没有编译阶段，所以它是动态类型，以下这段代码在运行时才会报错：

```javascript
let foo = 1;
foo.split(" ");
// Uncaught TypeError: foo.split is not a function
// 运行时会报错（foo.split 不是一个函数），造成线上 bug
```

静态类型是指编译阶段就能确定每个变量的类型，这种语言的类型错误往往会导致语法错误。TypeScript 在运行前需要先编译为 JavaScript，而在编译阶段就会进行类型检查，所以 TypeScript 是静态类型，这段 TypeScript 代码在编译阶段就会报错了：

```typescript
let foo = 1;
foo.split(" ");
// Property 'split' does not exist on type 'number'.
// 编译时会报错（数字没有 split 方法），无法通过编译
```

ts 代码与 js 代码看上去没什么区别， 大部分的 js 代码只需要经过少量的修改就能变成 ts, 这都得益于 ts 强大的类型推论，即使不去手动声明 `foo` 类型，也能在变量初始化时自动推论出其 `number` 类型

#### 弱类型

类型系统按照「是否允许隐式类型转换」来分类，可以分为强类型和弱类型。

```typescript
console.log(1 + "1");
// 打印出字符串 '11'
```

TypeScript 是完全兼容 JavaScript 的，它不会修改 JavaScript 运行时的特性，所以它们都是弱类型。

作为对比，Python 是强类型，以下代码会在运行时报错：

```python
print(1 + '1')
# TypeError: unsupported operand type(s) for +: 'int' and 'str'
```

#### 适用于任何规模

TypeScript 非常适用于大型项目——这是显而易见的，类型系统可以为大型项目带来更高的可维护性，以及更少的 bug。

由于类型推论大部分类型都不需要手动声明, 相反 TypeScript 增强了编辑器（IDE）的功能，包括代码补全、接口提示、跳转到定义、代码重构等，这在很大程度上提高了开发效率，因此也十分合适中小型项目的开发

## 安装 TypeScript

命令:

```bash
npm install -g typescript
```

以上命令会在全局环境下安装 tsc 命令，安装完成之后，我们就可以在任何地方执行 tsc 命令了。

编译一个 TypeScript 文件很简单：

```bash
tsc hello.ts
```

我们约定使用 TypeScript 编写的文件以 .ts 为后缀，用 TypeScript 编写 React 时，以 .tsx 为后缀。

### Deno

跟 Node.js 一样，Deno 也是一个服务器运行时，但是支持多种语言，可以直接运行 JavaScript、TypeScript 和 WebAssembly 程序。

它内置了 V8 引擎，用来解释 JavaScript。同时，也内置了 tsc 引擎，解释 TypeScript。它使用 Rust 语言开发，由于 Rust 原生支持 WebAssembly，所以它也能直接运行 WebAssembly。它的异步操作不使用 libuv 这个库，而是使用 Rust 语言的 Tokio 库，来实现事件循环（event loop）。

Deno 还有许多许多优秀的地方，这里不一一介绍了

因此，如果只是学习 TypeScript 的不考虑项目依赖啥的话，也可以顺便试试 deno :P

> 之后会时不时用 deno :poop:

## Hello TypeScript

```typescript
// hello.ts
function sayHello(name: string): string {
  return "hello " + name;
}

let me: string = "mosquito";

console.log(sayHello(me));
```

```bash
$ tsc hello.ts
# 执行这条会得到一个编译好的 hello.js
$ node hello.js
# 执行

$ deno run hello.ts
# deno支持直接运行ts 得到的结果就是 hello mosquito
# 如果要编译成js 执行$ deno bundle hello.ts hello.js
```
