import React, { Component } from 'react';
import logo from '../logo.svg';
import '../css/Header.css';

class AppHeader extends Component {
  render() {
    return (
      <header id="App">
        <div className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <h2>TodoList By ChrisWen</h2>
        </div>
      </header>
      );
  }
}

export default AppHeader;
