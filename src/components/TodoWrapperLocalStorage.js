import React, { useState, useEffect } from 'react';
import { TodoForm } from './ToDoForm';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './ToDo';
import { EditTodoForm } from './EditToDoForm';

export const TodoWrapperLocalStorage = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
  }, []);

  const updateLocalStorage = (newTodos) => {
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const addTodo = (todo) => {
    const newTodos = [...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }];
    setTodos(newTodos);
    updateLocalStorage(newTodos);
  };

  const toggleComplete = (id) => {
    const newTodos = todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    setTodos(newTodos);
    updateLocalStorage(newTodos);
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    updateLocalStorage(newTodos);
  };

  const editTodo = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo)));
  };

  const editTask = (task, id) => {
    const newTodos = todos.map((todo) => (todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo));
    setTodos(newTodos);
    updateLocalStorage(newTodos);
  };

  return (
    <div className='TodoWrapper'>
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        )
      )}
    </div>
  );
};
