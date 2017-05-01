const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
var router = require('koa-router')();
// api
const api = require('./routes/api');
// response_formatter
const response_formatter = require('./middlewares/response_formatter');
// log 工具
const logUtil = require('./utils/log_util');
// mongodb
const mongoose = require('./lib/mongo');

const index = require('./routes/index');

// error handler
onerror(app);

// middlewares
app.use(bodyparser);
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'jade'
}));

// logger
app.use(async (ctx, next) => {
  // 响应开始时间
  const start = new Date();
  // 响应间隔时间
  let ms;
  try {
    // 进入到下一个中间件
    await next();
    // 记录响应日志
    ms = new Date() - start;
    logUtil.logResponse(ctx, ms);
  } catch (error) {
    ms = new Date() - start;
    // 记录异常日志
    logUtil.logError(ctx, error, ms);
  }
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());

// 添加格式化处理响应结果的中间件，在添加路由之前调用
// 仅对/api开头的url进行格式化处理
app.use(response_formatter('^/api'));

// router.use('/', index.routes(), index.allowedMethods());
router.use('/api', api.routes(), api.allowedMethods());

app.use(router.routes(), router.allowedMethods());

module.exports = app;
