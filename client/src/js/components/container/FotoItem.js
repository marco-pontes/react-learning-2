import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PubSub from 'pubsub-js';
import TimelineService from "../../services/TimelineService";

class FotoAtualizacoes extends Component {

    constructor(props) {
        super(props);
        this.like = this.like.bind(this);
        this.timelineService = new TimelineService();
        this.state = { liked : props.foto.likeada };
    }

    like(event) {
        event.preventDefault();
        let token = sessionStorage.getItem('auth-token');
        this.timelineService.like(token, this.props.foto.id)
            .then((liker) => {
                this.setState({ liked : !this.state.liked });
                PubSub.publish('atualiza-liker', { fotoId: this.props.foto.id, liker });
                console.log(liker);
            })
            .catch((msg) => console.log(msg));
    }

    render(){
        return (
            <section className="fotoAtualizacoes">
                <a href="#" onClick={this.like} className={this.state.liked ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like'}>Likar</a>
                <form className="fotoAtualizacoes-form">
                    <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo"/>
                    <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
                </form>

            </section>
        );
    }
}

class FotoInfo extends Component {

    constructor(props) {
        super(props);
        this.state = { likers: this.props.foto.likers };
    }

    componentWillMount() {
        PubSub.subscribe('atualiza-liker', (topico, { fotoId, liker }) => {
            if (fotoId === this.props.foto.id) {
                let possibleLiker = this.state.likers.find((existingLiker) => existingLiker.login === liker.login);
                if(possibleLiker === undefined) {
                    const newLikers = this.state.likers.concat(liker);
                    this.setState({ likers: newLikers });
                } else {
                    const newLikers = this.state.likers.filter((existingLiker) => existingLiker.login !== possibleLiker.login);
                    this.setState({ likers: newLikers });
                }
            }
        });
    }

    render(){
        return (
            <div className="foto-info">
                <div className="foto-info-likes">

                    {
                        this.state.likers.map((liker) => {

                            return <Link to={`/timeline/${liker.login}`} >{liker.login}, </Link>;
                        })
                    }

                    curtiram

                </div>

                <p className="foto-info-legenda">
                    <a className="foto-info-autor">{this.props.foto.loginUsuario} </a>
                    {this.props.foto.comentario}
                </p>

                <ul className="foto-info-comentarios">
                    {
                        this.props.foto.comentarios.map(comentario => {
                            return (<li className="comentario">
                                        <a className="foto-info-autor"> {comentario.login} </a>
                                        {comentario.texto}
                                    </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}

class FotoHeader extends Component {
    render(){
        return (
            <header className="foto-header">
                <figure className="foto-usuario">
                    <img src={this.props.foto.urlPerfil} alt="foto do usuario"/>
                    <figcaption className="foto-usuario">
                        <Link to={"/timeline/" + this.props.foto.loginUsuario}>
                            {this.props.foto.loginUsuario}
                        </Link>
                    </figcaption>
                </figure>
                <time className="foto-data">{this.props.foto.horario}</time>
            </header>
        );
    }
}

class FotoItem extends Component {
    render(){
        return (
            <div className="foto">
                <FotoHeader foto={this.props.foto}/>
                <img alt="foto" className="foto-src" src={ this.props.foto.urlFoto } />
                <FotoInfo foto={this.props.foto} />
                <FotoAtualizacoes foto={this.props.foto} />
            </div>
        );
    }
}

export default FotoItem;