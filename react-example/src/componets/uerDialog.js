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
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.showForgotPassword = this.showForgotPassword.bind(this);
    this.changeFormData = this.changeFormData.bind(this);
    this.showForgotPassword = this.showForgotPassword.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }



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
    signIn(username, password, success, error)

  }
  changeFormData(key, e) {
    //深拷贝state状态，避免直接修改组件的state
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.formData[key] = e.target.value;
    this.setState(stateCopy);
  }

  showForgotPassword() {
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.selectedTab = 'forgotPassword';
    this.setState(stateCopy);
  }

  resetPassword(e) {
    e.preventDefault();
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