import axios from 'axios';

const api = axios.create({
    //baseURL: 'https://szakdoga-kovetorendszer.herokuapp.com/api',
    baseURL: 'http://localhost:3001/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;