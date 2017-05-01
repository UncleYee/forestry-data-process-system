const router = require('koa-router')();
// const forestryInfo = require('../../app/controllers/forestryInfo');
const ForestryModel = require('../../models/ForestryModel');


// router.post('/getForestryInfo', forestryInfo.getForestryInfo);
router.post('/getForestryInfoNew', async function(ctx, next) {
  await ForestryModel.getInfoByDate('2015-06-28', '2015-06-29')
    .then(function(result) {
      ctx.body = result;
    })
    .catch(next);
  
  
});

router.post('/test', async function(ctx, next){
  ctx.body = '123';
})

module.exports = router;