import React, { useState, useEffect } from "react";
import { shuffle } from "lodash"
import style from "./styleQuiz.scss"
import Loose from "../LoosePage/Loose"
import {
    HashRouter as Router,
    Route,
    Link,
    Switch,
    NavLink,
    useHistory
} from 'react-router-dom';
import Winner from "../WinPage/Winner"

let counter = 0;
let result;

const Quiz = () => {

    const [countryListShuffled, setcountryListShuffled] = useState([]); // 
    const [answer, setAnswerValue] = useState();
    const history = useHistory()
    const getShuffled = (event) => {
        event.preventDefault();
        setcountryListShuffled(shuffle(countryListShuffled));
    }

    useEffect(() => {
        fetch("https://restcountries.eu/rest/v2/all")
            .then((result) => result.json())
            .then((result) => setcountryListShuffled(shuffle(result)))

    }, []);

    if (countryListShuffled.length === 0) {
        return <h1>Loading data</h1>
    }
    const answerInput = document.querySelector("#inputAnswer")
    const clearAnswerInput = (event) => {
        event.preventDefault();
        answerInput.value = ""
    }

    const confirmAnswer = (event) => {
        event.preventDefault();

        if (countryListShuffled[0].name === answer) {
            result = counter++;
            answerInput.value = "";
            alert("Good answer!")
            setcountryListShuffled(shuffle(countryListShuffled));

            if (counter === 2) {
                history.push("/Winner")

            }

        } else {
            history.push("/Loose")
            setAnswerValue('');
            counter = 0;
        }
    }


    return (
        <div className="quizDiv">

            <h1>Which country's flag is this?</h1>
            <div className="divFlagStyle">
                <img className="flagStyle" src={countryListShuffled[0].flag} alt="tu powinna byc flaga!" />
            </div>


            <button className="quizButtonStyle" onClick={getShuffled} >Draw next flag</button>
            <p>You can use prompt</p>
            {shuffle(countryListShuffled.slice(0, 3)).map(element => <p key={element.population}>{element.name}</p>)}


            <form onSubmit={event => confirmAnswer(event)}>
                <input type="text" placeholder="Your answer is ..." id="inputAnswer" onChange={event => setAnswerValue(event.target.value)}></input>

                <br></br>
                <button id="confirmButton" type="submit">Check your answer</button>
                <br></br>
                <Link to="/"><button className="quizButtonStyle">Back to search</button></Link>


            </form>



        </div>
    )
}
export default Quiz;