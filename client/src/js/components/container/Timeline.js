import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import FotoItem from './FotoItem';
import Header from "./Header";
import TimelineService from "../../services/TimelineService";

class Timeline extends Component {
    constructor() {
        super();
        this.state = {fotos:[]};
        this.like = this.like.bind(this);
        this.comment = this.comment.bind(this);
    }

    loadTimeline(nextProps) {
        const token = sessionStorage.getItem('auth-token');
        this.props.store.dispatch(TimelineService.carregaFotos(token, nextProps.login));
    }

    componentDidMount(){
        this.loadTimeline(this.props);
        this.props.store.subscribe(() => {
            console.log(this.props.store.getState());
            this.setState({ fotos: this.props.store.getState() });
        });
    }

    componentWillReceiveProps(nextProps) {
        this.loadTimeline(nextProps);
    }

    like (fotoId) {
        let token = sessionStorage.getItem('auth-token');
        this.props.store.dispatch(TimelineService.like(token, fotoId));
    }

    comment(fotoId, comment){
        let token = sessionStorage.getItem('auth-token');
        this.props.store.dispatch(TimelineService.comenta(token, fotoId, comment));
    }

    render(){
       return (
               <div>
                   <Header store={this.props.store}/>
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