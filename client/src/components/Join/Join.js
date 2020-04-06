import React, { useState } from 'react'
import { Link } from "react-router-dom"

//Style
import "./Join.scss"

const Join = () => {
    const [name, setName] = useState("")
    const [room, setRoom] = useState("")

    return (
        <div className="join">
            <div className="join_side">
                <div className="join_side_title">
                    Hey There!
                </div>
                <div className="join_side_desc">
                    This is a website in which you & your friends<br /> can talk to one another by creating rooms.
                </div>
                <div className="join_side_steps">
                    <ol>
                        <li>Enter Your name</li>
                        <li>Enter a name for your room</li>
                        <li>Click Sign in</li>
                        <li>Enjoy! :)</li>
                        <li>BTW you can use emojis XD</li>
                    </ol>
                </div>
                <div className="join_side_disclaimer">
                    <span>Disclaimer: </span>
                    It is a real time chat website. Which means that this website isn't hooked up with a database so when you leave the room data isn't stored.
                </div>
            </div>
            <div className="join_inner">
                <div className="join_inner_heading">Welcome</div>
                <div>
                    <input
                        type="text"
                        className="join_inner_input"
                        placeholder="Your Name"
                        onFocus={e => e.target.placeholder = ""}
                        onBlur={e => e.target.placeholder = "Your Name"}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        className="join_inner_input"
                        placeholder="Room Name"
                        onFocus={e => e.target.placeholder = ""}
                        onBlur={e => e.target.placeholder = "Room Name"}
                        onChange={e => setRoom(e.target.value)}
                        required
                    />
                </div>
                <Link
                    onClick={e => (!name || !room) ? e.preventDefault() : null}
                    to={`/chat?name=${name}&room=${room}`}
                >
                    <button className="join_inner_btn">
                        Sign in
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Join
