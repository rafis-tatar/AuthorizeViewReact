import jwt_decode, { JwtPayload } from "jwt-decode"
import loginApi from "../login/loginService";

const AuthCheckToken = {
  checkAccessToken:async (accessToken:string | undefined):Promise<boolean> => { 
    if(accessToken !== undefined){
      const jwtToken : JwtPayload = jwt_decode(accessToken)
      return jwtToken?.exp !== undefined && jwtToken?.exp > Math.floor(new Date().getTime() / 1000);
    }
    return false;
  },
  refreshToken: async (refreshToken:string | undefined):Promise<{ accessToken: string; refreshToken: string; userName: string }> => {
    if(refreshToken !== undefined){
      const newTokens = await loginApi.refresh(refreshToken).then(e => e)
      return newTokens.result;
    }
    throw new Error("Токен обновления либо отсутствует, либо неверный")
  }
}

export default AuthCheckToken