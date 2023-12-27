import axios, { Method } from 'axios';
export type Request = {
	endpoint: string;
	method: Method;
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const execute = async (
	request: Request,
	errorMessage: string,
	payload?: JSON
): Promise<any> => {
	const response = await requestAPI(request, payload);

	if (response.status < 200 || response.status >= 300) {
		return response.errors;
	}

	return response.data;
};
const requestAPI = async (request: Request, payload?: JSON): Promise<any> => {
	const headers: any = {
		'Content-Type': 'application/json',
		// Accept: 'application/json',
		// 'X-Requested-With': 'XMLHttpRequest',
		// Authorization: `Bearer ${apiToken}`,
	};
	return await axios({
		headers: { ...headers },
		url: `${request.endpoint}`,
		method: request.method,
		data: payload === null ? null : JSON.stringify(payload),
	});
};
