import React, { Component } from 'react';
import SignInForm from './SignInForm.js';
import SignUpForm from './SignUpForm.js';

export default class SignInOrSignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'signUp'
        }
        this.switch = this.switch.bind(this);
    }
    switch(e) {
        this.setState({
            selected: e.target.value
        })
    }

    render() {
        return (
            <div className="signInOrSignUp">
              <nav>
                <label>
                  <input type="radio" value="signUp" checked={ this.state.selected === 'signUp' } onChange={ this.switch } /> 注册</label>
                <label>
                  <input type="radio" value="signIn" checked={ this.state.selected === 'signIn' } onChange={ this.switch } /> 登录</label>
              </nav>
              <div className="panes">
                { this.state.selected === 'signUp' ?
                  <SignUpForm formData={ this.props.formData } onSubmit={ this.props.signUp } onChange={ this.props.onChange } /> : null }
                { this.state.selected === 'signIn' ?
                  <SignInForm formData={ this.props.formData } onSubmit={ this.props.signIn } onChange={ this.props.onChange } showForgotPassword={ this.props.showForgotPassword } /> : null }
              </div>
            </div>
        )
    }
}