---
title: AI绘画原理
summary: 原理解读和实例示范
categories: 文章
top: true
cover: true
tags:
  - ai绘画
  - 教程
abbrlink: 51136
date: 2023-08-30 08:20:02
---
## ai生成图片原理
ai生成图片包含两个部分：**蓝色的用于理解描述的自然语言处理器**和**红色的用于生成结果的生成器**。
![](https://cdn.jsdelivr.net/gh/bilibiliworld/picgo/72bd6e6390402c676cf053a8b519ee7efdcfedb8.png@1256w_520h_!web-article-pic.webp)
在自然语言处理部分，它将我们输入的文本转换为数字表示，也就是蓝色的部分。对于不同的文本，其转换为的数字量也有区别，这就是显示在我们输入框右下角的输入量。
![](https://cdn.jsdelivr.net/gh/bilibiliworld/picgo/7106bdf89a5b540a37565d98a51c17dc7d617e48.png@1256w_764h_!web-article-pic.webp)
被蓝色的自然语言处理器解析后的输入表述会通过CLIP网络结合图像，以数组的形式保存下来，即下图中蓝色方格的token embedding。
![](https://cdn.jsdelivr.net/gh/bilibiliworld/picgo/4b600b6cc5a2f55d39696dc8c1c87dfea9ba369c.png@1256w_484h_!web-article-pic.webp)
CLIP网络就是理解tags如何被写入模型的关键点。下图就是CLIP网络在训练过程中是如何将tags与图像进行结合的。
![](https://cdn.jsdelivr.net/gh/bilibiliworld/picgo/e6cd2d8d0f051458ca573dba370fcef638232ee7.png@1256w_782h_!web-article-pic.webp)
输入的文字描述和图片将会经过两个不同的Encoder(神经网络)进行编码，形成两串数组。在CLIP中，它们将进行对比训练，从而将文本和图片一一对应上。这个过程就是训练这两个Encoder，之后这两个Encoder会在text2img和img2text中发挥作用。
![](https://cdn.jsdelivr.net/gh/bilibiliworld/picgo/56549f0bd1016219dfe01c0fb0ed4075b4ba2f68.png@1256w_906h_!web-article-pic.webp)
在上图第一部分中，Encoder会**有顺序地**一个个编码输入的tags，然后根据相关性计算找到最接近原意的token。
每一组输入词会形成一个token集合，这个集合可以看作一个数组。在上图的第二部分中，这个token数组将与高斯噪声融合，经过**红色的图像生成器**，生成一个图块。如果tags很长，就会有多个这样的token组，每一组生成图块后，就进行下一组的生成，最后将图块结合在一起。这也就是为什么输入提示词时必须要讲究顺序。
当经过这样一次过程，生成了一张模糊的图像，**这就是一个step**。
在下一次step中，数组里的数会和上一轮生成的图像一起输入红色的图像生成器，来生成一个更接近需求的图像，这样的反复过程就是**迭代**。
最后就是**黄色的图像放大器**了，帮助我们把一副小的图像放大成我们想要的图像大小，并在过程丰富细节。

## AI工作流程的总结
1. 我们输入的词句，会被蓝色的自然语言处理器解析成一个个数字，存进蓝色的数组中。
2. 这个输入数组会按顺序结合高斯噪声输入到红色的生成器中，生成粗糙的图像。
3. 将粗糙的图与输入数组重复第二步，对生成的图像进行迭代。
4. 将迭代完的输入黄色的放大器，扩大图像分辨率，使图像细致。

通过这个过程，首先我们可以看到，为什么ai画不好手脚，因为ai在生成图像的过程中，图像都是以一个小尺寸在进行迭代，最后再进行放大。像手，脚趾这类细小的物体，一开始占据的原始像素就少，所以放大后效果也不好。
另一点就是，ai读取文本是有顺序性的，所以才有了各种咒语的格式。
最后就是，我们手动写的单词性的tags，其实就是帮ai做了蓝色自然语言处理里的词句分割工作。
虽然webui目前可以输入超量的输入量，但是webui会按**最长75个为一组**的输入量把tags放入CLIP，分多组放入你的输入文本。这个采样器可以在设置中调整，默认为20。
![](https://cdn.jsdelivr.net/gh/bilibiliworld/picgo/Stable%20Diffusion%20%E5%92%8C%E5%8F%A6%E5%A4%96%202%20%E4%B8%AA%E9%A1%B5%E9%9D%A2%20-%20%E4%B8%AA.png)
也就是说，如果你输入的提示词过长的话，可能你写一个长句，其中的形容词和名字被分到了不同的CLIP组中，**这就会造成污染**。

基于以上这些结论，我们可以推断出：
1. 为什么长句和强短句，比零碎的单词污染少？因为零碎的单词缺少了元素间的联系，而ai也没办法自己去联想到这个联系。而长句和强短句，ai可以通过自己进行自然语言处理，收集到一些元素间的联系。
2. 为什么长句联系好却不够稳定？因为ai是sb，有时候进自然语言处理时句子分析得不好。
3. 为什么ai画不好细节的东西，因为ai一开始只在很小分辨率的图上画，而小东西分配到的像素太少了。
4. 为什么ai画不好长的有连续性的东西？理由基本同上，长的东西在小图上可能是连续的，但是放大后就不一定了。

## P.S.一些ai绘画技巧总结
我们可以思考一个大概的画面，然后通过广义三段式的思想来丰富场景的内容。

通过对一个主体进行**三段式拆分**，然后将每个小短句拆分到整个tags中，利用**多次描述**的强化叠加效果来强化主体的表现。同时因为对主体的完整描述进行了拆分，这个方法可以把几个颜色组隔离到几个段落中，从而减少污染。

最后再根据需求，使用**分步渲染**等进阶技术，来调整部分语句的内容或者顺序，使画面更接近所需要的情况。

**三段式**就是：质量前缀+主体描述+背景描述。

基于广义三段式的思想：目标，定义，细节，我们**对人物的描写进行拆分**。比如分为人物的总体概况，面貌，装饰，衣着，并将环境描写以人物与环境的关系的方式，穿插进人物描写中。可以用**分段**的方式表现这种拆分。在每一段的末尾，我们可以加入与人物有关的环境描写。

当然我们要理解，ai的自然语言处理功能没有想象中那么好使，我们还是得帮ai简单处理一下句子，**把关键词提取出来**，尽量减少逻辑主语的变化。

多次描述叠加强化也被叫**多重渲染**，一方面就像是传统写作中对同一目标的多侧面描写丰富细节从而起到强调的作用，另一方面也是利用这个多段的方式，方便穿插背景或**占位词**用于隔断污染。

我们用`【+++tags+++】`（**符号占位词**）的语法来提升女孩脸的渲染程度，并且增强女孩面貌描写的权重以获得更清晰，更靠近镜头的人物。这个语法大概是来自一个bug或者也可以当做是占位词的延伸应用。

做占位的只是+++, tags是我们要写的词比如`【+++ hands +++】`，占位词会增加输入量的大小，但是几乎不影响意思，原本hands就占一个输入量，现在这么写了就占了7个输入量（6个+和1个hands）。

接下来我们对小的物件使用**分步渲染**，在图像整体成型后再进行绘制。语法为：[from:to:step]，from就是在step之前进行绘制，to就是在step之后进行绘制。也可以使用[from::step]和[:to:step]。

ai is sb是一个**占位词**，他的作用就用来隔断前后，避免污染，可以将其使用在不同分段的包含颜色的描述句两段。如`ai is sb, the girl has a blue ribbon,[: star earrings, : 0.5 ] ai is sb,`

对难度较大的东西，例如手，我们可以用emoji加强绘制。Emoji经过了独特的训练，具有很强的指向性。正常情况下，手通常在50%左右开始进行绘制，所以我们在这个阶段把手的强化加入，避免过早加入而产生很多个手的问题。`[[:✋,:0.5]::0.8]`这个词条意思就是从50%开始启用到80%截止。

正向tags示例：
```
(((masterpiece))), (extremely detailed 8k wallpaper),(((best quality))), ((ultra-detailed)),(best illumination, best shadow), ((an extremely delicate and beautiful)),(best illustration), dynamic angle,floating,realistic oil painting,

1beautifully and detailed girl sitting near water, solo, mid shot,

(the girl has a [+++beautifully detailed cute face+++]:1.4), (beautiful and detailed red eyes:1.2), (long blonde hair with a wide brim hat),[[:✋,:0.5]::0.8] [smile],the girl sitting near a river, beautiful and delicate water,

ai is sb, the girl has a blue ribbon,[: star earrings, : 0.5 ] ai is sb, standing in a Flowery meadow, trees and colourful (wildflowers) blooming surround,

(the girl wearing a gorgeous white and light blue dress:1.1), with gold patterns and lace, upper body, (clear sky, Cumulus:1.2), sunlight, bright spots, glowing, the girl and forest are shining,
```

最后再对负面词条按照重要性顺序进行一波调整：将比较重要的负面词提到前面，在开始渲染细节后，增加细节的负面词组。清理负面词组中的重复、错误单词。以下为负面tags示例：
```
ugly,lowres, bad anatomy,worst quality, low quality, normal quality,

[:((No more than one thumb, index finger, middle finger, ring finger and little finger on one hand),(mutated hands and fingers:1.5 ), fused ears, one hand with more than 5 fingers, one hand with less than 5 fingers,):0.5]

bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, jpeg artifacts, signature, watermark, username, blurry, Missing limbs, three arms, bad feet, text font ui, signature, blurry, malformed hands, long neck, mutated hands and fingers :1.5).(long body :1.3),(mutation ,poorly drawn :1.2), disfigured, malformed, mutated, multiple breasts, futa, yaoi, three legs, huge breasts,
```

本文参考了[完整tag书写思路](https://www.bilibili.com/read/cv19790550)，具体内容可点击链接去看。