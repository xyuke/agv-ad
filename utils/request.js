/**
 * @version 3.0.4
 * @Author lu-ch
 * @Email webwork.s@qq.com
 * 文档: https://www.quanzhan.co/luch-request/
 * github: https://github.com/lei-mu/luch-request
 * DCloud: http://ext.dcloud.net.cn/plugin?id=392
 * HBuilderX: beat-2.7.14 alpha-2.8.0
 */
import Request from '@/utils/luch-request/index.js'


const getTokenStorage = () => {
  let token = 'eyJhbGciOiJIUzUxMiIsImlhdCI6MTU5MDEzMTc2NywiZXhwIjoxNzQ3ODExNzY3fQ.eyJpZCI6MX0.QTiOzuq91beAxl64x0chvhXzAhiDE8bDjB6LK11GnApjjGLs2GgkCy2N0MJcMfmc0KZdJ-YPWcXSeW4_jkuIpg';
  return token
}

const test = new Request()
/**
 * 修改全局配置示例
 const test = new Request({
	header: {a:1}, // 举例
	baseURL: 'https://www.fastmock.site/mock/26243bdf9062eeae2848fc67603bda2d/luchrequest',
	validateStatus: (statusCode) => { // statusCode 必存在。此处示例为全局默认配置
		return statusCode >= 200 && statusCode < 300
	}
})
 test.config.baseURL = 'https://www.fastmock.site/mock/26243bdf9062eeae2848fc67603bda2d/luchrequest'
 **/

test.setConfig((config) => { /* 设置全局配置 */
  config.baseURL = 'http://192.168.1.39:8070'
  config.header = {
    ...config.header,
  }
  config.custom = {
    // auth: false, // 是否传token
    // loading: false // 是否使用loading
  }
  return config
})

test.interceptors.request.use((config) => { /* 请求之前拦截器。可以使用async await 做异步操作  */
  config.header = {
    ...config.header,
  }
  return config
}, (config) => {
  return Promise.reject(config)
})


test.interceptors.response.use((response) => { /* 请求之后拦截器。可以使用async await 做异步操作  */
  /**
  // 服务端返回的状态码不等于200，则reject()
  if (response.data.code !== 200) { 
    return Promise.reject(response)
  }
  **/
  return response
}, (response) => { // 请求错误做点什么。可以使用async await 做异步操作
  return Promise.reject(response)
})


const http = new Request()
http.setConfig((config) => { /* 设置全局配置 */
  config.baseURL = 'http://192.168.1.39:8070' /* 根域名不同 */
  config.header = {
    ...config.header,
  }
  return config
})


http.interceptors.request.use((config) => { /* 请求之前拦截器。可以使用async await 做异步操作 */
  config.header = {
    ...config.header,
  }
  
  if(config.custom && config.custom.isToken){
	config.header['token'] = getTokenStorage()  
  }
  return config
}, (config) => {
  return Promise.reject(config)
})


http.interceptors.response.use(async (response) => { /* 请求之后拦截器。可以使用async await 做异步操作  */
  // if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
  //   return Promise.reject(response)
  // }
	
	console.log("------------返回信息------------")
	console.log(response)
	if(response.data.code != 0){
		return Promise.reject(response)
	}
  
	return response
}, (response) => { // 请求错误做点什么。可以使用async await 做异步操作
  console.log(response)
  return Promise.reject(response)
})

export {
  http,
  test
}