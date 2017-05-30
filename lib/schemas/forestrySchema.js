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
  dateTime: String // 时间
});

ForestrySchema.post('find', (results) => {
  results.forEach((item) => {
    item.id = objectIdToTimestamp(item._id);
  });
  return results;
})

ForestrySchema.statics = {
  getInfoByDateAndNode: function(startDate, endDate, nodeNo) {
    return this
      .find({
        dateTime: {
          $gte: startDate,
          $lt: endDate + ' 23:59:59'
        },
        nodeNo: nodeNo
      })
      .exec()
  },
  getInfoByDate: function(startDate, endDate) {
    return this
      .find({
        dateTime: {
          $gte: startDate,
          $lt: endDate + ' 23:59:59'
        }
      })
      .exec()
  },
  getInfoByNodeNo: function(nodeNo) {
    return this
      .find({
        nodeNo: nodeNo
      })
      .exec()
  }
}

module.exports = ForestrySchema;