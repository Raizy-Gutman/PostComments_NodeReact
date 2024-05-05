import React, { useState , useEffect} from 'react'
import TodoItem from './TodoItem'
import { IoIosAddCircleOutline } from "react-icons/io";

const ListTodos = ({ todos, updateTodo, deleteTodo, addTodo, todosForFilter, setTodosForFilter}) => {
    const [titleToAdd, setTitleToAdd] = useState("");

    useEffect(() => {
        setTodosForFilter([...todos]);
      }, [todos]);

    const orderByTodos = (order) => {
        let updatedTodos;
    
        switch (order) {
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
    

    const filterBy = (filter, paramToFilter = '') => {
    
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
                setTodosForFilter([todos[paramToFilter-1]] || []);
                break;
            case 'title':
                setTodosForFilter(todos);
                setTodosForFilter(todosForFilter.filter((todo => todo.title === paramToFilter)))
                break;
            default:
                setTodosForFilter(todos);
        }
    }

    return (
        <div>
            <label>
                Order By :
                <select
                    onChange={(event) => orderByTodos(event.target.value)}
                >
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
                    placeholder="Search by id"
                    onChange={(event) => filterBy("id", event.target.value)}
                    name="id"
                    id="searchId"
                />
            </div>
            <label htmlFor="searchTitle">Search by title:</label>
            <div >
                <input
                    type="text"
                    placeholder="Search by title"
                    onChange={(event) => filterBy("title", event.target.value)}
                    name="title"
                    id="searchTitle"
                />
            </div>
            <button onClick={(event) => filterBy("completed", event.target.value)}>completed</button>
            <button onClick={(event) => filterBy("uncompleted", event.target.value)}>uncompleted</button>
            <button onClick={(event) => filterBy("allTodos", event.target.value)}>allTodos</button>
            <input
            type="text"
            placeholder="Add Todo"
            onChange={(event) => setTitleToAdd(event.target.value)}/>
            <button onClick={() => addTodo(titleToAdd)}><IoIosAddCircleOutline /></button>
            <ol>
                {todosForFilter.map((todo) => (
                    <TodoItem key= {todo.id} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo}/>
                ))}
            </ol>
        </div>
    )
}

export default ListTodos







