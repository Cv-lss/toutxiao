module.exports = {
    plugins: {
        'postcss-pxtorem': {
            //rootValue:37.5
            //可以写成函数
            //如果是vant组件的样式就是 37.5 如果不是就是75 
            rootValue: ({ file }) => (/vant/i.test(file) ? 37.5 : 75),
            //是要修改那些属性转换rem
            propList: ['*']
        }
    }
}