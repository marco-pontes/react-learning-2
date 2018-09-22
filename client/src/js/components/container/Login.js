import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

class Login extends Component {
    constructor () {
        super();
        this.submit = this.submit.bind(this);
    }

    submit(event) {
        event.preventDefault();
    }

    render(){
        if (sessionStorage.isAuthenticated === 'true') {
            return <Redirect to="/timeline" />;
        }
        return (
            <div className="login-box">
                <h1 className="header-logo">Instalura</h1>
                <form onSubmit={ this.submit }>
                    <input type="text" ref={input => this.login = input}/>
                    <input type="password" ref={input => this.senha = input} />
                    <input type="submit" value="login" />
                </form>
            </div>
        );
    }
}


export default Login;