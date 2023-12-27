import axios from "axios";
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

// const onResponseError = (error: AxiosError) => {
// 	if (
// 		error.response?.status !== 401 || error.config?.url?.includes(authUrl)
// 	) {
// 		const errMessage = error.response?.data || error?.response || error;
// 		return Promise.reject(errMessage);
// 	}
// 	return refreshToken(error, onUnauthenticated); // gọi hàm để refresh token.
// };

// // hàm để refresh token
// const refreshToken = async (error: AxiosError, logout: Function) => {
// 	const refreshToken = getLocalStorage(Authenticate.REFRESH_TOKEN_ETC);
// 	if (!refreshToken) {
// 		logout();
// 		return;
// 	}
// 	try {
// 		const { data } = await AuthApi.refreshToken({ refreshToken });
// 		setLocalStorage({ key: Authenticate.REFRESH_TOKEN_ETC, value: data.refreshToken });
// 		setCookie(
// 			Authenticate.AUTH,
// 			JSON.stringify({
// 				username: data.username,
// 				accessToken: data.accessToken,
// 			}),
// 			0.02
// 		);
// 		error.config.headers = {
// 			Authorization: "Bearer " + data.accessToken,
// 		}
// 		return axios(error.config);
// 	} catch (error) {
// 		logout();
// 		return;
// 	}
// }

export default function AxiosInterceptor(onUnauthenticated: Function) {
	const onRequestSuccess = (config: AxiosRequestConfig) => {
		const auth = localStorage.getItem('token');
		config.timeout = 10000;
		if (auth) {
			config.headers = {
				Authorization: "Bearer " + auth,
			};
		}
		// Các xử lý khác....
		return config;
	};
	const onResponseSuccess = (response: AxiosResponse) => {
		return response;
	};
	const onResponseError = (error: AxiosError) => {
		// Xử lý response thất bại
	};
}