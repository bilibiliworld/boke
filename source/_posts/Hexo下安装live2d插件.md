---
title: Hexo下安装live2d插件
categories: 文章
summary: 其实很简单的，而且效果还好
top: true
tags:
  - Hexo
  - live2d
  - matery-pro
abbrlink: 10824
date: 2023-08-23 23:06:16
---
先cd到hexo主题的source文件夹下，执行
```bash
git submodule add https://github.com/stevenjoezhang/live2d-widget.git live2d-widget
```
找到/主题/source/live2d-widget/autoload.js 并打开 autoload.js
```js
#注释或删除下面代码
const live2d_path = "https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget/";
#解开下面代码
const live2d_path = "/live2d-widget/";
```
在/主题/layout/layout.ejs文件（后缀可能不同）里，找到head标签（没有就加在body标签的前面），添加下面代码
```css
<link rel="stylesheet" href="https://npm.elemecdn.com/font-awesome/css/font-awesome.min.css"/ media="defer" onload="this.media='all'">
```
在body 标签中间添加下面代码
```css
<script defer src="/live2d-widget/autoload.js"></script>
```
保存后重新启动就可以了
```bash
hexo clean
hexo g
hexo s
```
记得上传github前要先`git submodule update --init --recursive`，详情可以参考{% post_link 问题检索简易指南 'github添加子模块'%}

另外可以尝试更换cdnpath，因为jsdelivr不支持50MB以上的包的加速，可能报403错误，所以更换为vercel的CDN服务。
找到/主题/source/live2d-widget/autoload.js，修改下面代码
```js
cdnPath: "https://cdn.jsdelivr.net/gh/fghrsh/live2d_api/"
```
改成
```js
cdnPath: "https://npm.elemecdn.com/akilar-live2dapi@latest/"
```
