import { List } from 'immutable';

const trocaFoto = (lista, fotoId, propriedadesParaAtualizar) => {
    const fotoEstadoAntigo = lista.find(foto => foto.id === fotoId);
    const props = propriedadesParaAtualizar(fotoEstadoAntigo);
    const fotoEstadoNovo = Object.assign({}, fotoEstadoAntigo, props);
    const indice = lista.findIndex(foto => foto.id === fotoId);
    return lista.set(indice, fotoEstadoNovo);
}

const timeline = function (state = new List(), action) {
    if(action.type === 'LISTAGEM') {
        return new List(action.fotos);
    }

    if(action.type === 'COMENTARIO') {
        return trocaFoto(state, action.fotoId, (fotoEstadoAntigo) => {
            const novosComentarios = fotoEstadoAntigo.comentarios.concat(action.comentario);
            return { comentarios: novosComentarios };
        });
    }

    if(action.type === 'LIKE') {
        return trocaFoto(state, action.fotoId, (fotoEstadoAntigo) => {
            let possibleLiker = fotoEstadoAntigo.likers.find((existingLiker) => existingLiker.login === action.liker.login);
            let novosLikers;
            if (possibleLiker === undefined) {
                novosLikers = fotoEstadoAntigo.likers.concat(action.liker);
            } else {
                novosLikers = fotoEstadoAntigo.likers.filter((existingLiker) => existingLiker.login !== possibleLiker.login);
            }
            return { likers: novosLikers, likeada: !fotoEstadoAntigo.likeada };
        });
    }
    return state;
}

export {timeline};