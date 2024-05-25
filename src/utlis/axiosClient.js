import axios from 'axios';
import { KEY_ACCESS_TOKEN, getItem, removeItem, setItem } from './localStorageManager';
import store from '../redux/store';
import { setLoading, showToast } from '../redux/slices/appConfigSlice';
import { TOAST_FAILURE } from '../App';

export const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_BASE_URL,
    withCredentials: true
});

axiosClient.interceptors.request.use(
    (request) => {
        const accessToken = getItem(KEY_ACCESS_TOKEN);
        if (accessToken) {
            request.headers['Authorization'] = `Bearer ${accessToken}`;
            store.dispatch(setLoading(true));
        }
        return request;
    }
);

axiosClient.interceptors.response.use(
    async (response) => {
        store.dispatch(setLoading(false));
        const data = response.data;
        if (data.status === 'ok') {
            return data;
        }

        const originalRequest = response.config;
        const statusCode = data.statusCode;
        const error = data.message;

        store.dispatch(showToast({
            type: TOAST_FAILURE,
            message: error,
        }));

        // Access token expired
        if (statusCode === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshResponse = await axios.create({
                    withCredentials: true,
                }).get(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`);

                if (refreshResponse.data.status === 'ok') {
                    setItem(KEY_ACCESS_TOKEN, refreshResponse.data.result.accessToken);
                    originalRequest.headers['Authorization'] = `Bearer ${refreshResponse.data.result.accessToken}`;

                    return axios(originalRequest);
                } else {
                    removeItem(KEY_ACCESS_TOKEN);
                    window.location.replace("/login", "_self");
                    console.log('User navigated to login page');
                    return Promise.reject(error);
                }
            } catch (err) {
                removeItem(KEY_ACCESS_TOKEN);
                window.location.replace("/login", "_self");
                console.log('User navigated to login page');
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    },
    async (error) => {
        store.dispatch(setLoading(false));

        store.dispatch(showToast({
            type: TOAST_FAILURE,
            message: error,
        }));
        return Promise.reject(error);
    }
);
