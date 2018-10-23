import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group'
import FotoItem from './FotoItem';
import Header from "./Header";
import TimelineService from "../../services/TimelineService";

class Timeline extends Component {
    constructor() {
        super();
    }

    loadTimeline(props) {
        this.props.lista(props.login);
    }

    componentDidMount(){
        this.loadTimeline(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props. login !== nextProps.login) {
            this.loadTimeline(nextProps);
        }
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
                            { this.props.fotos.map(foto => {
                                return (
                                    <FotoItem
                                        key={foto.id}
                                        foto={foto}
                                        comment={this.props.comenta}
                                        like={this.props.like}
                                    />
                                );
                            }) }
                        </CSSTransitionGroup>
                   </div>
               </div>
       )
    }
}

const mapStateToProps = state => {
    return { fotos: state.timeline };
};

const mapDispatchToProps = dispatch => {
    const token = sessionStorage.getItem('auth-token');
    return {
        like: (fotoId) => {
            dispatch(TimelineService.like(token, fotoId));
        },
        comenta: (fotoId, comment) => {
            dispatch(TimelineService.comenta(token, fotoId, comment));
        },
        lista: (login) => {
            dispatch(TimelineService.carregaFotos(token, login));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);