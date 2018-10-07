import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

class Logout extends Component {
    constructor (props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        sessionStorage.setItem('authenticated', "");
        sessionStorage.setItem('auth-token', "");
        this.props.history.push("/login")
    }

    render(){
        return <button onClick={this.onClick} > Sair </button>;
    }
}


export default withRouter(Logout);