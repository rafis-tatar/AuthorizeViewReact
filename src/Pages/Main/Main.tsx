import React from 'react';
import {Button} from "antd";
import loginApi from "../../Services/login/loginService";
import {useCookies} from "react-cookie";

function Main() {
  const [cookies] = useCookies(["accessToken"])
    const checkToken = async ():Promise<void> => {
      const res = await loginApi.validate(cookies.accessToken)
      //@ts-ignore
      if(res?.result !== true){
        document.location.href = '/'
      }
    }
  
    return (
    <>
      <Button type="primary" onClick={checkToken}>Проверить валидность токена</Button>
    </>
    );
}
export default Main;