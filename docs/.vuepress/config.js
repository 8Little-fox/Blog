/*
 * @Author: your name
 * @Date: 2021-03-27 21:28:29
 * @LastEditTime: 2021-03-31 12:51:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sll-blog\docs\.vuepress\config.js
 */
module.exports = {
  base: '/blog/',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' }
    ],
    sidebar: {
      '/html': [
        {
          title: '测试',
          collapsable: true,
          children: [
            ['html/', 'test'],
            'html/test',
            'html/problems',
            'html/vuex'
          ]
        }
      ]
    }
  }
}