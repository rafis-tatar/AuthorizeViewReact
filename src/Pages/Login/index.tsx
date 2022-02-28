import './login.css';
import { Form, Input, Button, Checkbox, Row, Col, Card, message } from 'antd';
import { CSSProperties, FC } from 'react'
import loginApi from "../../Services/login/loginService"
import loginType from '../../Services/login/loginType';
import { useCookies } from 'react-cookie';

const LogoTN = () => {
  return (
    <div style={{ position:"fixed", top:"5px",left:"5px"}}>
      <svg width="91" height="31" viewBox="0 0 91 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24.5707 20.1792H32.5707V22.1792H29.5707V30.1792H27.5707V22.1792H24.5707V20.1792Z" fill="#EF4444"/>
        <path d="M34.8484 30.1792H32.5707L36.5259 20.1792H39.7548L43.5707 30.1792H41.2931L40.5437 28.1792H35.6125L34.8484 30.1792ZM36.5259 26.1792H39.8531L38.0707 22.1792L36.5259 26.1792Z" fill="#EF4444"/>
        <path d="M43.5707 20.1792H51.5707V22.1792H48.5707V30.1792H46.5707V22.1792H43.5707V20.1792Z" fill="#EF4444"/>
        <path d="M55.5707 30.1792H53.5707V20.1792H55.5707L60.5707 26.6792V20.1792H62.5931V30.1792H60.5707L55.5707 23.6792V30.1792Z" fill="#22C55E"/>
        <path d="M64.5707 20.1792H71.5707V22.1792H66.5707V24.1792H70.5707V26.1792H66.5707V28.1792H71.5707V30.1792H64.5707V20.1792Z" fill="#22C55E"/>
        <path d="M73.5707 20.1792H80.5707V22.1792H75.5707V24.1792H79.5707V26.1792H75.5707V30.1792H73.5707V20.1792Z" fill="#22C55E"/>
        <path d="M82.5707 20.1792H90.5707V22.1792H87.5707V30.1792H85.5707V22.1792H82.5707V20.1792Z" fill="#22C55E"/>
        <path d="M15.0728 6.26863C14.9771 6.17049 14.8211 6.15062 14.7014 6.22133C14.5817 6.29203 14.5322 6.43328 14.5836 6.55754C15.6115 9.04268 15.1143 10.9996 13.9494 12.7366C13.0123 14.1339 11.6557 15.3741 10.2877 16.6247C9.92828 16.9533 9.56807 17.2826 9.21447 17.6157C7.53991 19.193 6.01183 20.8586 5.65116 22.8765C5.28613 24.9187 6.12608 27.2351 8.95022 30.0912C9.04591 30.1879 9.20063 30.2073 9.31963 30.1373C9.43863 30.0674 9.48869 29.9277 9.43916 29.8038C8.39541 27.1929 8.90887 25.2052 10.0925 23.487C11.0531 22.0926 12.4448 20.8859 13.8437 19.673C14.1978 19.3661 14.5523 19.0587 14.9004 18.7478C16.5975 17.232 18.1462 15.6262 18.4967 13.6184C18.8508 11.5896 17.9717 9.24309 15.0728 6.26863Z" fill="#EF4444"/>
        <path d="M10.0728 0.268627C9.97713 0.170492 9.82111 0.150622 9.7014 0.221327C9.58168 0.292033 9.53219 0.433279 9.58359 0.557543C10.6115 3.04268 10.1143 4.99964 8.94943 6.73659C8.01232 8.13393 6.65572 9.37411 5.28771 10.6247C4.92828 10.9533 4.56807 11.2826 4.21447 11.6157C2.53991 13.193 1.01183 14.8586 0.651156 16.8765C0.286127 18.9187 1.12608 21.2351 3.95022 24.0912C4.04591 24.1879 4.20063 24.2073 4.31963 24.1373C4.43863 24.0674 4.4887 23.9277 4.43916 23.8038C3.39541 21.1929 3.90887 19.2052 5.0925 17.487C6.05306 16.0926 7.44477 14.8859 8.84374 13.673C9.19779 13.3661 9.55231 13.0587 9.90042 12.7478C11.5975 11.232 13.1462 9.62616 13.4967 7.61841C13.8508 5.58964 12.9717 3.24309 10.0728 0.268627Z" fill="#22C55E"/>
      </svg>
    </div>
  )
}

const LoginWrapper:FC = ({ children }) => {
  const styleWrapper:CSSProperties = {
    width:"100%",
    height:"100vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  }
  
  return (
    <div style={{...styleWrapper}}>
      {
        children
      }
    </div>
  )
}

const Login : FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies,setCookie] = useCookies(["accessToken","refreshToken","userName"])
  const onFinish = async (values:any) => {

    message.loading("Авторизация",0)

    const loginDto: loginType = {
      Login: values.username,
      Password: values.password,
      IsDomainAccount: values.isdomain
    }

    const token = await loginApi.login(loginDto).catch((e) => {
      const { response } = e
      message.destroy()
      return message.error(response.data.Error.Message,5)
    });

    if (token.success) {
      const date = new Date();
      date.setDate(date.getHours() + ((60*60*1000)/2))
      setCookie('accessToken',token.result.accessToken,{maxAge:60*30,sameSite:"strict",secure:true})
      setCookie('refreshToken',token.result.refreshToken,{maxAge:2592000,sameSite:"strict",secure:true})
      setCookie('userName',token.result.userName,{maxAge:2592000,sameSite:"strict",secure:true})
      message.destroy();
    }

  }  

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  }
  
  return (
    <LoginWrapper>
      <LogoTN/>
        <Card style={{ width: "600px",height:"fit-content" }} className="">
          <Row>
            <Col span={24} offset={8}>
              
              <h1>Авторизация</h1>
            </Col>
            <Col span={24}>
              <Form
                name="basic"
                initialValues={{ isdomain: true }}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 12 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  required={true}
                  label="Логин"
                  name="username"
                  rules={[{ required: true, message: 'Пожалуйста, введите ваш логин!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  required={true}
                  label="Пароль"
                  name="password"
                  rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item name="isdomain" valuePropName="checked" wrapperCol={{ offset: 6 }}>
                  <Checkbox>Доменная учетная запись</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6 }} >
                  <Button type="primary" htmlType="submit">
                    Войти
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Card>
      </LoginWrapper>
  )
}

export default Login;