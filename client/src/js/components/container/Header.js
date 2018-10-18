import React, { Component } from 'react';
import Logout from './Logout';
import { Link } from "react-router-dom";

class Header extends Component {

    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
    }

    search(event) {
        event.preventDefault();
        this.props.store.search(this.searchField.value);
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