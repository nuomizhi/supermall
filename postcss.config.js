module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px-to-viewport':{
      viewportWidth: 375, //视窗宽度
      // viewportHeight: 667, //视口高度
      unitPrecision: 5, //保留小数位数，
      viewportUnit: 'vw', //转换为视窗的单位
      selectorBlackList:['ignore'],  //忽略不转换的类
      minPixelValue: 1,  //小于或者等于此值的不做转换
      mediaQuery:false, //允许在媒体查询中转换px（暂时还不知道）
      exclude:[/NavBar/]
    }
  }
}
