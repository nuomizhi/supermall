//工具类函数，比如防抖动，在其它地方也是可以用到的

//refresh的防抖
export function debounce(func, delay) {
  let timer = null;
  //参数结构
  return function (...args) {
    // console.log(this)  //结果undefined
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      // setTimeout会改变this指向
      // console.log(args);
      func.apply(this, args); //后面解决,猜测为传参数,调用可以传多个参数，后面接受...args为一个数组
      // func();
    }, delay);
  };
}