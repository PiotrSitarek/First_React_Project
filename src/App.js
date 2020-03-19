import React from 'react';
import Home from "./pages/Home/Home"
import Quiz from "./pages/Quiz/Quiz"
import PageNotFound from "./pages/PageNotFound/PageNotFound"
import Loose from "../src/pages/LoosePage/Loose"
import Winner from "../src/pages/WinPage/Winner"
import WinnersList from "../src/pages/WinnersList/WinnersList"
import {
  HashRouter as Router,
  Route,
  Link,
  Switch,
  NavLink,
} from 'react-router-dom';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/Quiz' component={Quiz} />
        <Route path="/Loose" component={Loose} />
        <Route path="/Winner" component={Winner} />
        <Route path="/WinnersList" component={WinnersList} />
        <Route component={PageNotFound} /> {/*komponent not found zawsze na końcu!*/}
      </Switch>
    </Router>
  )
}

export default App;
