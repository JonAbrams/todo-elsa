import React from 'react';

import TodoItem from './TodoItem';

export default function TodoList({ todos, onTodoChange, onTodoRemove, onTodoDone }) {
  return (
    <div>
      {todos.length ?
        <ul className='todo-list'>
          {todos.map(todo => (
            <TodoItem
              todo={todo}
              key={todo.id}
              onTodoChange={e => onTodoChange(e, todo)}
              onTodoRemove={e => onTodoRemove(e, todo)}
              onTodoDone={e => onTodoDone(e, todo)}
            />
          ))}
        </ul>
      : <h3>All done? Click <strong>Add Todo</strong> to get started!</h3>}
    </div>
  );
}
