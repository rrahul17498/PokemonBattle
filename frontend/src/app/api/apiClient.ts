import axios from "axios";
import { queryClient } from "../query/client";
import { QUERY_KEYS } from "../query/queryKeys";
import { UserSession } from "../query/models";


const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
      },
});

apiClient.interceptors.request.use(
    (config) => {
         // Token config for apis
        const userSession =  queryClient.getQueryData<UserSession>([QUERY_KEYS.userSession]);
        const token = userSession?.token;
         if (token) {
            config.headers.Authorization = `Bearer ${token}`
         }
         return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (res) => res,
    (error) => Promise.reject(error)
);


export default apiClient;