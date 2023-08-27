---
title: Onedrive文件夹删除
categories: 文章
summary: 先取消链接，再修改注册表
tags:
  - Onedrive
  - 注册表
abbrlink: 26851
date: 2023-08-24 09:16:05
---
## 一、取消 OneDrive 账户与电脑的链接
1. 点击桌面左下角要取消链接的 OneDrive 图标。
![](https://cdn.jsdelivr.net/gh/bilibiliworld/picgo/v2-2e7880ddb820893af6bdf7364faf377b_r.jpg)
2. 点击“帮助&设置”，在弹出的菜单点击“设置”，进入设置页面。
![](https://cdn.jsdelivr.net/gh/bilibiliworld/picgo/1.png)

![](https://cdn.jsdelivr.net/gh/bilibiliworld/picgo/3.png)
3. 点击“取消链接此电脑”。
![](https://cdn.jsdelivr.net/gh/bilibiliworld/picgo/4.png)
4. 在弹出的提示框中再次确定即可取消 OneDrive 与电脑的链接。
![](https://cdn.jsdelivr.net/gh/bilibiliworld/picgo/5.png)
## 二、在注册表编辑器中寻找并修改此 OneDrive 账户对应的注册表信息
1. 按住键盘上的“Windows”+“R”，弹出“运行”窗口。在输入框中输入“**regedit**"，点击“确定”，进入注册表编辑器。
![](https://cdn.jsdelivr.net/gh/bilibiliworld/picgo/6.jpg)
2. 在注册表编辑器左侧，找到“**计算机\HKEY_CLASSES_ROOT\CLSID**”（也可以直接复制引号中的地址，将注册表编辑器上方地址栏清空后粘贴过去，再点击回车）。
![](https://cdn.jsdelivr.net/gh/bilibiliworld/picgo/7.jpg)
3. 按住键盘上的“Ctrl”+“F”，在弹出页面的搜索框中输入要删除的 OneDrive 文件夹名，注意不要少打空格。如下图所示。
![](https://cdn.jsdelivr.net/gh/bilibiliworld/picgo/8.webp)
>比如要删除这个文件夹
![](https://cdn.jsdelivr.net/gh/bilibiliworld/picgo/9.jpg)
>就要输入 “OneDrive - 徐州开放大学”
![](https://cdn.jsdelivr.net/gh/bilibiliworld/picgo/10.jpg)
>然后点击“查找下一个”
4. 将查找到的 OneDrive 账户注册表信息的第三项的数值修改为“0”
![](https://cdn.jsdelivr.net/gh/bilibiliworld/picgo/11.jpg)
>双击这一项
![](https://cdn.jsdelivr.net/gh/bilibiliworld/picgo/14.jpg)
>将此处修改为“0”
![](https://cdn.jsdelivr.net/gh/bilibiliworld/picgo/12.jpg)
>最后点击“确定”
## 三、回到文件资源管理器，发现左侧目标 OneDrive 文件夹已消失。重启电脑即可。
![](https://cdn.jsdelivr.net/gh/bilibiliworld/picgo/13.webp)

---
参考教程[如何删除文件资源管理器左侧的 OneDrive 文件夹](https://zhuanlan.zhihu.com/p/179299395)，这边只是转载了他的方法