import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error) => {
//     failedQueue.forEach(prom => {
//         if (error) {
//             prom.reject(error);
//         } else {
//             prom.resolve();
//         }
//     });
//     failedQueue = [];
// };

// instance.interceptors.response.use(
//     response => response,
//     async error => {
//         const originalRequest = error.config;
//         if (
//             error.response &&
//             error.response.status === 401 &&
//             !originalRequest._retry
//         ) {
//             if (isRefreshing) {
//                 return new Promise(function (resolve, reject) {
//                     failedQueue.push({ resolve, reject });
//                 })
//                 .then(() => instance(originalRequest))
//                 .catch(err => Promise.reject(err));
//             }

//             originalRequest._retry = true;
//             isRefreshing = true;

//             try {
//                 await instance.get('/auth/refresh-token');
//                 processQueue(null);
//                 isRefreshing = false;
//                 return instance(originalRequest);
//             } catch (err) {
//                 processQueue(err);
//                 isRefreshing = false;
//                 return Promise.reject(err);
//             }
//         }
//         return Promise.reject(error);
//     }
// );

export default instance;