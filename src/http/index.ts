import axios , {AxiosInstance} from 'axios'

const api: AxiosInstance = axios.create({
    baseURL: "http://192.168.15.119:8080/"
});

export default api;