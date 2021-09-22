# Vue 3.0

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