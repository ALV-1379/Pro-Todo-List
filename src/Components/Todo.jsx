import React, { Component, useEffect } from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import FormatColorTextOutlinedIcon from '@mui/icons-material/FormatColorTextOutlined';



export default function Todo(props) {

    const removeClickHandler = (id) => {
        props.onRemove(id)
    }

    const editClickHandler = (id) => {
        props.onToggleCompletion(id)
    }

    const textEditHandler = (id) => {
        props.onTitleEdit(id)
    }
    return (
        <div className={`todo ${props.completed ? 'completed' : ''}`} style={{ display: 'flex' }}>
            <li className="todo-item">{props.title}</li>

            <button className="check-btn" onClick={() => editClickHandler(props.id)}>
                <i className="fas fa-check" aria-hidden="true"><ModeEditIcon /></i>
            </button>

            <button className="trash-btn" onClick={() => removeClickHandler(props.id)}>
                <i className="fas fa-trash" aria-hidden="true"><DeleteIcon /></i>
            </button>
            <button className="editbtn" onClick={() => textEditHandler(props.id)}><i className="fas fa-trash" aria-hidden="true">
                <FormatColorTextOutlinedIcon /></i></button>
        </div>
    )
}