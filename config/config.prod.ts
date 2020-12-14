import { defineConfig } from 'umi';
const api = '/api'

export default defineConfig({
  define:{
    //客户端请求api地址
    'API_BASE_URL':'/api',
    //服务端ssr过程中请求api的地址
    'SERVER_API_BASE_URL':'http://127.0.0.1:3002/api',
    //告诉node 去请求的api地址
    'NODE_AXIOS_API_URL':'http://127.0.0.1:3002'
  },
  publicPath: '/dist/',
  
});
