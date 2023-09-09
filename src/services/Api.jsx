import axios from 'axios';
import Cookies from 'js-cookie';

const Api = axios.create({
    baseURL: 'https://desa-api.appdev.my.id',

    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

Api.interceptors.response.use(
    function (response) {
        return response;
    },
    (error) => {
        if (401 === error.response.status) {
            Cookies.remove('token');
            Cookies.remove('user');
            Cookies.remove('permissions');

            window.location = '/';
        } else if (403 === error.response.status) {
            window.location = '/forbidden';
        } else {
            return Promise.reject(error);
        }
    }
);

export default Api;
