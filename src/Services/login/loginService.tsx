import axios, { AxiosResponse } from 'axios';
import { loginResponse } from './loginResponse';
import loginType from './loginType';
import jwt_decode, { JwtPayload } from "jwt-decode"
import { useCookies } from "react-cookie";

export const instance = axios.create({
  baseURL: 'https://auth.corp.tatneft.ru/api/',
  timeout: 15000,
});

const redirectToHome = () => {
  return document.location.href = '/login'
}

const AuthCheck = async () => {
  const [ cookies,setCookies ] = useCookies(["accessToken","refreshToken","userName"])
  if(cookies.accessToken){
    const jwtToken : JwtPayload = jwt_decode(cookies?.accessToken)
      if(jwtToken?.exp === undefined || jwtToken?.exp < Math.floor(new Date().getTime() / 1000)){
        return redirectToHome()
      }
  }
  if(cookies.refreshToken){
    try {
      const { result,success } = await loginApi.refresh(cookies.refreshToken);
      if(success){
        //@ts-ignore
       return Object.keys(result).forEach((value:"accessToken" | "refreshToken" | "userName") => {
          setCookies(value,result[value])
        })
      }
    } catch (error) {
      return redirectToHome()
    }
  }
}

instance.interceptors.request.use(
  (config) => {
    AuthCheck();
    return config;
  },
  (error) => {
    AuthCheck();
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

interface IRefreshToken{
  result:{
    accessToken:string,
    refreshToken:string,
    userName:string
  },
  success:boolean
}

const loginApi = {
  login: (login: loginType): Promise<loginResponse> => requests.post('login', login),
  validate: (token: string): Promise<Boolean> => requests.get(`tokens/${token}/validate`),
  refresh: (refreshToken: string): Promise<IRefreshToken> => requests.get(`tokens/${refreshToken}/refresh`),
  logout: (accessToken: string): Promise<string> => requests.post(`logout/token/${accessToken}`, '')
};
export default loginApi;