import { Button, Form, Input, Flex, notification } from 'antd';
import { AxiosResponse } from 'axios';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import styles from '../app.module.css';

type FieldType = {
  name?: string;
  email?: string;
  password?: string;
};

export default function Signup() {
  const navigate = useNavigate();

  const submit = (payload: FieldType) => {
    api
      .post('/auth/signup', payload)
      .then((value: AxiosResponse) => {
        localStorage.setItem('__TOKEN', value.data);
        notification.success({ message: 'Login Successful!' });
        navigate('/welcome');
      })
      .catch((err) =>
        notification.error({ message: err?.response?.data?.message })
      );
  };

  return (
    <Flex justify="center" align="center" vertical className={styles.flex}>
      <h1>Signup</h1>
      <Form onFinish={submit} labelCol={{ span: 8 }}>
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 8, message: 'Password must be at least 8 characters long.' },
            {
              validator: (_, value) => {
                if (!value || /[A-Z]/.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    'Password must contain at least 1 uppercase letter.'
                  )
                );
              },
            },
            {
              validator: (_, value) => {
                if (!value || /\d/.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('Password must contain at least 1 number.')
                );
              },
            },
            {
              validator: (_, value) => {
                if (!value || /[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    'Password must contain at least 1 special character.'
                  )
                );
              },
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
}
