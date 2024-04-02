import { Layout } from 'antd';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Content from './Content/Content';
const LayoutContainer = () => {

    return (
        <>
            <Layout>
                <Sidebar />
                <Layout>
                    <Header />
                    <Content />
                    <Footer />
                </Layout>
            </Layout>
        </>
    )
}

export default LayoutContainer
