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
          title: '前端基础知识',
          collapsable: true,
          children: [
            'html/es',
            'html/tools',
            'html/vue',
            'html/Vuex',
            'html/Pinia',
            'html/test',
            'html/problems',
            // 'html/iptForm',
            'html/uniapp'
          ]
        }
      ]
    }
  }
}