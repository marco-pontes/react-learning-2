import React, { Component } from 'react';
import FotoItem from './FotoItem';
import Header from "./Header";

class Timeline extends Component {
    constructor() {
        super();
        this.state = {fotos:[]};
    }

    componentDidMount(){
        fetch('http://localhost:8080/api/public/fotos/rafael')
            .then(response => response.json())
            .then(fotos => {
                this.setState({fotos:fotos});
            });
    }

    render(){
       return (
               <div>
                   <Header/>
                    <div className="fotos container">
                       { this.state.fotos.map(foto => <FotoItem foto={foto}/>) }
                   </div>
               </div>
       )
    }
}

export default Timeline;