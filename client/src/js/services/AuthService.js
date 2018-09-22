import HttpService from './HttpService';

let BASE_URL = 'http://localhost:8080/api';

class AuthService {
    constructor() {
        this.httpService = new HttpService();
    }

    login(dado) {
        let url = `${BASE_URL}/public/login`;
        return this.httpService.post(url, dado)
            .then(resposta => {
                return resposta;
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Erro ao logar');
            });
    }
}

export default AuthService;