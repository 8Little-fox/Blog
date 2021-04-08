# 确保脚本抛出遇到的错误
###
 # @Author: your name
 # @Date: 2021-03-27 21:28:29
 # @LastEditTime: 2021-03-27 21:45:32
 # @LastEditors: Please set LastEditors
 # @Description: In User Settings Edit
 # @FilePath: \sll-blog\relase.sh
### 
set -e

git add .

git commit -m 'update page'

git push

yarn docs:build

cd docs/.vuepress/dist

git init

git add .

git commit -m '版本改变'

git config user.name sll

git config user.email 3462540450@qq.com

git push -f https://gitee.com/ll3462540450/blog.git master:gh-pages

cd -