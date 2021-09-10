# Vue 3.0

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