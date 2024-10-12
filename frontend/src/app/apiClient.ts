import axios from "axios";


const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
      },
});

axiosClient.interceptors.request.use(
    (config) => {
         // Add authentication token config
         return config;
    },
    (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
    (res) => res,
    (error) => Promise.reject(error)
);


export default axiosClient;