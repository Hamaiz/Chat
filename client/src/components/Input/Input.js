import React from 'react'
import Picker from "emoji-picker-react"

//Style
import "./Input.scss"

const Input = ({ message, setMessage, sendMessage }) => {

    const smileIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" /></svg>

    //JS
    const openEmoji = () => {
        const emoji = document.querySelector(".input_emoji")
        emoji.classList.toggle("alive")
    }

    const onEmojiClick = (event, emojiObject) => {
        const inputI = document.querySelector(".input_form_i")
        inputI.value += emojiObject.emoji
        setMessage(inputI.value)
    }


    return (
        <div className="input">
            <form className="input_form">
                <input
                    type="text"
                    className="input_form_i"
                    placeholder="Type a message..."
                    value={message}
                    onBlur={e => e.target.placeholder = "Type a message..."}
                    onFocus={e => e.target.placeholder = ""}
                    // on
                    onChange={e => setMessage(e.target.value)}
                    onKeyPress={e => e.key === "Enter" ? sendMessage(e) : null}
                />
                <div
                    className="input_form_smile"
                    onClick={openEmoji}

                >
                    {smileIcon}
                </div>
                <button className="input_form_btn" onClick={e => sendMessage(e)} >Send</button>
            </form>
            <div className="input_emoji" >
                <Picker onEmojiClick={onEmojiClick} />
            </div>
        </div>
    )
}

export default Input
