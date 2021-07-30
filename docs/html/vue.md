# Vue

## 从头搭建cli脚手架

```js
vue create my-web    //名称不可大写
```
带你走进vue 世界

新建 `vue.config.js` 配置端口，代理

```js
module.exports = {
  devServer: {
    port: 8080, //端口号
    open: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': 'api'
        }
      },
      '/auth': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        pathRewrite: {
          '^/auth': 'auth'
        }
      }
    }
  }
}

```
新建文件 style 样式重置

reset.css
::: details 点击查看代码
``` js
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
```
:::
安装你可能用到的依赖

```js
sudo yarn add axios  //axios接口请求
sudo yarn add rsaEncrypt   //加密
sudo yarn add element-ui -S //组件库
```
新建 文件 utils

request.js

::: details 点击查看代码

```js
import axios from 'axios'
import { Message } from 'element-ui'
const service = axios.create({})

/**
 * 请求拦截器
 */
service.interceptors.request.use(request => {
  const token = localStorage.getItem('token')
  if (token) {
    request.headers.Authorization = token
  }
  return request
}, error => {
  return Promise.reject(error)
})
/**
 * 响应拦截器
 */
service.interceptors.response.use(response => {
  return response.data
}, error => {
  Message.error(error.response.data.message)
  return Promise.reject(error)
})
class Request {
  static instance
  base = ''
  path = ''
  config = {}

  static getInstance () {
    if (!this.instance) {
      this.instance = new Request()
    }
    return this.instance
  }

  withAction (sendData = {}, method) {
    const isSendData = ['POST', 'PUT'].includes(method.toUpperCase())
    return new Promise((resolve, reject) => {
      service({
        url: `${this.base}${this.path}`,
        method,
        [isSendData ? 'data' : 'params']: sendData,
        ...this.config
      }).then(resolve).catch(reject)
    })
  }

  setBase (base) {
    this.base = `${base}/`
    return this
  }

  setPath (url) {
    this.path = url
    return this
  }

  setConfig (config) {
    this.config = config
    return this
  }

  carry (key) {
    this.path = this.path.replace(/\{.*?\}/g, () => key)
    return this
  }

  get (params) {
    return this.withAction(params, 'get')
  }

  post (data) {
    return this.withAction(data, 'post')
  }

  put (data) {
    return this.withAction(data, 'put')
  }

  del (params) {
    return this.withAction(params, 'delete')
  }

  upload (file, data) {
    const formData = new FormData()
    formData.append('file', file)
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key])
    })
    return Request.withAction(this.path, data, { headers: { 'Content-Type': 'multipart/form-data' } }, 'post')
  }
}

export default Request.getInstance()

```
:::

rsaEncrypt.js
::: details 点击查看代码
```js
import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANL378k3RiZHWx5AfJqdH9xRNBmD9wGD\n' +
  '2iRe41HdTNF8RUhNnHit5NpMNtGL0NPTSSpPjjI1kJfVorRvaQerUgkCAwEAAQ=='

const privateKey = 'MIIBUwIBADANBgkqhkiG9w0BAQEFAASCAT0wggE5AgEAAkEA0vfvyTdGJkdbHkB8\n' +
  'mp0f3FE0GYP3AYPaJF7jUd1M0XxFSE2ceK3k2kw20YvQ09NJKk+OMjWQl9WitG9p\n' +
  'B6tSCQIDAQABAkA2SimBrWC2/wvauBuYqjCFwLvYiRYqZKThUS3MZlebXJiLB+Ue\n' +
  '/gUifAAKIg1avttUZsHBHrop4qfJCwAI0+YRAiEA+W3NK/RaXtnRqmoUUkb59zsZ\n' +
  'UBLpvZgQPfj1MhyHDz0CIQDYhsAhPJ3mgS64NbUZmGWuuNKp5coY2GIj/zYDMJp6\n' +
  'vQIgUueLFXv/eZ1ekgz2Oi67MNCk5jeTF2BurZqNLR3MSmUCIFT3Q6uHMtsB9Eha\n' +
  '4u7hS31tj1UWE+D+ADzp59MGnoftAiBeHT7gDMuqeJHPL4b+kC+gzV4FGTfhR9q3\n' +
  'tTbklZkD2A=='

// 加密
export function encrypt (txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对需要加密的数据进行加密
}

// 解密
export function decrypt (txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey)
  return encryptor.decrypt(txt)
}

```
:::


