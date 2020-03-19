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
            <h1>Przegrałeś</h1>
            <img src="./looser.jpg" alt="looser" />
            <Link to="/Quiz"><button>Spróbuj jeszcze raz</button></Link>
        </div>
    )
}

export default Loose;