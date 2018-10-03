import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import AuthService from "../../services/AuthService";

class Login extends Component {
    constructor (props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.authService = new AuthService();
        const params = new URLSearchParams(props.location.search);
        const msgParam = params.get('msg');
        this.state = { mensagem: msgParam, isAuthenticated: sessionStorage.getItem('authenticated') === 'true'};
    }

    submit(event) {
        event.preventDefault();
        this.authService
            .login({login: this.login.value, senha: this.senha.value})
            .then((token) => {
                console.log(token);
                sessionStorage.setItem('authenticated', 'true');
                sessionStorage.setItem('auth-token', token);
                this.setState({ isAuthenticated: true });
            }
            )
            .catch((e) => {
                this.setState({ mensagem: e.message });
                console.log(e);
            });
    }

    render(){
        if (this.state.isAuthenticated) {
            return <Redirect to="/timeline" />;
        }
        return (
            <div className="login-box">
                <h1 className="header-logo">Instalura</h1>
                {this.state.mensagem !== '' ? (<div>{this.state.mensagem}</div>) : (null)}
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