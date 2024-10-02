import { Flex } from 'antd';
import styles from '../app.module.css';

export default function Welcome() {
  return (
    <Flex justify="center" align="center" vertical className={styles.flex}>
      <h1>Welcome to the application!</h1>
    </Flex>
  );
}
