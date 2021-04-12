# 前端代码优化
1 
修改前
```js
<text v-if="index==current_index" style="border-bottom-color: #47a7ff;border-bottom-width: 2px; border-style: solid;padding-bottom: 10rpx; color: #000000; font-size: 28rpx;">{{ title.name }}</text>
```
修改后
```js
 :class="index==current_index &&'title-color'"
```

2,数组和对象接收值时需要加上（[]）
修改前
```js
titleList: {
		type: Array,
		default: () => []
	},
```
修改后
```js
titleList: {
		type: Array,
		default: () => ([])
	},
```

3判断语句
修改前
```js
switch (this.current_index) {
		case 2:
			this.$emit('selectChange', 'strategyShow')
		break;
		case 3:
			this.$emit('selectChange', 'dynamicShow')
			break;
		case 4:
			this.$emit('selectChange', 'driveFriendShow')
		break;
	}
```
修改后
```js
const selectShow={
		2:'strategyShow',
		3:'dynamicShow',
		4:'driveFriendShow'
	}
this.$emit('selectChange',selectShow[this.current_index])
				
```
修改前 
``` js
const selectShow={
	0:'all',
	1:'pending',
	2:'wait',
	3:'comment',
	4:'sale'
}

```
修改后
``` js
const selectShow = ['all','pending','wait','comment','sale']
```

修改前
路由携参
```js
		if (this.attractions == 'friendsdestination') {
					_router.push({
						path: "/foundfriend/FoundFriend",
						query: {
							attractions_id: item.id,
							address: item.address
						}
					});
				} else {
					_router.push({
						path: "/strategy/Perfect",
						query: {
							attractions_id: item.id,
							address: item.address
						}
					});
				}
```
修改后
```js
const query = {
					attractions_id: item.id,
					address: item.address
				}
				_router.push({
					path: this.attractions === 'friendsdestination' ? '/foundfriend/FoundFriend' : '/strategy/Perfect',
					query
				})
```

修改后
```js
	handleSubmit(key) {
				apiList[key === 1 ? 'apiUserPortalEnterpriseCreate' : 'apiUserPortalEnterpriseResubmit']({ ...this.business_information})
					.then(res => {
						if (res.code == 200) {
							this.getApiUserPortalEnterpriseGetByToken()
							this.authentication = false
							this.authenticating = true
						}
						 else {
							showToast(res.msg)
						}
					})
			},
//上传图片，传入对应的key
    handleChooseImage(key) {
				chooseImage().then(res => {
					this.business_information[key] = res;
				});
			},
```
同一个方法传入不同字符串
```js
@click="handleChooseImage('account_bank_permit')"
```

```js
data(){
  return {
      business_information:{
            account_bank_permit:''
        }  
    }
}
handleChooseImage(key) {
		chooseImage().then(res => {
		this.business_information[key] = res;
	});
},
```

es6 `` 模版语法 
```js
	<div 
		v-for="(item,index) of footerList" 
		:key="index"
		@click="goMystore"
	 	 class="lex-Y-Ycenter-align">
		<image :src="item.img" class="footer-icon"></image>
		<text 
		:style="{ color: item.color }"
		 style="font-size: 22rpx;"
		 class="mystore-text"
		 >
		 {{ item.text }}
		 </text>
	</div>

```

```js
	computed: {
			footerList() {
				const prePath = "../static/icon/image/"
				const tailPath = "@2x.png"
				const is_tabbar_type = this.tabbar_type === 0
				const is_active = '#57acfb'
				const is_unactive = '#b3b3b3'
				return [
					{ 
						text: '线路', 
						img: `${prePath}${is_tabbar_type ? 'xianlu_xuanzhong': 'xianlu_hui'}${tailPath}` ,
						color: is_tabbar_type ? is_active : is_unactive
					},
					{ 
						text: '我的', 
						img: `${prePath}${is_tabbar_type ? 'wode_weixuan': 'wode_lan'}${tailPath}`, 
						color: is_tabbar_type ? is_unactive : is_active
					}
				]
			}
		}
```

