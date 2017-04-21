/**
 * 将 cvs 文件中的日期转换成日期类型字符串
 * 将 2015-06-29  19:32:18 转换成为 Mon Jun 29 2015 19:32:18 GMT+0800 (CST)
 * @author: 
 */

const fs = require('fs');
const parse = require('csv-parse');
const csv = require('csv');

const out = fs.createWriteStream('./data/newNode4.csv');

const datas = [];
const read = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream('./data/node4.csv')
    .pipe(parse())
    .on('data', function (data) {
      const temp = {
        nodeNo: data[0],
        airTemperature: data[1],
        airHumidity: data[2],
        light: data[3],
        soilMoisture1: data[4],
        soilMoisture2: data[5],
        soilTemperature1: data[6],
        soilTemperature2: data[7],
        dateTime: new Date(data[8]).toString() === 'Invalid Date' ? data[8] : new Date(data[8]).toString()
      };
      datas.push(temp);
    }).on('end', function() {
      resolve();
    }); 
  });
  
}


const write = () => {
  csv.stringify(datas)
    .pipe(out);
}

const AsyncTransTimeType = async function() {
  await read();
  write();
  console.log('write success');
}

module.exports = AsyncTransTimeType;