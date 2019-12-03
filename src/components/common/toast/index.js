import Toast from './Toast'

const obj = {};
//在main.js使用use时候，就会执行插件的install函数，同时会传来一个Vue对象
//注意有两部分，html和js部分
obj.install = function(Vue){
  // console.log('使用了toast插件');
  //1.创建组件构造器
  const toastConstructor = Vue.extend(Toast);
  //2.new一个组件对象
  const toast = new toastConstructor();
  //3.把组件对象手动挂载到一个元素上,挂载其实就是替换这个元素
  toast.$mount(document.createElement('div'));
  //4.把元素加到dom上
  document.body.appendChild(toast.$el);
  //5.把组件对象添加到Vue上
  Vue.prototype.$toast = toast;
}  

export default obj;