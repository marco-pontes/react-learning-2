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

    loadTimeline(nextProps) {
        const token = sessionStorage.getItem('auth-token');
        this.timelineService.fotos(token, nextProps.login)
            .then(fotos => {
                this.setState({fotos:fotos});
            });
    }

    componentDidMount(){
        this.loadTimeline(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.loadTimeline(nextProps);
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