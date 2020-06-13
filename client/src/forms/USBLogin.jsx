/**
 * USBKey 登陆
 */
import React, { useState } from 'react';
import { Form, Input, Button, Select, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { enumDevice } from '../lib';

const LoginForm = ({ doLogin, type }) => {
  const [detecting, setDetecting] = useState(false);

  const onFinish = async (values) => {
    console.log('Success:', values);
    setDetecting(true);
    // doLogin({ ...values, type });
    const id = await enumDevice();
    console.log(id);
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
      {detecting && <Spin indicator={<LoadingOutlined />} />}

      {!detecting && (
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            检测USBKey并登录
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default LoginForm;
