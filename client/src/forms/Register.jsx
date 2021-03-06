/**
 * 口令登陆
 */
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  UsbOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import SignUSB from './SignUSB';
import api from '../api';
import './style.less';

const RegisterForm = () => {
  const [visible, setVisible] = useState(false);

  const onSign = (values) => {
    console.log('Received values of form: ', values);
    setVisible(false);
  };

  const onFinish = (values) => {
    axios.post(api.REGISTER, values).then((res) => {
      console.log(res);
      if (res && res.status === 200 && res.data) {
        const { data } = res;
        const inner = data.data;
        if (data.code === 200) {
          message.success('注册成功');
          setTimeout(() => {
            window.location.href = '/auth';
          }, 100);
        } else {
          if (inner.code === 'ER_DUP_ENTRY') {
            message.error(`用户名或手机号已存在`, 0.7);
          } else {
            message.error(`${data.msg}，${inner.message}`, 0.7);
          }
        }
      } else {
        message.error('网络错误', 0.7);
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      className="login-form reg-form"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <h3>注册</h3>
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
        name="phone"
        rules={[{ required: true, message: '请输入手机号' }]}
      >
        <Input prefix={<MobileOutlined />} placeholder="手机" />
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
        <Button
          className="login-form-button"
          // onClick={() => {
          //   setVisible(true);
          // }}
          onClick={() => window.open('https://crypto.hznuhub.net/')}
        >
          <UsbOutlined />
          写入证书
        </Button>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          确认注册
        </Button>
      </Form.Item>

      <SignUSB
        visible={visible}
        onSign={onSign}
        onCancel={() => {
          setVisible(false);
        }}
      />

      <div>
        <a href="/">已有账号？去登录</a>
      </div>
    </Form>
  );
};

export default RegisterForm;
