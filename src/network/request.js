import axios from 'axios'

  //直接返回一个实例
export default function request(config) {
  // 后面的两个函数进行函数回调，通知里面的完成情况
  const instance = axios.create({
    //两个备用接口
    // baseURL: 'http://123.207.32.32:8000/api/v2',
    baseURL: 'http://106.54.54.237:8000/api/v1',
    timeout: 10000
  });
  return instance(config)
}

//-------拦截器----------
// axios.interceptors.request.use(config => {
//   //请求成功
//   console.log(config);
//   //记得把config return回去
//   return config
// }, err => { 
//   console.log(err);

// });
// axios.interceptors.response.use(res => {
//   //返回一个响应结果，注意也必须把这个结果返回去
//   return res.data
// }, err => {
//   console.log(err);

// });
// //----------------