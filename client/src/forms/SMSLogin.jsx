/**
 * 短信验证码登陆
 */
import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Button } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './style.less';

const LoginForm = ({ doLogin, type }) => {
  const [pending, setPending] = useState(false);

  const onFinish = (values) => {
    console.log('Success:', values);
    doLogin({ ...values, type });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const getCodeButton = (
    <Form.Item name="prefix" noStyle>
      <Button >获取验证码</Button>
    </Form.Item>
  );

  return (
    <Form
      className="sms-form login-form"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="phone"
        rules={[{ required: true, message: '请输入手机号' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="手机号码"
        />
      </Form.Item>
      <Form.Item
        name="code"
        rules={[{ required: true, message: '请输入验证码' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          addonAfter={<Button>获取验证码</Button>}
          placeholder="验证码"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登陆
        </Button>
      </Form.Item>
    </Form>
  );
};

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // 保存新回调
  useEffect(() => {
    savedCallback.current = callback;
  });

  // 建立 interval
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default LoginForm;
