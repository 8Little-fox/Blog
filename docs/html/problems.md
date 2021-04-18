# 前端面试题

## SPA 单页面应用都有什么优缺点呢？
优点：
	用户体验好，数据渲染快
	对服务器压力小（前后端分离）

缺点：
	初次加载耗时多，SEO难度较大（所有的内容都在一个页面中动态替换显示）
## v-show / v-if 区别

	v-if :	惰性, 如果初次渲染时条件为假 v-if并没有完全销毁，只是成为注释节点

	v-show : 简单的CSS 的 "diaplay" 属性进行切换

## 谈谈你的Vue 单向数据流的理解
	父子组件间形成一个单向下行的绑定，父级prop 的更新会向下流动到子组件，反过来不行。
	每次父组件发生变更时，子组件中所有的prop 都将会刷新为最新的值
	子组件想修改时，只能通过 $emit 派发一个自定义事件，父组件接收到后，由父组件修改
## computed 和 watch 的区别

	computed： 是计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，
	下一次获取 computed 的值时才会重新计算 computed 的值；

	watch： 更多的是「观察」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作；
## Vue 生命周期

	开始创建、初始化数据、编译模版、挂载 Dom -> 渲染、更新 -> 渲染、卸载
	生命周期

	beforeCreate
	组件实例被创建之初，组件的属性生效之前


	created
	组件实例已经完全创建，属性也绑定，但真实 dom 还没有生成，$el 还不可用


	beforeMount
	在挂载开始之前被调用：相关的 render 函数首次被调用


	mounted
	el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子


	beforeUpdate
	组件数据更新之前调用，发生在虚拟 DOM 打补丁之前


	update
	组件数据更新之后


	activited
	keep-alive 专属，组件被激活时调用


	deactivated
	keep-alive 专属，组件被销毁时调用


	beforeDestory
	组件销毁前调用


	destoryed
	组件销毁后调用
## 父组件可以监听到子组件的生命周期

```js
// Parent.vue
<Child @mounted="doSomething"/>
    
// Child.vue
mounted() {
  this.$emit("mounted");
}

```
父组件通过@hook 来监听子组件的钩子函数
```js
<Child @hook:mounted="doSomething" ></Child>

doSomething() {
   console.log('父组件监听到 mounted 钩子函数 ...');
},
    
//  Child.vue
mounted(){
   console.log('子组件触发 mounted 钩子函数 ...');
}
```

```js
 <template> 不属于标签 在其上边v-show 是不行的
```

## 按+操作符的转换规则，

如果操作数为对象，那么调用它们的toString方法转换成字符串，执行字符串连接操作
{}转成字符串为"[object Object]"
```js
console.log(({} + {}).length)  //30 
转换成 console.log(("[object Object]"+"[object Object]").length);//30


console.log(([1] + [2]).length)  //1

console.log((function(a, b, c) {}).length)   //3  接受三个实参

```
