import React, { useState, useEffect } from "react"
import style from "./styleSearch.scss"
import { Link } from 'react-router-dom';
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed!");
});

const Search = () => {
  const [divStyle, setdivStyle] = useState("hidden")
  const [countryList, setcountryList] = useState([]);
  const [suggestionsState, setSuggestionsState] = useState([]);
  const [text, setText] = useState('');
  const [wygrana, setWygrana] = useState([]);
  const style = {
    visibility: divStyle
  }
  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((result) => result.json())
      .then(result => setcountryList(result))
  }, [])

  const dataSectionHide = () => {
    setdivStyle("hidden")
  }

  const onTextChange = (event) => {
    const value = event.target.value
    let suggestions = [];
    let listakrajow = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i')
      listakrajow = countryList.map(function (element, index, array) {
        return element.name
      })
      suggestions = listakrajow.filter(v => regex.test(v))

    }
    setSuggestionsState(suggestions);
    setText(value);
  }
  const suggestionSelected = (value) => {
    setText(value);
    setSuggestionsState([]);
    console.log(wygrana)

    countryList.filter(element => {
      if (element.name == value) {
        setWygrana(element)
      }
      setdivStyle("visible")

    })
  }
  const renderSuggestions = () => {
    if (suggestionsState.length === 0) {
      return null
    }
    return (
      <ul>
        {suggestionsState.map(element => <li onClick={() => suggestionSelected(element)} key={element}>{element}</li>)}
      </ul>

    )
  }

  if (countryList.length === 0) {
    return <h1>Loading data</h1>
  }

  // const searchEngine = (event) => {
  //   // event.preventDefault();
  //   // const searchInputValue = document.querySelector("#searchInput")
  //   // const countryName = searchInputValue.value

  //   countryList.filter(element => {
  //     if (element.name == text) {
  //       setWygrana(element)
  //       console.log("dane w bazie")
  //     }
  //   })
  // }
  return (
    <>
      <div className="pageContainer">
        <section className="container searchSection">
          <h2>Search Country</h2>

          <div className="div">
            <input value={text} id="searchInput" className="autoCountriesInput" type="text" onChange={event => onTextChange(event)}></input>
            {renderSuggestions()}
          </div>

        </section>
        <section style={style} className="container dataSection">
          <i onClick={dataSectionHide} className="far fa-window-close"></i>
          <div>
            <div className="divFlagStyle">
              <img className="flagStyle" src={wygrana.flag} alt="tu powinna byc flaga!" />
            </div>
            <h2>{wygrana.name}</h2>
            <p>Capital: {wygrana.capital}</p>
            <p>Population: {wygrana.population}</p>
            <p>Region: {wygrana.subregion}</p>
            <p>Area: {wygrana.area}km^2</p>
            <p>Country code: {wygrana.alpha3Code}</p>
            <p>Native name: {wygrana.nativeName}</p>
          </div>
        </section>

        <section className="container quizSection">
          <Link to="/Home"><h2 id="quizText">Quiz</h2></Link>
        </section>
      </div>
    </>
  )
}

export default Search;