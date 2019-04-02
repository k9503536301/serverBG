import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();


import TenderPage from "./components/tender-page/TenderPage.jsx";
// import Header from './components/Header.jsx';
import Calculator from './components/Calculator.jsx';
import TenderWinners from './components/tender-winners/TenderWinners.jsx';

class App extends React.Component {
    render() {
        return <Router history={ history }>
            <Switch>
                <Route exact path="/" component={ Calculator }/>
                <Route exact path="/calculator" component={ Calculator }/>
                <Route exact path="/calculator/:amount" component={ Calculator }/>
                <Route exact path="/search" component={ TenderWinners }/>
                <Route exact path="/information" component={ TenderPage }/>
                <Route exact path="/information/:RNT" component={ TenderPage }/>
            </Switch>

        </Router>
    }
}

ReactDOM.render(<App />, document.getElementById("target"));