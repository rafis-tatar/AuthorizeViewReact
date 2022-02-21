import './login.css';
import { Form, Input, Button, Checkbox, Row, Col, Card, message } from 'antd';
import { CSSProperties, FC } from 'react'
import loginApi from "../../Services/login/loginService"
import loginType from '../../Services/login/loginType';
import { useCookies } from 'react-cookie';
import Title from "antd/es/typography/Title";

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
      console.log(Object(e).headers)
      const { response } = e
      message.destroy()
      return message.error(response.data.Error.Message,5)
    });

    if (token.success) {
      const date = new Date();
      date.setDate(date.getHours() + ((60*60*1000)/2))
      setCookie('accessToken',token.result.accessToken,{ path:"/",expires:date})
      setCookie('refreshToken',token.result.refreshToken,{ path:"/" ,expires:date })
      setCookie('userName',token.result.userName,{ path:"/" ,expires:date })
      //useHistory.BrowserRouter(.).push("/login");
      window.location.href = '/'
    }

  }  

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  }
  
  return (
    <LoginWrapper>
        <Card style={{ width: "600px",height:"fit-content" }} className="">
          <Row>
            <Col span={24} offset={8}>
              <h1>Авторизация</h1>
            </Col>
            <Col span={24}>
              <Form
                name="basic"
                initialValues={{ remember: true }}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 12 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Логин"
                  name="username"
                  rules={[{ required: true, message: 'Пожалуйста, введите ваш логин!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Пароль"
                  name="password"
                  rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item name="isdomain" valuePropName="checked" wrapperCol={{ offset: 6 }}>
                  <Checkbox defaultChecked={true} checked>Доменная учетная запись</Checkbox>
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