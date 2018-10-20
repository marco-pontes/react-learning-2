import React, { Component } from "react";
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import Timeline from "./Timeline";
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Login from "./Login";
import {timeline} from "../../reducers/timeline";
import {header} from "../../reducers/header";

const reducers = combineReducers({timeline, header});
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

class App extends Component {
    constructor(props) {
        super(props);
        this.verifyAuth = this.verifyAuth.bind(this);
        this.renderRoute = this.renderRoute.bind(this);
    }

    verifyAuth() {
        return sessionStorage.getItem('authenticated') === 'true';
    }

    renderRoute(props) {
        if (this.verifyAuth() || props.match.params.login) {
            return (
                <Timeline login={props.match.params.login ? props.match.params.login : undefined} store={store} />
            );
        } else {
            return (
                <Redirect to="/?msg=Você precisa estar logado para acessar a Timeline!"/>
            );
        }
    }

    render() {
        return (
            <div id="root">
                <div className="main">
                    <Router>
                        <Switch>
                            <Route path="/login" component={Login} />
                            <Route path="/timeline/:login?" render={this.renderRoute}/>
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

