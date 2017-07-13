import React, { Component } from 'react';
import { signUp } from '../leanCloud.js';
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
        e.preventDefault()
        let {username, password} = this.state.formData
        let success = (user) => {
            console.log(user)
        }
        let error = (error) => {
            console.log(error)
        }
        signUp(username, password, success, error)
    }
    sinIn(e) {}
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
            <button type="submit" className='button button-glow button-rounded button-small'>注册</button>
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
            <button type="submit" className='button button-glow button-rounded button-small'>登录</button>
            <button type="submit" className='button button-glow button-rounded button-small'>取消</button>
          </div>
        </form>
        )
        return (
            <div className="UserDialog-Wrapper">
              <div className="UserDialog">
                <nav onChange={ this.switch }>
                  <label>
                    <input type="radio" value='signUp' checked={ this.state.selected === 'signUp' } /> 注册</label>
                  <label>
                    <input type="radio" value='signIn' checked={ this.state.selected === 'signIn' } /> 登录</label>
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