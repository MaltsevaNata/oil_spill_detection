import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from "react-router-dom";

import MainPage from "./pages/MainPage";

function App(props) {
    return ( <Router>
            <Switch>
                <Route exact path='/' component={MainPage} />
                <Redirect to='/' component={MainPage} />
            </Switch>
        </Router>

)
}

export default App;