# 浏览器

## 为什么https 更安全
* https 在传输的过程中经过了一层加密/tsl安全层，http属于明文传输

## 跨域
* 什么是同源策略及其限制内容？

同源 : 协议+域名+端口

缺少了同源策略，浏览器很容易受到XSS、CSRF等攻击
![Image text](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/5/23/1638b3579d9eeb32~tplv-t2oaga2asx-watermark.awebp)

* 常见跨域场景

当协议、子域名、主域名、端口号中任意一个不相同时，都算作不同域。不同域之间相互请求资源，就算作“跨域”。常见跨域场景如下图所示：
![Image text](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/5/23/1638b3579dde630e~tplv-t2oaga2asx-watermark.awebp)


::: tip 特别说明两点
* 第一：如果是协议和端口造成的跨域问题“前台”是无能为力的。
* 第二：在跨域问题上，仅仅是通过“URL的首部”来识别而不会根据域名对应的IP地址是否相同来判断。“URL的首部”可以理解为“协议, 域名和端口必须匹配”。
:::

这里你或许有个疑问：请求跨域了，那么请求到底发出去没有？
* 跨域并不是请求发不出去，请求能发出去，服务端能收到请求并正常返回结果，只是结果被浏览器拦截了。

跨域解决方案： 
* JSONP
* cors
* postMessage
* websocket
* Node中间件代理（两次跨域）
* nginx 反向代理
* window.name.iframe
* location.hash + iframe
* document.domain + iframe

总结
* CORS支持所有类型的HTTP请求，是跨域HTTP请求的根本解决方案
* JSONP只支持GET请求，JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据。
* 不管是Node中间件代理还是nginx反向代理，主要是通过同源策略对服务器不加限制。
* 日常工作中，用得比较多的跨域方案是cors和nginx反向代理

## 状态码
* 1xx: 表示目前是协议处理的中间状态，还需要后续操作。
* 2xx: 表示成功状态。
* 3xx: 重定向状态，资源位置发生变动，需要重新请求。
* 4xx: 请求报文有误。
405 Method Not Allowed: 请求方法不被服务器端允许。
414 Request-URI Too Long: 请求行里的 URI 太大。
* 5xx: 服务器端发生错误。

## HTTP 的请求方法
* GET: 通常用来获取资源
* HEAD: 获取资源的元信息
* POST: 提交数据，即上传数据
* PUT: 修改数据
* DELETE: 删除资源(几乎用不到)
* CONNECT: 建立连接隧道，用于代理服务器
* OPTIONS: 列出可对资源实行的请求方法，用来跨域请求
* TRACE: 追踪请求-响应的传输路径

## GET 和 POST 有什么区别？
* 名字区别
* 从缓存的角度, GET 请求会被浏览器主动缓存下来，留下历史记录，而 POST 默认不会。
* 从参数的角度, GET 一般放在 URL 中，因此不安全，POST 放在请求体中，更适合传输敏感信息
* 从TCP的角度，GET 请求会把请求报文一次性发出去，而 POST 会分为两个 TCP 数据包，首先发 header 部分，如果服务器响应 100(continue)， 然后发 body 部分。(火狐浏览器除外，它的 POST 请求只发一个 TCP 包)