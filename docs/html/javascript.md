# javascript进阶面试题

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