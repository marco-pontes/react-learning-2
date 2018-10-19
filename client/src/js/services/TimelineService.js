import HttpService from '../services/HttpService';

let BASE_URL = 'http://localhost:8080/api';

const httpService = new HttpService();

class TimelineService {

    static carregaFotos(token, login) {
        return dispatch => {
            let url;
            if(login === undefined) {
                url = `${BASE_URL}/fotos?X-AUTH-TOKEN=${token}`;
            } else {
                url = `${BASE_URL}/public/fotos/${login}`;
            }
            return httpService.get(url)
                .then(fotosJSON => {
                    dispatch({ type: 'LISTAGEM', fotos: fotosJSON });
                })
                .catch(erro => {
                    console.log(erro);
                    throw new Error('Erro ao listar fotos');
                });
        }
    }

    static like(token, fotoId) {
        return dispatch => {
            let url = `${BASE_URL}/fotos/${fotoId}/like?X-AUTH-TOKEN=${token}`;
            return httpService.post(url, {})
                .then(resposta => JSON.parse(resposta))
                .then(liker => {
                    dispatch({type: 'LIKE', fotoId, liker});
                })
                .catch(erro => {
                    console.log(erro);
                    throw new Error('Erro ao dar like');
                });
        }
    }

    static comenta(token, fotoId, comment) {
        return dispatch => {
            let url = `${BASE_URL}/fotos/${fotoId}/comment?X-AUTH-TOKEN=${token}`;
            return httpService.post(url, {texto: comment})
                .then(resposta => JSON.parse(resposta))
                .then(commentObject => {
                    dispatch({ type: 'COMENTARIO', fotoId, comentario: commentObject })
                })
                .catch(erro => {
                    console.log(erro);
                    throw new Error('Erro ao dar like');
                });
        }
    }

    static search(searchTerm) {
        return dispatch => {
            let url = `${BASE_URL}/public/fotos/${searchTerm}`;
            return httpService.get(url)
                .then(fotosJSON => {
                    dispatch({type: 'LISTAGEM', fotos: fotosJSON });
                })
                .catch(erro => {
                    console.log(erro);
                    throw new Error('Erro ao pesquisar');
                });
        }
    }
}

export default TimelineService;