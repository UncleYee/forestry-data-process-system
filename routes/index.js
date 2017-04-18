var router = require('koa-router')();

router.get('/', async function (ctx, next) {
  ctx.state = {
    title: 'koa2 title'
  };

  await ctx.render('index', {
  });
})

router.get('/foo', async function (ctx, next) {
  await ctx.render('index', {
    title: 'koa2 foo'
  });
});

router.get('/json', async (ctx, next) => {
  await next();
  ctx.body = {
    code: 0,
    message: 'success'
  }
});

module.exports = router;
