import React, { useState } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const TodoItem = ({ todo, updateTodo, deleteTodo }) => {
    const [isEditing, setEditing] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(todo.title);

    const handleCheckboxClick = () => {
        updateTodo({ ...todo, completed: !todo.completed });
    };

    const handleUpdateButton = () => {
        setEditing(true);
    };

    const handleSaveButton = () => {
        updateTodo({ ...todo, title: updatedTitle });
        setEditing(false);
    };

    const handleCancelUpdate = () => {
        setUpdatedTitle(todo.title);
        setEditing(false);
    };

    return (
        <li className='todos'>
            <>
                <input
                    type='checkbox'
                    checked={todo.completed}
                    onChange={handleCheckboxClick}
                />
                {isEditing ? (
                    <input
                        type='text'
                        value={updatedTitle}
                        onChange={(e) => setUpdatedTitle(e.target.value)}
                    />
                ) : (
                    <p>{todo.title}</p>
                )}
            </>
            <div>
                {isEditing ? (
                    <>
                        <button onClick={handleSaveButton}>Save</button>
                        <button onClick={handleCancelUpdate}>Cancel</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => deleteTodo(todo.id)}>
                            <FaTrashAlt />
                        </button>
                        <button onClick={handleUpdateButton}><FaEdit /></button>
                    </>
                )}
            </div>
        </li>
    );
};

export default TodoItem;