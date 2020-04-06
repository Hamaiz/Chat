import React from 'react'

//Style
import "./Side.scss"

const Side = ({ name, users }) => {
    const nameLetter = name.substr(0, 1).toUpperCase()


    return (
        <div className="side">
            <div className="side_pic">{nameLetter}</div>
            <div className="side_name">{name}</div>
            {
                users
                    ? (
                        <div className="side_people">

                            <h3>People in the room</h3>
                            <ul className="side_peple_users">
                                {
                                    users.map((user, i) => (

                                        <li key={i}>{user.name}</li>
                                    ))
                                }
                            </ul>
                        </div>

                    )
                    : null
            }
        </div>
    )
}

export default Side
