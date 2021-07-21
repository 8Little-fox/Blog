# 手封组件
啥也不用改直接拿来用就可以了
##  手封 input 组件
如何优雅的实现数据的双向绑定
```js
<PickerForm label="发票抬头" v-if="invoiceDisable" v-model="applicationList.ticket_title" />
```
PickerForm组件

::: details

```js
	<div class="divModel">
			<div class="divModel_div">
				<div class="flex-X-Xevenly">
					<text v-if="fill_show" style="color: red;">*</text>
					<text style="font-size: 30rpx;">{{label}}</text>
				</div>
				<slot>
					<div class="flex-X-Ycenter">
						<input style="width: 208px;font-size: 30rpx;text-align: right;" placeholder="请填写"
							placeholder-style="color: #333333;" v-model="currentValue" />
					</div>
				</slot>
			</div>
		</div>
```
:::

::: details
```js
	export default {
		props: {
			label: {
				type: String,
				default: ''
			},
			value: {
				type: [String, Number],
				default: ''
			},
			//必填符号是否显示
			fill_show: {
				type: Boolean,
				default: true,
			}
		},
		computed: {
			currentValue: {
				get() {
					return this.value
				},
				set(val) {
					this.$emit('input', val)
				}
			}
		}
	}
```
:::

##  手封底部弹窗

::: details

``` vue
<template>
	<uni-popup ref="popup_com" type="share" @change="change">
		<view class="popup-container">
			<scroll-view :scroll-y="true" class="popup-scroll-view">
				<slot />
			</scroll-view>
		</view>
	</uni-popup>
</template>
<script>
export default {
	props: {
		value: {
			default: false
		}
	},
	watch: {
		value(nv) {
			nv ? this.open() : this.close()
		}
	},
	methods: {
		change(e) {
			this.$emit('input', e.show)
		},
		open() {
			this.$refs.popup_com.open()
		},
		close() {
			this.$refs.popup_com.close()
		}
	}
}
</script>

<style scoped>
.popup-container {
	background-color: #fff;
	border-radius: 30rpx;
	padding: 30rpx;
}

.popup-title {
	font-weight: bold;
	margin: 15rpx 0;
}

.popup-scroll-view {
	/* height: 800rpx; */
	padding-right: 10rpx;
}

.make-sure-btn {
	background-color: #57ACFB;
	color: #fff;

	width: 600rpx;
	border-radius: 10rpx;
	font-size: 32rpx;
	color: #fff;
	text-align: center;
	line-height: 90rpx;

	margin-left: 45rpx;
	margin-top: 15rpx;
}
</style>

```


 引用组件：popup_show 控制组件显示隐藏
``` js 
	<PropBottom v-model="popup_show" title="自定义标签">
			<div style="height: 800rpx;">
				//详细内容
			</div>
	</PropBottom>

```
:::
## 手封picker 组件

::: details

`chooseIndex: 0`  默认选中pickcer 的第一个元素
``` vue
<template>
	<uni-popup ref="popup_com" @change="change">
		<view class="popup-container">
			<div class="popup-container-header">
				<text @click="close" class="popup-container-btn" style="color: #747474;">取消</text>
				<text @click="changeOk" class="popup-container-btn" style="color: #246ef7;">完成</text>
			</div>
			<scroll-view :scroll-y="true" style="height: 400rpx;">
				<picker-view indicator-style="height: 68rpx;" :value="chooseIndex" @change="bindChange"
					class="picker-view">
				<slot />
				</picker-view>
			</scroll-view>
		</view>
	</uni-popup>
</template> 
<script>
	export default {
		props: ['value','pickArray'],
		data(){
			chooseIndex:0
		},
		watch: {
			value(nv) {
				nv ? this.open() : this.close()
			}
		},
		methods: {
			change(e) {
				this.$emit('input', e.show)
			},
			open() {
				this.$refs.popup_com.open()
			},
			close() {
				this.$refs.popup_com.close()
			},
			changeOk(){
				const { chooseIndex } = this 
				this.$emit('pickChange', this.pickArray[chooseIndex ? chooseIndex : 0])
				this.$refs.popup_com.close()
			},
			bindChange(e) {
				this.chooseIndex = e.detail.value
				// console.log("picker-view发送选择改变，携带值为: ",e);
			}
		}
	}
</script>

<style scoped>
	.popup-container {
		background-color: #ffffff;
	}

	.popup-container-header {
		flex-direction: row;
		justify-content: space-between;
		background-color: #e6e6e6;
		height: 80rpx;
		padding: 0 20rpx;
	}

	.popup-container-btn {
		font-size: 32rpx;
		line-height: 80rpx;
	}
	
	.picker-view {
		width: 750rpx;
		height: 400rpx;
	}
</style>

```
:::

* 如何使用picker

index.vue

::: details


``` vue
<template>
	<div>
		<PickerList v-model="sex_typeList_show" :pickArray="sex_typeList" @pickChange="changeScreensex_typeList">
			<picker-view-column>
				<view class="item" v-for="(item,index) in sex_typeList" :key="index">{{item.name}}</view>
			</picker-view-column>
		</PickerList>
	</div>
</template>

<script>
	import PickerList from '../components/PickerList.nvue'
	export default {
		components: {
			PickerList
		},
		data() {
			return {
				sex_type: [], //性别要求
				sex_typeList_show:false,
				sex_typeList: [{
						name: "男",
						id: 'male'
					},
					{
						name: "女",
						id: "female"
					},
					{
						name: "男女均可",
						id: "privary"
					}
				]
			}
		},
		methods: {
			// 性别要求
			changeScreensex_typeList(e) {
				this.sex_type = e
			}
		}
	}
</script>

<style>
	.item {
		height: 68rpx;
		font-size: 20rpx;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
</style>

```
:::

