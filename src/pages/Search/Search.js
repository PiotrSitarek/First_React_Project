import React, { useState, useEffect } from "react"
import style from "./styleSearch.scss"
import { Link } from 'react-router-dom';
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed!");
});

const Search = () => {
  const [divStyle, setdivStyle] = useState("none")
  const [contactStyleState, setContactStyle] = useState("none")
  const [countryList, setcountryList] = useState([]);
  const [suggestionsState, setSuggestionsState] = useState([]);
  const [text, setText] = useState('');
  const [wygrana, setWygrana] = useState([]);
  const style = {
    display: divStyle
  }
  const contactStyle = {
    display: contactStyleState
  }
  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((result) => result.json())
      .then(result => setcountryList(result))
  }, [])

  const dataSectionHide = () => {
    setdivStyle("none")
  }
  const contactContainerHide = () => {
    setContactStyle("none")
  }
  const contactContainerShow = () => {

    setdivStyle("none")
    setContactStyle("block")
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
    setText("")

    countryList.filter(element => {
      if (element.name == value) {
        setWygrana(element)
      }
      setContactStyle("none")
      setdivStyle("block")

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


  return (
    <>
      <div className="pageContainer">
        <header>
          <h2>Country search</h2>
          <div>
            <div className="div">
              <input value={text} id="searchInput" className="autoCountriesInput" type="text" placeholder="Select country..." onChange={event => onTextChange(event)}></input>
              {renderSuggestions()}
            </div>
            <Link to="/Home"><p >Quiz</p></Link>
            <p onClick={contactContainerShow}>Contact</p>
          </div>
        </header>
        <section style={style} className="dataSection">
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
        <div style={contactStyle} className="contactContainer">
          <i onClick={contactContainerHide} className="far fa-window-close"></i>
          <div>
            <h3>Piotr Sitarek</h3>
            <p>Warsaw</p>
            <p>piotr.sitarek.05@gmail.com</p>
          </div>
        </div>
      </div>

    </>
  )
}

export default Search;