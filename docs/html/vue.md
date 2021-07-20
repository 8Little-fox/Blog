# Vue

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