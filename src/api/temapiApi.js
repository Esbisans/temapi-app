/*-------------------------------------------------------------------
|  API CLIENT FOR TEMAPI
|
|  Purpose: CONFIGURE AXIOS API CLIENT
|
|  Returns:  API CLIENT INSTANCE
*-------------------------------------------------------------------*/

import axios from 'axios';
import { getEnv } from '../helpers/getEnv';

const { VITE_API_URL } = getEnv();

const temapiApi = axios.create({
    baseURL: VITE_API_URL,
});

// configurar interceptores
temapiApi.interceptors.request.use((config) => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }
    return config;
});

export default temapiApi;
