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
      { text: '首页', link: '/' },
      { text: 'Gitee', link: 'https://gitee.com/ll3462540450/projects' },
      { text: 'GitHub', link: 'https://github.com/8Little-fox/Blog' },
    ],
    sidebar: {
      '/html': [
        {
          title: '前端基础知识',
          collapsable: false,
          children: [
            'html/problems',
            'html/wx',
            'html/es',
            'html/tools',
            'html/explorer',
            'html/vue',
            'html/vue3.0',
            'html/Vuex',
            'html/Pinia',
            'html/test',
            'html/git',
            'html/node',
            // 'html/iptForm',
            'html/uniapp',
            'html/projectReplay',
          ]
        },
      ]
    }
  }
}