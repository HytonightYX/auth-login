import React from 'react';
import { Modal, Form, Input, Select } from 'antd';

const SignUSB = ({ visible, onSign, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="写入证书"
      okText="确定"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onSign(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="realname"
          label="真实姓名"
          rules={[
            {
              required: true,
              message: '请输入姓名!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="identity"
          label="身份证号"
          rules={[
            {
              required: true,
              message: '请输入身份证号!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="issuer" label="签发机构">
          <Select defaultValue="ZJCA">
            <Option value="ZJCA">浙江CA</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SignUSB;
