import React, { Component } from 'react';
//import TodoInput from './TodoInput.js';
import TodoItem from './todolist/TodoItem.js';
import '../css/button.css';
import '../css/Body.css';

let id = 1;
function idMaker() {
    id += 1
    return id
}

export default class AppBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                {
                    id: 1,
                    text: 'This is the first TodoItem',
                    completed: false,
                    deleted: false
                }
            ]
        }
        this.onClick = this.onClick.bind(this);
        this.onPress = this.onPress.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onClick(e) {
        e.preventDefault();
        const node = this.refs.input;
        const text = node.value.trim();
        if (text === '') {
            alert('不能为空！')
        } else {
            const newTodo = {
                id: idMaker(),
                text: text,
                completed: false,
                deleted: false
            }
            const newTodos = [newTodo, ...this.state.todos]
            this.setState({
                todos: newTodos
            })
            node.value = '';
        }
    }

    onPress(e) {
        if (e.key === "Enter") {
            const node = this.refs.input;
            const text = node.value.trim();
            if (text === '') {
                alert('不能为空！')
            } else {
                const newTodo = {
                    id: idMaker(),
                    text: text,
                    completed: false,
                    deleted: false
                }
                const newTodos = [newTodo, ...this.state.todos]
                this.setState({
                    todos: newTodos
                })
                node.value = '';
            }
        }
    }

    onToggle(e, todo) {
        todo.completed = !todo.completed;
        this.setState(this.state);
    }

    onDelete(e, todo) {
        todo.deleted = true;
        this.setState(this.state);
    }

    render() {
        let todo = this.state.todos.filter((item) => !item.deleted).map((item, index) => {
            return (
                <li key={ item.id } style={ { textDecoration: item.completed ? "line-through" : "none" } }>
                  <TodoItem todo={ item } onToggle={ this.onToggle } onDelete={ this.onDelete } />
                </li>
            )
        })

        return (
            <div id='body'>
              <input type="text" ref='input' onKeyPress={ this.onPress } />
              <button className='button button-glow button-rounded button-small' onClick={ this.onClick }>提交</button>
              <ul>
                { todo }
              </ul>
            </div>

        )

    }
}

