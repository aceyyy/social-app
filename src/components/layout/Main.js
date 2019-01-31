import React, { Component } from 'react'
import { Form, Icon, Input, Button, Col, BackTop, Layout, Alert, message } from 'antd';
import AuthService from "../auth/AuthService";
import RegistrationForm from "./Registration";
import Logo from "../../assets/logo.png";
import QueueAnim from "rc-queue-anim";

const { Footer } = Layout;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Main extends Component {
  constructor () {
    super()
      this.Auth = new AuthService();
      this.state = {
        msgerr: "",
        loading: false,
      }
  }

  componentWillMount() {
    if(this.Auth.loggedIn())
      this.props.history.replace('/home')
  }

  componentDidMount() {
    this.props.form.validateFields();
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    if(e.target.value === "") {
      this.setState({ msgerr: ""})
    }
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.Auth.login(this.state.username, this.state.password)
      .then(res => {
        this.props.history.replace('/home')
        this.setState({ msgerr: "" })
      })
      .catch(err => {
        this.setState({ msgerr: "Invalid username/password"})
      })
  }


  onChangeLogin = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }


  render() {
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;
    // Only show error after a field is touched.
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');


    return (

      <React.Fragment>
      <Layout className="layout" style={{overflow: "hidden"}}>
        <QueueAnim>
          <Col span={24} key="1">
            <Col style={{ padding: "10px 50px", backgroundColor: "#f0f2f5", color: "white", float:"right" }}>
              <Form layout="inline" onSubmit={this.handleFormSubmit}>
                <Form.Item
                  validateStatus={userNameError ? 'error' : ''}
                  help={userNameError || ''}
                >
                  {getFieldDecorator('userName', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                  })(
                    <Input 
                      prefix={<Icon type="user" 
                      style={{ color: 'rgba(0,0,0,.25)' }} />} 
                      placeholder="Username" 
                      name="username" 
                      onChange={this.handleChange}
                    />
                  )}
                </Form.Item>
                <Form.Item
                  validateStatus={passwordError ? 'error' : ''}
                  help={passwordError || ''}
                >
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                  })(
                    <Input 
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                      type="password" 
                      placeholder="Password" 
                      name="password" 
                      onChange={this.handleChange}
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{width:100}}
                    disabled={hasErrors(getFieldsError())}
                  >
                    <Icon type="login" /> Log in
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Col>
          </QueueAnim>

          <Col style={{ background: '#fefefe', padding:"50px 0", maxHeight: 1500 }}>
          <QueueAnim>
            <Col span={12} align="center" key="1">
              <img src={Logo} alt={Logo} width="65%"/>
            </Col>
            <Col span={12} key="2">
              <Col style={{textAlign:"center"}}>
                <h1>Registration</h1>
              </Col>
              <RegistrationForm/>
              <Col align="center">
              {this.state.msgerr ? <Alert message={this.state.msgerr} type="error" showIcon style={{width:"43%", textAlign:"left"}} /> : null }
              </Col>
            </Col>
          </QueueAnim>
          </Col>

        <Footer style={{ textAlign: 'center', borderTop: "1px solid black" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
        
        <BackTop />

      </Layout>
      </React.Fragment>
    );
  }
}

export default Form.create()(Main);
