import React from 'react';
import { Form, Input, Button } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  ContainerOutlined,
  FontColorsOutlined,
} from '@ant-design/icons';

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
        {type === LOGIN_TYPE.PWD && (
          <Form className="login-form" onFinish={this.onFinish}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="用户名"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="口令"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登陆
              </Button>
            </Form.Item>
          </Form>
        )}

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
