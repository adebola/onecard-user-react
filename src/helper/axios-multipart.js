
import axios from "axios";
import UserServices from "../services/UserServices";

let BASE_URL = 'https://onecard01.factorialsystems.io';
// let BASE_URL = 'http://localhost:8081';

const instance = axios.create({
    baseURL: `${BASE_URL}/api/v1`,
    timeout: 0,
    headers: { 'Content-Type': 'multipart/form-data' },
});

instance.interceptors.request.use((config) => {
    if (UserServices.isLoggedIn()) {
        const cb = () => {
            config.headers.Authorization = `Bearer ${UserServices.getToken()}`;
            return Promise.resolve(config);
        };
        return UserServices.updateToken(cb);
    }
});

export default instance;
