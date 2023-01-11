# 进阶

## 类型别名

类型别名用来给一个类型起一个新名字

```typescript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
  if (typeof n === "string") {
    return n;
  } else {
    return n();
  }
}
```

上例中，我们使用 `type` 创建类型别名。

类型别名常用于联合类型。

## 字符串字面量类型

字符串字面量类型用来约束取值只能是某几个字符串中的一个。

### 简单的例子

```typescript
type EventNames = "click" | "scroll" | "mousemove";
function handleEvent(ele: Element, event: EventNames) {
  // do something
}

handleEvent(document.getElementById("hello"), "scroll"); // 没问题
handleEvent(document.getElementById("world"), "dblclick"); // 报错，event 不能为 'dblclick'

// index.ts(7,47): error TS2345: Argument of type '"dblclick"' is not assignable to parameter of type 'EventNames'.
```

上例中，我们使用 `type` 定了一个字符串字面量类型 `EventNames`，它只能取三种字符串中的一种。

注意，类型别名与字符串字面量类型都是使用 `type` 进行定义。

## 元组

数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象。

元组起源于函数编程语言（如 F#），这些语言中会频繁使用元组。

### 简单的例子

定义一对值分别为`string`和`number`的元组:

```typescript
let tom: [string, number] = ["Tom", 25];
```

当赋值或访问一个已知索引的元素时，会得到正确的类型：

```typescript
let tom: [string, number];
tom[0] = "Tom";
tom[1] = 25;

tom[0].slice(1);
tom[1].toFixed(2);
```

也可以只赋值其中一项：

```typescript
let tom: [string, number];
tom[0] = "Tom";
```

但是当直接对元组类型的变量进行初始化或者赋值的时候，需要提供所有元组类型中指定的项。

```typescript
let tom: [string, number];
tom = ["Tom", 25];
```

```typescript
let tom: [string, number];
tom = ["Tom"];

// Property '1' is missing in type '[string]' but required in type '[string, number]'.
```

### 越界的元素

当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型：

```typescript
let tom: [string, number];
tom = ["Tom", 25];
tom.push("male");
tom.push(true);

// Argument of type 'true' is not assignable to parameter of type 'string | number'.
```

## 枚举

枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。

### 简单的例子

枚举使用 `enum` 关键字来定义：

```typescript
enum Days {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}
```

枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射

```typescript
enum Days {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}

console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true

console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
console.log(Days[2] === "Tue"); // true
console.log(Days[6] === "Sat"); // true
```

事实上，上面的例子会被编译为

```javascript
var Days;
(function (Days) {
  Days[(Days["Sun"] = 0)] = "Sun";
  Days[(Days["Mon"] = 1)] = "Mon";
  Days[(Days["Tue"] = 2)] = "Tue";
  Days[(Days["Wed"] = 3)] = "Wed";
  Days[(Days["Thu"] = 4)] = "Thu";
  Days[(Days["Fri"] = 5)] = "Fri";
  Days[(Days["Sat"] = 6)] = "Sat";
})(Days || (Days = {}));
```

### 手动赋值

我们也可以给枚举项手动赋值

```typescript
enum Days {
  Sun = 7,
  Mon = 1,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}

console.log(Days["Sun"] === 7); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true
```

未手动赋值的枚举项会接着上一个枚举项递增

如果未手动赋值的枚举项与手动赋值的重复了，TypeScript 是不会察觉到这一点的

```typescript
enum Days {
  Sun = 3,
  Mon = 1,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}

console.log(Days["Sun"] === 3); // true
console.log(Days["Wed"] === 3); // true
console.log(Days[3] === "Sun"); // false
console.log(Days[3] === "Wed"); // true
```

上面的例子中，递增到 3 的时候与前面的 Sun 的取值重复了，但是 TypeScript 并没有报错，导致 `Days[3]` 的值先是 "Sun"，而后又被 "Wed" 覆盖了。编译的结果是

