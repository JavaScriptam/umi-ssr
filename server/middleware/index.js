const axios  = require('../serverAxios')
const { parseCookie} = require('../serverHelper');

async function isApi(ctx,next){
  //如果是客户端请求api// 且为开发环境 生产环境会通过nginx 设置代理
  const signApi = ctx.request.header['sign-api']
  if(signApi){
    ctx.res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    console.log(ctx.request)
    axios.defaults.headers.cookie = ctx.request.header.cookie || {}
    const {url,params} = ctx.request
    let result = null
    const method = ctx.request.method.toLowerCase()
    try {
      if(['delete', 'get', 'head', 'options'].includes(method)){
        result = await axios[method](signApi+url)
      }else if(['post', 'put', 'patch'].includes(method)){
        result = await axios[method](signApi+url,params)
      }
    } catch (error) {
      console.log(error)
    }
    ctx.res.end(JSON.stringify(result));
  /*eslint func-names:0*/
  }else{
    await next()
  }
}
async function redirectRouter(ctx,next){
  //如果访问的根目录
  if(ctx.request.path === '/'){
    ctx.redirect('/backend/role')
    return
  }else{
    await next()
  }
}
module.exports = {
  isApi,
  redirectRouter
}