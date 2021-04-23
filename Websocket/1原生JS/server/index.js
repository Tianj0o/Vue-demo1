const Ws = require('ws')

;(function(Ws){

        const server = new Ws.Server({
            port:8081,
        })

        server.on('open',(e)=>{
            console.log('websocket open')
        })
        server.on('close',(e)=>{
            console.log('websocket close')
        })
        server.on('error',(e)=>{
            console.log('websocket error')
        })
        server.on('connection',(ws)=>{
            console.log('websocket connection')
            ws.on('message',(msg)=>{
                handleMessage(msg)
            })
        })
        function handleMessage(msg){
            server.clients.forEach((c)=>c.send(msg))
        }

})(Ws);