```typescript
var Days;
(function (Days) {
  Days[(Days["Sun"] = 3)] = "Sun";
  Days[(Days["Mon"] = 1)] = "Mon";
  Days[(Days["Tue"] = 2)] = "Tue";
  Days[(Days["Wed"] = 3)] = "Wed";
  Days[(Days["Thu"] = 4)] = "Thu";
  Days[(Days["Fri"] = 5)] = "Fri";
  Days[(Days["Sat"] = 6)] = "Sat";
})(Days || (Days = {}));
```

手动赋值的枚举项可以不是数字，此时需要使用类型断言来让 tsc 无视类型检查 (编译出的 js 仍然是可用的)

```typescript
enum Days {
  Sun = 7,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat = <any>"S",
}
```

```typescript
var Days;
(function (Days) {
  Days[(Days["Sun"] = 7)] = "Sun";
  Days[(Days["Mon"] = 8)] = "Mon";
  Days[(Days["Tue"] = 9)] = "Tue";
  Days[(Days["Wed"] = 10)] = "Wed";
  Days[(Days["Thu"] = 11)] = "Thu";
  Days[(Days["Fri"] = 12)] = "Fri";
  Days[(Days["Sat"] = "S")] = "Sat";
})(Days || (Days = {}));
```

当然，手动赋值的枚举项也可以为小数或负数，此时后续未手动赋值的项的递增步长仍为 1

```typescript
enum Days {
  Sun = 7,
  Mon = 1.5,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}

console.log(Days["Sun"] === 7); // true
console.log(Days["Mon"] === 1.5); // true
console.log(Days["Tue"] === 2.5); // true
console.log(Days["Sat"] === 6.5); // true
```

### 常数项和计算所得项

枚举项有两种类型：常数项（constant member）和计算所得项（computed member）。

前面我们所举的例子都是常数项，一个典型的计算所得项的例子：

```typescript
enum Color {
  Red,
  Green,
  Blue = "blue".length,
}
```

上面的例子中，`"blue".length` 就是一个计算所得项。

上面的例子不会报错，但是<b>如果紧接在计算所得项后面的是未手动赋值的项，那么它就会因为无法获得初始值而报错</b>：

```typescript
enum Color {
  Red = "red".length,
  Green,
  Blue,
}

// index.ts(1,33): error TS1061: Enum member must have initializer.
// index.ts(1,40): error TS1061: Enum member must have initializer.
```

下面是常数项和计算所得项的完整定义:

当满足以下条件时，枚举成员被当作是常数：

- 不具有初始化函数并且之前的枚举成员是常数。在这种情况下，当前枚举成员的值为上一个枚举成员的值加 1。但第一个枚举元素是个例外。如果它没有初始化方法，那么它的初始值为 0。
- 枚举成员使用常数枚举表达式初始化。常数枚举表达式是 TypeScript 表达式的子集，它可以在编译阶段求值。当一个表达式满足下面条件之一时，它就是一个常数枚举表达式：
  - 数字字面量
  - 引用之前定义的常数枚举成员（可以是在不同的枚举类型中定义的）如果这个成员是在同一个枚举类型中定义的，可以使用非限定名来引用
  - 带括号的常数枚举表达式
    - `+`, `-`, `~` 一元运算符应用于常数枚举表达式
    - `+`, `-`, `*`, `/`, `%`, `<<`, `>>`, `>>>`, `&`, `|`, `^` 二元运算符，常数枚举表达式做为其一个操作对象。若常数枚举表达式求值后为 NaN 或 Infinity，则会在编译阶段报错

所有其它情况的枚举成员被当作是需要计算得出的值。

### 常数索引

常数枚举是使用 `const enum` 定义的枚举类型

```typescript
const enum Directions {
  Up,
  Down,
  Left,
  Right,
}

let directions = [
  Directions.Up,
  Directions.Down,
  Directions.Left,
  Directions.Right,
];
```

```typescript
const enum Directions {
  Up,
  Down,
  Left,
  Right,
}

let directions = [
  Directions.Up,
  Directions.Down,
  Directions.Left,
  Directions.Right,
];
```

常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。

