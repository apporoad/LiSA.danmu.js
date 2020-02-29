# LiSA.danmu.js
easy add danmu to your html, inclue  frontend and backend  
一行代码在你的任意html添加弹幕功能  
三分钟（或者更短）添加弹幕功能  
三步添加弹幕功能  


## go run
```bash
npm i -g aok.js



```

## go test

```js

window.danmu = {
        url:'http://localhost:11540/',
        test : false
    }

var s = document.createElement("script");s.type = "text/javascript"; s.src=(window.danmu.url||window.danmu.site) + 'LiSA.danmu.js';document.getElementsByTagName("head")[0].appendChild(s);

```