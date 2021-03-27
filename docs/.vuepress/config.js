module.exports = {
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
            'html/test'
          ]
        }
      ]
    }
  }
}