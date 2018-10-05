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
}

export default TimelineService;