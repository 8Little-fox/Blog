
# Vuex

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
