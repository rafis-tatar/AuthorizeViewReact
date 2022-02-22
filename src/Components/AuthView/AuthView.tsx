import { ReactElement, useState, FC, useEffect } from "react"
import { withCookies, useCookies } from "react-cookie";
import AuthorizedView from "./AuthorizedView";
import NonAuthorizedView from "./NonAuthorizedView";
import AuthCheckToken from "../../Services/auth/authCheck";

type AuthUser = typeof AuthorizedView;
type NonAuthUser = typeof NonAuthorizedView;

interface AuthViewProps {
  children:[ReactElement<AuthUser>,ReactElement<NonAuthUser>]
}



const AuthView : FC<AuthViewProps> = ({children}:AuthViewProps) => {
  
  const [ cookies,setCookies ] = useCookies(["accessToken","refreshToken","userName"])

  const AuthCheck = async ():Promise<boolean> => {
    if(await AuthCheckToken.checkAccessToken(cookies.accessToken)){
      return true
    }
    try {
      const { accessToken, refreshToken, userName } = await AuthCheckToken.refreshToken(cookies.refreshToken)
      setCookies("accessToken",accessToken)
      setCookies("refreshToken",refreshToken)
      setCookies("userName",userName)
      return true
    }catch (e){
      return false
    }
  }
  
  
  const [ isAuthorized,setIsAuthorized ] = useState(true);
  
  const authorized = (children as Array<any>).filter(a => a.type.name === 'AuthorizedView');
  const noneAuthorized = (children as Array<any>).filter(a => a.type.name === 'NonAuthorizedView');
  
  
  
  
  useEffect(() => {
   AuthCheck().then(r => setIsAuthorized(r))
  },[cookies.accessToken])
  
  return (
    <div>
      {
        isAuthorized ? authorized : noneAuthorized
      }
    </div>
  )
}


export default withCookies(AuthView);