## vuex

异步
```js
const store = new Vuex.Store({
	state: {
		personStrategy : false
	},
	mutations: {
		personParameter(state, param) {
			state.personStrategy = param
		}
	},
	actions: {
		setPersonParameter({ commit }, param) {
			commit("personParameter", param)
			return new Promise((resolve, reject) => {
				resolve()
			})
		}
	}
})
export default store
```
页面中如何获取 vuex 中数据：
	修改 vuex 中的数据
```js
import store from '../store/index.js'	
store.dispatch('setPersonParameter', true).then(res => {
	//逻辑操作
})
```
* 举个栗子🌰 

首先我在vuex 中定义 `count` ,`mutations` 中设置两个方法一个增加，一个减少

```js
export default new Vuex.Store({
	state: {
		count: 0
	},
	mutations: {
		add(state) {
			state.count ++
		},
		decrease(state) {
			state.count --
		}
	}
})
```
## State
在组件中获取vuex 中数据

```js
computed: {
	count() {
		return this.$store.state.count
	}
}

```
辅助函数 `mapState`：当组件在获取多个状态的时候，我们可以使用 mapState 辅助函数帮助我们生成计算属性

```js 
import { mapState } from 'vuex'
computed:{
	...mapState({
	count:'count'
	})
}
```
## Mutations
mutation 必须同步执行
触发 `mutations` 	中的事件有一下两种办法

办法一：
```js
this.$store.commit('add')
this.$store.commit('decrease')
```
方法二：可以使用 `mapMutations`辅助函数将组件中的methods映射为 `store.commit`

> 提示：	...mapMutations(['add']) 数组匹配必须要确保事件名称和mutations 中存的方法名相同
...mapMutations({ addchange: 'add' })
```js
import { mapMutations } from 'vuex'

<button @click="add">点击触发mutations 中的事件</button>

methods:{
	...mapMutations([
		'add'
	])
}
```

## 分发 Action


```js
const store = new Vuex.Store({
state: {
    count: 0
  },
  getters: {
    doubleCount(state) {
      return state.count * 2
    }
  },
  mutations: {
    add(state) {
      state.count++
    },
    decrease(state) {
      state.count--
    }
  },
  actions: {
    delayAdd(context) { 
      setTimeout(() => {
        context.commit('add')
      }, 1000)
    }
  }
})
export default store

```
在组件中分发 Action

方法一：
```js
 this.$store.dispatch('delayAdd')
```
方法二： 
使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch

```js
import { mapActions } from 'vuex'
export default {
  // ...
  methods: {
    ...mapActions([
      'delayAdd', // 将 `this.delayAdd()` 映射为 `this.$store.dispatch('delayAdd')`
    ]),
    ...mapActions({
      add: 'delayAdd' // 将 `this.add()` 映射为 `this.$store.dispatch('delayAdd')`
    })
  }
}
```
## component内置的组件
:tada: :100:
用法：

渲染一个“元组件”为动态组件。依 is 的值，来决定哪个组件被渲染。

使用场景：动态组件页面切换和手势滑动切换

