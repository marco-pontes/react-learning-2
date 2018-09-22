import React, { Component } from 'react';
import FotoItem from './FotoItem';
import Header from "./Header";
import TimelineService from "../../services/TimelineService";

class Timeline extends Component {
    constructor() {
        super();
        this.state = {fotos:[]};
        this.timelineService = new TimelineService();
    }

    componentDidMount(){
        const token = sessionStorage.getItem('auth-token');
        this.timelineService.fotos(token)
            .then(fotos => {
                this.setState({fotos:fotos});
            });
    }

    render(){
       return (
               <div>
                   <Header/>
                    <div className="fotos container">
                       { this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto}/>) }
                   </div>
               </div>
       )
    }
}

export default Timeline;