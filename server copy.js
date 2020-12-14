const Koa = require('koa');
const compress = require('koa-compress');
const mount = require('koa-mount');
const { join, extname } = require('path');
const { parseCookie, parseNavLang } = require('./serverHelper');
const axios  = require('./serverAxios')
const isDev = process.env.NODE_ENV === 'development';

const root = join(__dirname, 'dist');
const app = new Koa();
app.use(
  compress({
    threshold: 2048,
    gzip: {
      flush: require('zlib').constants.Z_SYNC_FLUSH,
    },
    deflate: {
      flush: require('zlib').constants.Z_SYNC_FLUSH,
    },
    br: false, // 禁用br解决https gzip不生效加载缓慢问题
  }),
);

let render;
app.use(async (ctx, next) => {
  /**
   *  扩展global对象
   *
   *  这里是在服务端处理好cookie，
   *  会把所有cookie处理成{}形式
   *  赋值到global上面，方便客户端使用
   *
   *  同时获取浏览器的默认语言，处理好
   */
  global._cookies = parseCookie(ctx);
  global._navigatorLang = parseNavLang(ctx);
  const ext = extname(ctx.request.path);
  //如果是api请求
  if(ctx.request.url.indexOf('/api/') > -1){
    ctx.res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    const data = await  axios.get('http://127.0.0.1:3002/api/blog/list?page=1&limit=10')
    ctx.res.end(JSON.stringify(data));

  }else{
    // 符合要求的路由才进行服务端渲染，否则走静态文件逻辑
    if (!ext) {
      if (!render) {
        render = require('./dist/umi.server');
      }
      // 这里默认是字符串渲染
      ctx.type = 'text/html';
      ctx.status = 200;
      const { html, error } = await render({
        path: ctx.request.url,
      });
      if (error) {
        console.log('----------------服务端报错-------------------', error);
        ctx.throw(500, error);
      }
      /**
       *  这里fix了由于没有使用内部server而造成的缓存问题，
       *  原因是require会带有缓存，在修改代码以后会不更新
       *  这里判断的环境变量，如果是dev环境，自动删除require
       *  缓存
       */
      if (isDev) {
        delete require.cache[require.resolve('./dist/umi.server')];
      }
      ctx.body = html;
      
    } else {
      await next();
    }
  }
  
});

/**
 *  注意这里的静态目录设置，需要和umi打包出来的目录是同一个
 *  这里最好是用nginx配置静态目录，如果是用cdn方式部署，这里可以忽略
 *
 */
app.use(mount('/dist', require('koa-static')(root)));

app.listen(7001);
console.log('http://localhost:7001');

module.exports = app.callback();




const Koa = require('koa');
const compress = require('koa-compress');
const bodyparser = require('koa-bodyparser')
const mount = require('koa-mount');
const { join, extname } = require('path');
const { parseCookie, parseNavLang } = require('./serverHelper');
const axios  = require('./serverAxios')
const isDev = process.env.NODE_ENV === 'development';

const root = join(__dirname, 'dist');
const app = new Koa();
app.use(
  compress({
    threshold: 2048,
    gzip: {
      flush: require('zlib').constants.Z_SYNC_FLUSH,
    },
    deflate: {
      flush: require('zlib').constants.Z_SYNC_FLUSH,
    },
    br: false, // 禁用br解决https gzip不生效加载缓慢问题
  }),
);
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
let render;
app.use(async (ctx, next) => {
  /**
   *  扩展global对象
   *
   *  这里是在服务端处理好cookie，
   *  会把所有cookie处理成{}形式
   *  赋值到global上面，方便客户端使用
   *
   *  同时获取浏览器的默认语言，处理好
   */
  global._cookies = parseCookie(ctx);
  global._navigatorLang = parseNavLang(ctx);
  const ext = extname(ctx.request.path);
  //如果是客户端请求api
  if(ctx.request.header['mark-is-server']){
    console.log(ctx.request.query)

    ctx.res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    const {url,params} = ctx.request

    let result = null
    const method = ctx.request.method.toLowerCase()
    result = await axios.get('http:127.0.0.1:3002/api/blog/list?page=1&limit=10')
    // try {
    //   if(['delete', 'get', 'head', 'options'].includes(method)){
    //     console.log(url)
        
    //   }else if(['post', 'put', 'patch'].includes(method)){
    //     result = await axios[method](url,params)
    //   }
    // } catch (error) {
    //   console.log(123321)
    // }
    console.log(result)
    ctx.res.end(JSON.stringify(result));

  /*eslint func-names:0*/

  }else{
    // 符合要求的路由才进行服务端渲染，否则走静态文件逻辑
    if (!ext) {
      if (!render) {
        render = require('./dist/umi.server');
      }
      // 这里默认是字符串渲染
      ctx.type = 'text/html';
      ctx.status = 200;
      const { html, error } = await render({
        path: ctx.request.url,
      });
      if (error) {
        console.log('----------------服务端报错-------------------', error);
        ctx.throw(500, error);
      }
      /**
       *  这里fix了由于没有使用内部server而造成的缓存问题，
       *  原因是require会带有缓存，在修改代码以后会不更新
       *  这里判断的环境变量，如果是dev环境，自动删除require
       *  缓存
       */
      if (isDev) {
        delete require.cache[require.resolve('./dist/umi.server')];
      }
      ctx.body = html;
      
    } else {
      await next();
    }
  }
  
});

/**
 *  注意这里的静态目录设置，需要和umi打包出来的目录是同一个
 *  这里最好是用nginx配置静态目录，如果是用cdn方式部署，这里可以忽略
 *
 */
app.use(mount('/dist', require('koa-static')(root)));

app.listen(7001);
console.log('http://localhost:7001');

module.exports = app.callback();