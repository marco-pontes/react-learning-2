import React, { Component } from 'react';
import PubSub from "pubsub-js";
import { CSSTransitionGroup } from 'react-transition-group'
import FotoItem from './FotoItem';
import Header from "./Header";
import TimelineService from "../../services/TimelineService";

class Timeline extends Component {
    constructor() {
        super();
        this.state = {fotos:[]};
        this.timelineService = new TimelineService();
        this.like = this.like.bind(this);
        this.comment = this.comment.bind(this);
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

        PubSub.subscribe('atualiza-liker', (topico, { fotoId, liker }) => {
            liker = JSON.parse(liker);
            const fotoAchada = this.state.fotos.find(foto => foto.id === fotoId);
            fotoAchada.likeada = !fotoAchada.likeada;
            let possibleLiker = fotoAchada.likers.find((existingLiker) => existingLiker.login === liker.login);
            if(possibleLiker === undefined) {
                fotoAchada.likers.push(liker);
            } else {
                const newLikers = fotoAchada.likers.filter((existingLiker) => existingLiker.login !== possibleLiker.login);
                fotoAchada.likers = newLikers;
            }
            this.setState({ fotos: this.state.fotos });
        });

        PubSub.subscribe('novos-comentarios', (topic, { fotoId, comment }) => {
            comment = JSON.parse(comment);
            const fotoAchada = this.state.fotos.find(foto => foto.id === fotoId);
            fotoAchada.comentarios.push(comment);
            this.setState({ fotos: this.state.fotos });
            console.log(comment);
        });
    }

    componentWillReceiveProps(nextProps) {
        this.loadTimeline(nextProps);
    }

    like (fotoId) {
        let token = sessionStorage.getItem('auth-token');
        this.timelineService.like(token, fotoId)
            .then((liker) => {
                PubSub.publish('atualiza-liker', { fotoId, liker });
                console.log(liker);
            })
            .catch((msg) => console.log(msg));
    }

    comment(fotoId, comment){
        let token = sessionStorage.getItem('auth-token');
        this.timelineService.comment(token, fotoId, comment)
            .then((comment)  => {
                PubSub.publish('novos-comentarios', { fotoId, comment });
            })
            .catch();
    }

    render(){
       return (
               <div>
                   <Header/>
                    <div className="fotos container">
                        <CSSTransitionGroup
                            transitionName="timeline"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={300}
                        >
                            { this.state.fotos.map(foto => {
                                return (
                                    <FotoItem
                                        key={foto.id}
                                        foto={foto}
                                        comment={this.comment}
                                        like={this.like}
                                    />
                                );
                            }) }
                        </CSSTransitionGroup>
                   </div>
               </div>
       )
    }
}

export default Timeline;