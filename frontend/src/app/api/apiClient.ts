import axios from "axios";


const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
      },
});

apiClient.interceptors.request.use(
    (config) => {
         // Add authentication token config
         return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (res) => res,
    (error) => Promise.reject(error)
);


export default apiClient;