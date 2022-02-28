import axios, { AxiosResponse } from 'axios';
import { loginResponse } from './loginResponse';
import loginType from './loginType';

export const instance = axios.create({
  baseURL: 'https://auth.corp.tatneft.ru/api/',
  timeout: 15000,
});

interface ICookieProps{
  [key:string]:string
}

instance.interceptors.request.use(
  (config) => {
    let cookies:ICookieProps = Object.fromEntries(document.cookie.split(";").map(e => e.trim().split("=")))
    if(cookies["accessToken"] !== undefined){
      // @ts-ignore
      config.headers["Authorization"] = `Bearer ${cookies["accessToken"]}`
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
  post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
  put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
  delete: (url: string) => instance.delete(url).then(responseBody),
};

export interface IRefreshToken{
  result:{
    accessToken:string,
    refreshToken:string,
    userName:string
  },
  success:boolean
}

const loginApi = {
  login: (login: loginType): Promise<loginResponse> => requests.post('login', login),
  validate: (token: string): Promise<boolean> => requests.get(`tokens/${token}/validate`),
  refresh: (refreshToken: string): Promise<IRefreshToken> => requests.get(`tokens/${refreshToken}/refresh`),
  logout: (accessToken: string): Promise<string> => requests.post(`logout/token/${accessToken}`, '')
};
export default loginApi;