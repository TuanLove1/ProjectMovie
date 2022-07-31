import React from 'react';
import { Layout } from 'antd';
const { Sider, Content } = Layout;
export default function UserLoginTemplate(Component) {
    return function () {
        return (
            <Layout>
                <Layout className='login_background' style={{ backgroundImage: 'url(https://i.ytimg.com/vi/dHjmXd6yZXo/maxresdefault.jpg)', backgroundPosition: 'center', backgroundSize: 'cover', position: 'fixed', width: '100%', height: '100%' }}>
                        <Content style={{ height: window.innerHeight, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}><Component /></Content>
                </Layout>
            </Layout>
        );
    }

}
