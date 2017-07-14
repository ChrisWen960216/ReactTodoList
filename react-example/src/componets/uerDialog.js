import React, { Component } from 'react';
import { signUp, signIn } from '../leanCloud.js';
import '../css/uderDialog.css';
import '../css/button.css';
export default class UserDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'signUp',
      formData: {
        username: '',
        password: ''
      }
    };
    this.switch = this.switch.bind(this);
  }

  switch(e) {
    this.setState({
      selected: e.target.value
    })
  }

  signUp(e) {
    e.preventDefault();
    let {username, password} = this.state.formData
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
    signUp(username, password, success, error)
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
  changeFromData(key, e) {
    //深拷贝state状态，避免直接修改组件的state
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.formData[key] = e.target.value;
    this.setState(stateCopy);
  }

  render() {
    let signUpForm = (
    <form className="signUp">
      { /* 注册*/ }
      <div className="row">
        <label>用户名</label>
        <input type="text" value={ this.state.formData.username } onChange={ this.changeFromData.bind(this, 'username') } />
      </div>
      <div className="row">
        <label>密码</label>
        <input type="password" value={ this.state.formData.password } onChange={ this.changeFromData.bind(this, 'password') } />
      </div>
      <div className="row actions">
        <button type="submit" className='button button-glow button-rounded button-small' onClick={ this.signUp.bind(this) }>注册</button>
        <button type="submit" className='button button-glow button-rounded button-small'>取消</button>
      </div>
    </form>
    )
    let signInForm = (
    <form className="signIn">
      { /* 登录*/ }
      <div className="row">
        <label>用户名</label>
        <input type="text" value={ this.state.formData.username } onChange={ this.changeFromData.bind(this, 'username') } />
      </div>
      <div className="row">
        <label>密码</label>
        <input type="password" value={ this.state.formData.password } onChange={ this.changeFromData.bind(this, 'password') } />
      </div>
      <div className="row actions">
        <button type="submit" className='button button-glow button-rounded button-small' onClick={ this.signIn.bind(this) }>登录</button>
        <button type="submit" className='button button-glow button-rounded button-small'>取消</button>
      </div>
    </form>
    )
    return (
      <div className="UserDialog-Wrapper">
        <div className="UserDialog">
          <nav>
            <label>
              <input type="radio" value="signUp" checked={ this.state.selected === 'signUp' } onChange={ this.switch.bind(this) } /> 注册</label>
            <label>
              <input type="radio" value="signIn" checked={ this.state.selected === 'signIn' } onChange={ this.switch.bind(this) } /> 登录</label>
          </nav>
          <div className="panes">
            { this.state.selected === 'signUp' ? signUpForm : null }
            { this.state.selected === 'signIn' ? signInForm : null }
          </div>
        </div>
      </div>
    )
  }
}