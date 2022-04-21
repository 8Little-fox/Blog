# dayjs 基础使用

## 日期-转年月日格式
```js
const date = '2020-04-04 22:30';
console.log(dayjs(date).format('YYYY[年]M[月]D[日] HH:mm'));
//2020年4月4日 22:30
```