```typescript
// 编译结果
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];

// 假如包含了计算成员，则会在编译阶段报错：
const enum Color {
  Red,
  Green,
  Blue = "blue".length,
}

// index.ts(1,38): error TS2474: In 'const' enum declarations member initializer must be constant expression.
```

### 外部枚举

外部枚举（Ambient Enums）是使用 `declare enum` 定义的枚举类型

```typescript
declare enum Directions {
  Up,
  Down,
  Left,
  Right,
}

let directions = [
  Directions.Up,
  Directions.Down,
  Directions.Left,
  Directions.Right,
];
```

之前提到过，`declare` 定义的类型只会用于编译时的检查，编译结果中会被删除

```typescript
// 编译结果
var directions = [
  Directions.Up,
  Directions.Down,
  Directions.Left,
  Directions.Right,
];
```

外部枚举与声明语句一样，常出现在声明文件中。

同时使用 `declare` 和 `const` 也是可以的：

```typescript
declare const enum Directions {
  Up,
  Down,
  Left,
  Right,
}

let directions = [
  Directions.Up,
  Directions.Down,
  Directions.Left,
  Directions.Right,
];

// 编译结果
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
```

> TypeScript 的枚举类型的概念来源于 C#。

## 类

传统方法中，JavaScript 通过构造函数实现类的概念，通过原型链实现继承。而在 ES6 中，我们终于迎来了 class。

TypeScript 除了实现了所有 ES6 中的类的功能以外，还添加了一些新的用法

### 类的概念

- 类（Class）：定义了一件事物的抽象特点，包含它的属性和方法
- 对象（Object）：类的实例，通过 new 生成
- 面向对象（OOP）的三大特性：封装、继承、多态
- 封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
- 继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
- 多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。比如 Cat 和 Dog 都继承自 Animal，但是分别实现了自己的 eat 方法。此时针对某一个实例，我们无需了解它是 Cat 还是 Dog，就可以直接调用 eat 方法，程序会自动判断出来应该如何执行 eat
- 存取器（getter & setter）：用以改变属性的读取和赋值行为
- 修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。比如 public 表示公有属性或方法
- 抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
- 接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口

### ES6 中类的用法

#### 属性和方法

使用 `class` 定义类，使用 `constructor` 定义构造函数。

通过 `new` 生成新实例的时候，会自动调用构造函数

```javascript
class Animal {
  public name;
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    return `My name is ${this.name}`;
  }
}

let a = new Animal("Jack");
console.log(a.sayHi()); // My name is Jack
```

#### 类的继承

使用 `extends` 关键字实现继承，子类中使用 `super` 关键字来调用父类的构造函数和方法。

```javascript
class Cat extends Animal {
  constructor(name) {
    super(name); // 调用父类的 constructor(name)
    console.log(this.name);
  }
  sayHi() {
    return "Meow, " + super.sayHi(); // 调用父类的 sayHi()
  }
}

let c = new Cat("Tom"); // Tom
console.log(c.sayHi()); // Meow, My name is Tom
```

#### 存取器

使用 `getter` 和 `setter` 可以改变属性的赋值和读取行为

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  get name() {
    return "Jack";
  }
  set name(value) {
    console.log("setter: " + value);
  }
}

let a = new Animal("Kitty"); // setter: Kitty
a.name = "Tom"; // setter: Tom
console.log(a.name); // Jack
```

#### 静态方法

使用 `static` 修饰符修饰的方法称为静态方法，它们不需要实例化，而是直接通过类来调用

```javascript
class Animal {
  static isAnimal(a) {
    return a instanceof Animal;
  }
}

let a = new Animal("Jack");
Animal.isAnimal(a); // true
a.isAnimal(a); // TypeError: a.isAnimal is not a function
```

### ES7 中类的用法

ES7 中有一些关于类的提案，TypeScript 也实现了它们

#### 实例属性

ES6 中实例的属性只能通过构造函数中的 `this.xxx` 来定义，`ES7` 提案中可以直接在类里面定义：

```javascript
class Animal {
  name = "Jack";

  constructor() {
    // ...
  }
}

