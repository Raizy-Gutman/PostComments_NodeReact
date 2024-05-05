import React, { useState, useEffect, useRef } from 'react';
import ListTodos from './ListTodos'

const Todos = () => {
    const id = useRef(0);
    const [todos, setTodos] = useState([]);
    const [todosForFilter, setTodosForFilter] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const API_URL = "http://localhost:3300/todos";
    useEffect(() => {
        const usersInLS = localStorage.getItem('usersInLS');
        id.current = usersInLS ? JSON.parse(usersInLS)[0].id : null;
        fetch(`${API_URL}?userId=${id.current}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => setTodos(data))
            .catch((error) => setFetchError(error));
    }, [])

    const addTodo = async (title) => {
        try {
            setIsFetching(true);
            const addNewTodo = {
                userId: id.current,
                title: title,
                completed: false,
            };
            const response = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify(addNewTodo),
            });

            if (!response.ok) {
                throw new Error('Did not receive expected data');
            }

            const json = await response.json();
            console.log(json);
            setTodos((prevTodos) => [...prevTodos, addNewTodo]);
        } catch (error) {
            setFetchError(error.message);
        } finally {
            setIsFetching(false);
        }
    }

    const updateTodo = async (todoUpdate) => {
        try {
            setIsFetching(true);
            await fetch(`${API_URL}/${todoUpdate.id}`, {
                method: 'PUT',
                body: JSON.stringify(todoUpdate)
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('Did not receive expected data');
                }
                let json = response.json();
                console.log(json);
                setTodos(todos.map((todo) =>
                    todo.id === todoUpdate.id ? { ...todoUpdate } : todo))
            })

        } catch (error) {
            setFetchError(error);
        } finally {
            setIsFetching(false);
        }
    }

    const deleteTodo = async (idToDelete) => {
        try {
            console.log("hhhhhhh");
            setIsFetching(true);
            await fetch(`${API_URL}/${idToDelete}`, {
                method: 'DELETE',
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('Did not receive expected data');
                }
                console.log("bbb");
                let json = response.json();
                console.log(json);
                setTodos(todos.filter((todo) =>
                    todo.id !== idToDelete))
            })
        } catch (error) {
            setFetchError(error);
        } finally {
            setIsFetching(false);
        }
    }

    if (isFetching) {
        return <p>Loading...</p>
    } else if (fetchError) {
        return <p>ERROR: {fetchError}</p>
    } else {
        return (
            <div>
                <h2>Todos:</h2>
                <ListTodos todos={todos} todosForFilter={todosForFilter} setTodosForFilter= {setTodosForFilter} updateTodo={updateTodo} deleteTodo={deleteTodo} addTodo={addTodo} />
            </div>
        )
    }


}

export default Todos;
