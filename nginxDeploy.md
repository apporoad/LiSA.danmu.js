```bash
# install nginx
yum install -y nginx

# check with-http_addition_module
2>&1 nginx -V | tr ' '  '\n'|grep add

# edit nginx config
vim /etc/nginx/nginx.conf
```
```nginx

location /danmu.js {
    return 200 "<script>window.danmu ={id :'',url:'http://localhost:11540/'};var s = document.createElement('script');s.type = 'text/javascript'; s.src=(window.danmu.url||window.danmu.site||'') + 'LiSA.danmu.js';document.getElementsByTagName('head')[0].appendChild(s);</script>";
}
# 您可以根据匹配规则配置，哪些也没添加弹幕
location / {
    #addition_types *;  # 给html外的页面添加弹幕，不建议使用
    add_after_body /danmu.js;
}

```
```bash
nginx -s reload

# check config
curl http://localhost/danmu.js

# try in your explorer
firefox http://localhost/
```
