const mongoose = require('mongoose');
const objectIdToTimestamp = require('objectid-to-timestamp');

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
  dateTime: Date // 时间
});

ForestrySchema.post('find', (results) => {
  results.forEach((item) => {
    item.id = objectIdToTimestamp(item._id);
  });
  return results;
})

ForestrySchema.statics = {
  getInfoByDate: function(startDate, endDate) {
    return this
      .find({
        dateTime: {
          $gte: new Date(startDate),
          $lt: new Date(endDate)
        }
      })
      .exec()
  }
}

module.exports = ForestrySchema;