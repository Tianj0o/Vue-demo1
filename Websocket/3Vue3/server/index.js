const express = require('express')
const app = express()
app.use(require('cors')())
app.use('/',express.static(__dirname+'/dist'))
const Ws = require('ws')
const Server = new Ws.Server({
    port:3030
})
;(function(server){

    const init = ()=>{
        bindEvent()
    }

    function bindEvent(){
        server.on('open',()=>{
            console.log('open')
        })
        server.on('close',()=>{
            console.log('close')
        })
        server.on('error',()=>{
            console.log('error')
        })
        server.on('connection',(ws)=>{
            console.log('connection')
            ws.on('message',(data)=>{
                console.log(data)
                server.clients.forEach((c)=>c.send(data))
            })
        })
    }

    init()

})(Server)

app.listen(3040,()=>{
    console.log('监听3040端口')
})