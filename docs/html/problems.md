# 前端面试题

## css盒模型
content + padding + border + margin

正常盒模型 ： box-sizing: content-box - width: width+ 左右border + 左右padding

怪异盒模型： box-sizing: border-box
## MVVM
* MVVM是`Model-View-ViewModel` 缩写，Model层代表数据模型，View代表UI组件， ViewModel是View 和Model 的桥梁，数据会绑定到ViewModel层并自动将数据渲染到页面中，视图变化的时候会通知viewMode层更新数据

## vue2.x 响应式原理
* 当创建 Vue 实例时,vue 会遍历 data 选项的属性,利用 Object.defineProperty 为属性添加 getter 和 setter 对数据的读取进行劫持（getter 用来依赖收集,setter 用来派发更新）,并且在内部追踪依赖,在属性被访问和修改时通知变化

## 组件中的data 为什么是一个函数？
*  一个组件被复用多次的话，会创建多个实例，为了保证组件不同的实例之间data不冲突，data 必须是一个函数
## SPA 单页面应用都有什么优缺点呢？

* 优点：
	用户体验好，数据渲染快
	对服务器压力小（前后端分离）

* 缺点：
	初次加载耗时多，SEO难度较大（所有的内容都在一个页面中动态替换显示）

	## 你都做过哪些Vue的性能优化？
	* 尽量减少data中的数据， data 中的数据会增加getter/setter,会收集对应的watcher
	* v-if / v-for 不能连用, vue3.x中 if优先级高于for
	* 在更多的情况下，使用v-if替代v-show
	* SPA 页面采用keep-alive缓存组件
	* key保证唯一
	* 使用路由懒加载、异步组件
	* 防抖、节流
	* 长列表滚动到可视区域动态加载
	* 图片懒加载

## hash 路由和history 路由实现原理
* `location.hash` 的值实际就是在URL 中的 `#` 后面的东西
* history 主要有 `history.pushState()` 和 `history.replaceState()`

## v-if和v-for哪个优先级更高
* v-for 优先于v-if 被解析 先执行循环在判断条件
<!-- ::: tip 通常有两种情况下导致我们这样做：
  为了过滤列表中的项目 (比如 v-for="user in users" v-if="user.isActive")。此时定义一个计算属性 (比如 activeUsers)，让其返回过滤后的列表即可。
  为了避免渲染本应该被隐藏的列表 (比如 v-for="user in users" v-if="shouldShowUsers")。此时把 v-if 移动至容器元素上 (比如 ul、ol)即可。
::: -->
## $router和$route 区别

* this.$router 是Vue Router 的实例方法，当导航到不同的url 时可以使用 `this.$router.push()`,这个方法会向`history`
* 里面添加一条记录，浏览器回退按钮时 `this.$router.back()`就会回到之前的url

* this.$route 相当于当前激活的路由对象, 可以从对象中获得 参数（name , path）

## params和query 区别
* query 要用path 来引入， 接受参数 this.$route.query.name 浏览器地址栏中可展示参数

* params 要用name 来引入，  接受参数 this.$route.params.name  浏览器地址栏中不展示参数，页面刷新时会被清空

## 登录拦截

* 登录拦截的时候会先设置白名单数组，放到 main.js中，每当页面登录时会跳转到登录页
1: 有token时判断当前的路由是否在路由表中，在路由表中继续往下走，没有路由表进行获取路由表
2: 没有token并且当前路径在白名单中继续 next(), 不在时进行拦截进行登录页面

## Vue请求是放在 Created还是Mounted ?

* 首先请求是异步的，
* Created 生命周期里Data 才生成，而返回的数据需要挂载到data上， 所以Created 里可以初始化请求的，但Dom还没有初始化
* Mounted 生命周期里Dom才初始化完成
* 所以请求放在Created/Mounted 都可以， 没什么区别

## 为何v-for中使用key

* diff算法中通过tag和 key 来判断是否是sameNode ,减少渲染次数，提升渲染性能，描述组件渲染和更新过程

## 何时使用 keep-live 

* 缓存组件
* 多个静态tab 页切换
* 性能优化

## 监听data变化的核心API 是什么

* Object.defineProperty
有缺点： ①无法监听数组变化，需要特殊处理(push/pop)


## 防抖和节流

* 防抖（debounce） 在事件触发（n） 秒后在执行回调，内秒内在触发将重新计算
* 节流 （throttle）在规定时间内只触发一次，如果在这个时间内多次触发只有一次生效 （间隔时间执行）

