

# Pinia
* https://pinia.vuejs.org/
![Image text](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/00e7a606213e4b929234ccde1a93a98d~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp)

* Pinia 是 Vue.js 的轻量级状态管理库，最近很受欢迎。它使用 Vue 3 中的新反应系统来构建一个直观且完全类型化的状态管理库。它允许您跨组件/页面共享状态。 是一个用于 Vue 的状态管理库，类似 Vuex, 是 Vue 的另一种状态管理方案
Pinia 支持 Vue2 和 Vue3
* 与 Vuex 的比较 Pinia 试图尽可能接近 Vuex 的理念
::: tip 优势
符合直觉，易于学习

极轻， 仅有 1 KB

模块化设计，便于拆分状态 支持 Vue devtools、SSR 和 webpack 代码拆分

store 的 action 被调度为常规的函数调用，而不是使用 dispatch 方法或 MapAction 辅助函数，这在 Vuex 中很常见

支持多个Store

:::

::: tip 缺点
Pinia的缺点

不支持时间旅行和编辑等调试功能
:::

## Store
* Store 是一个保存状态和业务逻辑的实体，可以自由读取和写入，并通过导入后在 setup 中使用
创建一个 store

```js
// store.js
import { defineStore } from "pinia";

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: "myGlobalState",
  // state: 返回对象的函数
  state: ()=> ({
    count: 1
  })
});
```

* 使用 Store 

```html
// xxx.vue
<template>
  <div>
    {{store.count}}
  </div>
</template>
<script>
  // 导入 Store， 使用自己的路径
  import { useStore } from "@/store/store.js";
  export default {
    setup() {
      // 调用函数 获得Store
      const store = useStore();
      return {
        store
      }
    }
  }
</script>

```

* `$patch` 改变状态

* 除了直接用 store.counter++，您还可以调用该$patch方法。它允许您对部分state对象同时应用多个更改：
```js
store.$patch({
  counter: store.counter + 1,
  name: 'Abalam',
})
```

## Getters
* Pinia 中的 Getters 作用与 Vuex 中的 Getters 相同，但使用略有差异
* Pinia 中的 Getters 直接在 Store 上读取，形似 Store.xx，就和一般的属性读取一样

::: tip
Getter 第一个参数是 state，是当前的状态，也可以使用 this.xx 获取状态
Getter 中也可以访问其他的 Getter， 或者是其他的 Store
::: 
```js
// 修改 store.js
import { defineStore } from "pinia";

import { otherState } from "@/store/otherState.js";

export const useStore = defineStore({
  id: "myGlobalState",
  state: ()=> ({
    count: 2
  }),
  getters: {
    //计算count 平方
    countPow2(state) {
      return state.count ** 2;
    },

    // 使用 this
    // countPow2(state) {
    //   return this.count ** 2
    // }

    // 简化
    // countPow2: state => state.count ** 2

    //获取其他
    countPow2Getter() {
      return this.countPow2 + 1
    },
    // otherStoreCount(state) {
    //   const otherStore = otherState()
    //   return state.count
    // }
  }
});

```
* otherState.js
```js
import { defineStore } from "pinia";

export const useStore = defineStore({
  id: "otherState",
  state: ()=> ({
    count: 5
  }),
});

```

* 使用getters

* 方法一
```js
<h1> {{countPow2}},{{countPow2Getter}}</h1>

import { mapState } from 'pinia'
computed: {
  ...mapState(useStore, ['countPow2','countPow2Getter']),
}
```

* 方法二

```js
<h1>getters: {{store.countPow2}}</h1>
<h1>Accessing other getters {{ store.countPow2Getter }}</h1>

import { useStore } from "@/store/store.js";
export default {
  setup() {
    const store = useStore()
    return { store }
  }
}
```

## Actions

Pinia 没有 Mutations，统一在 actions 中操作 state，通过this.xx 访问相应状态
虽然可以直接操作 Store，但还是推荐在 actions 中操作，保证状态不被意外改变
action 和普通的函数一样
action 同样可以像 Getter 一样访问其他的 Store，同上方式使用其它 Store，这里不在赘述,详细请移步 官方文档 [Action](https://pinia.esm.dev/core-concepts/actions.html)

```js
// store.js
export const useStore({
  state: ()=> ({
    count: 2,
    // ...
  })
  // ...
  actinos: {
    insertPost() {
      this.$patch((state) => {
        state.count = 4;
        state.counter = 10
        console.log('action 被改变', state)
      })
    }
  }
})

```
* 使用Actions

* 方法一 

```js
<button @click="insertPost">mapActions</button>

import { mapState, mapActions } from 'pinia'
computed: {
    ...mapActions(useStore, ['insertPost'])
  }
```

* 方法二

```js
<button @click="insertPost()">action</button>

import { useStore } from "@/store/store.js";
export default {
  setup() {
    const store = useStore()
    return { insertPost: store.insertPost }
  }
}

```
