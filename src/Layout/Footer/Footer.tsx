import { Layout } from 'antd';

const Footer = () => {
  return (
    <Layout.Footer style={{ textAlign: 'center' }}>
          Projcet1 ©{new Date().getFullYear()} Career App
    </Layout.Footer>
  )
}

export default Footer