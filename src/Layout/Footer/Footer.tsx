import { Layout } from 'antd';

const Footer = () => {
  return (
    <Layout.Footer style={{ textAlign: 'center' }}>
          Projcet1 ©{new Date().getFullYear()} Jobs portal application
    </Layout.Footer>
  )
}

export default Footer