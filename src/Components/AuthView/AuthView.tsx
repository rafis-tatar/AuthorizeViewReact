import { ReactElement, useState, FC, useEffect } from "react"
import { withCookies, useCookies } from "react-cookie";
import IAuthorizedProps from './AuthorizedView';
import INonAutorizedProps from './NonAutorizedView';
import jwt_decode, { JwtPayload } from "jwt-decode"
import loginApi from "../../Services/login/loginService";

interface AuthViewProps {
  children?:
  | ReactElement<INonAutorizedProps>
  | Array<ReactElement<INonAutorizedProps>>
  | ReactElement<typeof IAuthorizedProps>
  | Array<ReactElement<typeof IAuthorizedProps>>,
  [name:string]:any
}



const AuthView : FC<AuthViewProps> = ({ children })  => {
  
  const [ cookies,setCookies ] = useCookies(["accessToken","refreshToken","userName"])
  const [pending, setPending] = useState(false);
  
  const [ isAutorizated,setIsAutorizated ] = useState<boolean>(false);

  const autorized = (children as Array<any>).filter(a => a.type.name === 'AutorizedView');
  const noneAutorized = (children as Array<any>).filter(a => a.type.name === 'NonAutorizedView');

  const AuthCheck = async () => {
    if(cookies.accessToken){
      const jwtToken : JwtPayload = jwt_decode(cookies?.accessToken)
      if(jwtToken?.exp !== undefined && jwtToken?.exp > Math.floor(new Date().getTime() / 1000)){
       return setIsAutorizated(true)
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
        return setIsAutorizated(true)
      } catch (error) {
        return setIsAutorizated(true)
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
  },[cookies.accessToken,isAutorizated])
  

  return (
    <div>
      {
        pending ? !isAutorizated ? autorized : noneAutorized : isAutorizated ? autorized : noneAutorized
      }
    </div>
  )
  
}


export default withCookies(AuthView);
