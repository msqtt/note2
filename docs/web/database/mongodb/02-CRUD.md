# CRUD

## Insert Methods

- `db.collection.insertOne()` 插入一条数据
- `db.collection.insertMany()` 插入多条数据

### additonal methods

下面方法需要使用 `upsert: true` 配置选项才能使用

- `db.collection.updateOne()`
- `db.collection.updateMany()`
- `db.collection.findAndModify()`
- `db.collection.findOneAndUpdate()`
- `db.collection.findOneAndReplace()`

- `db.collection.bulkWrite()`

## Query Methods

### 相等

格式：`{ <field1>: <value1>, ... }`

- `db.collection.find({})` 以空条件查询，查询全部文档 📄

```javascript
db.collection.find({ name: "Saturn" }); // name = "Saturn"，查询全部文档 📄

// sql
// select * from collection where name = "Saturn"
```

###

格式：`{ <field1>: <value1>, ... }`