## 中间弹窗
::: details

``` vue
<template>
	<uni-popup ref="Popdialog" :type="center" :animation="true">
		<div class="cancelled-pop">
			<div class="flex-Y-XYcenter">
				<text style="font-size: 34rpx;color: #000000;margin-top: 40rpx;">{{title}}</text>
				<text style="font-size: 30rpx;color: #666666;margin: 33rpx;">{{value}}</text>
			</div>
			<div class="cancell-line"></div>
			<div class="flex-X-Xaround-Ycenter">
				<text style="color: #666666;font-size: 30rpx;line-height: 44rpx;margin-top: 30rpx;"
					@click="cancel">取消</text>
				<text style="font-size: 30rpx;color: #57acfb;line-height: 44rpx;margin-top: 30rpx;"
					@click="submit">确认</text>
			</div>
		</div>
	</uni-popup>
</template>

<script>
	import uniPopup from '../../components/uni-popup/uni-popup'
	export default {
		components:{
			uniPopup
		},
		props: {
			title: {
				type: String,
				default: ''
			},
			value: {
				type: String,
				default: ''
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			popopen(){
				this.$refs.Popdialog.open();
			},
			submit(){
				this.$refs.Popdialog.close();
				this.$emit("gounind")
			},
			cancel(){
				this.$refs.Popdialog.close();
			}
		}
	}
</script>

<style scoped>
	.popdialog {
		width: 750rpx;
		opacity: 0.3;
		background-color: #000000;
	}
	.cancelled-txt{
		margin-top: 10rpx;
	}
	.cancelled-pop{
		margin-top: 100rpx;
		width: 574rpx;
		height: 346rpx;
		opacity: 1;
		background-color: #ffffff;
		border-radius: 20rpx;
	}
	.cancell-line{
		width: 574rpx;
		height: 1rpx;
		opacity: 1;
		background-color: #eaeaea;
	}
</style>

```

index.vue 
``` js
	<Popdialog ref="is_Popdialog" title="账号注销" value="注销账号后，您将不能查询该账号的相 关订单，账户余额也将无法提现，确定注销该账号么？"></Popdialog>

	this.$refs.is_Popdialog.popopen();  打开弹窗
```
:::
## 时间选择器
PickerTimer.nvue

::: details

```js
<template>
	<div>
		<uni-popup ref="popup_com" type="share" @change="change">
			<view class="popup-container">
				<div class="popup-container-header">
					<text @click="close" class="popup-container-btn" style="color: #747474;">取消</text>
					<text @click="changeOk" class="popup-container-btn" style="color: #246ef7;">完成</text>
				</div>
				<scroll-view :scroll-y="true" class="popup-scroll-view">
						<PickerList title="自定义标签" img="">
							<picker-view  :indicator-style="indicatorStyle" :value="date_index" @change="bindChange"
								class="picker-view">
								<picker-view-column>
									<view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
								</picker-view-column>
								<picker-view-column>
									<view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
								</picker-view-column>
								<picker-view-column>
									<view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
								</picker-view-column>
							</picker-view>
						</PickerList>
					<picker-view />
				</scroll-view>
			</view>
		</uni-popup>
	</div>
</template>
<script>
export default {
	props: {
		value: {
			default: false
		}
	},
	data(){
		const years = []
		const months = []
		const days = []
		for (let i = 221; i <= new Date().getFullYear() + 20; i++) {
			years.push(i)
		}
		for (let i = 0; i <= 12; i++) {
			months.push(i)
		}
		for (let i = 0; i <= 31; i++) {
			days.push(i)
		}
		return {
			title: 'picker-view',
			years,
			months,
			days,
			date_value:`${new Date().getFullYear()+'年'}${new Date().getMonth()+1+'月'}${new Date().getDate()+'日'}`,
			date_index: [new Date().getFullYear() - 221,new Date().getMonth()+1,new Date().getDate()],
			indicatorStyle: `height: 50px;`
		}
	},
	watch: {
		value(nv) {
			nv ? this.open() : this.close()
		}
	},
	methods: {
		change(e) {
			this.$emit('input', e.show)
		},
		open() {
			this.$refs.popup_com.open()
		},
		close() {
			this.$refs.popup_com.close()
		},
		changeOk() {
			
			this.$emit('dataChange',this.date_value)
			this.$refs.popup_com.close()
		},
		bindChange(e) {
			const { years, months, days } = this
			this.date_index = e.detail.value
			const current_data = e.detail.value
			const date = [
				years[current_data.[0]],
				months[current_data.[1]],
				days[current_data.[2]],
			]
			this.date_value = `${date.[0]+'年'}${date.[1]+ '月'}${date.[2]+'日'}`
		}
	}
}
</script>

<style scoped>
	.popup-container {
		background-color: #ffffff;
	}

	.popup-container-header {
		flex-direction: row;
		justify-content: space-between;
		background-color: #e6e6e6;
		height: 80rpx;
		padding: 0 20rpx;
	}

	.popup-container-btn {
		font-size: 32rpx;
		line-height: 80rpx;
	}
	.picker-view {
		width: 750rpx;
		height: 600rpx;
		margin-top: 20rpx;
	}
	
	.item {
		height: 50px;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
</style>

```
```js
<picker-timer v-model="is_current_date" @dataChange="(e) => {strategy.travel_at = e}"></picker-timer>
```
:::


