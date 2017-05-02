import React from 'react';
import cx from 'classnames';

export default class TodoItem extends React.Component {
  componentDidMount() {
    this.textField.select();
  }

  getTodoClassName(todo) {
    return cx('todo', {
      'todo--done': todo.done
    });
  }

  render() {
    const { todo, onTodoDone, onTodoRemove, onTodoChange } = this.props;

    return(
      <li className={this.getTodoClassName(todo)}>
        <input
          type='checkbox'
          value={todo.done}
          onClick={onTodoDone}
          className='todo__done'
        />
        <input
          type='text'
          value={todo.message}
          data-todo-id={todo.id}
          onChange={onTodoChange}
          className='todo__input'
          ref={(input) => { this.textField = input; }}
        />
        <button
          className='todo__remove'
          onClick={onTodoRemove}
          data-todo-id={todo.id}
        >
            &times;
        </button>
      </li>
    );
  }
}
