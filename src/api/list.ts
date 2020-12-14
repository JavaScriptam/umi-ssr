import axios from '../request/index'
import {AxiosRequestConfig} from 'axios'
interface paramsTypes {
  limit:number,
  page:number,
}
export const getList = (params:paramsTypes,isServer?:boolean):Promise<any>=>{
  return axios.get('/blog/list',{params,'isServer':isServer})
}
export const getDetail = (params:{id:number},isServer?:boolean):Promise<any>=>{
  return axios.get('/blog/detail',{params,'isServer':isServer})
}
// export const getList = (params?:paramsTypes,isServer?:boolean):Promise<any>=>{
//   return axios('get','/blog/list',{params,isServer})
// }