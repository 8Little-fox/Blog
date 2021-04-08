# 手封input组件

## 如何优雅的实现数据的双向绑定
```js
<PickerForm label="发票抬头" v-if="invoiceDisable" v-model="applicationList.ticket_title" />
```
PickerForm组件
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

