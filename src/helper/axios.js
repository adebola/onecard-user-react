import axios from 'axios';
import UserServices from '../services/UserServices';

let BASE_URL = 'https://onecard01.factorialsystems.io';

const instance = axios.create({
	baseURL: `${BASE_URL}/api/v1`,
	timeout: 0,
	headers: { 'Content-Type': 'application/json' },
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
