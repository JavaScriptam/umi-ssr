const axios = require('axios')

const instance = axios.create()
instance.interceptors.request.use((config)=>{
  return config
},error=>{
  return Promise.reject(error)
})
instance.interceptors.response.use((res)=>{
  return Promise.resolve(res.data)
},error=>{
  const {response} = error
  return Promise.reject(error)
})

module.exports = instance