## map和filter 区别
* map 返回一个组装后的新数组
* filter 返回的数组是基于原数组的，数据结构一致

## 说说你对业务组件的理解

* 业务组件是将某些和业务逻辑相关的功能独立封装到一个单独的组件中进行开发和维护，对外暴露一些参数和方法，从而
* 实现这部分功能的单独维护和重复利用

## 为什么封装业务组件

1 可以将复杂的功能拆解，便于后期维护和迭代
2 解决跨项目服用问题，避免代码重复开发
3 统一代码质量，可以在快速开发的同时保证代码质量

## ES6里promise解决了什么问题?
* 解决回调地狱问题
* anysc await 其实本质是promise.then的执行结果；但是其更完美的体现了异步任务同步执行的形式
## Promise.all（只要失败一个就不会走then）的解决方案
* 解决： 在catch里面resolve就行了
```js
 var p1 = new Promise(resolve => {
        let p1Data = b;
        resolve(p1Data)
    }).catch(err => {
        return Promise.resolve("P1 无数据")
    })

    var p2 = new Promise(resolve => {
        let p2Data = 'p2的有数据';
        resolve(p2Data)
    }).catch(err => {
        return Promise.resolve("P2 无数据")
    })

    Promise.all([p1, p2]).then(res => {
        console.log(res);
    }).catch(err => {
        throw new Error("Promise 执行错误", err)
    })
```

## promise与async和await的区别

async/await是写异步代码的新方式
async/await是基于Promise实现的，它不能用于普通的回调函数。
async/await与Promise一样，是非阻塞的。
async/await使得异步代码看起来像同步代码，这正是它的魔力所在。
## 关于异步函数的吐槽
异步函数很常见，经常是用 Promise 来实现

如果这样调用异步函数，易形成地狱回调！
```js
const fn1 = () =>{
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 300);
  });
}
const fn2 = () =>{
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2);
    }, 600);
  });
}
const fn = () =>{
   fn1().then(res1 =>{
      console.log(res1);// 1
      fn2().then(res2 =>{
        console.log(res2)
      })
   })
}
```
改进 
```js
const fn = async () =>{
  const res1 = await fn1();
  const res2 = await fn2();
  console.log(res1);// 1
  console.log(res2);// 2
}
```

但是要做并发请求时，还是要用到`Promise.all()`。

如果并发请求时，只要其中一个异步函数处理完成，就返回结果，要用到`Promise.race()`。


## 如何将扁平数据结构转Tree

```js
let arr = [
  {id: 1, name: '部门1', pid: 0},
  {id: 2, name: '部门2', pid: 1},
  {id: 3, name: '部门3', pid: 2},
  {id: 4, name: '部门4', pid: 3},
  {id: 5, name: '部门5', pid: 4},
]
```
* 不考虑性能实现，递归遍历查找
* 主要思路是提供一个递getChildren的方法，该方法递归去查找子集

```js
/**
 * 递归查找，获取children
 */
 const getChildren = (data, result, pid) => {
  for (const item of data) {
    if (item.pid === pid) {
      const newItem = {...item, children: []};
      result.push(newItem);
      getChildren(data, newItem.children, item.id);
    }
  }
}

/**
* 转换方法
*/
const arrayToTree = (data, pid) => {
  const result = [];
  getChildren(data, result, pid)
  console.log('result', JSON.stringify(result));
  return result;
}

arr.map((item, index) => {
  arrayToTree(arr, index)
})
```

* 不用递归，也能搞定
* 主要思路也是先把数据转成Map去存储，之后遍历的同时借助对象的引用，直接从Map找对应的数据做存储。不同点在遍历的时候即做Map存储,有找对应关系。性能会更好。

```js
function arrayToTree(items) {
  const result = [];   // 存放结果集
  const itemMap = {};  // 
  for (const item of items) {
    const id = item.id;
    const pid = item.pid;

    if (!itemMap[id]) {
      itemMap[id] = {
        children: [],
      }
    }

    itemMap[id] = {
      ...item,
      children: itemMap[id]['children']
    }

    const treeItem =  itemMap[id];

    if (pid === 0) {
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        }
      }
      itemMap[pid].children.push(treeItem)
    }

  }
  return result;
}
```
## 如何实现自定义指令
新建 install.js
```js
import Vue from 'vue'
// 自定义指令
const install = () => {
  Vue.directive('color', {
    inserted (el, bind) {
        console.log(el, bind)
        el.style.background = bind.value
    }
  })
}
export default { install }

```
main.js 中引用一下

