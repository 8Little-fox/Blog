# Vue 3.0

## Vue3.x 推荐使用哪些插件呢？ 都有什么好处
* Vuex -> Pinia  极轻， 仅有 1 KB
* EventBus -> Mitt 足够小，仅有200bytes
## Vue3.x响应式数据原理
* Vue3.x改用 `Proxy` 替代 ObjjectdefineProperty. 因为Proxy 可以直接监听对象和数组的变化。

Proxy只会代理对象的第一层，那么Vue3又是怎样处理这个问题的呢？
判断当前Reflect.get的返回值是否为Object ,如果是则在通过reactive 方法做代理， 这样就满足了深度观测

监测数组的时候可能触发多次get/set，那么如何防止触发多次呢？
我们可以判断key是否为当前被代理对象的target 自身属性，也可以判断旧值与新值是否相等，只要满足以上两者条件之一时，才有可能执行trigger

## getCurrentInstance
* 获取当前组件的实例
```js
import { getCurrentInstance } from 'vue'
//获取当前组件的上下文
const { proxy } = getCurrentInstance();
```
## ref/reactive 响应式引用

* 原理，通过`proxy` 对数据进行封装，当数据变化时，出发模版等内容的更新
* ref: 处理基础类型的数据 
* reactive :处理非基础类型的数据
* toRefs 批量创建ref类型数据, 并和以前数据关联/响应式对象转换成普通对象，把对象中的每一个属性，包裹成ref对象
```js
let name = ref('Hello World')
name.value = '123'
// name = 123
```

```js
const newObj = reactive({name: '小明'})
newObj.name = '小妹'
// newObj.name = 小妹
```

```js
const newObj = reactive({name: '小明'})
const { name } = toRefs(newObj)
 // name = 小明
```

## computed

* 首先还是得导入 computed 方法

```js
import { ref, computed } from 'vue'
setup(){
  const a = ref(1)
  const c = computed(() => { return a.value * 2 })
  return {
    c //2
  }
}
```

## watch

```js
import { reactive, watch } from 'vue'
setup(){
  const a = ref(1)
  const b = reactive({ a: 1 })

  //监听 ref数据
  watch(a, (newValue, oldValue) => {
      console.log('---a', newValue, oldValue)
  })
  //监听 reactive 数据 返回一个函数
  watch(() => b.a, (newValue, oldValue) => {
    console.log('---b', newValue, oldValue)
  })
  //同时监听多个值
  watch([() => b.a,() => b.c],([newa,newb],[olda,oldb])=> {
    console.log(newa,olda,'----',newb,oldb );
  })
}
```
## watchEffect

* 立即执行，没有惰性
* 不需要传递你要监听的内容，自动会感知依赖
* 不能获取之前的数据（oldValue）
## todoList
* 举个栗子🌰 

```html
 子组件 todoList
<input type="text" :value="iptValue" @input="handlerInput" />
<button @click="handlerBtn(iptValue)">add</button>
<ul style="width: 400px; margin: 0 auto">
<li v-for="item of list" :key="item">
  {{ item }}
</li>
</ul>
```
```js
import { ref, reactive } from "vue";
//list列表
const listReativeEffect = (iptValue) => {
  const list = reactive([]);
  const handlerBtn = (item) => {
    if(!iptValue.value) {
      alert('输入框内容不能为空')
      return;
    }
    list.push(item);
  };
  return {
    list,
    handlerBtn,
  };
};
//input 
const iptReativeEffect = () => {
  const iptValue = ref('');
  const handlerInput = (e) => {
    iptValue.value = e.target.value;
  };
  return {
    iptValue,
    handlerInput
  }
};
export default {
  setup() {
    const { iptValue, handlerInput } = iptReativeEffect();

    const { list, handlerBtn } = listReativeEffect(iptValue);

    return {
      list,
      handlerBtn,
      iptValue,
      handlerInput,
    };
  },
};
```

## Vuex

```js
import { useStore } from "vuex"

const store = useStore()
const { name } = toRefs(store.state);
const handlerChange = () => {
  // 方法一： 直接通过commit 改变数据
  // store.commit('NAME', 'Hello12121212')
  // 方法二： 通过dispatch 方法派发一个action,改变数据
  store.dispatch('handlerChange','LL')
}

```
index.js

```js
import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      name: "Hello"
    }
  },
  mutations: {
    NAME(state,str) {
      console.log(state,str);
      state.name = str
    }
  },
  actions: {
    handlerChange(state, str) {
      this.commit('NAME',str)
    }
  }
})
```

## Vue-router 

`main.js` 中引用router 并挂载

`beforeEnter` 路由守卫 ，路由跳转前执行某个操作

router.js
```js
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: import(/* webpackChunkName: "about" */ '../views/home/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: import(/* webpackChunkName: "about" */ '../views/login/index.vue'),
    beforeEnter (to, from, next) {
      const { isLogin } = localStorage
      isLogin ? next({ path: '/' }) : next()
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, form, next) => {
  const { isLogin } = localStorage
  isLogin || to.name === 'Login' ? next() : next({ name: 'Login' })
})
export default router

```

Login.vue 页面中使用

引入的useRoute,useRouter 相当于vue2的 this.$route()，this.$router()
点击按钮就能跳转到home.vue页面了
```js
import { useRouter } from 'vue-router'
export default {
  name: 'Login',
  setup () {
    const router = useRouter()
    const toHome = () => {
      localStorage.isLogin = true
      router.push({ path: '/' })
    }
    return { toHome }
  }
}
```
## 组件通信

* props
* $emit
* expose / ref
* $attrs
* v-model
* provide / inject
* Vuex

v-model: update:count

* 子组件接收父组件传递过来的 `count` 属性, 点击子组件按钮动态响应父组件的 `count` 数据

父组件
```js
<div>子组件改变父组件传过来的值，并实现数据的双向绑定</div>
{{count}}
<child v-model:count="count"/>

data() {
    return {
      count: 1
    }
  }
```
子组件
```js
<!-- {{count}} -->
<button @click="hanlderBtn">点击改变值</button>
<script>
  export default {
    props: ['count'],
    methods: {
      hanlderBtn() {
        this.$emit('update:count', this.count+3);
      }
    },
  }
</script>

```