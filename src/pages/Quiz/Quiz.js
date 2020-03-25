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
            alert("Dobra odpowiedź! Graj dalej!")
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

            <h1>Którego państwa jest to flaga?</h1>
            <h2>gramy do 2 prawidłowych odpowiedzi</h2>
            <div className="divFlagStyle">
                <img className="flagStyle" src={countryListShuffled[0].flag} alt="tu powinna byc flaga!" />
            </div>


            <button className="quizButtonStyle" onClick={getShuffled} >Wylosuj flagę</button>
            <p>* jeśli jesteś cienki we flagi, możesz użyć podpowiedzi.</p>
            {shuffle(countryListShuffled.slice(0, 3)).map(element => <p key={element.population}>{element.name}</p>)}


            <form onSubmit={event => confirmAnswer(event)}>
                <input type="text" placeholder="Twoja odpowiedź to..." id="inputAnswer" onChange={event => setAnswerValue(event.target.value)}></input>

                <br></br>
                <button id="confirmButton" type="submit">Sprawdź odpowiedź</button>
                <br></br>
                <Link to="/"><button className="quizButtonStyle">Search</button></Link> <p>{countryListShuffled[0].name}</p>


            </form>



        </div>
    )
}
export default Quiz;