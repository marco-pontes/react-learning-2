class HttpService {

    handleErrors(result) {
        if(!result.ok) {
            throw new Error(result.statusText);
        }
        return result;

    }

    get(url) {
        return fetch(url)
            .then(res => this.handleErrors(res))
            .then(res => res.json());
    }

    post(url, dado) {
        return fetch(url, {
            headers: {'Content-type': 'application/json'},
            method: 'post',
            body: JSON.stringify(dado)
        })
            .then(res => this.handleErrors(res))
            .then(res => res.json());
    }
}

export default HttpService;