# Query Methods

## 相等

格式：`{ <field1>: <value1>, ... }`

- `db.collection.find({})` 以空条件查询，查询全部文档 📄

```javascript
db.collection.find({ name: "Saturn" }); // 查询 name = "Saturn" 的所有文档

// sql
// select * from collection where name = "Saturn"
```

## 查询操作符号

使用丰富的操作符号来帮助查询

格式：`{ <field1>: <value1>, ... }`

```javascript
use sample_mflix

db.movies.find( { rated: { $in: [ "PG", "PG-13" ] } } )

// 类似 SELECT * FROM movies WHERE rated in ("PG", "PG-13")
// 查询 `movies` 集中 `rated` 字段 在 `["PG", "PG-13"]`之中的文档
```

## 逻辑运算符号

### And

```javascript
use sample_mflix

db.movies.find( { countries: "Mexico", "imdb.rating": { $gte: 7 } } )

// and 条件， 查询 countries =(为) "Mexico" 且 imdb.rating >=(至少为) 7 的文档
```

### Or

```javascript
use sample_mflix

db.movies.find( {
     year: 2010,
     $or: [ { "awards.wins": { $gte: 5 } }, { genres: "Drama" } ]
} )

// or 条件， 查询 year = 2010 and (awards.wins >= 5 or genres = "Drama") 的文档
```

## 嵌套查询

匹配一个嵌套的文档

```javascript
db.inventory.find({ size: { h: 14, w: 21, uom: "cm" } });
```

### 查询嵌套字段

通过 `.` 操作符将嵌套深层次的字段为条件查询

```javascript
db.inventory.find({ "size.uom": "in" });

// 或者使用操作符号
db.inventory.find({ "size.h": { $lt: 15 } });
```

## 查询数组

### 以数组为条件查询

```javascript
db.inventory.find({ tags: ["red", "blank"] });

// 查询条件就是 tags = ["red", "blank"] 即它是一个数组且一定要含有"red", "blank"两个元素
// 但是顺序是固定的
```

如果不指定顺序，使用：

```javascript
db.inventory.find({ tags: { $all: ["red", "blank"] } });
```

### 以数组元素为条件查询

以数组其中一个元素，查询整个文档

```javascript
db.inventory.find({ tags: "red" });
```

### 查询符号

`{ <array field>: { <operator1>: <value1>, ... } }`

查询数组中至少含有一个元素大于`25`的文档

```javascript
db.inventory.find({ dim_cm: { $gt: 25 } });
```

### 组合条件

至少有一个元素满足所有条件，或至少每个条件都有一个元素满足

```javascript
db.inventory.find({ dim_cm: { $gt: 15, $lt: 20 } });
```

想要至少一个元素满足所有条件，使用`$elemMatch`

```javascript
db.inventory.find({ dim_cm: { $elemMatch: { $gt: 22, $lt: 30 } } });
```

### 指定数组元素满足条件

```javascript
db.inventory.find({ "dim_cm.1": { $gt: 25 } });
// 查询 dim_cm 数组的第二个元素 大于 25 的文档
```

### 通过数组长度查询

```javascript
db.inventory.find({ tags: { $size: 3 } });

// 查询tags长度为3的文档
```

## 查询数组中的嵌套文档

```javascript
db.inventory.find({ instock: { warehouse: "A", qty: 5 } });

// 查询instock数组中至少一个元素为 {warehouse: "A", qty: 5} 的文档
// ⚠️ 注意顺序 查询的结果一定是 warehouse 在 qty 前面的
// 和下面的查询出来的结果完全不一样

db.inventory.find({ instock: { qty: 5, warehouse: "A" } });
```

### 以数组中元素的属性筛选

```javascript
db.inventory.find({ "instock.qty": { $lte: 20 } });

// 选择 instock 数组中的至少有一个元素的属性qty小于等于20 的文档
```

#### 指定下标

```javascript
db.inventory.find({ "instock.0.qty": { $lte: 20 } });

// 选择 instock 数组第一个元素的qty属性小于等于20的文档
```

### 数组元素所有嵌套属性都满足的条件的查询

```javascript
db.inventory.find({ instock: { $elemMatch: { qty: 5, warehouse: "A" } } });
// 选择 instock 数组中至少一个元素既满足qty = 5 又满足 warehouse = "A" 的文档
// 不在意顺序

db.inventory.find({ instock: { $elemMatch: { qty: { $gt: 10, $lte: 20 } } } });
// 选择 instock 数组中至少一个元素满足 10 < qty <= 20 的文档

db.inventory.find({ "instock.qty": { $gt: 10, $lte: 20 } });
//选择 instock 数组中至少一个元素满足 qty > 10 或者 qty <= 20 的文档

db.inventory.find({ "instock.qty": 5, "instock.warehouse": "A" });
// 选择 instock 数组中 至少一个元素 满足 qty = 5 并且至少一个元素 warehouse = "A"
```

## 投影字段

```javascript
db.test.find({ status: "A" });
// 相当于 SELECT * from inventory WHERE status = "A"

db.inventory.find({ status: "A" }, { item: 1, status: 1 });
// SELECT _id, item, status from inventory WHERE status = "A"
```

find 的第二个的参数，`字段名：0/1`

- `0`: 不显示字段
- `1`: 显示字段

::: tip
如果第二个参数中，有一个(至少)字段设为了 1，其他未设置的字段默认为 0，即不显示。
:::

### 移除`_id`字段

```javascript
db.inventory.find({ status: "A" }, { _id: 0 });
```

### 投影嵌套的字段

```javascript
db.inventory.find({ status: "A" }, { item: 1, status: 1, "size.uom": 1 });

// 4.4 以后也可以这样写
// { item: 1, status: 1, size: { uom: 1 } }.
```
