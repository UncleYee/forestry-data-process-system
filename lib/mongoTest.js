/**
 * mongo 连接以及输出 Schema 模型
 */

const mongoose = require('mongoose'); // 引用 mongoose 模块
// const Mongolass = require('mongolass');

// const mongolass = new Mongolass();
// mongolass.connect('mongodb://localhost:27017/forestry');
mongoose.connect('mongodb://localhost:27017/test');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', callback => {

  console.log('connect success');

  // 定义 Schema (文本属性)
  const PersonSchema = mongoose.Schema({
    name: String // 定义一个属性 name, 类型为 String
  });

  // 可以为 Schema 创建方法
  PersonSchema.methods.speak = function() {
    console.log('My name is ' + this.name);
  }

  // 将 Schema 发布为 Model
  const PersonModel = db.model('Person', PersonSchema);
  // 如果该 Model 已经发布, 则可以直接通过名字索引到, 如下:
  // const PersonModel = db.model('Person');
  // 如果没有发布, 上一段代码将会异常

  // 用 Model 创建 Entity(实体)
  const PersonEntity = new PersonModel({name: 'Micro'});
  console.log(PersonEntity.name);
  PersonEntity.speak();

  // Entity 是具有具体的数据库操作的 CRUD 的
  // 将数据存储到数据库中
  // PersonEntity.save();

  // 如果要执行查询操作, 需要依赖 Model, 当然 Entity 也是可以坐到的
  PersonModel.find((err, persons) => {
    // 查询到所有的 Person
    console.log(persons);
  });

})

