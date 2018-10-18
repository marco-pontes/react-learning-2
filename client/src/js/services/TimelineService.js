import HttpService from './HttpService';
import PubSub from "pubsub-js";

let BASE_URL = 'http://localhost:8080/api';

class TimelineService {
    constructor() {
        this.httpService = new HttpService();
        this.fotos = [];
    }

    carregaFotos(token, login) {
        let url;
        if(login === undefined) {
            url = `${BASE_URL}/fotos?X-AUTH-TOKEN=${token}`;
        } else {
            url = `${BASE_URL}/public/fotos/${login}`;
        }
        return this.httpService.get(url)
            .then(fotosJSON => {
                this.fotos = fotosJSON;
                PubSub.publish('timeline', this.fotos);
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Erro ao listar fotos');
            });
    }

    like(token, fotoId) {
        let url = `${BASE_URL}/fotos/${fotoId}/like?X-AUTH-TOKEN=${token}`;
        return this.httpService.post(url, { })
            .then(resposta => JSON.parse(resposta))
            .then(liker => {
                const fotoAchada = this.fotos.find(foto => foto.id === fotoId);
                fotoAchada.likeada = !fotoAchada.likeada;
                let possibleLiker = fotoAchada.likers.find((existingLiker) => existingLiker.login === liker.login);
                if(possibleLiker === undefined) {
                    fotoAchada.likers.push(liker);
                } else {
                    const newLikers = fotoAchada.likers.filter((existingLiker) => existingLiker.login !== possibleLiker.login);
                    fotoAchada.likers = newLikers;
                }
                PubSub.publish('timeline', this.fotos);
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Erro ao dar like');
            });
    }

    comment(token, fotoId, comment) {
        let url = `${BASE_URL}/fotos/${fotoId}/comment?X-AUTH-TOKEN=${token}`;
        return this.httpService.post(url, { texto: comment })
            .then(resposta => JSON.parse(resposta))
            .then(commentObject => {
                const fotoAchada = this.fotos.find(foto => foto.id === fotoId);
                fotoAchada.comentarios.push(commentObject);
                console.log(commentObject);
                PubSub.publish('timeline', this.fotos);
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

    subscribe(callback) {
        PubSub.subscribe('timeline', (topic, fotos) => {
            callback(fotos);
        });
    }
}

export default TimelineService;