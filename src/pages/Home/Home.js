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
const Home = () => {

    return (

        <div className="firstDiv">
            <h1>Sheldon Cooper presents:</h1>
            <img src="./sheldon.png" alt="Sheldon on his spot" />
            <Link to="/Quiz"><button className="quizButtonStyle">Play</button></Link>
            <Link to="/WinnersList"><button className="quizButtonStyle">Winners List</button></Link>
            <Link to="/"><button className="quizButtonStyle">Search</button></Link>
        </div>


    )
}
export default Home;