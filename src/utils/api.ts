import { Auth } from '@/services/auth';
import { useUserStore } from '@/stores/user';
import axios, { 
  type AxiosInstance, 
  type InternalAxiosRequestConfig, 
  type AxiosResponse, 
  AxiosError 
} from 'axios';
import humps from 'humps';
import { useLoaderStore } from "@/stores/loader";

  const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });
  
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      useLoaderStore.getState().incrementPending()

      if (config.data && !(config.data instanceof FormData)) {
        config.data = humps.decamelizeKeys(config.data);
      }
      
      if (config.params) {
        config.params = humps. decamelizeKeys(config.params);
      }

      return config;
    },
    (error: AxiosError): Promise<never> => {
      useLoaderStore.getState().decrementPending()

      return Promise.reject(error);
    }
  );
  
  api.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
      useLoaderStore.getState().decrementPending()

      response.data = humps.camelizeKeys(response.data);

      return response.data;
    },
    (error: AxiosError): Promise<never> => {
      useLoaderStore.getState().decrementPending()

      if (error.response) {
        const status = error.response.status;
  
        if (status === 401) {
          if (useUserStore.getState().user) {
            Auth.logout()
          }
        } else if (status === 403) {
          console.error('Forbidden: You do not have permission.');
        } else if (status >= 500) {
          console.error('Server Error: Please try again later.');
        }
      } else {
        console.error('Network Error: Please check your connection.');
      }
      
      return Promise.reject(error);
    }
  );

  export default api;