```html
  <view v-for="(title, index) of tab" class="flex-Y-XYcenter " @click="tabChange(index)">
    <text :class="index == current_index ? 'title-color' : 'title-white'" style="font-size: 28rpx;padding-bottom: 20rpx;">{{ title.value }}</text>
  </view>
  <swiper :style="'height: ' + (emulator_Height - 160) + 'rpx;  width:750rpx;'" @change="changeSwiper">
    <swiper-item v-for="(tab, index) of tabToggleArray" :key="index">
      <component ref="pageInit" :is="tabToggleComponent"></component>
    </swiper-item>
	</swiper>
```
`tabToggleArray` 组件
`tab` 导航条
`current_index` 索引默认显示 'SquareList' 组件

```js
  tabToggleArray: [{ value: "SquareList" }, { value: "NearbyList" }, { value: "DestinationList" }],
  tab: [{ value: "广场", select: true }, { value: "附近驾友", select: false }, { value: "目的地驾友", select: false }],
  current_index: 0
```

```js
// 左右滑动切换组件
	changeSwiper(e) {
    this.current_index = e.detail.current;
    this.tabToggleComponent = this.tabToggleArray[this.current_index].value;
  },
  //点击导航条切换组件
  tabChange(index) {
    this.tabToggleComponent = this.tabToggleArray[index].value;
    this.current_index = index;
  },
```

## Watch使用
默认情况下，`watch` 只在被监听的属性值发生变化时执行

```js
export default {
  data: () => ({
    dog: ''
  }),
  watch: {
    dog(newVal, oldVal) {
      console.log(`Dog changed: ${newVal}`)
    }
  }
}
```

* immediate

创建组件后立即运行监听程序

`immediate:true`

```js
export default {
  data: () => ({
    dog: ''
  }),
  watch: {
   dog: {
     handler(newVal, oldVal) {
        console.log(`Dog changed: ${newVal}`);
     },
     immediate:true
   }
  }
}
```
* deep

`deep: true`

`deep` 默认值是`false` ,即是否开启深度监听,监听器会层层遍历，给对象的所以属性（及子属性） 添加监听器，
但是会消耗很大的性能，修改obj 中任何一个属性都会触发监听器

```js
export default {
  data: () => ({
    obj: {
      a : 1,
      b : 2
    }
  }),
  watch: {
   dog: {
     handler(newVal, oldVal) {
        console.log(`Dog changed: ${newVal}`);
     },
     immediate: true,
     deep: true
   }
  }
}
  
```

监听obj中具体某一个属性
```js
export default {
  data: () => ({
    obj: {
      a : 1,
      b : 2
    }
  }),
  watch: {
   'obj.a': {
     handler(newVal, oldVal) {
        console.log(`Dog changed: ${newVal}`);
     },
     immediate: true,
     deep: false
   }
  }
}
  
```
监听 `page` ，page 变化后之间调用列表接口 
```js
 watch: {
    page: 'handleGetTable'
  },
```

## vue.sync

`v-bind` 修饰符 .sync
子组件向父组件传值

子组件
```js 
<template>
  <div>
    子组件
    <el-button @click="$emit('update:money', money - 100)">sycn</el-button>
  </div>
</template>
<script>
  export default {
    props:['money']
  }
</script>

```

父组件
```js
<template>
  <SyncText :money.sync="money"/>
  {{money}}
</template>
data () {
  return {
    money:''
  }
}
```

::: warning

使用`sync`的时候,子组件传递的事件名必须为 `updata:value`,其中value必须与组件中的props
中声明的名称完全一致
:::
## Vue.$set()

Vue 不允许在已经创建的实例上动态添加新的根级响应式属性 (root-level reactive property)。然而它可以使用 Vue.set(object, key, value) 方法将响应属性添加到嵌套的对象上

```js
this.$set(this.student, 'age' ,15)
```
```js
this.student.age = '15'
this.student = Object.assign({}, this.student)
```
## @keyup.enter.native 回车聚焦
使用场景 :: 用户名回车自动聚焦到密码框

用户框里放：@keyup.enter.native="keyupClick"

密码框里放:：ref="mima"
```js
 keyupClick () {
    this.$refs.mima.focus()
  },
```

## @click.native.prevent 阻止默认事件