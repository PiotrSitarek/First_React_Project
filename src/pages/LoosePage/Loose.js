import React from "react";
import style from "./styleLoose.scss"
import {
    HashRouter as Router,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';

const Loose = () => {

    return (
        <div className="looseDiv">
            <h1>You loose!</h1>
            <img src="./looser.jpg" alt="looser" />
            <Link to="/Quiz"><button>Try again</button></Link>
        </div>
    )
}

export default Loose;