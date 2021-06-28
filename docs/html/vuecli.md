# 从头搭建cli脚手架

```js
vue create my-web    //名称不可大写
```
带你走进vue 世界

新建 `vue.config.js` 配置端口，代理

```js
module.exports = {
  devServer: {
    port: 8080, //端口号
    open: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': 'api'
        }
      },
      '/auth': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        pathRewrite: {
          '^/auth': 'auth'
        }
      }
    }
  }
}

```
新建文件 style 样式重置

reset.css
::: details 点击查看代码
``` js
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
```
:::
安装你可能用到的依赖

```js
sudo yarn add axios  //axios接口请求
sudo yarn add rsaEncrypt   //加密
sudo yarn add element-ui -S //组件库
```
新建 文件 utils

request.js

::: details 点击查看代码

```js
import axios from 'axios'
import { Message } from 'element-ui'
const service = axios.create({})

/**
 * 请求拦截器
 */
service.interceptors.request.use(request => {
  const token = localStorage.getItem('token')
  if (token) {
    request.headers.Authorization = token
  }
  return request
}, error => {
  return Promise.reject(error)
})
/**
 * 响应拦截器
 */
service.interceptors.response.use(response => {
  return response.data
}, error => {
  Message.error(error.response.data.message)
  return Promise.reject(error)
})
class Request {
  static instance
  base = ''
  path = ''
  config = {}

  static getInstance () {
    if (!this.instance) {
      this.instance = new Request()
    }
    return this.instance
  }

  withAction (sendData = {}, method) {
    const isSendData = ['POST', 'PUT'].includes(method.toUpperCase())
    return new Promise((resolve, reject) => {
      service({
        url: `${this.base}${this.path}`,
        method,
        [isSendData ? 'data' : 'params']: sendData,
        ...this.config
      }).then(resolve).catch(reject)
    })
  }

  setBase (base) {
    this.base = `${base}/`
    return this
  }

  setPath (url) {
    this.path = url
    return this
  }

  setConfig (config) {
    this.config = config
    return this
  }

  carry (key) {
    this.path = this.path.replace(/\{.*?\}/g, () => key)
    return this
  }

  get (params) {
    return this.withAction(params, 'get')
  }

  post (data) {
    return this.withAction(data, 'post')
  }

  put (data) {
    return this.withAction(data, 'put')
  }

  del (params) {
    return this.withAction(params, 'delete')
  }

  upload (file, data) {
    const formData = new FormData()
    formData.append('file', file)
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key])
    })
    return Request.withAction(this.path, data, { headers: { 'Content-Type': 'multipart/form-data' } }, 'post')
  }
}

export default Request.getInstance()

```
:::

rsaEncrypt.js
::: details 点击查看代码
```js
import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANL378k3RiZHWx5AfJqdH9xRNBmD9wGD\n' +
  '2iRe41HdTNF8RUhNnHit5NpMNtGL0NPTSSpPjjI1kJfVorRvaQerUgkCAwEAAQ=='

const privateKey = 'MIIBUwIBADANBgkqhkiG9w0BAQEFAASCAT0wggE5AgEAAkEA0vfvyTdGJkdbHkB8\n' +
  'mp0f3FE0GYP3AYPaJF7jUd1M0XxFSE2ceK3k2kw20YvQ09NJKk+OMjWQl9WitG9p\n' +
  'B6tSCQIDAQABAkA2SimBrWC2/wvauBuYqjCFwLvYiRYqZKThUS3MZlebXJiLB+Ue\n' +
  '/gUifAAKIg1avttUZsHBHrop4qfJCwAI0+YRAiEA+W3NK/RaXtnRqmoUUkb59zsZ\n' +
  'UBLpvZgQPfj1MhyHDz0CIQDYhsAhPJ3mgS64NbUZmGWuuNKp5coY2GIj/zYDMJp6\n' +
  'vQIgUueLFXv/eZ1ekgz2Oi67MNCk5jeTF2BurZqNLR3MSmUCIFT3Q6uHMtsB9Eha\n' +
  '4u7hS31tj1UWE+D+ADzp59MGnoftAiBeHT7gDMuqeJHPL4b+kC+gzV4FGTfhR9q3\n' +
  'tTbklZkD2A=='

// 加密
export function encrypt (txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对需要加密的数据进行加密
}

// 解密
export function decrypt (txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey)
  return encryptor.decrypt(txt)
}

```
:::
