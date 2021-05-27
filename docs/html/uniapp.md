# uniapp开发小坑

## scroll-view 喵点定位

点击按钮或者某个操作，跳转到页面到某个位置上

> `scroll-view` 必须要设置高度，此处高度获取的是屏幕的高度
```js
<scroll-view :scroll-into-view="active" :style="{ height: scrollView + 'px' }" />

scrollView() {
			const height = sys.screenHeight - sys.safeAreaInsets.top
			return height;
		},
```
```js
<div id="comment"/>

```
页面渲染完成后在进行指定位置跳转，
```js
	setTimeout(() => {
		this.active = 'comment'
	}, 900);
```
> 如果不加定时器，容易导致页面高度计算有误