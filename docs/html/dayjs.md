# dayjs 基础使用
## 日期-转年月日格式
```js
const date = '2020-04-04 22:30';
console.log(dayjs(date).format('YYYY[年]M[月]D[日] HH:mm'));
// 当前日期转年月日
dayjs(`${new Date()}`).format('YYYY-MM-DD HH:mm:ss');
//2020年4月4日 22:30
```
## 日期-转时间戳
```js
const date = '2020-04-04 22:30';
console.log('*****', dayjs(date).valueOf());
// 1586010600000
```

## 时间戳-转日期
```js
:: date必须是数字类型
const date = 1586010600000;
console.log('*****', dayjs(date)..format('YYYY-MM-DD HH:mm'));
//2020-04-04 22:30
```

## 两段日期倒计时 （十分秒格式）
```js 
  getTimeStr(helpDate) {
    const startTime = dayjs(`${new Date()}`).format('YYYY-MM-DD HH:mm:ss');
    const endTime = '2022-06-16';
    const start = new Date(startTime.replace(/-/g, '/')).getTime();
    const end = new Date(endTime.replace(/-/g, '/')).getTime();

    const difference = end - start; // 时间差的毫秒数
    // const days = Math.floor(difference / (24 * 3600 * 1000)); // 计算出相差天数
    const leave1 = difference % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
    const hours = (`00${Math.floor(leave1 / (3600 * 1000))}`).slice(-2); // 计算相差分钟数
    const leave2 = leave1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
    const minutes = (`00${Math.floor(leave2 / (60 * 1000))}`).slice(-2); // 计算相差秒数
    const leave3 = leave2 % (60 * 1000); // 计算分钟数后剩余的毫秒数
    const seconds = (`00${Math.round(leave3 / 1000)}`).slice(-2);
    return hours + minutes + seconds;
  },
```