var LiSA = LiSA || {}
LiSA.load = (path, type, title, callback) => {
    var s, i;
    if (!type) type = path.substr(path.lastIndexOf(".") + 1);
    if (type == "js") {
        var ss = document.getElementsByTagName("script");
        for (i = 0; i < ss.length; i++) {
            if (ss[i].src && ss[i].src.indexOf(path) != -1 || ss[i].title == title) return ss[i]
        }
        s = document.createElement("script");
        s.type = "text/javascript";
        s.src = path;
        if (title) s.title = title;
    }
    else if (type == "css") {
        var ls = document.getElementsByTagName("link");
        for (i = 0; i < ls.length; i++) {
            if (ls[i].href && ls[i].href.indexOf(path) != -1 || ls[i].title == title) return ls[i];
        }
        s = document.createElement("link");
        s.rel = "stylesheet";
        s.type = "text/css";
        s.href = path;
        if (title) s.title = title;
        s.disabled = false;
    }
    else return;
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(s);
    if (callback)
        callback()
    return s;
}

LiSA.getUrlRelativePath = (url) => {
    if (LiSA.rUrl) return LiSA.rUrl
    var url = url || document.location.toString();
    var arrUrl = url.split("//");
    var start = arrUrl[1].indexOf("/");
    var relUrl = arrUrl[1].substring(start);
    if (relUrl.indexOf("?") != -1) {
        relUrl = relUrl.split("?")[0];
    }
    // remanber
    LiSA.rUrl = relUrl
    return relUrl;
}

//去除字符串尾部空格或指定字符  
LiSA.trimEnd = function (str, c) {
    if (c == null || c == "") {
        var rg = /s/;
        var i = str.length;
        while (rg.test(str.charAt(--i)));
        return str.slice(0, i + 1);
    }
    else {
        var rg = new RegExp(c);
        var i = str.length;
        while (rg.test(str.charAt(--i)));
        return str.slice(0, i + 1);
    }
}

if (typeof jQuery == 'undefined')
    LiSA.load('https://code.jquery.com/jquery-3.1.1.min.js', 'js', 'jquery')

setTimeout(() => {
    window.danmu = window.danmu || {}
    // here url
    var site = window.danmu.url || window.danmu.site || ''
    if (site) {
        site = LiSA.trimEnd(site, '/') + '/'
    }
    LiSA.site= site
    LiSA.load(site + 'css/barrager.css', 'css')
    LiSA.load(site + 'jquery.barrager.min.js', 'js')

    // run
    danmuRun(site)
    // is add off
    if (!window.danmu.offadd) {
        LiSA.load(site + 'dialog.js', 'js', null)
        setTimeout(() => {
            addDialog(site)
        }, 300)
    }
}, 300);


window.LiSADanmu = window.LiSADanmu || {}

var danmuRun = (site) => {
    // 初始化数据
    if (!window.LiSADanmu.data) {
        if (window.danmu.debug) {
            window.LiSADanmu.data = [{ info: "这里仅仅是测试" }]
        } else if (window.danmu.data && Array.isArray(window.danmu.data)) {
            window.LiSADanmu.data = window.danmu.data
        } else if (window.danmu.initData) {
            if (Array.isArray(window.danmu.initData)) {
                window.LiSADanmu.data = window.danmu.initData
            }
            else {
                switch (typeof window.danmu.initData) {
                    case 'object':
                        window.LiSADanmu.data = [window.danmu.initData]
                        break
                    case 'function':
                        window.LiSADanmu.data = window.danmu.initData()
                        break
                    default:
                        window.LiSADanmu.data = [{ info: "您的initData 类型不正确" }]
                        break
                }
            }
        } else {
            //没有初shi值时，采用默认方式
            if (window.danmu.data && typeof window.danmu.data == 'function') {
                //时时查询获取数据
            } else {
                window.LiSADanmu.data = new Promise((r, j) => {
                    $.ajax({
                        type: "get",
                        contentType: "application/json;charset=UTF-8",
                        url: site + "data?id=" + (window.danmu.id || LiSA.getUrlRelativePath()),
                        success: function (result) {
                            r(result)
                        },
                        error: function (e) {
                            r([{ info: "调用后端失败:" + e }])
                        }
                    })
                })
            }
        }
    }
    new Promise((r, j) => {
        r(window.LiSADanmu.data || [])
    }).then(data => {
        if (Array.isArray(data))
            window.LiSADanmu.data = data
        else if (typeof data == 'object')
            window.LiSADanmu.data = [data]
        else
            console.error('something wrong with your initData ： ' + data)
    }).then(() => {
        // start danmu
        realDanmu()
    })
}

var realDanmu = () => {
    //每条弹幕发送间隔
    var looper_time = 3 * 1000;
    var index = 0
    function do_barrager() {
        //时时获取情况
        if (window.danmu.data && typeof window.danmu.data == 'function') {
            new Promise((r, j) => {
                r(window.danmu.data())
            }).then(data => {
                if (data) {
                    if ($('body').barrager)
                        $('body').barrager(data);
                }
            })
        } else {
            if (window.LiSADanmu.data && window.LiSADanmu.data.length && window.LiSADanmu.data.length > 0) {
                if ($('body').barrager)
                    $('body').barrager(window.LiSADanmu.data[index++ % window.LiSADanmu.data.length]);
            }
        }
    }
    setInterval(do_barrager, looper_time);
}



var addDialog = (site) => {
    // add div for danmu.png 
    $("body").append('<div title="发送弹幕(F2)" id="div_danmu"></div>')
    // add accessKey
    $(document).keydown((key) => {
        //console.log(key.key)
        if (key.key == 'F2') {
            showDialog()
        }
    })
    // add css
    $("#div_danmu").css({
        width: "36px",
        height: "36px",
        position: "absolute",
        background: "url(" + site + "css/danmu.png) no-repeat center center",
        "background-size": "100%",
        right: "20px",
        bottom: "20px",
        cursor: "pointer"
    });
    // add dialog
    $("#div_danmu").click(showDialog)
}



var showDialog = () => {
    if (LiSA.dialogShow) return

    var doOk = function (dialog) {
        var value = $('#danmu-d').val();
        dialog.close(value);
        dialog.remove();

        if (value) {
            var danmuInfo = {
                info: value
            }
            // here to push to danmu
            //1. danmu
            if ($('body').barrager)
                $('body').barrager(danmuInfo);
            //2. add to list
            window.LiSADanmu.data = window.LiSADanmu.data || []
            window.LiSADanmu.data.push(danmuInfo)
            //3. add to backend
            danmuInfo.id =  window.danmu.id || LiSA.getUrlRelativePath()
            $.ajax({
                type: "post",
                contentType: "application/json",
                url: LiSA.site + "data",
                dataType: "json",
                data: JSON.stringify(danmuInfo),
                success: function (result) {
                },
                error: function (e) {
                }
            })
            //console.log(value)
        }
    }
    var d = dialog({
        title: '发送弹幕',
        content: '<input id="danmu-d" value="" />',
        onshow: () => {
            setTimeout(() => {
                $('#danmu-d').focus()
                $('#danmu-d').keydown((key) => {
                    // console.log(key.key)
                    if (key.key == 'Enter') {
                        doOk(d)
                    }
                })
            }, 100)
        },
        ok: () => { doOk(d) }
    });
    d.addEventListener('close', function () {
        //console.log(this.returnValue);
        LiSA.dialogShow = false
    });

    d.show()
    LiSA.dialogShow = true
}