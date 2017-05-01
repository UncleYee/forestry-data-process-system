const mongo = require('../../lib/mongoo');

let cc;
mongo.getInfo({
  dateTime: {
    $gte: new Date('2015-06-28'),
    $lt: new Date('2015-06-29')
  }
}, (results) => {
  cc = results;
});

exports.getForestryInfo = async (ctx, next) => {
  ctx.body = cc;
}



