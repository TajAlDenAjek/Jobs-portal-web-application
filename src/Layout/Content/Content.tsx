import { Layout ,theme} from 'antd'
const Content = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout.Content style={{ margin: '24px 16px 0' }}>
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                Here put the navigation result 
            </div>
        </Layout.Content>
    )
}

export default Content