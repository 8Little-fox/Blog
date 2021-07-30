# 终端常用命令
## 命令
1、pwd 查看当前完整路径；

2、ls 查看当前目录下的文件（不包括隐藏文件）；

3、ls -a 查看当前目录下所有文件（包括隐藏文件）；

4、ls -al 查看当前目录下所有文件的详细信息；

5、touch readme.md 创建readme.md文件；

6、rm readme.md 删除readme.md文件（不能删除文件夹）；

7、rm -rf node_modules 删除node_modules文件夹，不提示（强制删除）；

8、mv readme.md README.md 将readme.md文件重命名为README.md文件

9、mkdir projects 创建文件夹projects；

10、cd / cd~根目录；

11、pwd 家目录

12、cd ..上级目录

13、cp a.js a1.js   将a.js 拷贝 a1.js

14、grep 'babel' index.js   在index.js 中查找关键字'babel'

## 编辑器Vim

i 进入编辑模式

键盘左上角esc 进入命令命令模式

vi a.js  创建文件并打开

:wq 保存退出

:q! 不保存强制退出

## git 提交规范

* 主要type

feat:     增加新功能

fix:      修复bug

* 特殊type

docs:     只改动了文档相关的内容

style:    不影响代码含义的改动，例如去掉空格、改变缩进、增删分号

build:    构造工具的或者外部依赖的改动，例如webpack，npm

refactor: 代码重构时使用

revert:   执行git revert打印的message

* 暂不使用type
test:     添加测试或者修改现有测试

perf:     提高性能的改动

ci:       与CI（持续集成服务）有关的改动

chore:    不修改src或者test的其余修改，例如构建过程或辅助工具的变动
