
import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import MkEditor from './mk-editor'
import Pagea from './pagea'
import Login from './login'
const { Header, Sider, Content } = Layout;
export default class Menus extends React.Component {
  state = {
    collapsed: false,
    log:<MkEditor/>
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  tab(record){
    this.setState({
        log:record
    })
  }
  render() {
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" onClick = {()=>this.tab(<MkEditor/>)}>
              <Icon type="user" />
              <span  >富文本</span>
            </Menu.Item>
            <Menu.Item key="2" onClick = {()=>this.tab(<Pagea/>)} >
              <Icon type="video-camera" />
              <span >pagea</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            {
                this.state.log
            }
          </Content>
        </Layout>
      </Layout>
    );
  }
}
