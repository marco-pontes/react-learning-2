import React, { Component } from 'react';
import PubSub from "pubsub-js";
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
        PubSub.subscribe('timeline', (topic, fotos) => {
            console.log(fotos);
            this.setState({fotos: fotos});
        });
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