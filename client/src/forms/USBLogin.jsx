/**
 * USBKey 登陆
 */
import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import USB_GIF from './usb.gif';

const LoginForm = ({ doLogin, type }) => {
  const [detecting, setDetecting] = useState(false);

  const onFinish = (values) => {
    console.log('Success:', values);
    setDetecting(true);
    doLogin({ ...values, type });
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
      {detecting && <img src={USB_GIF} alt="detecting..." style={{height: 128, width: 128}} />}

      <Form.Item>
        {!detecting && (
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            检测USBKey并登录
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
