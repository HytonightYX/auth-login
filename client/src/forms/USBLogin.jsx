/**
 * USBKey 登陆
 */
import React, { useState } from 'react';
import { Form, Button, Spin, message, Typography, Modal } from 'antd';
import { LoadingOutlined, UsbOutlined } from '@ant-design/icons';
import { enumDevice, getUserList, exportUserCert, getCertInfo } from '../lib';
import './style.less';

const { Text, Link } = Typography;

const LoginForm = ({ doLogin, type }) => {
  const [detecting, setDetecting] = useState(false);

  const onFinish = (values) => {
    console.log('Success:', values);
    setDetecting(true);
    enumDevice()
      .then(getUserList)
      .then(exportUserCert)
      .then(getCertInfo)
      .then(onSuccess)
      .catch((e) => {
        message.error(e.toString());
        setDetecting(false);
      });
  };

  const onSuccess = (certInfo) => {
    const reactNode = Object.keys(certInfo).map((item) => (
      <p key={item}>
        {item} <Text mark>{certInfo[item]}</Text>
      </p>
    ));

    Modal.success({
      title: 'USB 识别成功',
      content: <div>{reactNode}</div>,
    });
    setDetecting(false);
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
              className="login-form-button"
              onClick={onFinish}
            >
              <UsbOutlined />
              检测USBKey并登录
            </Button>
          )}
        </Form.Item>
      </div>
    </Form>
  );
};

export default LoginForm;
