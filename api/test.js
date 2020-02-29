module.exports = {

    "get": ()=>{
        return "hello"
    },
    "@post" :() =>{
        return "good day"
    },
    "@get" : () =>{
        return [{
            info:"i am backend Test"
        },{
            info : 'i am backend Test2'
        }]
    }
}