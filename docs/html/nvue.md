# 混合开发 
## uniapp 嵌入原生

 nvue基于原生引擎的渲染

 nvue 注意事项

 1：nvue 页面只能使用 flex 布局，不支持其他布局方式。

 2:原生开发没有页面滚动的概念，页面内容高过屏幕高度并不会自动滚动，只有部分组件可滚动（list、waterfall、scroll-view/scroller），要滚得
 内容需要套在可滚动组件下

 3:文字内容，必须、只能在 <text> 组件下

 4:只有text标签可以设置字体大小，字体颜色

 5:布局不能使用百分比

 6:不支持背景图

 7:在 App.vue 中定义的全局js变量不会在 nvue 页面生效。globalData和vuex是生效的

 8:目前不支持在 nvue 页面使用 typescript/ts。

 9:border 不支持简写

 ```js
 /* 错误 */
.class {
    border: 1px red solid;
}

/* 正确 */
.class {
    border-width: 1px;
    border-style: solid;
    border-color: red;
}
 ```
 10：background 不支持简写
 ```js
 /* 错误 */
.class {
    background: red;
}

/* 正确 */
.class {
    background-color: red;
}

 ```
