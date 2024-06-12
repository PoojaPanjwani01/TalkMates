const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const messageRoute = require("./routes/messageRoute");
const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoute);
app.use("/api/message", messageRoute);

mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB Connection Successful");
}).catch((err) => {
    console.log(err.message);
});

const PORT = process.env.PORT || 5000; // Use environment variable or default to 5000
const server = app.listen(PORT, () => {
    console.log(`Server Started on PORT ${PORT}`);
});

const io = socket(server ,{
    cors : { 
    origin : "http://localhost:3000",
    credentials : true,
  },
});

global.onlineUsers = new Map();

io.on("connection" , (socket) => {
    global.chatSocket = socket;
    socket.on("add-user" , (userId) => {
        onlineUsers.set(userId,socket.id);
    });

    socket.on("send-msg" , (data) =>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve" , data.message);
        }
    });
});