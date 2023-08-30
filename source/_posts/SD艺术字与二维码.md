---
title: SD艺术字与二维码
abbrlink: 45413
date: 2023-08-29 19:55:51
summary: SD生成个性二维码
cover: true
tags:
  - ai绘画
  - 二维码
---
## SD艺术字
1. 使用ps生成白底黑字的png文件
2. 拖到controlnet中，预处理器为midas，模型为depth
3. 输入正反提示词，如：
```
high quality,highres,masterpiece,soild background,
flower,dappled sunlight,from above, bunch of flowers,outdoors,grasslands, from above
```
![](https://cdn.jsdelivr.net/gh/bilibiliworld/picgo/%E2%80%9C%E7%89%9B%E9%80%BC%E2%80%9D%E7%9A%84%E6%95%99%E7%A8%8B%E6%9D%A5%E4%BA%86%EF%BC%81%E4%B8%80%E6%AC%A1%E5%AD%A6%E4%BC%9AAI%E4%BA%8C%E7%BB%B4%E7%A0%81+%E8%89%BA%E6%9C%AF%E5%AD%97+%E5%85%89%E5%BD%B1%E5%85%89%E6%95%88+%E5%88%9B_0.png)
![](https://cdn.jsdelivr.net/gh/bilibiliworld/picgo/%E2%80%9C%E7%89%9B%E9%80%BC%E2%80%9D%E7%9A%84%E6%95%99%E7%A8%8B%E6%9D%A5%E4%BA%86%EF%BC%81%E4%B8%80%E6%AC%A1%E5%AD%A6%E4%BC%9AAI%E4%BA%8C%E7%BB%B4%E7%A0%81+%E8%89%BA%E6%9C%AF%E5%AD%97+%E5%85%89%E5%BD%B1%E5%85%89%E6%95%88+%E5%88%9B_1.png)

## 光影艺术字
1. 同上
2. 拖到controlnet中，预处理器为invert(修改为无则字体会表现为阴影)，模型为[brightness](https://huggingface.co/ioclab/ioc-controlnet/tree/main/models),控制权重0.5，介入时机0.1，终止时机0.8
![](https://cdn.jsdelivr.net/gh/bilibiliworld/picgo/%E2%80%9C%E7%89%9B%E9%80%BC%E2%80%9D%E7%9A%84%E6%95%99%E7%A8%8B%E6%9D%A5%E4%BA%86%EF%BC%81%E4%B8%80%E6%AC%A1%E5%AD%A6%E4%BC%9AAI%E4%BA%8C%E7%BB%B4%E7%A0%81+%E8%89%BA%E6%9C%AF%E5%AD%97+%E5%85%89%E5%BD%B1%E5%85%89%E6%95%88+%E5%88%9B_7.png "介入时机对比")
3. 输入正反提示词，如：
```正向
best quality,masterpiece,(photorealistic:1.4),1girl,dramatic lighting,full body,indoors,dappled sunlight,sunlight,clothed 
``` 
```反向
nsfw,ng_deepnegative_v1_75t,badhandv4,(worst quality:2), (low quality:2), (normal quality:2),lowres,watermark,monochrome 
```
4. 使用[illumination](https://huggingface.co/ioclab/ioc-controlnet/tree/main/models)模型光影会更自然，权重可以相对提高一些：
![](https://cdn.jsdelivr.net/gh/bilibiliworld/picgo/%E2%80%9C%E7%89%9B%E9%80%BC%E2%80%9D%E7%9A%84%E6%95%99%E7%A8%8B%E6%9D%A5%E4%BA%86%EF%BC%81%E4%B8%80%E6%AC%A1%E5%AD%A6%E4%BC%9AAI%E4%BA%8C%E7%BB%B4%E7%A0%81+%E8%89%BA%E6%9C%AF%E5%AD%97+%E5%85%89%E5%BD%B1%E5%85%89%E6%95%88+%E5%88%9B_8.png "不同权重对比")
5. 可以使用多个unit，其中openpose控制人物姿势，illumination控制文字光影，可以在ps中调整重叠位置使文字生成在衣服上。

## 特殊二维码
可以使用brightness来进行生成，配置如下图所示：
![](https://cdn.jsdelivr.net/gh/bilibiliworld/picgo/%E2%80%9C%E7%89%9B%E9%80%BC%E2%80%9D%E7%9A%84%E6%95%99%E7%A8%8B%E6%9D%A5%E4%BA%86%EF%BC%81%E4%B8%80%E6%AC%A1%E5%AD%A6%E4%BC%9AAI%E4%BA%8C%E7%BB%B4%E7%A0%81+%E8%89%BA%E6%9C%AF%E5%AD%97+%E5%85%89%E5%BD%B1%E5%85%89%E6%95%88+%E5%88%9B_10.png)
[qrcode](https://huggingface.co/monster-labs/control_v1p_sd15_qrcode_monster/tree/main)模型是一个专门用于生成二维码的模型，控制权重一般要在1.5以上，分辨率至少为768*768，也可以配合brightness来生成，此时权重需要适当降低

成果(未完善)：
![](https://cdn.jsdelivr.net/gh/bilibiliworld/picgo/00066-647753063-The%20stunning%20colors%20of%20an%20award%20winning,%20globally%20acclaimed%20RAW%20photo%20titled%20'Enchanted%20Skies',%20the%20photo%20depicts%20A%20mesmerizing.png)