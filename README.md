<div align=center><img src="https://raw.githubusercontent.com/apporoad/LiSA.danmu.js/master/static/css/danmu.png"/></div>  

# LiSA.danmu.js
easy add danmu to your html, include frontend and backend  
一行代码在你的任意html添加弹幕功能  
三分钟（或者更短）添加弹幕功能  
三步添加弹幕功能  


## go run
```bash
# install aok.js
npm i -g aok.js
# cd workspace
mdkir temp 
cd temp
# download zip
wget https://github.com/apporoad/LiSA.danmu.js/raw/master/LiSA.danmu.js.zip
# run 
aok LiSA.danmu.js.zip -r api -s static -w danmu

# cat your data
cat $(ls danmu/api/*.data)

```

## go test
打开任意网页，进入开发者模式，粘帖以下代码
```js
//config
window.danmu = {id :'',url:'http://localhost:11540/'}
//注入js
var s = document.createElement("script");s.type = "text/javascript"; s.src=(window.danmu.url||window.danmu.site||'') + 'LiSA.danmu.js';document.getElementsByTagName("head")[0].appendChild(s);

```

### 集成到页面
html 注入 go test 的代码即可

## 技术说明
1. 后端引擎采用[aok.js](https://github.com/apporoad/aok.js.git)
2. 前端弹幕基于[jquery.barrager.js](https://github.com/yaseng/jquery.barrager.js)
3. 弹窗控件采用[artDialog](https://github.com/aui/artDialog)

## 兼容性
浏览器必须支持 promise  
较低版本浏览器未进行测试

## 无侵入式部署  no poaching deploy
思路是采用代理层文本替换,如nginx的http_addition_module 添加注入脚本  
具体步骤见 [deploy](./nginxDeploy.md)


## 配置说明
[details](./config.md)

## 生产部署

参考 [aok.js deploy](https://github.com/apporoad/aok.js#how-to-deploy)
