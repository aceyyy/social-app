import React, { Component } from 'react';
import AuthService from "./components/auth/AuthService";
import withAuth from "./components/auth/withAuth";
import { Col, Button, Form, Layout, Icon, Menu } from "antd";
import QueueAnim from "rc-queue-anim";

const { Footer } = Layout;

const Auth = new AuthService();

class App extends Component {
  render() {
    return (
      <Layout className="layout" style={{ overflow: "hidden" }}>
          <Col span={24} align="center">
          <QueueAnim>
          <Col span={12} key="1">
          <Menu
            onClick={this.handleClick}
            defaultSelectedKeys={['home']}
            mode="horizontal"
          >
            <Menu.Item key="home">
              <Icon type="home" />Home
            </Menu.Item>
            <Menu.Item key="chat">
              <Icon type="wechat" />Chat
            </Menu.Item>
          </Menu>
          </Col>
          </QueueAnim>

          <QueueAnim>
            <Col key="1" span={12} 
            style={{background:"white", height:47.5, padding:"4px 0", 
            borderBottom:"1px solid #e8e8e8"}}>
              <Form layout="inline" onSubmit={this.handleFormSubmit}>
                <Form.Item>
                  Signed in as <b>{this.props.user.username}</b>
                </Form.Item>
                <Form.Item>
                  <Button type="danger" style={{background: "#ff4d4f", color: "white"}} 
                  onClick={() => this.handleLogout()}>Logout <Icon type="logout" /></Button>
                </Form.Item>
              </Form>
            </Col>
          </QueueAnim>

          </Col>
          

          <Col style={{ background: '#fefefe', padding:"50px 0", maxHeight: 1500, height: 500 }}>
            <QueueAnim>
              <Col span={24} align="center" key="1">
    
              </Col>
            </QueueAnim>
          </Col>

          <Footer style={{ textAlign: 'center', borderTop: "1px solid gray" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>

      </Layout>
    )
  }

  handleLogout = () => {
    Auth.logout()
    this.props.history.replace('/login');
  }
}

export default withAuth(App);
