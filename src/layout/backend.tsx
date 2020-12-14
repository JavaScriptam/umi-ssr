import React from 'react'
import {Link} from 'umi'
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import styles from './backend.module.less'
const { Header, Content,  Sider } = Layout;

export default class Backend extends React.Component{
  constructor(props:any){
    super(props)
  }
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render(){
    return (
      <Layout id={styles['components-layout-demo-custom-trigger']}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}>
          <div className={styles.logo} />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="/backend/role">role</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              <Link to="/backend/manage">manage</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className={styles['site-layout']}  style={{ marginLeft: this.state.collapsed ? 80 : 200 }}>
          <Header className={styles['site-layout-background']} style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: styles.trigger,
              onClick: this.toggle,
            })}
          </Header>
          <Content
            className={styles['site-layout-background']}
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <div>{ this.props.children }</div>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
