import React, { Component } from 'react';
import Logout from './Logout';
import { Link } from "react-router-dom";
import TimelineService from "../../services/TimelineService";

class Header extends Component {

    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.state = { mensagem : '' };
    }

    componentDidMount() {
        this.props.store.subscribe(() => {
           this.setState({ mensagem: this.props.store.getState().header });
        });
    }

    search(event) {
        event.preventDefault();
        this.props.store.dispatch(TimelineService.search(this.searchField.value));
    }

    render(){
        return (
            <header className="header container">
                <Link to="/timeline">
                    <h1 className="header-logo">
                        Instalura
                    </h1>
                </Link>
                <form className="header-busca" onSubmit={this.search}>
                    <input type="text" name="search" placeholder="Pesquisa" ref={input => this.searchField = input} className="header-busca-campo"/>
                    <input type="submit" value="Buscar" className="header-busca-submit"/>
                </form>

                <span>{this.state.mensagem}</span>
                <nav>
                    <ul className="header-nav">
                        <li className="header-nav-item">
                            <a href="#">
                                ♡
                                {/*                 ♥ */}
                                {/* Quem deu like nas minhas fotos */}
                            </a>

                        </li>
                        <li className="header-nav-item">
                            <Logout />
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;