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