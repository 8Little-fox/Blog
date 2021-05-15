# 布局

面试中几种常考的布局方式
利用布局，可优先渲染主页部分
## 圣杯布局

圣杯布局的要求
* header和footer各自占领屏幕所有宽度，高度固定。
* 中间的container是一个三栏布局。
* 三栏布局两侧宽度固定不变，中间部分自动填充整个区域。
* 中间部分的高度是三栏中最高的区域的高度。

```html
  <div class="header">header</div>
    <div class="bd">
        <div class="main">
            main
        </div>
        <div class="left">
            left
        </div>
        <div class="right">
            right
        </div>
    </div>
    <div class="footer">footer</div>
```
```css
 .header{
            background: cornsilk;
            width: 100%;
            height: 50px;
        }
        .footer{
            background: cornsilk;
            width: 100%;
            height: 50px;
        }
        .bd{
            padding: 0 200 0 200px;
            height: 100px;
        }
        .main{
            float: left;
            background-color: olive;
            width: 100%;
            height: 100px;
        }
        .left{
            border: orange;
            background-color: rgb(33, 63, 196);
            float: left;
            height: 100px;
            width: 200px;
            margin-left: -100%; 
        }
        .right{
            background-color: rgb(218, 30, 146);
            float: left;
            height: 100px;
            width: 200px;
            margin-left: -200px;
        }

```