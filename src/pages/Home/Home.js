import React from "react";
import Button from "../../components/Button"
import style from "./styleHome.scss"
import {
    HashRouter as Router,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';

// jakim cudem nie działa ścieżka ../images/sheldon.png


const Home = () => {

    // setTimeout(() => {
    //     window.location.href = "../../components/Button/index.js";
    // }, 2000);
    // const przenies = () => {

    // }
    return (

        <div className="firstDiv">
            <h1>Sheldon Cooper presents:</h1>
            <img src="./sheldon.png" alt="Sheldon on his spot" />
            <Link to="/Quiz"><button >Graj!</button></Link>
            <Link to="/WinnersList"><button>Lista</button></Link>
        </div>


    )
}
export default Home;