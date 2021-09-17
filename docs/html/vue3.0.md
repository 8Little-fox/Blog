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

  watch(a, (newValue, oldValue) => {
      console.log('---a', newValue, oldValue)
    })
  watch(() => b.a, (newValue, oldValue) => {
    console.log('---b', newValue, oldValue)
  })
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