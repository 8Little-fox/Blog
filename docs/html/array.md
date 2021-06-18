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

## 数组并集
首先过滤出arr1 不等于arr2 的，然后在将数组合并成一个
```js
const arr1 = [1,2,3,4,5,7,8,9]
const arr2 = [7,8,9]
const inter = arr1.concat(arr2.filter(v =>!arr1.includes(v)))
console.log(inter);

```
## 常用正则表达式

```js
/**
 * @描述 正则表达式
 */
export function regexpCheck(mode) {
	let regexp = ""

	switch (mode) {
		case 'name':
			regexp = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
			return {
				regexp, title: '中文姓名'
			};
		case "phone":
			regexp = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
			return {
				regexp, title: '手机号'
			};
		case "身份证":
			regexp =
				/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/
			return {
				regexp, title: '身份证'
			};
		case "护照":
			regexp = /^([a-zA-z]|[0-9]){5,17}$/
			return {
				regexp, title: "护照"
			};
		case "港澳通行证":
			regexp = /^[CW]\d{8}$/
			return {
				regexp, title: "港澳通行证"
			};
		case "军人证":
			regexp = /^[\u4E00-\u9FA5](字第)([0-9a-zA-Z]{4,8})(号?)$/
			return {
				regexp, title: "军人证"
			};
		case "统一社会信用代码":
			regexp = /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/
			return {
				regexp, title: "统一社会信用代码"
			}
        case "邮箱地址":
			regexp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
			return {
				regexp, title: "邮箱地址"
			}
	}
}
```

## 强制类型转换

>
 显示强制类型转换 ：发生在静态类型语言的编译阶段
隐式强制类型转换：发生在动态语言的运行时