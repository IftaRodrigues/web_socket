const express= require("express")();
const http = require("http").Server(express);
const serverSocket = require("socket.io")(http);

const porta= process.env.PORT || 8000;
http.listen(porta, ()=>console.log("Servidor Iniciado em http://localhost:"+ porta));

express.get("/", (req,res) => res.sendFile(__dirname+"/index.html"));

serverSocket.on("connection", socket => {
        console.log("Cliente "+socket.id+" conectado");
        socket.on("chat msg", msg => {
            console.log("Msg recebida do cliente: "+msg);
            serverSocket.emit("chat msg", msg);
        });
    }
);