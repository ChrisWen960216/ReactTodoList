import React, { Component } from 'react';

export default class ForgotPassWord extends Component {
    render() {
        return (
            <div className="forgotPassword">
              <h3>重置密码</h3>
              <form className="forgotPassword" onSubmit={ this.props.onSubmit.bind(this) }>
                { /* 登录*/ }
                <div className="row">
                  <label>邮箱</label>
                  <input type="text" value={ this.props.formData.email } onChange={ this.props.onChange.bind(null, 'email') } />
                </div>
                <div className="row actions">
                  <button type="submit">发送重置邮件</button>
                </div>
              </form>
            </div>
        )
    }
}