const router = require('koa-router')();
// const forestryInfo = require('../../app/controllers/forestryInfo');
const ForestryModel = require('../../models/ForestryModel');


// router.post('/getForestryInfo', forestryInfo.getForestryInfo);
router.post('/getForestryInfoByDateAndNode', async function(ctx, next) {
  const {startDate, endDate, nodeNo} = ctx.request.body;

  await ForestryModel.getInfoByDateAndNode(startDate, endDate, nodeNo)
    .then(function(result) {
      ctx.body = result;
    })
    .catch(next);
});

router.post('/getForestryInfoByDate', async function(ctx, next) {
  const {startDate, endDate} = ctx.request.body;

  await ForestryModel.getInfoByDate(startDate, endDate)
    .then(function(result) {
      ctx.body = result;
    })
    .catch(next);
});

router.post('/getForestryInfoByNodeNo', async function(ctx, next) {
  const {nodeNo} = ctx.request.body;

  await ForestryModel.getInfoByNodeNo(nodeNo)
    .then(function(result) {
      console.log(result);
      ctx.body = result;
    })
    .catch(next);
});

router.post('/test', async function(ctx, next){
  ctx.body = '123';
})

module.exports = router;