import React, { useState } from "react"
import style from "./styleSearch.scss"
import {
  HashRouter as Router,
  Route,
  Link,
  Switch,
  NavLink,
} from 'react-router-dom';
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed!");
});


const Search = () => {
  const [divStyle, setdivStyle] = useState("visible")
  const [dataList, setDataList] = useState([]);
  const style = {
    visibility: divStyle
  }

  const dataSectionHide = () => {
    console.log("działa klik")
    setdivStyle("hidden")
    console.log(dataList);
  }

  fetch("https://restcountries.eu/rest/v2/all")
    .then((result) => result.json())
    .then(result => setDataList(result))






  return (
    <>
      <div className="pageContainer">
        <section className="container searchSection">
          <h2>Search Country</h2>
          <form>
            <input id="searchInput"></input>
            <button>Search</button>
          </form>
        </section>
        <section style={style} className="container dataSection">
          <i onClick={dataSectionHide} className="far fa-window-close"></i>
          <div>Dane</div>
        </section>

        <section className="container quizSection">
          <Link to="/Home"><h2 id="quizText">Quiz</h2></Link>
        </section>
      </div>
    </>
  )
}

export default Search;

{/* <>  
<section class="container">
<div class="row">
  <div class="col-4">
  <h1>SEARCH BROWSER</h1>
  <input id="searchInput"></input></div> 
</div>
</section>
</>   */}

// {/*  */ }