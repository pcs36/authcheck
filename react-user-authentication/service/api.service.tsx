import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

import { store } from '../redux/store';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_URL + import.meta.env.VITE_API_VERSION,
  timeout: 10000, // Adjust as needed
  headers: {
    'Content-Type': 'application/json',
  },
});

// console.log("store--------------------", typeof store)
axiosInstance.interceptors.request.use(
  async function (config: InternalAxiosRequestConfig) {
    // Get the authentication token from wherever you store it (e.g., AsyncStorage)
    const { store } = await import('../redux/store');
    if (store && typeof store.getState === 'function') {
      // const state = store.getState();
      const authToken = store.getState().userReducer?.token;

      // If the token exists, add it to the request headers
      console.log('Auth Token from store:', authToken);
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
      return config;
    }
  },
  function (error) {
    // Handle request errors
    return Promise.reject(error);
  },
);

// Response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Do something with successful response
    if (
      response.data?.status === 410 ||
      response.data?.status === 401 ||
      response.data?.status === 403 ||
      response.data?.message === 409
    ) {
      // autoLogout();
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosInstance;


