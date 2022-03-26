# 小程序面试题
## 如何进行参数传递
小程序怎么跟随事件传值
给HTML元素中添加data-*属性来传递需要的值，之后通过e.currentTarget.dataset或onload的param参数获取。注意不能有大写字母，不可以存放对象
跳转页面时通过navigator传递需要的参数值
设置id的方法标识，通过e.currentTarget.id获取设置的id值，然后通过设置全局变量的方法来传递数值

## 小程序的双向绑定和vue哪里不一样
小程序直接this.data的属性是不可以同步到视图的，必须调用this.setData({})
## 提高小程序的应用速度的方法
减少默认data的大小
组件化方案，公用的如弹框等写个自定义的组件，然后调用

## bindtap和catchtap的区别是什么
bindtap不会阻止冒泡事件，catchtap阻止冒泡

## 小程序关联微信公众号如何确定用户的唯一性？
使用wx.getUserInfo方法 withCredentials为true时，可获取encryptedData，里面有union_id.后端需要进行对称解密。

## webview中的页面怎么跳回小程序中

先在管理后台配置域名白名单
然后引入jweixin-1.3.2.js
```js
	wx.miniProgram.navigateTo({url: '/pages/login/login'+'$params'})
	wx.miniProgram.navigateTo({url: '/path/to/page'})
```

## webview的页面怎么跳转到小程序导航的页面？
switchTab

## 小程序什么时候会主动销毁？
小程序在进入后台之后，客户端会帮我们在一定时间内维持我们的一个状态，超过五分钟后，会被微信主动销毁.(不同机型体现不一致)