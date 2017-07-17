import React, { Component } from 'react';
import TodoItem from './todolist/TodoItem.js';
import UserDialog from './uerDialog.js';
import { getCurrentUser, signOut, TodoModel } from '../leanCloud.js';
import '../css/button.css';
import '../css/Body.css';


export default class AppBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //设置初始 user 调用对应的 API函数
            user: getCurrentUser() || {},
            todos: []
        };
        let user = getCurrentUser();
        if (user) {
            TodoModel.getByUser(user, (todos) => {
                let stateCopy = JSON.parse(JSON.stringify(this.state));
                stateCopy.todos = todos;
                this.setState(stateCopy);
            })
        }

        this.onClick = this.onClick.bind(this);
        this.onPress = this.onPress.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onSingUp = this.onSignUp.bind(this);
        this.onSignIn = this.onSignIn.bind(this);
        this.onSignOut = this.onSignOut.bind(this);
    }

    //新增加一个TodoItem
    onClick() {
        const node = this.refs.input;
        const text = node.value.trim();
        if (text === '') {
            alert('不能为空！')
        } else {
            let newTodo = {
                text: text,
                completed: false,
                deleted: false
            }
            TodoModel.create(newTodo, (id) => {
                newTodo.id = id
                let newTodos = [newTodo, ...this.state.todos]
                this.setState({
                    todos: newTodos
                })
            }, (error) => {
                console.log('Error!', error);
            })

            node.value = '';
        }
    }

    //输入框回车事件，调用上面的函数，避免重复
    onPress(e) {
        if (e.key === "Enter") {
            this.onClick();
        }
    }

    //切换todo完成/未完成
    onToggle(e, todo) {
        let oldCompleted = todo.completed;
        todo.completed = !todo.completed;
        TodoModel.update(todo, () => {
            this.setState(this.state)
        }, (error) => {
            todo.completed = oldCompleted;
            this.setState(this.state)
        })
    }

    //删除事件，并不是真的删除，只是设为不可见。后续版本会优化
    onDelete(e, todo) {
        TodoModel.destory(todo.id, () => {
            todo.deleted = true;
            this.setState(this.state);
        })
    }

    //下面的3个函数将间接修改（使用 stateCopy )组件state，提供不同的状态
    onSignUp(user) {
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.user = user;
        this.setState(stateCopy);
    }

    onSignIn(user) {
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.user = user;
        this.setState(stateCopy);
    }

    onSignOut() {
        signOut();
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.user = {};
        this.setState(stateCopy);
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
              <h1>{ this.state.user.username || '我' }的待办</h1>
              { this.state.user.id ? <button type='submit' onClick={ this.onSignOut }>登出</button> : null }
              <input type="text" ref='input' onKeyPress={ this.onPress } />
              <button className='button button-glow button-rounded button-small' onClick={ this.onClick }>提交</button>
              <ul>
                { todo }
              </ul>
              { this.state.user.id ? null : <UserDialog onSingUp={ this.onSingUp } onSignIn={ this.onSignIn } /> }
            </div>

        )

    }
}

