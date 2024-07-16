import axios,{ InternalAxiosRequestConfig, AxiosError } from 'axios';


const api = axios.create({
    baseURL:"http://localhost:5215/api/",
    timeout:10000,
})

api.interceptors.request.use(
    (config:InternalAxiosRequestConfig)=>{
        const token = localStorage.getItem('token');
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