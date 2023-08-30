---
title: hexo优化小寄巧
categories: 文章
summary: 各种美化心得
tags:
  - hexo
  - matery-pro
  - 美化
abbrlink: 7050
date: 2023-08-26 19:31:30
---
## 获取网站logo
>直接访问这个网址下载图标，格式为 `域名/favicon.ico`
## 修改主题颜色
>在主题文件的 `/source/css/matery.css` 文件中，搜索 `.bg-color` 来修改背景颜色：
```css
/* 整体背景颜色，包括导航、移动端的导航、页尾、标签页等的背景颜色. */
.bg-color {
    background-image: linear-gradient(to right, #4cbf30 0%, #0f9d58 100%);
}

@-webkit-keyframes rainbow {
   /* 动态切换背景颜色. */
}

@keyframes rainbow {
    /* 动态切换背景颜色. */
}
```
## 网站鼠标写法
>在主题的css文件夹中新建mouse.css，其中写入：
```
body {
    cursor: url(https://cdn.jsdelivr.net/gh/sviptzk/HexoStaticFile@latest/Hexo/img/default.cur),
        default;
}
a,
img {
    cursor: url(https://cdn.jsdelivr.net/gh/sviptzk/HexoStaticFile@latest/Hexo/img/pointer.cur),
        default;
}
```
>在头文件(head.ejs)中引入`<link rel="stylesheet" href="/css/mouse.css">`