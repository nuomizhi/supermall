import request from './request'

//创建一个只面对home页面网络请求的request

// 获取主数据,在home页面只需调用即可
export function getHomeMultidata(){
  return request({
    url:'/home/multidata'
  })
}

//获取首页多个商品集合的数据
export function getHomeGoods(type,page){
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}