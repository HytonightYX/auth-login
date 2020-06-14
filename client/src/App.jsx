import React, { useState } from 'react';
import { Divider, message, Modal } from 'antd';
import {
  MobileOutlined,
  UsbOutlined,
  LockOutlined,
  GithubFilled,
} from '@ant-design/icons';

import PWDLoginForm from './forms/PWDLogin';
import SMSLoginForm from './forms/SMSLogin';
import USBLoginForm from './forms/USBLogin';
import RegisterForm from './forms/Register';
import axios from 'axios';
import api from './api';
import './style.less';

const LOGIN_TYPE = {
  PWD: 1,
  SMS: 2,
  USB: 3,
  REG: -1,
};

class Login extends React.Component {
  state = {
    type: LOGIN_TYPE.USB,
  };

  toPWDLogin = () => {
    this.setState({ type: LOGIN_TYPE.PWD });
  };

  toSMSLogin = () => {
    this.setState({ type: LOGIN_TYPE.SMS });
  };

  toUSBLogin = () => {
    this.setState({ type: LOGIN_TYPE.USB });
  };

  toRegister = () => {
    this.setState({ type: LOGIN_TYPE.REG });
  };

  success(content) {
    Modal.success({
      content,
    });
  }

  doLogin = (params) => {
    axios.post(api.LOGIN, params).then((res) => {
      if (res && res.status === 200 && res.data.code === 200) {
        const user = res.data.data;
        this.success(`${user.username}, 登录成功`);
      } else if (res.data) {
        message.error(`${res.data.msg}`);
      } else {
        message.error('网络错误, 请查看控制台');
      }
    });
  };

  render() {
    const { type } = this.state;
    return (
      <div className="form-wrap">
        {type === LOGIN_TYPE.PWD && (
          <PWDLoginForm doLogin={this.doLogin} type={LOGIN_TYPE.PWD} />
        )}
        {type === LOGIN_TYPE.SMS && (
          <SMSLoginForm doLogin={this.doLogin} type={LOGIN_TYPE.SMS} />
        )}
        {type === LOGIN_TYPE.USB && (
          <USBLoginForm doLogin={this.doLogin} type={LOGIN_TYPE.USB} />
        )}
        {type === LOGIN_TYPE.REG && <RegisterForm />}

        {type !== LOGIN_TYPE.REG && (
          <>
            <div className="reg">
              <a onClick={this.toRegister}>现在注册？</a>
            </div>

            <Divider plain>
              <span style={{ color: '#d9d9d9', fontSize: 16 }}>or</span>
            </Divider>

            <div className="more">
              <div onClick={this.toPWDLogin} className="more-btn">
                <LockOutlined />
                <small>口令</small>
              </div>

              <div onClick={this.toSMSLogin} className="more-btn">
                <MobileOutlined />
                <small>验证码</small>
              </div>

              <div onClick={this.toUSBLogin} className="more-btn">
                <UsbOutlined />
                <small>USB</small>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

function App() {
  return (
    <div className="g">
      <Login />

      <div className="fix-bottom">
        <a href="https://github.com/HytonightYX/auth-login" target="_blank">
          <GithubFilled />
        </a>
      </div>
    </div>
  );
}

export default App;
