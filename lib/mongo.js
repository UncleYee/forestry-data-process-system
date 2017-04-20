/**
 * mongo 连接以及输出 Schema 模型
 */

const moment = require('moment');
const config = require('../config/development');
const mongoose = require('mongoose'); // 引用 mongoose 模块

// 连接
mongoose.connect(config.mongodb_url);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', callback => {
  console.log('mongodb connect success');

  // 定义 Schema (文本属性)
  const ForestrySchema = mongoose.Schema({
    nodeNo: Number, // 节点号
    airTemperature: Number, // 大气温度
    airHumidity: Number, // 大气湿度
    light: Number, // 光照
    soilMoisture1: Number, // 土壤湿度1
    soilMoisture2: Number, // 土壤湿度2
    soilTemperature1: Number, // 土壤温度1
    soilTemperature2: Number, // 土壤温度2
    dateTime: String // 时间
  });

  // 可以为 Schema 创建方法
  // ForestrySchema.methods.getTime = function() {
  //   console.log('node recorded time is ' + this.time);
  // }

  // 将 Schema 发布为 Model
  const ForestryModel = db.model('Forestry', ForestrySchema);
  // 如果该 Model 已经发布, 则可以直接通过名字索引到, 如下:
  // const ForestryModel = db.model('Forestry');
  // 如果没有发布, 上一段代码将会异常

  // 用 Model 创建 Entity(实体)
  // const ForestryEntity = new ForestryModel({
  //   nodeNo: 5,
  //   airTemperature: 22.123123,
  //   airHumidity: 99.6069,
  //   light: 10.9612,
  //   soilMoisture1: 29.983,
  //   soilMoisture2: 40.963,
  //   soilTemperature1: 5.3,
  //   soilTemperature2: 22.299,
  //   dateTime: '2015-06-05 19:32:18'
  // });
  // console.log(ForestryEntity.nodeNo);
  // ForestryEntity.getTime();

  // Entity 是具有具体的数据库操作的 CRUD 的
  // 将数据存储到数据库中
  // ForestryEntity.save();

  // 如果要执行查询操作, 需要依赖 Model, 当然 Entity 也是可以坐到的
  ForestryModel.find({
  }, (err, forestries) => {
    // 查询到所有的 Person
    console.log(forestries.length);
  });

})

