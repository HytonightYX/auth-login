/**
 * USBKey 登陆
 */
import React, { useState } from 'react';
import { Form, Input, Button, Select, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { enumDevice } from '../lib';
import './style.less';

const LoginForm = ({ doLogin, type }) => {
  const [detecting, setDetecting] = useState(false);

  const onFinish = async (values) => {
    console.log('Success:', values);
    setDetecting(true);
    // doLogin({ ...values, type });
    const id = await enumDevice();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      className="login-form usb-form"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <div className="span-warp">
        <Form.Item>
          {detecting && (
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 50 }} />}
              tip="Loading..."
              className="span"
            />
          )}

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
      </div>
    </Form>
  );
};

export default LoginForm;
