# 工具函数

## 函数防抖
::: tip
/**
 * 在事件触发（n）秒后执行回调，n 秒内触发重新计算
 * @desc 函数防抖
 * @param {*} func 目标函数
 * @param {*} wait 延迟执行毫秒数
 * @param {*} immediate true - 立即执行, false - 延迟执行
 * @returns
 */
:::

``` js

function debounce (func, wait, immediate) {
  let timer
  return function () {
    const context = this
        const args = arguments

    if (timer) clearTimeout(timer)
    if (immediate) {
      const callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timer = setTimeout(() => {
        func.apply(context, args)
      }, wait)
    }
  }
}
window.onresize = debounce(function() {
  console.log('window onresize end');
}, 500, true)
```

## 函数节流
::: tip
/**
 * 在规定时间内只触发一次
 * @author lls
 * @param {*} func 目标函数
 * @param {*} wait 延迟执行毫秒数
 * @param {*} type 1 - 时间戳版 2 - 定时器版
 * @returns
 */
:::

```js
export function throttle (func, wait, type) {
  if (type === 1) {
    var previous = 0
  } else if (type === 2) {
    var timeout
  }
  return function () {
    const context = this
    const args = arguments
    if (type === 1) {
        const now = Date.now()

        if (now - previous > wait) {
          func.apply(context, args)
          previous = now
        }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null
          func.apply(context, args)
        }, wait)
      }
    }
  }
}
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
```js
function getQueryString() {
  const url = 'https://dongaohui-file.qrqy.net/upload_pic_200017-16228080178825.jpg'
  if (url) {
    let strs = ''
    const index = url.lastIndexOf('/')
    if (index === -1) {
      return url
    }
    strs = url.substring(index).split('/')
    console.log('图片后缀', strs[1])
    return strs[1]
  }
};
getQueryString()  //upload_pic_200017-16228080178825.jpg
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

## 浅拷贝、 深拷贝

* 深拷贝

* 深拷贝是将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且修改新对象不会影响原对象。

## 限制内容中文
::: tip
/**
 * @desc 函数防抖
 * @param {*} str 输入内容
 * @param {*} isvalid true - 校验通过, false - 校验未通过
 * @returns
 */
:::

```js
export const IsChinese = function (str) {
  let isvalid = true
  if (str.length != 0) {
    const reg = /^[\u0391-\uFFE5]+$/;
    if (!reg.test(str)) {
      isvalid = false
    }
  }
  return isvalid
}
```


## 字符串实际长度
::: tip
/**
 * @desc 函数防抖
 * @param {*} str 输入内容
 * @param {*} 获得字符串实际长度，中文2，英文1
 * @returns
 */
:::

```js
export const get_length = function (str) {
  var realLength = 0,
    len = str.length,
    charCode = -1;
  for (var i = 0; i < len; i++) {
    charCode = str.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128)
      realLength += 1;
    else
      realLength += 2;
  }
  return realLength;
};
```

## 修改对象中的key ，值不变
::: tip
  /**
   *
   * @param {*} oldKeys 原始数据 object {id: 'A',name:'张三'}
   * @param {*} newKeys 要修改的数据 object {id: "序列"}
   * @returns // {序列: 'A',name:'张三'}
   */
:::
```js
  export const objKeys = function(oldKeys, newKeys) {
      var objs = Object.keys(oldKeys).reduce((newData, key) => {
          let newKey = newKeys[key] || key
          newData[newKey] = oldKeys[key]
          return newData
      }, {})
      return objs
  }

```

## 颜色值转换
```js
  class Common {
  /**
   * rgba 转 hex
   * @param {*} color
   * @returns
   */
    static colorRGB2Hex (color) {
      if(!color) {
        return '';
      }
      if(!/^rgb/.test(color)) {
        return color
      }
      var rgb = color.split(',');
      var r = parseInt(rgb[0].split('(')[1]);
      var g = parseInt(rgb[1]);
      var b = parseInt(rgb[2].split(')')[0]);
      var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
      return hex;
    }
      /**
   *
   * @param {*} _color hex #343434
   * @param {*} _opacity 透明度 0.5
   * @returns rgba(24,33,42,0.5)
   */
    static hexToRGBA(_color, _opacity){
      var sColor = _color.toLowerCase();
      //十六进制颜色值的正则表达式
      var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      // 如果是16进制颜色
      if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
          var sColorNew = "#";
          for (var i = 1; i < 4; i += 1) {
            sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
          }
          sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for (var i = 1; i < 7; i += 2) {
          sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        return "rgba(" + sColorChange.join(",") + "," + _opacity + ")";
      }
      return sColor;
    }
  }
export default Common

Common.hexToRGBA('#343434', 0.5)
```