import {Layout,theme} from 'antd'

const Header = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken(); 
    return (
        <Layout.Header style={{ padding: 0, background: colorBgContainer }} >
            Header goes here
            can add a navbar or something like searchbar and our logo 
        </Layout.Header>
    )
}

export default Header