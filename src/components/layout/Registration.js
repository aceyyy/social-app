/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { Form, Input, Button, DatePicker, Col, Modal } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUser } from '../action';

class RegistrationForm extends Component {
  constructor (props) {
    super(props)
      this.state = {
        confirmDirty: false,
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        age: "",
        birthday: ""
    };
  }

  onChangeRegister = (e) => {
    this.setState({[e.target.name] : e.target.value})
  }

  onChangeDate = (e) => {
    this.setState({ birthday: e });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const user = {
          username: this.state.username,
          password: this.state.password,
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          age: this.state.age,
          birthday: this.state.birthday.format('YYYY-MM-DD')
        }
        this.props.createUser(user);
        let secondsToGo = 2;
        const modal = Modal.success({
          title: '',
          content: `Successfully Regsitered. You can now log in`,
        });
        const timer = setInterval(() => {
          secondsToGo -= 1;
        }, 1000);
        setTimeout(() => {
          clearInterval(timer);
          modal.destroy();
        }, secondsToGo * 1000);

        this.props.form.resetFields();
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Password did not match!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  
  
  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10, offset: 1 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 7,
        },
      },
    };

    // let age = [];
    // for (let i=8; i < 99; i++) { age.push(i); }

    return (
      <Col>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            {...formItemLayout}
            label="Username"
          >
            {getFieldDecorator('username', {
              rules: [{
                required: true, message: 'Please input your username!',
              }],
            })(
              <Input name="username" onChange={this.onChangeRegister}/>
            )}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Password"
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Please input your password!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input.Password type="password" name="password" onChange={this.onChangeRegister}/>
            )}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Confirm Password"
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Please confirm your password!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input.Password type="password" onBlur={this.handleConfirmBlur} />
            )}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="First Name"
          >
            {getFieldDecorator('firstname', {
              rules: [{
                required: true, message: 'Please input your firstname!',
              }],
            })(
              <Input name="firstname" onChange={this.onChangeRegister}/>
            )}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Last Name"
          >
            {getFieldDecorator('lastname', {
              rules: [{
                required: true, message: 'Please input your lastname!',
              }],
            })(
              <Input name="lastname" onChange={this.onChangeRegister}/>
            )}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Age"
          >
            {getFieldDecorator('age', {
              rules: [{
                required: true, message: 'Please select your age!',
              }],
            })(
              <Input name="age" onChange={this.onChangeRegister}/>
            )}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Birthday"
          >
            {getFieldDecorator('birthday', {
              rules: [{
                required: true, message: 'Please indicate your birthday!',
              }],
            })(
              <DatePicker onChange={this.onChangeDate} format="MMMM Do YYYY" allowClear/>
            )}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button htmlType="submit" type="primary" style={{width:180}}>Register</Button> 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="danger" style={{width:180, height:"34px", background: "#ff4d4f", color: "white"}} onClick={this.handleReset}>Clear</Button>
          </Form.Item>
        </Form>
      </Col>
    )
  }
}

RegistrationForm.propTypes = {
  createUser: PropTypes.func.isRequired
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);
export default connect(null, { createUser })(WrappedRegistrationForm);

