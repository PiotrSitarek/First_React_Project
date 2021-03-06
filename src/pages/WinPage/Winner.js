import React, { useState } from "react";
import style from "./styleWin.scss"
import {
    HashRouter as Router,
    Route,
    Link,
    Switch,
    NavLink,
    useHistory
} from 'react-router-dom';
import Quiz from "../Quiz/Quiz"

const Winner = () => {
    const [name, setName] = useState('');
    const history = useHistory()
    const confirmName = (event) => {
        event.preventDefault();
        const nameData = {
            name: name,
        }

        fetch(`http://localhost:3000/winersbase`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(nameData)
        })
        history.push("/WinnersList")
    }

    return (
        <div className="looseDiv">
            <h1>Congratulations!</h1>
            <img id="firework" src="./firework.gif" alt="winner" />
            <p>Add yourself to a winners list</p>
            <form onSubmit={event => confirmName(event)}>
                <input id="nameInput" type="text" placeholder="Your name is ..." onChange={event => setName(event.target.value)}></input>
                <br></br>
                <button id="nameConfirmButton" type="submit">Add!</button>
            </form>
        </div>
    )
}
export default Winner;