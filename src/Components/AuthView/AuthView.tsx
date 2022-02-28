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
  
  const [ cookies,setCookie,removeCookie ] = useCookies(["accessToken","refreshToken","userName"])

  const AuthCheck = async ():Promise<boolean> => {
    if(await AuthCheckToken.checkAccessToken(cookies.accessToken)){
      return true
    }
    try {
      const { accessToken, refreshToken, userName } = await AuthCheckToken.refreshToken(cookies.refreshToken)
      setCookie("accessToken",accessToken,{maxAge:60*30,sameSite:"strict",secure:true})
      setCookie("refreshToken",refreshToken,{maxAge:2592000,sameSite:"strict",secure:true})
      setCookie("userName",userName,{maxAge:2592000,sameSite:"strict",secure:true})
      return true
    }catch (e){
      removeCookie("refreshToken")
      removeCookie("userName")
      removeCookie("accessToken")
      return false
    }
  }
  
  const [ isAuthorized,setIsAuthorized ] = useState(true);
  
  useEffect(() => {
   AuthCheck().then(r => setIsAuthorized(r))
  },[cookies.accessToken])
  
  return (
    <div>
      {
        isAuthorized 
          ? <AuthorizedView>
            { children }
          </AuthorizedView> 
          : <NonAuthorizedView/>
      }
    </div>
  )
}


export default withCookies(AuthView);
