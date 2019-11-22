module.exports = {
  configureWebpack:{
    resolve:{
      alias:{
        // 有两个可以不加上是引用比较少
        'assets':'@/assets',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views',
        'common': '@/common'
        // 'assets':path.resolve(__dirname, './assets'),
        // 'components':path.resolve(__dirname, './components'),
        // 'network':path.resolve(__dirname, './network'),
        // 'views':path.resolve(__dirname, './views')
      }
    }
  }
}
// 导入导出三种
// module.exports => require()
//export {} => import{} export default => import 自定义名字
//return
