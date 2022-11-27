import axios from 'axios';

const url = process.env.REACT_APP_API_URL
//console.log(url);

const clienteAxios = axios.create({
    //baseURL: 'http://localhost:4000/'
    baseURL: url
});

export default clienteAxios;