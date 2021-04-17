# Javascript 基础应用

# ES7新特性

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

# ES8 新特性

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