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

修改后 

```js
	<div class="flex-around_wrap_start">
		<div v-for="(item, index) of driveFriend" :key="index">
			<div class="flex-X-Xevenly" style="width: 300rpx;">
				<text :style="item.style" class="drivefriends-txt">{{ item.name }}</text>
				<text class="drivefriends-txt">{{ item.value }}</text>
			</div>
		</div>
	</div>
	
	computed: {
		driveFriend() {
			const { departure_at, gender_str, people_num, driving_experience, drive_friend_type, is_car } = this.squareDetaileList;
			return [
				// { name: "目的地：", value: attractions.name || "--" },
				{ name: "出发时间：", value: departure_at },
				{ name: "性别要求：", value: gender_str, style: { marginLeft: "125rpx" } },
				{ name: "人数要求：", value: `${people_num}人` },
				{ name: "车龄要求：", value: `${driving_experience}年`, style: { marginLeft: "125rpx" } },
				{ name: "同游类型：", value: drive_friend_type },
				{ name: "是否有车：", value: `${is_car === "yes" ? "有" : "无"}车`, style: { marginLeft: "125rpx" } }
			];
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
${变量}
```js
	<image :src="`${img}${title ==='绑定成功' ? 'zhuxiaochenggong@2x.png':'zhuxiaoshibai@2x.png'}`" mode="" class="cancell-success-img"></image>
	:class="`${title ==='绑定成功' ? 'cancell-success-img':'cancell-img'}`"
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

修改前
```js
<image :src="squareDetaileList.type === 'dynamic' ? '../static/icon/image/dt_dongtai@2x.png?imageView2/1/w/50/h/15' : '../static/icon/image/dt_jiayou@2x.png?imageView2/1/w/50/h/15'" mode="aspectFill" style="width: 92rpx;height: 32rpx;"></image>

```
修改后
```js
<image class="img" :src="`../static/icon/image/dt_${squareDetaileList.type === 'dynamic' ? 'dongtai' : 'jiayou'}@2x.png?imageView2/1/w/50/h/15`" mode="aspectFill" />
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
# computed
修改前
```js

<text v-if="item.pay_status === 0 && item.order_status===0" style="font-size: 26rpx;color: #57acfb;margin-bottom: 66rpx;">待付款</text>

```
修改后
```js
<text style="font-size: 26rpx;color: #57acfb;margin-bottom: 66rpx;">{{order_tatus}}</text>

order_tatus(){
	if(this.item.pay_status === 0 && this.item.order_status===0){
		return '待付款'
	}
}
```

修改前
```js
<div style="">
	<text style="font-size: 30rpx;color: #666666;margin-top: 33rpx;">1.每邀请一位好友注册成为云自驾</text>
	<text style="font-size: 30rpx;color: #666666;padding-left: 15rpx;">APP新用户，即可获得现金奖励。</text>
	<text style="font-size: 30rpx;color: #666666;margin-top: 33rpx;">2.现金奖励可以在钱包进行提现。</text>
	<text style="font-size: 30rpx;color: #666666;margin-top: 33rpx;">3.最终解释权归云自驾APP所有。</text>
</div>
```
修改后

```js
<div style="" v-for="item of list" :key="item">
	<text style="font-size: 30rpx;color: #666666;" :style="item.style">{{item.value}}</text>
</div>

computed:{
	list(){
		const MARGIN_TOP = { marginTop : '33rpx' }
			return [
				{value : '1.每邀请一位好友注册成为云自驾' , style:MARGIN_TOP},
				{value : 'APP新用户，即可获得现金奖励。' , style:{paddingLeft: '15rpx'}},
				{value : '2.现金奖励可以在钱包进行提现。' , style:MARGIN_TOP},
				{value : '3.最终解释权归云自驾APP所有。' , style:MARGIN_TOP}
			]
		}
	}
```
修改前
```js
		:style="{
				width: widthPx + 'px',
				height: widthPx + 'px',
				backgroundColor: bgColor
			}"
		<canvas
			class="canvas"
			:canvas-id="elId"
			:id="elId"
			:style="{
				width: widthPx + 'px',
				height: widthPx + 'px'
			}"
		></canvas>
```
修改后
```js
		:style="[styles,{backgroundColor: bgColor}]"
		<canvas
			class="canvas"
			:canvas-id="elId"
			:id="elId"
			:style="{ style }"
		></canvas>

		computed:{
			styles(){
				return {
						width: widthPx + 'px',
						height: widthPx + 'px'
					}
			}
	},
```

修改前 
```js
		changeSwiper(e) {
				this.current_index = e.detail.current;
				switch (this.current_index) {
					case 0:
						this.screenShow = false
						this.$emit("getSquare", "square")
						break;
					case 1:
						this.screenShow = true
						this.getLocation()
						this.$emit("getSquare", "nearby")
						break;
					case 2:
						this.getLocation()
						this.$emit('getSquare', "destination")
						break;
				}
			},
