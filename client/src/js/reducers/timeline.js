
const timeline = function (state = [], action) {
    if(action.type === 'LISTAGEM') {
        return action.fotos;
    }

    if(action.type === 'COMENTARIO') {
        const fotoId = action.fotoId;
        const comentario = action.comentario;
        const fotoAchada = state.find(foto => foto.id === fotoId);
        fotoAchada.comentarios.push(comentario);
        return state;
    }

    if(action.type === 'LIKE') {
        const fotoId = action.fotoId;
        const liker = action.liker;
        const fotoAchada = state.find(foto => foto.id === fotoId);
        fotoAchada.likeada = !fotoAchada.likeada;
        let possibleLiker = fotoAchada.likers.find((existingLiker) => existingLiker.login === liker.login);
        if (possibleLiker === undefined) {
            fotoAchada.likers.push(liker);
        } else {
            const newLikers = fotoAchada.likers.filter((existingLiker) => existingLiker.login !== possibleLiker.login);
            fotoAchada.likers = newLikers;
        }
        return state;
    }
    return state;
}

export {timeline};