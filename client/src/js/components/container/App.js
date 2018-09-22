import React, { Component } from "react";
import Timeline from "./Timeline";
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "./Login";

class App extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div id="root">
                <div className="main">
                    <Router>
                        <Switch>
                            <Route path="/login" component={Login} />
                            <PrivateRoute path="/timeline" component={Timeline} />
                            <Route component={NoMatch} />
                        </Switch>
                    </Router>
                </div>
            </div>
        );
    }
}

const NoMatch = (props) => (

        <Redirect
            to={{
                pathname: "/login",
                state: { from: props.location }
            }}
        />

);

export default App;

