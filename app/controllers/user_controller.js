//获取用户
exports.getUser = async (ctx, next) => {
  ctx.body = {
    name: 'Micro'
  }
}

//用户注册
exports.registerUser = async (ctx, next) => {
  console.log('registerUser', ctx.request.body);
}