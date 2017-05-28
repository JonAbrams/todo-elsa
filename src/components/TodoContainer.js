import React from 'react';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import uuidV4 from 'uuid/v4';
import vex from 'vex-js/src/vex.combined';
import 'vex-js/dist/css/vex.css';
import 'vex-js/dist/css/vex-theme-os.css';

vex.defaultOptions.className = 'vex-theme-os';

export default class TodoContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      todos: [],
    };
  }

  handleAddTodo = event => {
    event.preventDefault();

    this.setState(prevState => {
      const freshTodos = prevState.todos.filter(t => !t.done);
      const doneTodos = prevState.todos.filter(t => t.done);
      return {
        todos: freshTodos.concat({
          message: 'Type in your todo…',
          id: uuidV4()
        }).concat(doneTodos)
      };
    });
  }

  handleTodoChange = ({ target }, todo) => {
    const todoIndex = this.state.todos.indexOf(todo);
    const message = target.value;

    const updatedTodo = todo.update({ $merge: { message } });

    this.setState(prevState => ({
      todos: prevState.todos.splice(todoIndex, 1, updatedTodo)
    }));
  }

  handleTodoRemove = ({ target }, todo) => {
    const todoIndex = this.state.todos.indexOf(todo);

    vex.dialog.confirm({
      message: 'Are you sure?',
      callback: confirmed => {
        if (!confirmed) return;

        this.setState(prevState => ({
          todos: prevState.todos.splice(todoIndex, 1)
        }));
      }
    });
  }

  handleTodoDone = ({ target }, todo) => {
    this.setState(prevState => {
      let { todos } = prevState;
      const todoIndex = todos.indexOf(todo);
      todo = todo.update({
        $merge: { done: target.checked }
      });
      todos = todos.splice(todoIndex, 1, todo);
      // Place done todo items at the end of the list
      todos = todos.sort((a,b) => a.done && !b.done);
      return { todos };
    });
  }

  render() {
    return(
      <div className='todo-app'>
        <h1 className='todo-title'>Todo</h1>
        <TodoList
          todos={this.state.todos}
          onTodoChange={this.handleTodoChange}
          onTodoRemove={this.handleTodoRemove}
          onTodoDone={this.handleTodoDone}
        />
        <AddTodo onClick={this.handleAddTodo} />
      </div>
    );
  }
}
