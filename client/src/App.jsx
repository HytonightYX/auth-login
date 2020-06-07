import React, { useState } from 'react';
import { MobileOutlined, UsbOutlined, ApiOutlined } from '@ant-design/icons';

import PWDLoginForm from './forms/PWDLogin';
import SMSLoginForm from './forms/SMSLogin';
import USBLoginForm from './forms/USBLogin';
import RegisterForm from './forms/Register';
import './style.less';

const LOGIN_TYPE = {
  PWD: 1,
  SMS: 2,
  USB: 3,
  REG: -1,
};

class Login extends React.Component {
  state = {
    type: LOGIN_TYPE.PWD,
  };

  onFinish = (values) => {
    console.log(values);
  };

  toPWDLogin = () => {
    console.log('toPWDLogin');
    this.setState({ type: LOGIN_TYPE.PWD });
  };

  toSMSLogin = () => {
    console.log('toSMSLogin');
    this.setState({ type: LOGIN_TYPE.SMS });
  };

  toUSBLogin = () => {
    console.log('toUSBLogin');
    this.setState({ type: LOGIN_TYPE.USB });
  };

  toRegister = () => {
    console.log('toRegister');
    this.setState({ type: LOGIN_TYPE.REG });
  };

  render() {
    const { type } = this.state;
    return (
      <div className="form-wrap">
        {type === LOGIN_TYPE.PWD && <PWDLoginForm />}
        {type === LOGIN_TYPE.SMS && <SMSLoginForm />}
        {type === LOGIN_TYPE.USB && <USBLoginForm />}
        {type === LOGIN_TYPE.REG && <RegisterForm />}

        {type !== LOGIN_TYPE.REG && (
          <>
            <div>
              <a onClick={this.toRegister}>现在注册？</a>
            </div>
            <div className="more">
              <div onClick={this.toPWDLogin}>
                <ApiOutlined />
                <span>口令登录</span>
              </div>

              <div onClick={this.toSMSLogin}>
                <MobileOutlined />
                <span>手机验证码</span>
              </div>

              <div onClick={this.toUSBLogin}>
                <UsbOutlined />
                <span>密码钥匙</span>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

function App() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="g">
      <Login />
    </div>
  );
}

export default App;
