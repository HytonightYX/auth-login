/**
 * 口令登陆
 */
import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import api from '../api';

const LoginForm = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
    axios.post(api.LOGIN, { ...values, type: 1 }).then((res) => {
      if (res && res.status === 200 && res.data.code === 200) {
        message.success('登陆成功', 0.7);
      } else if (res.data) {
        message.error(`${res.data.msg}`);
      } else {
        message.error('网络错误, 请查看控制台');
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      className="login-form"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
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
          placeholder="密码"
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

export default LoginForm;
