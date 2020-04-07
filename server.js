const express = require("express")
const app = express()
const http = require("http").createServer(app)
const io = require("socket.io")(http, { wsEngine: 'ws' })
const cors = require("cors")
const path = require("path")

//Import
const { addUser, removeUser, getUser, getUserInRoom } = require('./config/users')

//Middlewares
app.use(cors())

//Routes
app.get("/api/chat", (req, res) => {
    res.send("Server is runing.")
})


//Socket
io.on("connection", (socket) => {
    socket.on("join", ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room })

        if (error) return callback(error)

        socket.join(user.room)

        socket.emit("message", { user: "Admin", text: `${user.name}, welcome to room ${user.room}` })
        socket.broadcast.to(user.room).emit("message", { user: "Admin", text: `${user.name} has joined` })

        io.to(user.room).emit("roomData", { room: user.room, users: getUserInRoom(user.room) })

        callback()
    })

    socket.on("sendMessage", (message, callback) => {
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


http.listen(process.env.PORT || 4000, () => console.log("Server has started..."))