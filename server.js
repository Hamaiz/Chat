const express = require("express")
const app = express()
const server = require("http").createServer(app)
const io = require("socket.io")(server, { wsEngine: 'ws' })
// const io = require("socket.io")(http, { wsEngine: 'ws' })
const cors = require("cors")
const path = require("path")

//Import
const { addUser, removeUser, getUser, getUserInRoom } = require('./config/users')

//Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

//Routes
app.get("/", (req, res) => {
    res.send("Server is runing...")
})

// Socket
io.on("connection", (socket) => {
    socket.on("join", ({ name, room }, callback) => {

        const { error, user } = addUser({ id: socket.id, name, room })

        if (error) return callback(error);

        socket.join(user.room)

        socket.emit("message", { user: "Admin", text: `${user.name}, welcome to room ${user.room}` })
        setTimeout(() => {
            socket.emit("message", { user: "Admin", text: `You can use emojis. lol... I will be adding more updates to this soon` })
        }, 1200);
        socket.broadcast.to(user.room).emit("message", { user: "Admin", text: `${user.name} has joined` })

        io.to(user.room).emit("roomData", { room: user.room, users: getUserInRoom(user.room) })

        callback()
    })

    socket.on("sendMessage", (message, callback) => {

        console.log(message);

        const user = getUser(socket.id)

        io.to(user.room).emit("message", { user: user.name, text: message })
        io.to(user.room).emit("roomData", { room: user.room, users: getUserInRoom(user.room) })

        callback()
    })

    socket.on("disconnect", () => {
        const user = removeUser(socket.id)


        if (user) {
            io.to(user.room).emit("message", { user: "Admin", text: `${user.name} has left` })
            io.to(user.room).emit("roomData", { room: user.room, users: getUserInRoom(user.room) })
        }
    })
})

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

server.listen(process.env.PORT || 5000, () => console.log("Server has started..."))