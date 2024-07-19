import axios,{ InternalAxiosRequestConfig, AxiosError } from 'axios';


const api = axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
    timeout:10000,
})

api.interceptors.request.use(
    (config:InternalAxiosRequestConfig)=>{
        const token = localStorage.getItem('access-token');
        if (token && config.headers) {
            config.headers["Authorization"] = `Bearer ${token}`;
          }
        return config
    },
    (error:AxiosError) => {
        return Promise.reject(error);
      }
)

export default api;