import React, { useState } from "react";
import style from "./styleWin.scss"
import WinnerList from "../WinnersList/WinnersList"
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
            <h1>Gratulacje!</h1>
            <img id="firework" src="./firework.gif" alt="winner" />
            <p>Dopisz się do listy zwycięzców!</p>
            <form onSubmit={event => confirmName(event)}>
                <input id="nameInput" type="text" placeholder="Podaj swoje imię..." onChange={event => setName(event.target.value)}></input>
                <br></br>
                <button id="nameConfirmButton" type="submit">Dopisz się!</button>
            </form>
        </div>
    )
}
export default Winner;