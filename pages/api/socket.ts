import {Server} from 'socket.io';

export default function handler(req,res){
if(!res.socket.server.io){
    console.log('starting socket.io server...')
    const io = new Server(res.socket.server)
    res.socket.server.io = io;

    io.on("connection",(socket)=>{
        console.log("user connected",socket.id)

        socket.on("message",(msg)=>{
            socket.broadcast.emit("message",msg)
        })
        socket.on("disconnect",()=>{
            console.log("user disconnected",socket.id)
        })
    })
}
res.end()
}