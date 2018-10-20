
const header = function (state = '', action) {
    if(action.type === 'NOTIFICA') {
        return action.mensagem;
    }

    return state;
}

export {header};