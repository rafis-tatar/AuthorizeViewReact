import './login.css';
import { Form, Input, Button, Checkbox } from 'antd';
import React from 'react'
import loginApi  from "../../Services/login/loginService"
import loginType from '../../Services/login/loginType';
import {Navigate}  from "react-router-dom";
import useHistory  from "react-router-dom";
import { url } from 'inspector';

 
class Login extends React.Component {
  
  private async onFinish (values: any){
        
    const loginDto : loginType ={
      Login: values.username,
      Password: values.password,
      IsDomainAccount:values.isdomain
    }

    const token = await loginApi.login(loginDto);
    if (token.success)
    {
      localStorage.setItem("accessToken",token.result.accessToken);
      localStorage.setItem("refreshToken",token.result.refreshToken);
      localStorage.setItem("userName",token.result.userName);
      //useHistory.BrowserRouter(.).push("/login");
      window.location.href = '/'
    }
  
  };


  private  onFinishFailed (errorInfo: any) {
    console.log('Failed:', errorInfo);
  };

  render() { 
    return (
      <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}          
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
    
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
    
          <Form.Item name="isdomain" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Is Domain Account</Checkbox>
          </Form.Item>
    
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      
      );
  }
}
 
export default Login;