```js
import install from '@/utils/tools/install'
Vue.use(install)

```
可以使用啦 
```html
<div id="box">
	<div v-color="'red'">加油，武汉!</div>
</div>
```
* v-empty 缺省图 🌰
```js
 <div style="height:500px;width:500px" v-empty="emptyValue"> 自定义指令缺省图</div>
	data () {
		return {	
			emptyValue: {
				content: '暂无列表',
				img: require('@/assets/empty.jpg'),
				visible: true
			}
		}
	}
```
新建 empty.js, main.js 中引入即可
::: details
```js
import Vue from 'vue'

const install = () => {
  Vue.directive('empty', {
    inserted (el, binding) {
      console.log(el, binding)
      el.style.position = el.style.position || 'relative'
      const { offsetHeight, offsetWidth } = el
      const { visible, content, img } = binding.value
      const image = img ? `<img src="${img}" height="30%" width="30%"></img>` : ''
      const defaultStyle = 'position:absolute;top:0;left:50%;z-index:9999;background:#fff;display:flex;justify-content: center;align-items: center;'
      const empty = Vue.extend({
        template: `<div style="height:${offsetHeight}px;width:${offsetWidth}px;${defaultStyle}">
          <div style="text-align:center">
            <div>${image}</div>
            <div>${content || '暂无数据'}</div>
          </div>
        </div>`
      })
      // eslint-disable-next-line new-cap
      const component = new empty().$mount().$el
      if (visible) {
        el.appendChild(component)
      } else {
        el.removeChild(el.lastChild)
      }
    }
  })
}

export default { install }

```
:::
如果有以下报错可以参考： https://blog.csdn.net/xiaomajia029/article/details/88320233
![Image text](https://img-blog.csdnimg.cn/20190307201606320.png)

* vue.config.js
```js
module.exports = {
  configureWebpack: config => {
    config.resolve = {
      extensions: [".js", ".vue", ".json", ".css"],
      alias: {
        vue$: "vue/dist/vue.esm.js",
        "@": resolve("src")
      }
    };
  }
};
```
文本内容复制指令 v-copy

## 网页url 组成部分

```js 
location.protocal // http: 协议
location.hostname // 127.0.0.1 主机名
location.host   
location.port //端口号
location.origin // 域名 
```
## vuex原理

* Vuex 是通过全局注入store对象，来实现组件间的数据共享，在大型复杂的项目中（多级组件嵌套），需要一个组件更改某个数据，多个组件
* 自动获取更改后的数据进行业务逻辑处理

## v-show / v-if 区别

* v-if :	惰性, 如果初次渲染时条件为假 v-if并没有完全销毁，只是成为注释节点,条件不满足时不渲染此节点

* v-show : display:none 将对应节点隐藏,不占用空间
  visibility: hidden 相当于opacity = 0 ,占用空间

## 0.1 + 0.2 !== 0.3 

* 计算机对于浮点数无法准确表达为二进制

## 谈谈你的Vue 单向数据流的理解
*	父子组件间形成一个单向下行的绑定，父级prop 的更新会向下流动到子组件，反过来不行。
	每次父组件发生变更时，子组件中所有的prop 都将会刷新为最新的值
	子组件想修改时，只能通过 $emit 派发一个自定义事件，父组件接收到后，由父组件修改

## 如何判断数据类型
* instanceof 判断对象和数组

* toString.call() 对哪一种类型都管用

* typeof 

## localStore，sessionStore，cookie区别
* localStore 永久缓存，只要不清楚就一直存在
sessionStore 只在当前会话中存在离开就会清楚
cookie 浏览器中存在，后期可以设置清楚时间，会跟随请求携带请求头

## 行内元素转为块级元素的方法
* display, float , position. display:inline-block强制转为块级元素

## 如何获取dom
* document. getElementById()id名/标签名/类名 querySelector
## computed 和 watch 的区别

*	computed： 是计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，
	下一次获取 computed 的值时才会重新计算 computed 的值；

*	watch： 更多的是「观察」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作；

## Vuex 中action 和 mutation 有什么区别
* action 中处理异步， mutation 不可以
* mutation 做原子操作
* action 可以整合 多个mutation

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

## template 上可以使用v-show渲染嘛？

```js
 答： 不行的
 v-show是通过display: none 渲染的，但是 template在解析后是虚拟DOM, 不会显示在页面上
```

## 按+操作符的转换规则，

* 如果操作数为对象，那么调用它们的toString方法转换成字符串，执行字符串连接操作
  {}转成字符串为"[object Object]"
```js
console.log(({} + {}).length)  //30 
转换成 console.log(("[object Object]"+"[object Object]").length);//30


console.log(([1] + [2]).length)  //2

console.log((function(a, b, c) {}).length)   //3  接受三个实参

```


## 上传图片将图片的命名方式调整为时间戳与哈希算法相结合的方式，
dounload 函数中
```js
/** 
 * 上传腾讯云图片hash模式 
 */	
	function createHash(hashLength) {
		// 默认长度 24
		return Array.from(Array(Number(hashLength) || 24), () => Math.floor(Math.random() * 36).toString(36)).join('');
	}
```
```js

const fileName = md5(`_${filePath.split("//")[1]}_${createHash(20)}_${Math.ceil(Math.random() * (1 - 100) + 100)}_${new Date().getTime()}`);
```
## Vue 组件的通讯方式有哪几种？

* vuex、$parent与$children、prop、$emit与$on、$attrs与$lisenters、eventBus、ref
* `props / $emit`  适用父子组件通讯

* ` ref 与 $parent/$children` 适用父子组件通讯

	如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例

	$parent / $children：访问父 / 子实例


## 非父子间传值

事件总线：原理上就是建立一个公共的js ,专门用来传递信息

新建bus.js
```js
import Vue from 'vue'
export default new Vue;
```
在需要传值和接收值的地方引入

传值

```js
bus.$emit('msg','Hello,World')
```
接收值

```js
bug.$on('msg',val => {
	console.log(val)
})
```

## window.open()

* 打开pdf预览
```js 
window.open('https://yuedian.tos-cn-beijing.volces.com/files/612c96ec8e0631630312172.pdf')
```

## vue中non-props属性

> 就是说在父组件中给子组件传递值，但是子组件不在prop中接受

1: 子组件存在单个节点时，底层会将父组件传递过来的内容置于子组件最外层dom 标签上，变成子组件最外层dom标签上的一个属性，如果不希望在子组件标签上展示该属性，可以通过 inheritAttrs: false，会禁止继承

2: 子组件存在多个字节点时，如果让non-props生效 可以使用` v-bind = “$attrs”`,把父组件传递过来的所有non-props属性放在指定div上,也可以具体某个属性如 `:msg="$attrs.name"`

3: 不管inheritAttrs: false/true, 子组件中都能通过 $attrs属性获取父组件传递过来的属性默认值为true


## 如何实现异步组件

* 在大型应用中，我们可能需要将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块，
* 为了简化，Vue 允许你以一个工厂函数的方式定义你的组件，这个工厂函数会异步解析你的组件定义。
* Vue 只有在这个组件需要被渲染的时候才会触发该工厂函数，且会把结果缓存起来供未来重渲染。以下有两种实现方法

何时使用异步组件
  加载大组件的时候
  路由异步加载

方法一： 
```js
components: {
	List: () => import(/* webpackChunkName:'list' */ './List')
}
```

方法二：

自定义异步组件
```js
const AsyncList = () => ({
	component: import(/* webpackChunkName:'list' */ './List')
	Loading: true,
	timeout: 3000
})
components: {
	AsyncList
}
```

## 动态图标渲染

```js
 <i class="iconfont" v-html="item.icon" />
```

## 生成随机十六进制颜色

```js
const randomHex = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`
console.log(randomHex());
//Result: #92b008

```

## 修改富文本中图片的高度

```html
<div class="count" v-html="text"></div>
<style>
.count img {
//宽， 高
}
</style>

```

## HTML语义化
好处： 
* 1.对编写代码的人来说有语义化标签的html结构更加清晰，方便编写代码 
* 2.对于团队来说，方便开发与维护。
* 3.对于爬虫有利于SEO。
* 4.有利于用户体验。

如何使用语义化

* 少使用或者不适用div和span标签；
* 用p标签代替div标签；不适用样式标签，如：b标签、font标签；
* 强调文本放在strong或者em标签中，不要用b和i标签；
* 使用表格table时，标题要用 caption，表头要用 thead，主体部分用 tbody 包围，尾部用 tfoot 包围；
* 表头用 th，单元格用 td。表单域用filedset包裹，用lengend标签说明表单的用途。input标签通过id属性或for属性与label标签关联。html 语义化，css 类名也要语义化等等。