let a = new Animal();
console.log(a.name); // Jack
```

#### 静态属性

ES7 提案中，可以使用 `static` 定义一个静态属性

```javascript
class Animal {
  static num = 42;

  constructor() {
    // ...
  }
}

console.log(Animal.num); // 42
```

### TypeScript 中类的用法

#### public private 和 protected

TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 `public`、`private` 和 `protected`。

- `public` 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
- `private` 修饰的属性或方法是私有的，不能在声明它的类的外部访问
- `protected` 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的

```typescript
class Animal {
  public name;
  public constructor(name) {
    this.name = name;
  }
}

let a = new Animal("Jack");
console.log(a.name); // Jack
a.name = "Tom";
console.log(a.name); // Tom
```

TypeScript 编译之后的代码中，并没有限制 `private` 属性在外部的可访问性。

上面的例子编译后的代码是

```javascript
var Animal = (function () {
  function Animal(name) {
    this.name = name;
  }
  return Animal;
})();
var a = new Animal("Jack");
console.log(a.name);
a.name = "Tom";
```

- 而如果是用 `protected` 修饰，则允许在子类中访问
- 当构造函数修饰为 `private` 时，该类不允许被继承或者实例化
- 当构造函数修饰为 `protected` 时，该类只允许被继承

#### 参数属性

修饰符和`readonly`还可以使用在构造函数参数中，等同于类中定义该属性同时给该属性赋值，使代码更简洁。

`readonly` 只读属性关键字，只允许出现在属性声明或索引签名或构造函数中

```typescript
class Animal {
  readonly name;
  public constructor(name) {
    this.name = name;
  }
}

let a = new Animal("Jack");
console.log(a.name); // Jack
a.name = "Tom";

// index.ts(10,3): TS2540: Cannot assign to 'name' because it is a read-only property.
```

注意如果 `readonly` 和其他访问修饰符同时存在的话，需要写在其后面。

```typescript
class Animal {
  // public readonly name;
  public constructor(public readonly name) {
    // this.name = name;
  }
}
```

#### 抽象类

`abstract` 用于定义抽象类和其中的抽象方法。

抽象类是不允许被实例化的：

```typescript
abstract class Animal {
  public name;
  public constructor(name) {
    this.name = name;
  }
  public abstract sayHi();
}

let a = new Animal("Jack");

// index.ts(9,11): error TS2511: Cannot create an instance of the abstract class 'Animal'.
```

其次，抽象类中的抽象方法必须被子类实现：

```typescript
abstract class Animal {
  public name;
  public constructor(name) {
    this.name = name;
  }
  public abstract sayHi();
}

class Cat extends Animal {
  public eat() {
    console.log(`${this.name} is eating.`);
  }
}

let cat = new Cat("Tom");

// index.ts(9,7): error TS2515: Non-abstract class 'Cat' does not implement inherited abstract member 'sayHi' from class 'Animal'.
```

上面的例子中，我们定义了一个类 `Cat` 继承了抽象类 `Animal`，但是没有实现抽象方法 `sayHi`，所以编译报错了。

```typescript
abstract class Animal {
  public name;
  public constructor(name) {
    this.name = name;
  }
  public abstract sayHi();
}

class Cat extends Animal {
  public sayHi() {
    console.log(`Meow, My name is ${this.name}`);
  }
}

let cat = new Cat("Tom");
// 实现了抽象方法 sayHi，编译通过了
```

需要注意的是，即使是抽象类，TypeScript 的编译结果中，仍然会存在这个类，上面的代码的编译结果是

```typescript
var __extends =
  (this && this.__extends) ||
  function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype =
      b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
  };
var Animal = (function () {
  function Animal(name) {
    this.name = name;
  }
  return Animal;
})();
var Cat = (function (_super) {
  __extends(Cat, _super);
  function Cat() {
    _super.apply(this, arguments);
  }
  Cat.prototype.sayHi = function () {
    console.log("Meow, My name is " + this.name);
  };
  return Cat;
})(Animal);
var cat = new Cat("Tom");
```

#### 类的类型

给类加上 TypeScript 的类型很简单，与接口类似

```typescript
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  sayHi(): string {
    return `My name is ${this.name}`;
  }
}

