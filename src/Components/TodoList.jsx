import React, { useState } from 'react'
import Header from './Header'
import Todo from './Todo'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';


export default function TodoList() {


    const [todos, setTodos] = useState([])
    const [todoTitle, setTodoTitle] = useState("")
    const [status, setStatus] = useState("all")


    const todoTitleHandler = (event) => {
        setTodoTitle(event.target.value)
    }

    const addTodo = (event) => {
        event.preventDefault()
        if (todoTitle.length > 0) {
            let newTodoObject = {
                id: todos.length + 1,
                title: todoTitle,
                completed: false
            }

            setTodos(prevState => {
                return [...prevState, newTodoObject]
            })
            setTodoTitle('')
        } else {
            alert("input is empty")
        }
    }

    const removeTodo = (todoId) => {

        let newTodos = todos.filter(todo => {
            return todo.id !== todoId
        })

        setTodos(newTodos)
    }

    const editTodo = (todoId) => {

        let newTodos = [...todos]

        newTodos.forEach(todo => {
            if (todo.id === todoId) {
                todo.completed = !todo.completed
            }
        })

        setTodos(newTodos)

    }
    
    const editTitel = (todoId)=>{
        let editselected = todos.filter(todo =>{
            return todo.id === todoId
        })
        const editval = editselected[0]
        const edittext = editval.title
        setTodoTitle(edittext)
      //  const editItem = editval.id
    }

    const statusHandler = (event) => {
        setStatus(event.target.value)
    }
    const clearHandler = () => {
        setTodos([])
    }

    return (
        <>
            <Header />
            <form onSubmit={addTodo}>
                <input type="text" className="todo-input" maxLength="40" value={todoTitle} onChange={todoTitleHandler} />
                <button className="todo-button" type="submit">
                    <AddIcon/>
                </button>
                <div className="select">
                    <select name="todos" className="filter-todo" onChange={statusHandler}>
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="uncompleted">Uncompleted</option>
                    </select>
                </div>
            </form>

            <div className="todo-container">
                <ul className="todo-list">

                    {
                        status === 'completed' && todos.filter(todo => todo.completed).map(todo => (
                            <Todo key={todo.id} {...todo} onTitel={editTitel} onRemove={removeTodo} onEdit={editTodo} />

                        ))
                    }

                    {
                        status === 'uncompleted' && todos.filter(todo => !todo.completed).map(todo => (
                            <Todo key={todo.id} {...todo} onTitel={editTitel} onRemove={removeTodo} onEdit={editTodo} />

                        ))
                    }

                    {
                        status === "all" && todos.map(todo => (
                            <Todo key={todo.id} {...todo} onTitel={editTitel} onRemove={removeTodo} onEdit={editTodo} />
                        ))
                    }


                </ul>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "center"}}>
            <Button onClick={clearHandler} variant="outlined" startIcon={<DeleteIcon />}>
                Delete
            </Button>
        </div >
           
        </>
    )
}