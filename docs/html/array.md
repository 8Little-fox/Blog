# js中常用技巧

## 数组交集
```js
const arr1 = [1,2,3,4,5,7,8,9]
const arr2 = [7,8,9]
const inter = arr1.filter(function(val){
    return arr2.indexOf(val) > -1
})
console.log(inter);  //[7,8,9]

```
## 数组对象交集
`some()` 方法用于检测数组中的元素是否满足指定条件（函数提供）

`some()` 方法会依次执行数组的每个元素：

* 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
* 如果没有满足条件的元素，则返回false。
> 注意： some() 不会对空数组进行检测。 不会改变原始数组

```js
const arr1 = [
    { name: 'name1', id:1},
    { name: 'name2', id:2}
]
const arr2 = [
    { name: 'name1', id:1},
]
const result = arr1.filter(function(val){
    return arr2.some( n => JSON.stringify(n) === JSON.stringify(val))
})
console.log(result);//{ name: 'name1', id:1}
```

## 数组差集

数组arr1 相对于 arr2 所没有的

`has()` 方法返回一个布尔值来指示对应的值value 是否存在Set对象中
```js
const arr1 = [1,2,3,4,5,7,8,9]
const arr2 = [7,8,9]
const diff = arr1.filter(item => new Set(arr2).has(item))
//[ 7,8,9]
```
## 数组对象差集
`every() ` 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。

* 如果数组中检测到有一个元素不满足，则整个表达式返回 false ，且剩余的元素不会再进行检测。

* 如果所有元素都满足条件，则返回 true。
```js
const arr1 = [
    { name: 'name1', id:1},
    { name: 'name2', id:2}
]
const arr2 = [
    { name: 'name1', id:1},
]
const result = arr1.filter(function(v){
    return arr2.every( n => JSON.stringify(n) === JSON.stringify(v)) 
})
console.log(result);
```
