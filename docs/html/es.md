# Javascript 基础应用

## ES7新特性

es7 includes()

es6 indexOf()

<b>Array.prototype.includes</b>

`includes()` 的作用，是查找一个值在不在数组里，若在，则返回true，反之返回false。 基本用法：

```js
['a', 'b', 'c'].includes('a')     // true
['a', 'b', 'c'].includes('d')     // false
```

<b>Array.prototype.includes()</b>方法接收两个参数： <b>要搜索的值和搜索的开始索引。</b>当第二个参数被传入时，该方法会从索引处开始往后搜索（默认索引值为0）。若搜索值在数组中存在则返回true，否则返回false。 且看下面示例：

```js
['a', 'b', 'c', 'd'].includes('b')         // true
['a', 'b', 'c', 'd'].includes('b', 1)      // true
['a', 'b', 'c', 'd'].includes('b', 2)      // false

```

ES6里数组的另一个方法`indexOf()`，下面的示例代码是等效的：
```js
['a', 'b', 'c'].includes('a')          //true
['a', 'b', 'c'].indexOf('a') > -1      //true
```
indexOf()严格使用===判断。请看下面示例代码：

```js
let demo = [1, NaN, 2, 3]

demo.indexOf(NaN)        //-1
demo.includes(NaN)       //true
```
上述代码中，indexOf()方法返回-1，即使NaN存在于数组中，而`includes()`则返回了true。

> 提示：由于它对NaN的处理方式与indexOf不同，假如你只想知道某个值是否在数组中而并不关心它的索引位置，建议使用includes()。如果你想获取一个值在数组中的位置，那么你只能使用indexOf方法。

`includes()` 在判断 +0 与 -0 时，被认为是相同的。

```js
[1, +0, 3, 4].includes(-0)    //true
[1, +0, 3, 4].indexOf(-0)     //1
```
>注意：在这里，需要注意一点，includes()只能判断简单类型的数据，对于复杂类型的数据，比如对象类型的数组，二维数组，这些，是无法判断的

## ES8 新特性

Object.values()

Object.entries()

`Object.values()`

使用`Object.values()`遍历对象的属性值，无需使用使用属性名：

```js
let obj = {a: 1, b: 2, c: 3}

Object.values(obj).forEach(value =>{ console.log(value); // 输出1, 2, 3})


```

`Object.entries()`

使用`Object.entries()`遍历对象的属性名和属性值:

```js
let obj = {a: 1, b: 2, c: 3}; 
Object.entries(obj).forEach(([key, value]) =>{   
 console.log(key + ": " + value); // 输出a: 1, b: 2, c: 3
})
```
## JavaScript是单线程，怎样执行异步的代码 ？

JS 中分为两种任务类型：宏任务`macrotask` 和 微任务`microtask`

<b>宏任务 : 主代码块, setTimeout, setInterval, setImmediate, requestAnimationFrame, I/O, UI rendering（可以看到，事件队列中的每一个事件都是一个 macrotask）</b>

<b>微任务 : process.nextTick, Promise, Object.observe, MutationObserver</b>

> 提示：在 node 环境下，process.nextTick 的优先级高于 Promise，也就是可以简单理解为：在宏任务结束后会先执行微任务队列中的 nextTickQueue 部分，然后才会执行微任务中的 Promise 部分。


我们以 setTimeout、process.nextTick、promise 为例直观感受下两种任务队列的运行方式

```js
console.log('main1'); 

process.nextTick(function() {
    console.log('process.nextTick1');
});

setTimeout(function() {
    console.log('setTimeout');
    process.nextTick(function() {
        console.log('process.nextTick2');
    });
}, 0);

new Promise(function(resolve, reject) {
    console.log('promise');
    resolve();
}).then(function() {
    console.log('promise then');
});

console.log('main2');

// main1
// promise
// main2
// process.nextTick1
// promise then
// setTimeout
// process.nextTick2
```

process.nextTick 和 promise then在 setTimeout 前面输出，已经证明了宏任务 和 微任务 的执行顺序
主进程的代码执行之后，会先调用 宏任务，再调用 微任务，这样在第一个循环里一定是 宏任务 在前，微任务在后。因为主进程的代码也属于 宏任务

主进程这个 宏任务（也就是 main1、promise 和 main2 ）执行完了，自然会去执行 process.nextTick1 和 promise then 这两个 微任务。这是第一个循环。之后的 setTimeout 和process.nextTick2 属于第二个循环。


```js
Promise.resolve().then(() => {
  console.log('promise1');
  const timer2 = setTimeout(() => {
    console.log('timer2')
  }, 0)
});
const timer1 = setTimeout(() => {
  console.log('timer1')
  Promise.resolve().then(() => {
    console.log('promise2')
  })
}, 0)
console.log('start');

// start
// promise1
// timer1
// promise2
// timer2
```
```js
setTimeout(() => {
  console.log('timer1');
  Promise.resolve().then(() => {
    console.log('promise')
  })
}, 0)
setTimeout(() => {
  console.log('timer2')
}, 0)
console.log('start')

// start
// timer1
// promise
// timer2
```
```js
const promise = new Promise((resolve, reject) => {
  console.log(1);
  resolve('success') // 主线程
  console.log(2);
});
promise.then(() => { // 微任务
  console.log(3);
});
console.log(4);

// 1
// 2
// 4
// 3
```

`Promise` 等待 成功 失败
```js

async function example() {
  const r1 = await new Promise(resolve =>
    setTimeout(resolve, 500, 'slowest')
  )
  const r2 = await new Promise(resolve =>
    setTimeout(resolve, 200, 'slow')
  )
  return [r1, r2]
}

example().then(result => console.log(result))
// ['slowest', 'slow']

```