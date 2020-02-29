var config = require('../config.json')
var fs = require('fs')
var path = require('path')

var getFileName = (id)=>{
    var reg=/\$|\.|\,|\=|\-|\;|\+|\@|\#|\&|\%|\(|\)|\?|\？|\*|\"|\“|\”|\'|\‘|\’|\<|\>|\{|\}|\[|\]|\【|\】|\：|\:|\、|\^|\$|\!|\~|\`|\|/g;
    return  id.replace(reg,"").replace(/\\|\//g,'_') + '.data'
}
//console.log(getFileName('sdf/aa/a$#@#%#^$&%^&=-[{]};:,.<>?(()_+{}:"'))

var get = (param) =>{
        var fileName = getFileName(param.id || 'default')
        var filePath = path.join(config.dataPath || __dirname, fileName)
        if(fs.existsSync(filePath)){
            var array =[]
            fs.readFileSync(filePath).toString().split('\r\n').forEach(str=>{
                if(str){
                    array.unshift(JSON.parse(str))
                }
            })
            return array
        }
        else{
            return []
        }
    }

//console.log(get({id :'test'}))
module.exports = {
    "@get" : get,
    // curl -H "Content-Type:application/json" -X POST --data '{"id":"test","info":"this is testData"}' http://localhost:11540/data
    "@post" : (param) =>{
        var fileName = getFileName(param.id || 'default')
        var filePath = path.join(config.dataPath || __dirname, fileName)
        param.timestamp = new Date()
        fs.appendFileSync(filePath, JSON.stringify(param) + "\r\n");
        return {
            hello : 'hello good good day'
        }
    }
}