import axios from 'axios';

const baseURL = 'https://www.googleapis.com/books/v1/volumes';

function get(url) {
    return axios.get(baseURL + url);
}

export default {
    get,
    
};