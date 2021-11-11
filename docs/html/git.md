# git 代码提交规范

* 为了保证代码质量，大部分前端项目会在 git commit 时候进行 lint 校验。使用的是 husky 与lint-staged 两个包来实现

使用commitizen来执行规范

全局安装commitizennode模块

npm install -g commitizen

sudo yarn add commitizen@4.2.4.    git提交规范化工具

sudo yarn add cz-customizable@6.3.0 --save-dev   

yarn init --yes

配置提交限制：

新建 .cz-config.js

```js
module.exports = {
  // 可选类型
  types: [
    { value: 'feat', name: 'feat: 新功能' },
    { value: 'fix', name: 'fix: 修复' },
    { value: 'docs', name: 'docs: 文档变更' },
    { value: 'style', name: 'style: 代码格式' },
    { value: 'refactor', name: 'refactor: 重构' },
    { value: 'pref', name: 'pref: 性能优化' },
    { value: 'test', name: 'test: 新增测试' },
    { value: 'chore', name: 'chore: 构建过程或辅助工具的变更' },
    { value: 'revert', name: 'revert: 回退' },
    { value: 'build', name: 'build: 打包' }
  ],
  // 步骤
  message: {
    type: '请选择提交的类型',
    customScope: '请输入修改的范围（可选）',
    subject: '请简要描述提交（必填）',
    body: '请输入详细描述（可选）',
    footer: '请输入要关闭的issue(可选)',
    confirmCommit: '确定要使用以上信息提交？（Y/N）'
  },
  //跳过步骤
  skipQuestion: ['body', 'footer']
  // subjectLimit: 72
}

```
替换commit进行提交：

git cz  

查看提交日志：

git log 



安装 husky：

npx husky install

用于检查提交信息：

npx husky add .husky/commit-msg 'npx --no-install commitlint --edit '$1'' 

git hooks 钩子：

npx husky add .husky/pre-commit "npx eslint --ext .js,.vue src”

修改Package.json :
检查本次提交更新的代码，并在出错误的时候，自动修复并且推送

```js
  "lint-staged": {。
    "src/**/*.{js,vue}":[
      "eslint --fix",
      "git add"
    ]
  },
```

pre-commit:

npx eslint --ext .js,.vue src -> npx lint-staged

时会自动检验代码并将不合规的代码代码进行自动修复:

git cz 