## 常用配置
```js

 window.danmu = {
        id: '',  // 用于指定弹幕库的唯一标识 默认为相对url
        url: 'http://localhost:11540/',  //danmu部署位置
        test: false,
        offadd: false,   //是否关闭弹幕按钮
        off: false,  //是否开启弹幕
        interval : 5*1000 , //弹幕间隔 默认5秒
        template: {   //参考https://github.com/yaseng/jquery.barrager.js
            img: 'xxx.png', //图片 
            href: 'http://www.bing.com', //链接 
            close: false, //显示关闭按钮 
            speed: 8, //延迟,单位秒,默认8
            bottom: 70, //距离底部高度,单位px,默认随机 
            color: '#fff', //颜色,默认白色 
            old_ie_color: '#000000', //ie低版兼容色,不能与网页背景相同,默认黑色 
        }
    }

```

## 自定义数据源情况
```js

window.danmu = {
    id: 'danmu-test',  // 默认为相对url
    url: 'http://localhost:11540/',  //danmu部署位置
    initData: [{ info: "初始化数组情况1" }, { info: "初始化数组情况2" }]
}
window.danmu = {
    id : 'danmu-test',  // 默认为相对url
    url: 'http://localhost:11540/',  //danmu部署位置
    initData: { info : "初始化对象情况"}, 
}
window.danmu = {
    id: 'danmu-test',  // 默认为相对url
    url: 'http://localhost:11540/',  //danmu部署位置
    initData: function(){ return [{info : "初始化普通函数1"},{info:'初始化普通函数2'}]}
}
window.danmu = {
    id: 'danmu-test',  // 默认为相对url
    url: 'http://localhost:11540/',  //danmu部署位置
    initData: function(){ return new Promise(r=>{
        r([{info : "初始化promise函数1"},{info:'初始化promise函数2'}])})
    }
}
window.danmu = {
    id: 'danmu-test',  // 默认为相对url
    url: 'http://localhost:11540/',  //danmu部署位置
    data: [{ info: "数组情况1" }, { info: "数组情况2" }]
}
window.danmu = {
    id: 'danmu-test',  // 默认为相对url
    url: 'http://localhost:11540/',  //danmu部署位置
    data: function(){
        window.index = window.index || 1
        return { info : '时时函数情况' + window.index++}
    }
}
window.danmu = {
    id: 'danmu-test',  // 默认为相对url
    url: 'http://localhost:11540/',  //danmu部署位置
    data: function(){
        window.index = window.index || 1
        return new Promise(r=>{
            setTimeout(() => {
                r({ info : '时时异步函数情况' + window.index++})
            }, 100);
        })
    }
}
```