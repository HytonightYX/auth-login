/**
 * 短信验证码登陆
 */
import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './style.less';
import api from '../api';
import Axios from 'axios';

const LoginForm = ({ doLogin, type }) => {
  const [pending, setPending] = useState(false);
  const [phone, setPhone] = useState('');

  const onFinish = (values) => {
    console.log('Success:', values);
    // doLogin({ ...values, type });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const getSmsCode = (phone) => {
    Axios.get(`${api.SMSCODE}?phone=${phone}`).then((res) => {
      console.log(res.data.data);
      if (res && res.status === 200 && res.data.data.code === 0) {
        message.success(res.data.data.data);
      } else if (res.data.data.code !== 0) {
        message.error(res.data.data.data);
      } else {
        message.error('网络错误, 请查看控制台');
      }
    });
  };

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
          onChange={(v) => setPhone(v.target.value)}
        />
      </Form.Item>

      <div className="code-input">
        <Form.Item
          name="code"
          rules={[{ required: true, message: '请输入验证码' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="text"
            placeholder="验证码"
          />
        </Form.Item>
        <Button onClick={getSmsCode.bind(null, phone)}>获取验证码</Button>
      </div>

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
