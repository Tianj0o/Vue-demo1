const Ws = require('ws');
const server = new Ws.Server({
    port:8000
})
    server.on('open',()=>{
        console.log('连接成功')
    });
    server.on('close',()=>{
        console.log('close')
    });
    server.on('error',()=>{
        console.log('err')
    });
    server.on('connection',(ws)=>{
        ws.on('message',(data)=>{
            console.log(data)
            server.clients.forEach((c)=>c.send(data))
        })
    })
   