```
修改后
```js

			changeSwiper(e) {
				const arr = ['square' , 'nearby' , 'destination']
				const index = this.current_index = e.detail.current;
				[0,1].includes(index) && (this.screenShow === index === 1)
				if(index === 1 || index === 2){
					[1,2].includes(index) && this.getLocation()
				}
				this.$emit('getSquare',arr[index])
			},
```


修改前 
```js
		let param = {}
				if (this.type == 'been') {
					param = {
						travel_experiences_json: this.radioArr.map((id) => this.attractionsList.find((item) => item.id === id))
					}
				} else {
					param = {
						love_place_json: this.radioArr.map((id) => this.attractionsList.find((item) => item.id === id))
					}
				}
```
修改后
```js
let param = {
	[this.type == 'been' ? 'travel_experiences_json' : 'love_place_json'] : 
	this.radioArr.map((id) => this.attractionsList.find((item) => item.id === id))
	}
```
多级判断
修改前 
```js
		if (this.squareDetaileList.user.nick_name) {
			this.chooseName = this.squareDetaileList.user.nick_name;
		} else if (this.squareDetaileList.user.real_name) {
			this.chooseName = this.squareDetaileList.user.real_name;
		} else {
			this.chooseName = this.squareDetaileList.user.phonenum;
		}
```
修改后
```js
	const { nick_name, real_name, phonenum: phonenumStr } = res.data;
	this.chooseName = nick_name || real_name || phonenum(phonenum);

```
## async
修改前
```js
 handleDept () {
		request.setPath('/api/dept', true).get({ enabled: true }).then(res => {
			this.deptsList = res.content.map(item => {
				if (item.hasChildren) {
					item.children = null
				}
				return item
			})
		})
	},
	loadDepts ({ action, parentNode, callback }) {
		if (action === LOAD_CHILDREN_OPTIONS) {
			request.setPath('/api/dept', true).get({ enabled: true, pid: parentNode.id }).then(res => {
				parentNode.children = res.content.map(function (obj) {
					if (obj.hasChildren) {
						obj.children = null
					}
					return obj
				})
				setTimeout(callback, 200)
			})
		}
	},
```
修改后
将公共的部分提出去
```js
  async handleGetDept(pid = '') {
		const res = await request.setPath('/api/dept', true).get({ enabled: true, pid })
		return res.content.map(item => {
			if (item.hasChildren) {
				item.children = null
			}
			return item
		})
	},
	async handleDept() {
		this.deptsList = await this.handleGetDept()
	},
	async loadDepts({ action, parentNode, callback }) {
		if (action === LOAD_CHILDREN_OPTIONS) {
			parentNode.children = await this.handleGetDept(parentNode.id)
			setTimeout(callback, 200)
		}
	},
```
修改前
```js
const slotsScoped = slots ? {
  scopedSlots: {
    default: (scope) => slotsFn({ ...scope, value: scope.row[dataIndex] })
  }
} : dict && {
  scopedSlots: {
    default: (scope) => (<span>{ dicts[dict][String(scope.row[dataIndex])]}</span>)
  }
}
```
修改后

```js
const slotsScoped = (slots || dict) && {
  scopedSlots: {
    default: (scope) => {
      const value = scope.row[dataIndex]
      return slots ? slotsFn({ ...scope, value }) : (<span>{ dicts[dict][String(value)]}</span>)
    }
  }
}
```

## Vuex存省市区

```js
async getNewCity() {
	this.loading = true;
	try {
		let cityList = [];
		// 如果Vuex中有存储
		const { data } = await CommonApi.getCity({ type: this.selectType });
		this.$store.commit('common/M_COMMON_SET_CITYLIST', [...data]);
		cityList = data;

		if (this.isWholeCountry) {
			cityList.unshift({ id: 0, name: '全国' });
		}
		this.options = cityList;
	} catch (error) {
		this.$message.error(error.data?.message || '服务器错误');
	}
	this.loading = false;
},

```
store
```js
export default {
	state: {
		cityList: []  // 省市列表
	},
	mutations: {
		[M_COMMON_SET_CITYLIST](state, cityList) {
			state.cityList = cityList;
   	}
	}
}
```

## 选中状态切换

```html
<div @click="handlerBtn(1)" :class="['order-btn', {'order-btn-active': type === 1}]">A</div>
<div @click="handlerBtn(2)" :class="['order-btn', {'order-btn-active': type === 2}]">B</div>
<div @click="handlerBtn(3)" :class="['order-btn', {'order-btn-active': type === 3}]">C</div>
handlerBtn(val) {
	this.type = val
}
```
```css
  .order-btn {
    width: 150px;
    height: 30px;
    cursor: pointer;
    border: 1px solid #d9d9d9;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    transition: background-color 0.1s linear, color 0.1s linear;
  }
  .order-btn-active:hover {
    background-color: #1890ff;
    color: #ffffff;
  }
  .order-btn-active {
    background-color: #1890ff;
    color: #ffffff;
  }
```