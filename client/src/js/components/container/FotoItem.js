import React, { Component } from 'react';
import { Link } from "react-router-dom";

class FotoAtualizacoes extends Component {

    constructor(props) {
        super(props);
        this.like = this.like.bind(this);
        this.comment = this.comment.bind(this);
    }

    comment(event) {
        event.preventDefault();
        this.props.comment(this.props.foto.id, this.commentField.value)
    }

    like(event) {
        event.preventDefault();
        this.props.like(this.props.foto.id);
    }

    render(){
        return (
            <section className="fotoAtualizacoes">
                <a href="#" onClick={this.like} className={this.props.foto.likeada ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like'}>Likar</a>
                <form className="fotoAtualizacoes-form" onSubmit={this.comment}>
                    <input type="text" ref={input => this.commentField = input} placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo"/>
                    <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
                </form>

            </section>
        );
    }
}

class FotoInfo extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className="foto-info">
                <div className="foto-info-likes">

                    {
                        this.props.foto.likers.map((liker) => {
                            return (
                            <span key={liker.login}>
                                <Link to={`/timeline/${liker.login}`} >{liker.login}, </Link>
                            </span>
                            );
                        })
                    }
                    { this.props.foto.likers.length > 0 ? this.props.foto.likers.length == 1 ? 'curtiu' : 'curtiram' : null }
                </div>

                <p className="foto-info-legenda">
                    <a className="foto-info-autor">{this.props.foto.loginUsuario} </a>
                    {this.props.foto.comentario}
                </p>

                <ul className="foto-info-comentarios">
                    {
                        this.props.foto.comentarios.map(comentario => {
                            return (<li className="comentario" key={comentario.id}>
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
                <FotoAtualizacoes
                    foto={this.props.foto}
                    comment={this.props.comment}
                    like={this.props.like}
                />
            </div>
        );
    }
}

export default FotoItem;