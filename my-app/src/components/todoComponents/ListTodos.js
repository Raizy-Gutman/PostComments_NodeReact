import React, { useState, useEffect } from 'react'
import TodoItem from './TodoItem'
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiMapPin } from "react-icons/ci";

const ListTodos = ({ todos, updateTodo, deleteTodo, addTodo, todosForFilter, setTodosForFilter }) => {
    const [titleToAdd, setTitleToAdd] = useState("");

    const [change, setChange] = useState({
        title: "",
        id: 0//??????????????????????/
    });

    useEffect(() => {
        setTodosForFilter([...todos]);
    }, [todos]);

    const handleChangeOnObject = (event, type) => {
        setChange({
            ...change,
            [type]: event.target.value
        })
    }

    const orderByTodos = (order) => {
        let updatedTodos;

        switch (order) {
            // case 'withOutOrder':
            //     updatedTodos = [...todosForFilter];
            //     break;
            case 'serial':
                updatedTodos = [...todosForFilter].sort((a, b) => a.id - b.id);
                break;
            case 'performance':
                updatedTodos = [...todosForFilter].sort((a, b) => (a.completed ? -1 : 1));
                break;
            case 'alphabetical':
                updatedTodos = [...todosForFilter].sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'random':
                updatedTodos = [...todosForFilter].sort(() => Math.random() - 0.5);
                break;
            default:
                updatedTodos = [...todosForFilter];
        }

        setTodosForFilter(updatedTodos);
    };


    const filterBy = (filter) => {

        switch (filter) {
            case 'allTodos':
                setTodosForFilter(todos);
                break;
            case 'completed':
                setTodosForFilter(todos);
                setTodosForFilter(todos.filter((todo) => todo.completed))

                break;
            case 'uncompleted':
                setTodosForFilter(todos);
                setTodosForFilter(todos.filter((todo) => !todo.completed))
                break;
            case 'id':
                setTodosForFilter([todos[change.id - 1]] || []);
                break;
            case 'title':
                setTodosForFilter(todos);
                setTodosForFilter(todosForFilter.filter((todo => todo.title === change.title)))
                break;
            default:
                setTodosForFilter(todos);
        }
    }

    return (
        <div className='todos'>
            <label>
                Order By :
                <select
                    onChange={(event) => orderByTodos(event.target.value)}
                >
                    {/* <option value="withOutOrder">With out order</option> */}
                    <option value="serial">Serial</option>
                    <option value="performance">Performance</option>
                    <option value="alphabetical">Alphabetical </option>
                    <option value="random">Random </option>
                </select>
            </label>
            <div>
                <label htmlFor="searchId">Search by id:</label>
                <input
                    type="text"
                    placeholder="Search by id"  handleChangeOnObject
                    onChange={(event) => handleChangeOnObject(event, 'id')}
                    name="id"
                    id="searchId"
                />
                <button onClick={() => filterBy("id")}><CiMapPin /></button>
            </div>
            <label htmlFor="searchTitle">Search by title:</label>
            <div >
                <input
                    type="text"
                    placeholder="Search by title"
                    onChange={(event) => handleChangeOnObject(event, 'title')}
                    name="title"
                    id="searchTitle"
                />
                <button onClick={() => filterBy("title")}><CiMapPin /></button>
            </div>
            <button onClick={() => filterBy("completed")}>completed</button>
            <button onClick={() => filterBy("uncompleted")}>uncompleted</button>
            <button onClick={() => filterBy("allTodos")}>allTodos</button>
            <input
                type="text"
                placeholder="Add Todo"
                onChange={(event) => setTitleToAdd(event.target.value)} />
            <button onClick={() => addTodo(titleToAdd)}><IoIosAddCircleOutline /></button>
            <ol>
                {todosForFilter.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />
                ))}
            </ol>
        </div>
    )
}

export default ListTodos







