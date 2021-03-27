# 东软微报修组件

## dr-table
:::tip
 表格高级组件 分为search opera table pager区进行维护
:::


### 参数说明
参数|说明|类型|可选|默认值|混入是否存在|
--|--|--|--|--|--|
pagination | 是否显示分页组件 | boolean | - | true|1
columns | 配置项 查看columns说明 | Array | - | []|0
dataSource| 同el-table data | Array | - | []|1
align | 表格对齐方式 0 左 1 中 2 右 | Number | 0 1 2 | 1 |0
loading | 表格loading | boolean | - | false |1
total | 分页总数 分页为false可不传 | number | - | 0|1
size | 每一页数量 分页为false可不传 | number | - | 15|1
tableHeightFixed | 是否对表格进行区域式滑动 | boolean | - | true|0
。。。| 其他参数el-table所有参数 |。。。|。。。|。。。| 0

### 事件
事件名|说明|参数|
--|--|--|
。。。| el-table所有事件|。。。

### columns说明
参数|说明|
--|--|
dataIndex | 字段标识
label | 标题
config | 对象与el-table-column配置相同（扩展）
slots | 插槽配置

### 插槽
name|说明|
--|--|
search| 搜索区域 使用el-form => el-row 进行使用保证响应式布局
opera | 按钮操作区域 使用el-button组进行操作
[...item...]| 基于columns dataIndex进行插槽

## BaseTableMixin
:::tip
配合组件进行混入使用 减少翻页 查询 新增 修改 删除 启用一系列重复操作
:::

使用必配置参数
值|说明|类型|
--|--|--|--|
commandList|查询table command|string
commandChange| 启用 停用 command| string
commandDel| 删除 使用接口 command | string
formPath| 跳转连接 携带id会以编辑状态 查询表单| string
copyName| 赋值路由name 会携带params| string

data参数
值|说明|类型|默认值|可重写|
--|--|--|--|--|
firstLoad|是否在组件mounted时进行table请求|boolean|true|1
dataSource|当前页表数据|Array|[]|1
tableLoading|table表格加载|boolean|false|1
page|当前页|number|1|0
size|每页数量|number|15|0
searchForm|查询form 携带的参数可以重写初始化|object|{}|1
initSearchForm|初始化表格时使用会在表格每一次查询时携带 重置的时候不会重置该参数|object|{}|1

methods
name|说明|参数|返回值|可重写|
--|--|--|--|--|
handleToggleLoading| toggle loading | boolean = true | - | 0
handleResetTable|重置按钮 重置searchForm的值|-|-|0
handleGetTable|刷新表单 会携带searchForm 及 initSearchForm进行搜索 commandList|-|-|0
handleSearchClick|搜索点击保存时使用 与上类似 会将page = 1 |-|-|0
handleChangeStatus|启用 停用 commandChange| row 行数据 useStatus = 'VALID' 相反修改的状态|-|0
handleDelById|根据id删除 commandDel|id 主键 row行数据|-|0
handleToFormPage|跳转至表单页 根据配置的formPath进行跳转|{string、 number} id 编辑时的id|-|0
handleToFormCopyPage|复制 根据配置的copyName进行跳转|{object} params 行数据|-|0
handleConfirmTip| 提示方法 |{string} tip 提示信息 {function} callback 确定后回调方法 |-|0

# BaseTableMixin
:::tip
表单保存混入
:::

使用必配置参数
值|说明|类型|
--|--|--|--|
commandFind|查询 command|string
commandSave|保存接口 新增修改使用一个command| string

data参数
值|说明|类型|默认值|可重写|
--|--|--|--|--|
formInfo|表单信息|object|{}|1
tableLoading|form加载|boolean|false|1
mainId|编辑时的id|number、 string|''|0
submitDisabled|按钮防抖处理|boolean|false|1
isAdd|是否为添加|boolean|false|0

methods
name|说明|参数|返回值|可重写|
--|--|--|--|--|
handleToggleBtnDisabled| toggle disabled | boolean = true | - | 0
handleCancelClick| router go -1 |- | - | 0
handleGetFormById|根据id查询表单数据|string、number|-|1
handleAcceptFile|上传附件接收|{string} key 附件存在标识、{string[] 、string} url 七牛路径|-|0
handleSubmitForm|保存表单 会根据当前formInfo触发保存接口 校验通过后会触发|-|-|0
handleBeforeGetForm|查询表单前 可以return一个对象进行请求|-|-|1
handleAfterGetForm|查询表单后 |-|-|1
handleBeforeSubmit|上传前提交|formInfo|-|1
handleSuccessForSave|保存成功回调|formInfo|-|1
