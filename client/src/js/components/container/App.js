import React, { Component } from "react";
import Timeline from "./Timeline";
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Login from "./Login";

class App extends Component {
    constructor(props) {
        super(props);
        this.verifyAuth = this.verifyAuth.bind(this);
        this.renderRoute = this.renderRoute.bind(this);
    }

    verifyAuth() {
        debugger;
        return sessionStorage.getItem('authenticated') === 'true';
    }

    renderRoute() {
        debugger;
        if (this.verifyAuth() || this.props.match.params.login) {
            return (
                <Timeline />
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

