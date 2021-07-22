# Javascript 基础应用

## Array.from()

`Array.from()` 方法就是将一个类数组对象或者可遍历对象转换成一个真正的数组
```js
 const obj = {
     0:'a',
     1:'b',
     2:'c',
     length:3
 }
//  length 的长度 = 数字的长度 没有的用 ‘undefended’ 占位
// 对象转化为数组
 const newArr = Array.from(obj)
 console.log(newArr); 
 //[ 'a', 'b', 'c' ]

//  数组转化为数组对象
 const newArrObj = newArr.map((item,index)=>{
     return {
         name:item,
         key:index
     }
 })
 console.log(newArrObj); 
 //[ { name: 'a', key: 0 }, { name: 'b', key: 1 }, { name: 'c', key: 2 } ]


 const newArrObj = Array.from(obj, function(item,index){
    return {
        name:this.age + item,
        key:index
    }
 },{
     age:18
 })
console.log(newArrObj);
// [
//   { name: '18a', key: 0 },
//   { name: '18b', key: 1 },
//   { name: '18c', key: 2 }
// ]
```
```js
let arrayLike = {
    0: 'tom', 
    1: '65',
    2: '男',
    3: ['jane','john','Mary'],
    'length': 4
}
let arr = Array.from(arrayLike)
console.log(arr) // ['tom','65','男',['jane','john','Mary']]

```
要将一个类数组对象转换为一个真正的数组，必须具备以下条件：

1、该类数组对象必须具有 length 属性，用于指定数组的长度。如果没有 length 属性，那么转换后的数组是一个空数组。

2、该类数组对象的属性名必须为数值型或字符串型的数字


## Object.keys()
返回值会自动排序 ？
```js
const obj = {
  100: '一百',
  2: '二',
  7: '七'
}
Object.keys(obj) // ["2", "7", "100"]
```
> 
如果属性名的类型是`Number`，那么`Object.keys`返回值是按照key从小到大排序

如果属性名的类型是`String`，那么`Object.keys`返回值是按照属性被创建的时间升序排序。

如果属性名的类型是`Symbol`，那么逻辑同`String`相同

## includes()
## indexOf()

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


## Object.values()

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
## Promise
## JavaScript是单线程，怎样执行异步的代码 ？

JS 中分为两种任务类型：宏任务`macrotask` 和 微任务`microtask`

<b>宏任务 : 主代码块, setTimeout, setInterval, setImmediate, requestAnimationFrame, I/O, UI rendering（可以看到，事件队列中的每一个事件都是一个 macrotask）</b>

<b>微任务 : process.nextTick, Promise, Object.observe, MutationObserver</b>

> 提示：在 node 环境下，process.nextTick 的优先级高于 Promise，也就是可以简单理解为：在宏任务结束后会先执行微任务队列中的 nextTickQueue 部分，然后才会执行微任务中的 Promise 部分。

执行顺序： 当执行栈执行完毕后，会首先执行微任务队列，当微任务队列执行完毕再从宏任务中读取并执行，当再次遇到微任务时，放入微任务队列。

```js
setTimeout(() => {
  console.log(1);
  Promise.resolve().then(() => {
    console.log(2);
  })
}, 0)
setTimeout(() => {
  console.log(3);
}, 0)
Promise.resolve().then(() => {
  console.log(4);
})
console.log(5);
// 输出结果：5 4 1 2 3
```
代码分析：

console.log(5)是唯一的同步任务，首先执行，输出5
将所有异步任务放在Task队列中，挂起
同步任务执行完毕，开始执行微任务队列，即Promise.then，输出4
微任务队列执行完毕，执行宏任务队列setTimeout
宏任务队列中首先执行同步任务，再次遇到微任务，放入微任务队列中，输出1
同步任务执行完毕，执行微任务队列，输出2
微任务队列执行完毕，执行宏任务队列setTimeout，输出3


我们以 setTimeout、process.nextTick、promise 为例直观感受下两种任务队列的运行方式

https://juejin.cn/post/6844904077537574919   
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
过程分析：

从上至下，先遇到`new Promise`，执行其中的同步代码1

再遇到`resolve('success')`， 将promise的状态改为了`resolved`并且将值保存下来

继续执行同步代码2

跳出`promise`，往下执行，碰到`promise.then`这个微任务，将其加入微任务队列

执行同步代码4

本轮宏任务全部执行完毕，检查微任务队列，发现`promise.then`这个微任务且状态为`resolved`，执行它。


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
## `...` Rest参数和扩展运算符

es6 作用对象仅用于数组
```js
restParam(1, 2, 3, 4, 5);

function restParam(p1, p2, ...p3) {
  // p1 = 1
  // p2 = 2
  // p3 = [3, 4, 5]
}
```

es9 在ES9中为对象提供了像数组一样的Rest参数和展开运算符

Rest参数用法
```js
  var obj = {
            a: 1,
            b: 2,
            c: 3
        }
        const { a, ...param } = obj;
        console.log(a)     //1
        console.log(param) //{b: 2, c: 3}
```

`assign` 合并俩个对象
```js
const merged = {...obj1, ...obj2};
//同：
const merged = Object.assign({}, obj1, obj2);
```

## reduce()

`reduce()`函数接受四个参数

  * Accumulator (acc) (累计器)
  * Current Value (cur) (当前值)
  * Current Index (idx) (当前索引)
  * Source Array (src) (源数组)

回调函数第一次执行时，accumulator和currentValue的取值有两种情况：


