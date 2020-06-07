import React from 'react';
import {
  MobileOutlined,
  ContainerOutlined,
  UsbOutlined,
  FontColorsOutlined,
} from '@ant-design/icons';

import PasswordLogin from './forms/PasswordLogin';
import './style.less';

const LOGIN_TYPE = {
  PWD: 1,
  SMS: 2,
  CRL: 3,
};

class Login extends React.Component {
  state = {
    type: LOGIN_TYPE.PWD,
  };

  onFinish = (values) => {
    console.log(values);
  };

  render() {
    const { type } = this.state;
    return (
      <div className="form-warp">
        {type === LOGIN_TYPE.PWD && <PasswordLogin />}

        <div className="more">
          <div>
            <MobileOutlined />
            <span>口令登录</span>
          </div>

          <div>
            <FontColorsOutlined />
            <span>手机验证码</span>
          </div>

          <div>
            <ContainerOutlined />
            <span>数字证书</span>
          </div>

          <div>
            <UsbOutlined />
            <span>密码钥匙</span>
          </div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="g">
        <Login />
      </div>
    );
  }
}

export default App;
