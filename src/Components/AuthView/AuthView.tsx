import {ReactElement, useState, FC, useEffect, ReactChildren} from "react"
import { withCookies, useCookies } from "react-cookie";
import jwt_decode, { JwtPayload } from "jwt-decode"
import loginApi from "../../Services/login/loginService";
import AuthorizedView from "./AuthorizedView";
import NonAuthorizedView from "./NonAuthorizedView";

type AuthUser = typeof AuthorizedView;
type NonAuthUser = typeof NonAuthorizedView;

interface AuthViewProps {
  // children:
  //   | ReactElement<INonAutorizedProps>
  //   | Array<ReactElement<INonAutorizedProps>>
  //   | ReactElement<typeof IAuthorizedProps>
  //   | Array<ReactElement<typeof IAuthorizedProps>>,
  // [name:string]:any
  children:[ReactElement<AuthUser>,ReactElement<NonAuthUser>]
}



const AuthView : FC<AuthViewProps> = ({children}:AuthViewProps) => {
  
  const [ cookies,setCookies ] = useCookies(["accessToken","refreshToken","userName"])
  const [pending, setPending] = useState(false);
  
  const [ isAuthorized,setIsAuthorized ] = useState<boolean>(false);
  
  const authorized = (children as Array<any>).filter(a => a.type.name === 'AuthorizedView');
  const noneAuthorized = (children as Array<any>).filter(a => a.type.name === 'NonAuthorizedView');

  const AuthCheck = async () => {
    if(cookies.accessToken){
      const jwtToken : JwtPayload = jwt_decode(cookies?.accessToken)
      if(jwtToken?.exp !== undefined && jwtToken?.exp > Math.floor(new Date().getTime() / 1000)){
       return setIsAuthorized(true)
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
        return setIsAuthorized(true)
      } catch (error) {
        return setIsAuthorized(true)
      }
    }
  }

 
  
  useEffect(() => {
    const insideFunc = async () => {
      setPending(true)
      await AuthCheck();
      return setPending(false)
    }
    insideFunc()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[cookies.accessToken,isAuthorized])
  

  return (
    <div>
      {
        pending ? !isAuthorized ? authorized : noneAuthorized : isAuthorized ? authorized : noneAuthorized
      }
    </div>
  )
  
}


export default withCookies(AuthView);