* 如果调用reduce()时提供了initialValue，accumulator取值为initialValue,currentValue取数组中的第一个值；
* 如果没有提供initialValue，那么accumulator取数组中的第一个值，currentValue取数组中的第二个值;

上代码
```js
[0,1,2,3,4].reduce(accumulator,currentValue, currentIndex,array){
  return accumulator+currentValue   //10
}
```
上面代码有点繁琐，我们用剪头函数来实现一下罢
```js
[0, 1, 2, 3, 4].reduce((prev,curr)=> prev + curr)
```

累加对象数组里的属性值
```js
let initValue = 0 
let total = [
    {subject: 'Math', score: 90},
    {subject: 'Chinese', score: 90},
    {subject: 'Englsh', score: 100}
].reduce((acc, cur)=>{
    return acc+cur.score
},initValue)
console.log(total);

```

将二维数组转化为一维数组

`初始值 []`
```js
let arr = [[0,1],[2,3],[4,5]]
arr.reduce((acc,cur)=>{
  return acc.concat(cur)
},[])
```

## Set()

Set是es6新增的数据结构，<b>类似数组</b> ，但它的一大特性就是 <b> 所以元素都是唯一的 </b> 没有重复的值

用于数组去重

```js
let arr = [1,2,4,5,2,6,4,4]
let setArr = new Set(arr)
//Set(5) { 1, 2, 4, 5, 6 }
```

## Find()

通过 `find` 进行匹配，匹配完成后对 `this.squareItem` 中的值进行修改
```js
const arr_id = 1
const comment_num = 2
const arr = this.squareItem.find(i => i.id == arr_id)
arr.comment_num = comment_num
```


## queryString

获取参数
```js
var url = 'https://www.baidu.com/s?name=123&phone=234';
const queryString = function (){
    const result = {}
    const index = url.indexOf('?')
    const baseUrl = url.slice(index + 1)
    baseUrl.split('&').forEach((item) =>{
        const [ key ,value ] = item.split('=')
        result[key] = result[key] ? (Array.isArray(result[key]) ? [...result[key],value] : [result[key],value]) :value
        // result[key] = value
    })
    console.log(result); //{ name: '123', phone: '234' }

}
queryString()
```

给指定参数名，获取参数值

```js
var url = 'https://www.baidu.com/s?id=123&name=why&phone=13876769797';
function queryString (name) {
    var strs = '' ;
    const index = url.indexOf('?')
    if(index === -1){
        return undefined
    }
    strs = url.substring(index + 1).split('&')
    console.log(strs);  //[ 'id=123', 'name=why', 'phone=13876769797' ]
    for(let index=0;index < strs.length ;index++){
        var splitItem = strs[index].split('=')
        if(splitItem[0] == name){
            return splitItem[1]
        }
    }

}
console.log(queryString('phone')); //13876769797
```

## base64转图片 
首先将视频第一帧转成base64 ,扔到七牛云获取新的图片
```js
// 从相册中选择视频
uploadVide() {
    getQiniuToken();
    videoalbum().then(res => {
        const video = res
        uni.request({
            url: res + "?vframe/jpg/offset/1/w/300",
            method: 'GET',
            responseType: 'arraybuffer',
            success: res => {
                videoImg(uni.arrayBufferToBase64(res.data)).then(result => {
                    console.log('result',result);   //第一帧转图片
                    let obj = {
                        type: "video",
                        data: video,
                        frame: result
                    };
                    this.media_json.push(obj);
                    this.userAdd = false;
                    this.closeHide();
                })
            }
        });
    });
},
export function videoImg(pic) {
	var md5 = require('md5');
	var random = Math.random().toString(36).substr(2).toUpperCase()
	var timestamp = new Date().getTime();
	return new Promise(resolve=> {
		commonApiList.commonGetQiniuToken({
			random_str: random,
			time_sec: timestamp,
			signature: md5(random + timestamp + "xRASvX7DQnthwVCEGmmqeDd33y5G5hrb")
		}).then(res => {
			var url = "https://up-z2.qiniup.com/putb64/-1"; //非华东空间需要根据注意事项 1 修改上传域名
			var xhr = new plus.net.XMLHttpRequest();
		 
			xhr.open("POST", url, true);
			xhr.setRequestHeader("Content-Type", "application/octet-stream");
			xhr.setRequestHeader("Authorization", `UpToken ${res.data}`);
			xhr.send(pic);
			xhr.onreadystatechange = () => {
				if (xhr.readyState == 4) {
					resolve(getImgRealUrl(JSON.parse(xhr.responseText).key))
				}
			}
		})
	})
}
// 转换真实地址
export function getImgRealUrl(key) {
	return "http://clouddriver.xx.xx/" + key;
}

```

## 图片转base64
```js
export function convertImgToBase64(imageFile, callback, errorCallback) {
	var toBase64Url;
	uni.request({
		url: imageFile,
		method: 'GET',
		responseType: 'arraybuffer',
		success: async res => {
			let base64 = uni.arrayBufferToBase64(res.data); //把arraybuffer转成base64
			toBase64Url = 'data:image/jpeg;base64,' + base64; //不加上这串字符，在页面无法显示
		}
	});
}
```

##  过滤参数空值

```js
export function cleanObject(object){
  const result = { ...object }
  Object.keys(result).forEach(key => {
    const value = result[key]
	if(!value || !value.length) {
		 delete result[key]
	}
  })
  return result
}

```