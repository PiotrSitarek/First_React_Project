import React, { useState, useEffect } from "react";
import style from "./WinnersList.scss"
import {
    HashRouter as Router,
    Route,
    Link,
    Switch,
    NavLink,
    useHistory
} from 'react-router-dom';

const WinnersList = () => {


    const [nameList, setNameList] = useState([]);

    useEffect(() => {

        fetch("http://localhost:3000/winersbase")
            .then((result) => result.json())
            .then((result) => setNameList(result));
    }, [])


    if (nameList.length === 0) {
        return (
            <div className="winnersListDiv">
                <h1>Pusta lista? Zagraj jak najszybciej!</h1>
                <Link to="/Quiz"><button className="quizButtonStyle">Graj!</button></Link>
                <Link to="/"><button className="quizButtonStyle" >Search</button></Link>

            </div>)
    }



    return (
        <div className="winnersListDiv">
            <Link to="/Quiz"><button >Try again</button></Link>

            <h1> Lista zwycięzców</h1>
            {nameList.map(element => <p key={element.id}>{element.id}.{element.name}</p>)}
        </div>
    )
}

export default WinnersList;