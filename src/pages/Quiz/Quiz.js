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

    if (countryListShuffled.length === 0) { // kiedy tablica na początku jest pusta, dzięki temu nie wywali błędu
        return <h1>Loading data</h1>
    }
    const answerInput = document.querySelector("#inputAnswer")
    const clearAnswerInput = (event) => {   // clear input trzeba sprawdzić czy czyści
        event.preventDefault();
        answerInput.value = ""
    }

    const confirmAnswer = (event) => {
        event.preventDefault();

        if (countryListShuffled[0].name === answer) {
            console.log("dobra odpowiedź");
            result = counter++;
            console.log(counter);
            answerInput.value = ""; // do wywalenia
            alert("Dobra odpowiedź! Graj dalej!")  // popUP!!!
            setcountryListShuffled(shuffle(countryListShuffled));
            if (counter === 2) {
                history.push("/Winner")
            }

        } else {
            console.log("błędna odpowiedź")
            history.push("/Loose")
            setAnswerValue('');
            counter = 0;
        }
    }


    return (
        <div className="quizDiv">
            <h1>Którego państwa to flaga?</h1>
            <img className="flagStyle" src={countryListShuffled[0].flag} alt="tu powinna byc flaga!" />
            <br></br>
            <button onClick={getShuffled} >Wylosuj flagę</button>
            <p>* jeśli jesteś cienki we flagi, możesz użyć podpowiedzi.</p>
            {shuffle(countryListShuffled.slice(0, 3)).map(element => <p key={element.population}>{element.name}</p>)}
            {/* Testowo - usunąć Poprawna: { countryListShuffled[0].name} tylko do dev, poźniej usunąć */}

            <form onSubmit={event => confirmAnswer(event)}>
                <input type="text" placeholder="Twoja odpowiedź to..." id="inputAnswer" onChange={event => setAnswerValue(event.target.value)}></input>

                <br></br>
                <button id="confirmButton" type="submit">Sprawdź odpowiedź</button>
                <br></br>
                <Link to="/"><button >Home</button></Link>
                {/* <button onClick={event => clearAnswerInput(event)}>Wyczyść pole odpowiedzi</button> */}

            </form>
            {/*nie wiem czemu onChange zmienia się kolejność nazw */}


        </div>
    )
}
export default Quiz;