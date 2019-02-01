import React, { Component } from 'react';
import AuthService from "./components/auth/AuthService";
import withAuth from "./components/auth/withAuth";
import { Col, Button, Form, Layout, Icon, Menu, Card, Avatar } from "antd";
import QueueAnim from "rc-queue-anim";
import "./App.scss";

const { Meta } = Card;
const { Footer } = Layout;
const Auth = new AuthService();

class App extends Component {
  render() {
    console.log("PROPS", this.props)
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
                <Icon type="message" />Chat
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
          
          <QueueAnim>
            <Col className="content">
              <Col span={12} key="1" align="center" style={{padding:"20px 0"}}>
              <Card
                style={{ width: 300, border: "1px solid #fefefe	" }}
                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                actions={[<Icon type="edit" />]}
              >
                <Meta
                  style={{textAlign:"left"}}
                  avatar={<Avatar src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB-ZFCqQ0yt_IvuaQYP5zSwEyl7Cik9VxobF4hcICMSBXx0kGFzA"} />}
                  title="Profile"
                  description="This is the description"
                />
              </Card>
              </Col>
              <Col span={12}>
              </Col>
            </Col>
          </QueueAnim>

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
