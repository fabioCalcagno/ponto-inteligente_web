import axios from 'axios';
//http://localhost:8080
const api = axios.create({
    baseURL: 'https://ponto-inteligente-fabioit.herokuapp.com'
});

export default api;