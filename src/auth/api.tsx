import axios from 'axios';

const api = axios.create({
	baseURL: 'http://127.0.0.1:8085/api',
});

// Add a request interceptor
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			try {
				const refresh_token = localStorage.getItem('refresh_token');
				const response = await axios.post('http://127.0.0.1:8085/api/refresh', { refresh_token });
				localStorage.setItem('token', response.data.access_token);
				localStorage.setItem('token_expires_in', response.data.token_expires_in);

				// Retry the original request with the new token
				originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
				return axios(originalRequest);
			} catch (error) {
				setTimeout(() => {
					window.location.replace('http://localhost:3000/login');
					localStorage.removeItem("token");
					localStorage.removeItem("refresh_token");
					localStorage.removeItem("token_expires_in");
				}, 1000);
			}
		}
		return Promise.reject(error);
	}
);

export default api

