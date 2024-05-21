import React, { useState } from 'react';
import Header from './Header';
import Todo from './Todo';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TodoList() {
    const [todos, setTodos] = useState([]);
    const [todoTitle, setTodoTitle] = useState("");
    const [status, setStatus] = useState("all");
    const [taskId, setTaskId] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    const handleTodoTitleChange = (event) => {
        setTodoTitle(event.target.value);
    };

    const addTodo = (event) => {
        event.preventDefault();
        if (!isEdit) {
            if (todoTitle.trim()) {
                const newTodoObject = {
                    id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 0,
                    title: todoTitle,
                    completed: false
                };
                setTodos(prevTodos => [...prevTodos, newTodoObject]);
                setTodoTitle('');
            } else {
                alert("Input is empty");
            }
        } else {
            updateTodoTitle(taskId, todoTitle);
            setIsEdit(false);
        }
    };

    const updateTodoTitle = (id, title) => {
        setTodos(prevTodos => prevTodos.map(todo =>
            todo.id === id ? { ...todo, title } : todo
        ));
        setTodoTitle('');
        setTaskId(null);
    };

    const removeTodo = (todoId) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
        setTodoTitle("");
        setIsEdit(false);
        setTaskId(null);
    };

    const toggleTodoCompletion = (todoId) => {
        setTodos(prevTodos => prevTodos.map(todo =>
            todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const editTitle = (todoId) => {
        const todoToEdit = todos.find(todo => todo.id === todoId);
        if (todoToEdit) {
            setTodoTitle(todoToEdit.title);
            setIsEdit(true);
            setTaskId(todoToEdit.id);
        }
    };

    const statusHandler = (event) => {
        setStatus(event.target.value);
    };

    const clearTodos = () => {
        setTodos([]);
        setTodoTitle("");
        setIsEdit(false);
        setTaskId(null);
    };

    const filteredTodos = todos.filter(todo => {
        if (status === 'completed') return todo.completed;
        if (status === 'uncompleted') return !todo.completed;
        return true;
    });

    return (
        <>
            <Header />
            <form onSubmit={addTodo}>
                <input
                    type="text"
                    className="todo-input"
                    maxLength="40"
                    value={todoTitle}
                    onChange={handleTodoTitleChange}
                />
                <button className="todo-button" type="submit">
                    <AddIcon />
                </button>
                <div className="select">
                    <select
                        name="todos"
                        className="filter-todo"
                        onChange={statusHandler}
                        value={status}
                    >
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="uncompleted">Uncompleted</option>
                    </select>
                </div>
            </form>

            <div className="todo-container">
                <ul className="todo-list">
                    {filteredTodos.map(todo => (
                        <Todo
                            key={todo.id}
                            {...todo}
                            onTitleEdit={editTitle}
                            onRemove={removeTodo}
                            onToggleCompletion={toggleTodoCompletion}
                        />
                    ))}
                </ul>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Button onClick={clearTodos} variant="outlined" startIcon={<DeleteIcon />}>
                    Delete
                </Button>
            </div>
        </>
    );
}
