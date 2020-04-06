import React from 'react'
import ScrollToBottom from "react-scroll-to-bottom"
import ReactEmoji from "react-emoji"

//Style
import "./Messages.scss"

const Messages = ({ messages, name }) => {
    return (
        <ScrollToBottom className="messages">
            {
                messages.map((message, i) => {
                    let isSentByCurrentUser = false
                    const trimmedName = name.trim().toLowerCase()
                    if (message.user === trimmedName) {
                        isSentByCurrentUser = true
                    }

                    return (
                        isSentByCurrentUser
                            ? (
                                <div key={i} className="messages_container jE">
                                    <p className="messages_container_sent pr">{message.user}</p>
                                    <div className="messages_container_box back1">
                                        <p className="messages_container_box_text c1">
                                            {ReactEmoji.emojify(message.text)}
                                        </p>
                                    </div>
                                </div>
                            )
                            :
                            (
                                <div key={i} className="messages_container jS">
                                    <div className="messages_container_box back2">
                                        <p className="messages_container_box_text c2">
                                            {ReactEmoji.emojify(message.text)}
                                        </p>
                                    </div>
                                    <p className="messages_container_sent pl">{message.user}</p>
                                </div>
                            )
                    )
                })
            }
        </ScrollToBottom>
    )
}

export default Messages