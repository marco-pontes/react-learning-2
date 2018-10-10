import HttpService from './HttpService';

let BASE_URL = 'http://localhost:8080/api';

class TimelineService {
    constructor() {
        this.httpService = new HttpService();
    }

    fotos(token, login) {
        let url;
        if(login === undefined) {
            url = `${BASE_URL}/fotos?X-AUTH-TOKEN=${token}`;
        } else {
            url = `${BASE_URL}/public/fotos/${login}`;
        }
        return this.httpService.get(url)
            .then(fotosJSON => {
                return fotosJSON;
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Erro ao listar fotos');
            });
    }

    like(token, fotoId) {
        let url = `${BASE_URL}/fotos/${fotoId}/like?X-AUTH-TOKEN=${token}`;
        return this.httpService.post(url, { })
            .then(resposta => {
                return resposta;
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Erro ao dar like');
            });
    }

    comment(token, fotoId, comment) {
        let url = `${BASE_URL}/fotos/${fotoId}/comment?X-AUTH-TOKEN=${token}`;
        return this.httpService.post(url, { texto: comment })
            .then(resposta => {
                return resposta;
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Erro ao dar like');
            });
    }

    search(searchTerm) {
        let url = `${BASE_URL}/public/fotos/${searchTerm}`;
        return this.httpService.get(url)
            .then(resposta => {
                return resposta;
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Erro ao pesquisar');
            });
    }
}

export default TimelineService;