# Vuex

异步
```
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
	},
})
export default store
```
页面中如何获取 vuex 中数据：
	修改 vuex 中的数据
```
import store from '../store/index.js'	
store.dispatch('setPersonParameter', true).then(res => {
	//逻辑操作
})
```