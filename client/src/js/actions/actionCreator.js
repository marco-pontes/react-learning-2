const listagem = (fotos) => {
    return { type: 'LISTAGEM', fotos };
};

const comentario = (fotoId, comentario) => {
    return { type: 'COMENTARIO', fotoId, comentario};
};

const like = (fotoId, liker) => {
    return {type: 'LIKE', fotoId, liker};
};

const notifica = (mensagem) => {
    return {type: 'NOTIFICA', mensagem};
};

export {listagem, comentario, like, notifica};