如何优雅的循环接口中返回数据
```js
	<div class="flex-X-Xevenly" style="margin-top: 44rpx;" v-for="(item,index) of order_info"
		:key="index">
		<text style="font-size: 26rpx;color: #999999;margin-right: 41rpx;">{{item.name}}：</text>
		<text style="color: #333333;font-size: 26rpx;">{{item.preIcon}}{{orderDetails[item.key]}}</text>
	</div>
	order_info: [
		{ name: '订单总额',preIcon: '￥',key: 'total_amount'},
		{ name: '订单编号',key: 'trade_no'},
		{ name: '下单时间',key: 'pay_at'}]
```
修改前
```js
接口返回数据存放到数组中
	strategy_list: [], //攻略列表
	square_list: [], //广场列表
	route_list: [], //路线列表
	video_list:[],  //短视频
	if(status === 'video'){
		if (loadmore) this.video_list = this.video_list.concat(data)
		else this.video_list = data
	}
```
修改后
```js
	// 如果是上拉加载, 进行数组合并, 否则重新赋值
	this[`${status}_list`] = loadmore ? this[`${status}_list`].concat(data) : data

```

## style /class
数字中要是包含item 的值就就让 边框的颜色显示红色 否则显示 #e7e6e6'  
``` js
:style="{ 'borderColor' : chooseTagList.includes(item) ? 'red' : '#e7e6e6'}"
```

修改前 
```js
<text :class="index==current_index?'title-color':'title-white'" style="font-size: 28rpx;padding-bottom: 20rpx;">{{ title.name }}</text>
```
修改后
将同名的提出来
```js
<text :class="`title-${index==current_index ? 'color' :'white'}`" style="font-size: 28rpx;padding-bottom: 20rpx;">{{ title.name }}</text>

```

uniapp 获取模拟器屏幕高度 
```js
// 获取整个屏幕高度 返回 rpx
function getFullScreenHeight() {
	const { windowWidth, windowHeight } = uni.getSystemInfoSync()
	const winrate = 750 / windowWidth
	const winHeightRpx = parseInt(windowHeight * winrate)
	return winHeightRpx
}
```

```js
:style="{ top: `${topSafeHeight + 40}px`, opacity: bg_opacity }"
data(){
	return {
		topSafeHeight :getFullScreenHeight()  // 屏幕顶部高度
		bg_opacity；1    // 透明度1

	}
}
```

## 校验
方法一：
Object.entries()方法返回键值对数组
every()  方法数组内的所有元素是否都能通过返回boolean
如何满足进行Axios请求，不满足弹出错误message
```js
err_state(state) {
	switch (state) {
	case "company_name":
		return "请输入企业名称";
	case "social_credit_code":			
	return "请输入统一社会信用代码";
	default:		
	}
},
let check_array = Object.entries({ ...this.business_information});
	let check_all = check_array.every((elem) => {
		return elem[1];
	});
	if (check_all) {
		this.handleSubmit(this.examine == 1 ? 1 : 2)
	} else {
		for (let i = 0; i < check_array.length; i++) {
			if (!check_array[i][1]) {
				this.$message.error(this.err_state(check_array[i][0]));
				break;
				}
			}
		}
```
方法二：
valid.js
接收两个参数，vm第一个表单值 rules第二个检验规则
```js
const validateToast = (vm, rules) => {
	return new Promise((resolve, reject) => {
		Object.keys(rules).forEach((key) => {
			const segments = key.split('.')
			const item = rules[key]
			item.forEach((ruleItem) => {
				const value = segments.reduce((total, item) => total && total[item], vm)
				// 必填
				if (ruleItem.required && !value) {
					reject(ruleItem.message)
				}
				// 正则
				if (ruleItem.pattern && !ruleItem.pattern.test(value)) {
					reject(ruleItem.message)
				}
			})
		})
		resolve(true)
	})
}
export {
	validateToast
}

```
rules.js
Object.freeze() 冻结对象
```js
const business_rules = Object.freeze({
	'business_information.company_name': [{
		required: true,
		message: '请输入企业名称'
	}],
	'business_information.social_credit_code': [{
			required: true,
			message: '请输入统一社会信用代码'
		},
		{
			pattern: /[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g,
			message: '社会信用代码不正确'
		}
	]
})
export {
	business_rules
}
```
```js
validateToast(this, business_rules).then((valid) => {
		console.log("valid", valid)
	}).catch((err) => {
		console.log("未通过校验",err)
		showToast(err)
})
```