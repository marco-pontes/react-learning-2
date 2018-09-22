import HttpService from './HttpService';

let BASE_URL = 'http://localhost:8080/api';

class TimelineService {
    constructor(httpService) {
        this.httpService = new HttpService();
    }

    fotos(token) {
        let url = `${BASE_URL}/fotos?X-AUTH-TOKEN=${token}`;
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