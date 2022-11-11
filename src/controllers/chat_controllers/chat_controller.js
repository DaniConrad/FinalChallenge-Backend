

class ChatController {

    constructor() {
        
    }

    startChat = async (req, res) => {
        try {
            console.log(1);
            io.on("connection", (socket) => {
                let user;
            
                socket.on("conectado", (user) => {
                    console.log(user);
                socket.broadcast.emit("mensajes", {
                    user: user,
                    mensaje: `${user} ha entrado en la sala del chat`,
                });
                });
            
                socket.on("mensaje", (user, mensaje) => {
                io.emit("mensajes", { user, mensaje });
                });
            
                socket.on("disconnect", () => {
                io.emit("mensajes", {
                    server: "Server",
                    mensaje: `${user} ha abandonado la sala`,
                });
                });
            });
        } catch (error) {
            console.log("🚀 ~ file: chat_controller.js ~ line 23 ~ ChatController ~ startChat ~ error", error)
            
        }
        
    }
    
}

module.exports =  ChatController