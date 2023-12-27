import axios from 'axios';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

const API_ENDPOINT = 'http://127.0.0.1:8085/api';
interface config {
	path:string,
	id?:number,
	data?:object,
}
class UserService {
	get(payload:config) {
		if (payload.id) {
			payload.path += '/' + payload.id;
		}
		return axios.get(payload.path,{
			baseURL:API_ENDPOINT,
		});
	}
	post (payload:config) {
		return axios.post(payload.path, payload.data, {
			baseURL:API_ENDPOINT,
		});
	}

	put (payload:config) {
		return axios.put(payload.path, payload.data, {
			baseURL:API_ENDPOINT,
		});
	}
}

export default new UserService();