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