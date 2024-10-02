import { Button, Flex, Form, Input, notification } from 'antd';
import api from '../../api';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../app.module.css';

type FieldType = {
  email?: string;
  password?: string;
};

export default function Login() {
  const navigate = useNavigate();

  const submit = (payload: FieldType) => {
    api
      .post('/auth/login', payload)
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
      <h1>Login</h1>
      <Form onFinish={submit} labelCol={{ span: 8 }}>
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
          rules={[{ required: true, message: 'Please input your password!' }]}
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
