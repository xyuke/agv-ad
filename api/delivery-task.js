import {
  http
} from '@/utils/request.js'

/**
 * 查询商品列表
 * @param {Object} params - 查询参数  
 */
export const deliveryTask = (params) => {
  return http.get('/api/patroltask/delivery_tasks', {
    params
  })
}


export const startTask = (data) => {
	return http.post('/api/patroltask/run',data,{
		custom:{isToken:true}
	})
}

export const taskStepFinished = (data) => {
	return http.post('/api/patroltask/delivery_finished', data,{
		custom:{isToken:true}
	})
}