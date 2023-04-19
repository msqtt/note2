# Insert Methods

## Methods

- `db.collection.insertOne()` 插入一条数据
- `db.collection.insertMany()` 插入多条数据

::: tip
如果集不存在，会创建一个集
:::

### Additonal Methods

下面方法需要使用 `upsert: true` 配置选项才能使用

- `db.collection.updateOne()`
- `db.collection.updateMany()`
- `db.collection.findAndModify()`
- `db.collection.findOneAndUpdate()`
- `db.collection.findOneAndReplace()`

- `db.collection.bulkWrite()`
