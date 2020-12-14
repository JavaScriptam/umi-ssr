import { history } from 'umi';
import axios from 'axios'
const instance = axios.create({withCredentials: true})
//自定义请求头 方便node识别 为api 还是普通url 链接,
instance.defaults.headers['sign-api'] = NODE_AXIOS_API_URL

instance.interceptors.request.use((config)=>{
  //如果是服务端渲染，则直接修改请求地址到api真实地址，不走代理，不用考虑跨域问题 服务端请求api 不存在跨域
  if(config.isServer){
    config.baseURL = SERVER_API_BASE_URL
  }else{ //如果是客户端渲染 需要走代理
    config.baseURL = API_BASE_URL
  }
  return config
},error=>{
  return Promise.reject(error)
})
instance.interceptors.response.use((res)=>{
  if(res.data.code === 20000){
    return Promise.resolve(res.data)
  }else{
    return Promise.reject(res.data)
  }
},error=>{
  const {response} = error
  return Promise.reject(error)
})

export default instance