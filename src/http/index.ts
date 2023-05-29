import router from '@/router';
import axios , {AxiosInstance} from 'axios'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'

const api: AxiosInstance = axios.create({
    baseURL: "http://localhost:8080/"
});

api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if(error.response.status === 403) {
            //erro 403 = o acesso foi negado
            Cookies.remove('token');
            Cookies.remove('email');
            router.push('/login');
            Swal.fire({
                title: 'Psiuuu, espera aí...',
                text: 'Antes de prosseguir para a página você precisa fazer login!',
                icon: 'warning',
            })
        }
        return Promise.reject(error);
    }
)

export default api;