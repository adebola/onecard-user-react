import axios from 'axios';

// let BASE_URL = 'http://localhost:8081';
let BASE_URL = 'https://onecard01.factorialsystems.io';

const instance = axios.create({
	baseURL: `${BASE_URL}/api/v1`,
	timeout: 0,
	headers: { 'Content-Type': 'application/json' },
});

export default instance;
