import React, { useEffect, useState } from 'react'
import queryString from "query-string"
import io from "socket.io-client"

//Components
import Messages from "../Messages/Messages"
import Input from "../Input/Input"
import Side from "../Side/Side"

//Style 
import "./Chat.scss"


let socket;

const Chat = ({ location }) => {

    const [name, setName] = useState("")
    const [room, setRoom] = useState("")
    const [users, setUsers] = useState("")
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const ENDPOINT = process.env.REACT_APP_ENDPOINT


    useEffect(() => {
        const { name, room } = queryString.parse(location.search)

        socket = io(ENDPOINT)

        setName(name)
        setRoom(room)


        socket.emit("join", { name, room }, (error) => {
            if (error) alert(error)
        })

        return () => {
            socket.emit("disconnect")
            socket.off()
        }

    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on("message", (message) => {
            setMessages([...messages, message])
        })

        socket.on("roomData", ({ users }) => setUsers(users))

    }, [messages])

    const sendMessage = e => {
        e.preventDefault()

        if (message) {
            socket.emit("sendMessage", message, () => {
                setMessage("")
            })
        }
    }


    //SVG
    const placeIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>

    return (
        <div className="chat">
            <Side
                name={name}
                users={users}
            />
            <div className="chat_main">
                <div className="chat_main_top">
                    <div className="chat_main_top_room">
                        {placeIcon}
                        <div className="chat_main_top_room_n">
                            {room}

                        </div>
                    </div>
                    <div className="chat_main_top_close">
                        <a href="/">&times;</a>
                    </div>
                </div>
                <div className="chat_main_bottom">
                    <Messages
                        messages={messages}
                        name={name}
                    />
                    <Input
                        message={message}
                        setMessage={setMessage}
                        sendMessage={sendMessage}
                    />
                </div>
            </div>
        </div>
    )
}

export default Chat
