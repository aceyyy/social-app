/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { Form, Input, Button, DatePicker, Col, Modal, Select, Radio, Icon } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUser } from '../action';
import _ from "lodash";

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
        birthday: "",
        gender: "",
    };
  }

  onChangeRegister = (e) => {
    this.setState({[e.target.name] : e.target.value})
  }

  onChangeDate = (e) => {
    this.setState({ birthday: e });
  }

  onChangeAge = (e) => {
    this.setState({ age: e})
  }

  onChangeGender = (e) => {
    this.setState({ gender: e.target.value })
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
          birthday: this.state.birthday.format('YYYY-MM-DD'),
          gender: this.state.gender
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
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10, offset: 5 },
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
          offset: 5,
        },
      },
    };

    return (
      <Col>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            {...formItemLayout}
          >
            {getFieldDecorator('username', {
              rules: [{
                required: true, message: 'Please input your username!',
              }],
            })(
            <Input prefix={<Icon type="user" />} name="username" placeholder="Username" onChange={this.onChangeRegister}/>
            )}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Please input your password!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input.Password prefix={<Icon type="key" />} type="password" name="password" placeholder="Password" onChange={this.onChangeRegister}/>
            )}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Please confirm your password!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input.Password prefix={<Icon type="key" />}  type="password" placeholder="Confirm Password" onBlur={this.handleConfirmBlur} />
            )}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
          >
            {getFieldDecorator('firstname', {
              rules: [{
                required: true, message: 'Please input your firstname!',
              }],
            })(
              <Input name="firstname" placeholder="Firstname" onChange={this.onChangeRegister}/>
            )}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
          >
            {getFieldDecorator('lastname', {
              rules: [{
                required: true, message: 'Please input your lastname!',
              }],
            })(
              <Input name="lastname" placeholder="Lastname" onChange={this.onChangeRegister}/>
            )}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
          >
            {getFieldDecorator('age', {
              rules: [{
                required: true, message: 'Please select your age!',
              }],
            })(
              <Select onChange={this.onChangeAge} name="age" placeholder="Age" style={{width:"43%"}}>
                {_.range(8,66).map((i, index) => 
                    <Select.Option value={i}>{i}</Select.Option>
                )}
              </Select>
              // <Input name="age" placeholder="Age" onChange={this.onChangeRegister}/>
            )}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
          >
            {getFieldDecorator('birthday', {
              rules: [{
                required: true, message: 'Please indicate your birthday!',
              }],
            })(
              <DatePicker placeholder="Birthday" onChange={this.onChangeDate} format="MMMM Do YYYY" allowClear/>
            )}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
          >
            {getFieldDecorator('gender', {
              rules: [{
                required: true, message: 'Please select your gender!',
              }],
            })(
              <Radio.Group onChange={this.onChangeGender}>
                <Radio value="Male"> <Icon type="man" /> Male </Radio>
                <Radio value="Female"> <Icon type="woman" /> Female </Radio>
              </Radio.Group>
            )}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button htmlType="submit" type="primary" style={{width:180}}>Register</Button> 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="danger" style={{width:183, height:"34px", background: "#ff4d4f", color: "white"}} onClick={this.handleReset}>Clear</Button>
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

