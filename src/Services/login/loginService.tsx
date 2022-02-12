import axios, { AxiosResponse } from 'axios';
import { loginResponse } from './loginResponse';
import loginType  from './loginType';

const instance = axios.create({
	baseURL: 'https://auth.corp.tatneft.ru/api/',
	timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
	get: (url: string) => instance.get(url).then(responseBody),
	post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
	put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
	delete: (url: string) => instance.delete(url).then(responseBody),
};

const loginApi = {
	login:(login:loginType):Promise<loginResponse>=> requests.post('login', login),
	validate:(token:string):Promise<Boolean>=>requests.get(`tokens/${token}/validate`),
	refresh:(refreshToken:string):Promise<string>=>requests.get(`tokens/${refreshToken}/refresh`),
	logout:(accessToken:string):Promise<string>=>requests.post(`logout/token/${accessToken}`,'')
};
export default loginApi;