let a: Animal = new Animal("Jack");
console.log(a.sayHi()); // My name is Jack
```

## 类与接口

接口（Interfaces）可以用于对「对象的形状（Shape）」进行描述。

这一章主要介绍接口的另一个用途，对类的一部分行为进行抽象

### 类实现接口

实现（implements）是面向对象中的一个重要概念。一般来讲，一个类只能继承自另一个类，有时候不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interfaces），用 `implements` 关键字来实现。这个特性大大提高了面向对象的灵活性

```typescript
// 一个类可以继承多个接口
interface Alarm {
  alert(): void;
}

interface Light {
  lightOn(): void;
  lightOff(): void;
}

class Car implements Alarm, Light {
  alert() {
    console.log("Car alert");
  }
  lightOn() {
    console.log("Car light on");
  }
  lightOff() {
    console.log("Car light off");
  }
}
```

### 接口继承接口

接口与接口之间可以是继承关系

```typescript
interface Alarm {
  alert(): void;
}

interface LightableAlarm extends Alarm {
  lightOn(): void;
  lightOff(): void;
}
```

这很好理解，`LightableAlarm` 继承了 `Alarm`，除了拥有 `alert` 方法之外，还拥有两个新方法 `lightOn` 和 `lightOff`

### 接口继承类

常见的面向对象语言中，接口是不能继承类的，但是在 TypeScript 中却是可以的

```typescript
class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

interface Point3d extends Point {
  z: number;
}

let point3d: Point3d = { x: 1, y: 2, z: 3 };
```

实际上，当我们在声明 `class Point` 时，除了会创建一个名为 `Point` 的类之外，同时也创建了一个名为 `Point` 的类型（实例的类型）。

除了可以将 `Point` 当做一个类来用, 也可以将 `Point` 当做一个类型来用（使用 `: Point` 表示参数的类型）：

```typescript
class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

function printPoint(p: Point) {
  console.log(p.x, p.y);
}

printPoint(new Point(1, 2));
```

实际上可以等价于

```typescript
class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

interface PointInstanceType {
  x: number;
  y: number;
}

function printPoint(p: PointInstanceType) {
  console.log(p.x, p.y);
}

printPoint(new Point(1, 2));
```

上例中我们新声明的 `PointInstanceType` 类型，与声明 `class Point`时创建的 `Point` 类型是等价的

重新看会上个例子，可以理解为定义了一个接口 `Point3d` 继承另一个接口 `PointInstanceType`。

所以「接口继承类」和「接口继承接口」没有什么本质的区别

值得注意的是，`PointInstanceType` 相比于 `Point`，缺少了 `constructor` 方法，这是因为声明 `Point` 类时创建的 `Point` 类型是不包含构造函数的。另外，除了构造函数是不包含的，静态属性或静态方法也是不包含的（实例的类型当然不应该包括构造函数、静态属性或静态方法）。

换句话说，声明 `Point` 类时创建的 `Point` 类型只包含其中的实例属性和实例方法

```typescript
class Point {
  /** 静态属性，坐标系原点 */
  static origin = new Point(0, 0);
  /** 静态方法，计算与原点距离 */
  static distanceToOrigin(p: Point) {
    return Math.sqrt(p.x * p.x + p.y * p.y);
  }
  /** 实例属性，x 轴的值 */
  x: number;
  /** 实例属性，y 轴的值 */
  y: number;
  /** 构造函数 */
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  /** 实例方法，打印此点 */
  printPoint() {
    console.log(this.x, this.y);
  }
}

interface PointInstanceType {
  x: number;
  y: number;
  printPoint(): void;
}

let p1: Point;
let p2: PointInstanceType;
// Point 和类型 PointInstanceType 是等价
```

同样的，在接口继承类的时候，也只会继承它的实例属性和实例方法

## 泛型

泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

首先，我们来实现一个函数 `createArray`，它可以创建一个指定长度的数组，同时将每一项都填充一个默认值

很简单就能懂，这里的 T 表示的是一个类型

```typescript
function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

