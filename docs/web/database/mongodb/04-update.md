# Update Methods

使用聚合通道进行 update 操作

- `$addFields`
- `$set`
- `$project`
- `$unset`
- `$replaceRoot`
- `$replaceWith`

## 例子 1

使用 `db.students.updateOne()` 更新

```javascript
db.students.insertMany([
  { _id: 1, test1: 95, test2: 92, test3: 90, modified: new Date("01/05/2020") },
  {
    _id: 2,
    test1: 98,
    test2: 100,
    test3: 102,
    modified: new Date("01/05/2020"),
  },
  { _id: 3, test1: 95, test2: 110, modified: new Date("01/04/2020") },
]);

db.students.updateOne({ _id: 3 }, [{ $set: { test3: 98, modified: "$$NOW" } }]);
```

## 例子 2

### 一些概念

- 根对象（root object）通常指的是 JavaScript 对象（JSON 对象）中的最外层对象，也就是没有嵌套在其他对象中的对象。
- 在 MongoDB 数据库中，每个文档就是一个根对象，它代表了该文档对应的数据记录。在进行查询或更新操作时，我们可以使用一些特定的操作符来对根对象进行操作，如 mergeObjects、replaceRoot 等。

```javascript
db.students2.insertMany([
  { _id: 1, quiz1: 8, test2: 100, quiz2: 9, modified: new Date("01/05/2020") },
  { _id: 2, quiz2: 5, test1: 80, test2: 89, modified: new Date("01/05/2020") },
]);

db.students2.updateMany({}, [
  {
    $replaceRoot: {
      newRoot: {
        $mergeObjects: [{ quiz1: 0, quiz2: 0, test1: 0, test2: 0 }, "$$ROOT"],
      },
    },
  },
  { $set: { modified: "$$NOW" } },
]);
```

这是一条 MongoDB 的更新多个文档的命令，作用为将所有的 students2 集合中的文档（即空的查询条件 {}）进行以下操作：

    替换根节点：使用 $replaceRoot 将每个文档的根节点替换为一个新的根节点。新的根节点由 $mergeObjects 运算符创建，它将原来的文档对象与一个新的对象进行合并。新的对象包含了 quiz1、quiz2、test1 和 test2 四个属性，值都为0。这样做是为了给每个文档添加这四个属性，并初始化它们的值为0。

    设置“modified”属性：使用 $set 将一个名为 modified 的属性添加到每个文档中。该属性的值为 $$NOW，表示当前的日期和时间。这样做是为了记录每个文档最后一次被修改的时间。

综上所述，这条命令的作用就是将 students2 集合中的所有文档都添加了四个属性，并初始化了它们的值为 0。另外，还记录了每个文档最后一次被修改的时间。

## 例子 3

```javascript
db.students3.updateMany({}, [
  { $set: { average: { $trunc: [{ $avg: "$tests" }, 0] }, modified: "$$NOW" } },
  {
    $set: {
      grade: {
        $switch: {
          branches: [
            { case: { $gte: ["$average", 90] }, then: "A" },
            { case: { $gte: ["$average", 80] }, then: "B" },
            { case: { $gte: ["$average", 70] }, then: "C" },
            { case: { $gte: ["$average", 60] }, then: "D" },
          ],
          default: "F",
        },
      },
    },
  },
]);

db.students3.updateMany({}, [
  { $set: { average: { $trunc: [{ $avg: "$tests" }, 0] }, modified: "$$NOW" } },
  {
    $set: {
      grade: {
        $switch: {
          branches: [
            { case: { $gte: ["$average", 90] }, then: "A" },
            { case: { $gte: ["$average", 80] }, then: "B" },
            { case: { $gte: ["$average", 70] }, then: "C" },
            { case: { $gte: ["$average", 60] }, then: "D" },
          ],
          default: "F",
        },
      },
    },
  },
]);
```

查询所有文档，添加两个字段，并修改 modified 的时间为现在

添加的字段

- average: 对 `tests` 数组求平均值，并取整数部分
- grade: 判断 `average` 字段大于 90 赋予'A'。。。

## 例子 4

```javascript
db.students4.insertMany([
  { _id: 1, quizzes: [4, 6, 7] },
  { _id: 2, quizzes: [5] },
  { _id: 3, quizzes: [10, 10, 10] },
]);

db.students4.updateOne({ _id: 2 }, [
  { $set: { quizzes: { $concatArrays: ["$quizzes", [8, 6]] } } },
]);
// 将 id 为 2 的文档，quizzes 数组 拼接上 [8, 6]
```

## 例子 5

```javascript
db.temperatures.insertMany([
  { _id: 1, date: ISODate("2019-06-23"), tempsC: [4, 12, 17] },
  { _id: 2, date: ISODate("2019-07-07"), tempsC: [14, 24, 11] },
  { _id: 3, date: ISODate("2019-10-30"), tempsC: [18, 6, 8] },
]);

db.temperatures.updateMany({}, [
  {
    $addFields: {
      tempsF: {
        $map: {
          input: "$tempsC",
          as: "celsius",
          in: { $add: [{ $multiply: ["$$celsius", 9 / 5] }, 32] },
        },
      },
    },
  },
]);
```

添加一个数组字段 `tempsF` 使用对原来的`tempsC`数组做 `$map`操作:

- input：输入`tempsC`
- as: 遍历时给元素取的别名 `celsius`
- in: 每一个元素执行的具体操作
  - $32 + celsius * 9 / 5$

tempsC 每个元素做完 map 操作后得到的元素作为 `tempsF`的元素

> 就是 普通的 map 函数啊，不知道为啥我要给自己解释 💩

## Methods

- `db.collection.updateOne()`
  - 最多更新一个符合条件的文档
- `db.collection.updateMany()`
  - 更新所有符合条件的文档
- `db.collection.replaceOne()`
  - 最多替换一个文档符合条件的文档

### Additional Methods

- `db.collection.findOneAndReplace()`
- `db.collection.findOneAndUpdate()`
- `db.collection.findAndModify()`
- `db.collection.bulkWrite()`
