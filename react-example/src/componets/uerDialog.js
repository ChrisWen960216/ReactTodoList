import React, { Component } from 'react';
import { signUp, signIn, sendPasswordResetEmail } from '../leanCloud.js';
import SignInOrSignUpForm from './todolist/SignInOrSignUpForm.js';
import ForgotPassWord from './todolist/ForgotPassword.js';
import '../css/uderDialog.css';
import '../css/button.css';
export default class UserDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'signUp',
      selectedTab: 'signInOrsignUp',
      formData: {
        email: '',
        username: '',
        password: ''

      }
    };
    //绑定一系列的函数，统一到constructor函数中，便于阅读
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.showForgotPassword = this.showForgotPassword.bind(this);
    this.changeFormData = this.changeFormData.bind(this);
    this.showForgotPassword = this.showForgotPassword.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  //注册操作函数
  signUp(e) {
    e.preventDefault();
    let {email, username, password} = this.state.formData
    let success = (user) => {
      this.props.onSignUp.call(null, user);
    }
    let error = (error) => {
      switch (error.code) {
        case 202:
          alert('用户名已经被使用！')
          break;
        default:
          alert(error)
          break;
      }
    }
    signUp(email, username, password, success, error)
  }

  //登录操作函数
  signIn(e) {
    e.preventDefault();
    let {username, password} = this.state.formData;
    let success = (user) => {
      this.props.onSignIn.call(null, user);
    }
    let error = (error) => {
      switch (error.code) {
        case 210:
          alert('用户名或者密码有错误！')
          break;
        default:
          alert(error)
          break;
      }
    }
    //调用API，并非是自身函数。只是同名，signIn 由上面 import 进来
    signIn(username, password, success, error)
  }

  //修改 state 中对应的函数值，直接修改为鼠标动作的目标函数值
  changeFormData(key, e) {
    //深拷贝state状态，避免直接修改组件的state
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.formData[key] = e.target.value;
    this.setState(stateCopy);
  }

  //展示 忘记密码 面板
  showForgotPassword() {
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.selectedTab = 'forgotPassword';
    this.setState(stateCopy);
  }

  //执行 找回密码
  resetPassword() {
    sendPasswordResetEmail(this.state.formData.email);
  }

  render() {
    return (
      <div className="UserDialog-Wrapper">
        <div className="UserDialog">
          { this.state.selectedTab === 'signInOrsignUp' ?
            <SignInOrSignUpForm formData={ this.state.formData } signIn={ this.signIn } signUp={ this.signUp } onChange={ this.changeFormData } showForgotPassword={ this.showForgotPassword }
            /> :
            <ForgotPassWord formData={ this.state.formData } onSubmit={ this.resetPassword } onChange={ this.changeFormData } /> }
        </div>
      </div>
    )
  }
}