// 由 <T> 传入的类型决定函数中的T是什么类型
createArray<string>(3, "x"); // ['x', 'x', 'x']
// 因为由value 的 类型也能推断出T类型，因此可以不传<T>
createArray(3, "x"); // ['x', 'x', 'x']
```

### 多个类型参数

定义泛型的时候，可以一次定义多个类型参数

```typescript
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}

swap([7, "seven"]); // ['seven', 7]
```

定义了一个 `swap` 函数，用来交换输入的元组

### 泛型约束

在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法

```typescript
function loggingIdentity<T>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// index.ts(2,19): error TS2339: Property 'length' does not exist on type 'T'.
```

这时，我们可以对泛型进行约束，只允许这个函数传入那些包含 length 属性的变量。这就是泛型约束

```typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
```

上例中，我们使用了 `extends` 约束了泛型 T 必须符合接口 `Lengthwise` 的形状，也就是必须包含 `length` 属性。

此时如果调用 `loggingIdentity` 的时候，传入的 `arg` 不包含 `length`，那么在编译阶段就会报错了

多个类型参数之间也可以互相约束

```typescript
function copyFields<T extends U, U>(target: T, source: U): T {
  for (let id in source) {
    target[id] = (<T>source)[id];
  }
  return target;
}

let x = { a: 1, b: 2, c: 3, d: 4 };

copyFields(x, { b: 10, d: 20 });
```

使用了两个类型参数，其中要求 T 继承 U，这样就保证了 U 上不会出现 T 中不存在的字段。

### 泛型接口

之前学过，可以使用接口的方式来定义一个函数需要符合的形状

```typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
  return source.search(subString) !== -1;
};
```

当然也可以使用含有泛型的接口来定义函数的形状

```typescript
interface CreateArrayFunc {
  <T>(length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc;
createArray = function <T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
};

createArray(3, "x"); // ['x', 'x', 'x']
```

进一步，我们可以把泛型参数提前到接口名上

```typescript
interface CreateArrayFunc<T> {
  (length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc<any>;
createArray = function <T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
};

createArray(3, "x"); // ['x', 'x', 'x']
```

注意，此时在使用泛型接口的时候，需要定义泛型的类型

### 泛型类

与泛型接口类似，泛型也可以用于类的类型定义中

```typescript
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};
```

### 泛型参数的默认类型

在 `TypeScript 2.3` 以后，我们可以为泛型中的类型参数指定默认类型。当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用。

```typescript
function createArray<T = string>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
```

## 声明合并

如果定义了两个相同名字的函数、接口或类，那么它们会合并成一个类型

### 函数的合并

之前学习过，我们可以使用重载定义多个函数类型

```typescript
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
  if (typeof x === "number") {
    return Number(x.toString().split("").reverse().join(""));
  } else if (typeof x === "string") {
    return x.split("").reverse().join("");
  }
}
```

### 接口的合并

接口中的属性在合并时会简单的合并到一个接口中：

```typescript
interface Alarm {
  price: number;
}
interface Alarm {
  weight: number;
}

// 相当于
interface Alarm {
  price: number;
  weight: number;
}
```

<mark>注意，合并的属性的类型必须是唯一的</mark>

```typescript
interface Alarm {
  price: number;
}
interface Alarm {
  price: number; // 虽然重复了，但是类型都是 `number`，所以不会报错
  weight: number;
}

interface Alarm {
  price: number;
}
interface Alarm {
  price: string; // 类型不一致，会报错
  weight: number;
}

// index.ts(5,3): error TS2403: Subsequent variable declarations must have the same type.  Variable 'price' must be of type 'number', but here has type 'string'.
```

接口中方法的合并，与函数的合并一样：

```typescript
interface Alarm {
  price: number;
  alert(s: string): string;
}
interface Alarm {
  weight: number;
  alert(s: string, n: number): string;
}

interface Alarm {
  price: number;
  weight: number;
  alert(s: string): string;
  alert(s: string, n: number): string;
}
```

### 类的合并

类的合并与接口的合并规则一致。
