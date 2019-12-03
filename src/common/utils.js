//工具类函数，比如防抖动，在其它地方也是可以用到的

//refresh的防抖
export function debounce(func, delay) {
  let timer = null;
  //参数结构
  return function (...args) {
    // console.log(this)  //结果undefined
    // console.log(timer);
    if (timer) {
      clearTimeout(timer);
    };
    timer = setTimeout(() => {
      // setTimeout会改变this指向
      // console.log(args);
      func.apply(this, args); //后面解决,猜测为传参数,调用可以传多个参数，后面接受...args为一个数组
      // func();
      //不设置为null不然会有timer不会清除为null的问题
      timer = null;
    }, delay);
  };
}

//时间的格式化
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    // yyyy
    //先判断有没有匹配到字符串，然后看匹配字符串长度最后根据长度截取相应的年份长度
    //substr从start位置开始截取到末尾
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  // console.log(o);
  // 对数组或者对象的属性进行循环操作
  for (let k in o) {
    //后面相同的处理，所以放在一个对象中
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      // 判断是一位还是两位比如8和08,一位直接过，二位过padLeftZero
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};

/*
regexp  str length  result
yy       8   1      008
yy       12   2      0012
*/