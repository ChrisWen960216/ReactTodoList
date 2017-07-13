import React, { Component } from 'react';

export default class TodoInput extends Component {
    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
    }

    onPress(e) {
        if (e.key === 'Enter') {
            this.props.onSubmit.call();
        }
    }

    render() {
        return (
            <input type="text" defaultValue={ this.props.content } onKeyPress={ this.onPress } />
        )
    }
}