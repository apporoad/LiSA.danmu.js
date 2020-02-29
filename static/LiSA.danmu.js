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
    LiSA.load(site + 'css/barrager.css', 'css')
    LiSA.load(site + 'jquery.barrager.min.js', 'js')

    // is debug
    if (window.danmu.debug || window.danmu.test) {
        test()
    } else {
        callbackend(site)
    }

    // is add off
    if (!window.danmu.offadd) {
        LiSA.load(site + 'dialog.js', 'js', null)
        setTimeout(() => {
            addDialog(site)
        }, 300)
    }
}, 300);

// $import('LiSA.danmu.js','js')

var callbackend = (site) => {
    //每条弹幕发送间隔
    var looper_time = 3 * 1000;
    //是否首次执行
    var run_once = true;
    do_barrager();

    function do_barrager() {
        if (run_once) {
            //如果是首次执行,则设置一个定时器,并且把首次执行置为false
            looper = setInterval(do_barrager, looper_time);
            run_once = false;
        }

        $.ajax({
            type: "get",
            contentType: "application/json;charset=UTF-8",
            url: site + "test",
            success: function (result) {
                if (result) {
                    $('body').barrager(result);
                }
            },
            error: function (e) {
                // console.log(e.status);
                // console.log(e.responseText);
            }
        });

    }
}


var test = () => {

    //每条弹幕发送间隔
    var looper_time = 3 * 1000;
    //是否首次执行
    var run_once = true;
    do_barrager();

    var data = {
        info: 'here is test'
        //img: 'static/heisenberg.png'
    }

    function do_barrager() {
        if (run_once) {
            //如果是首次执行,则设置一个定时器,并且把首次执行置为false
            looper = setInterval(do_barrager, looper_time);
            run_once = false;
        }

        //console.log(data)
        if ($('body').barrager)
            $('body').barrager(data);

    }

}

var addDialog = (site) => {
    // add div for danmu.png 
    $("body").append('<div title="发送弹幕" id="div_danmu"></div>')
    // add css
    $("#div_danmu").css({
        width: "36px",
        height: "36px",
        position: "absolute",
        background: "url(" + site +"css/danmu.png) no-repeat center center",
        "background-size": "100%",
        right: "20px",
        bottom: "20px",
        cursor: "pointer"
    });
    // add dialog
    var d = dialog({
        title: '消息',
        content: '<input id="property-returnValue-demo" value="1" />',
        ok: function () {
            var value = $('#property-returnValue-demo').val();
            this.close(value);
            //this.remove();
        }
    });
    d.addEventListener('close', function () {
        alert(this.returnValue);
    });
    
    $("#div_danmu").click(()=>{
        d.show()
    })
}
