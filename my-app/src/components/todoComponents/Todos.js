import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ListTodos from './ListTodos'

const Todos = () => {
    const id = useRef(0);
    const [todos, setTodos] = useState([]);
    const [todosForFilter, setTodosForFilter] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const API_URL = "http://localhost:8080/todos";
    useEffect(() => {
        const usersInLS = localStorage.getItem('usersInLS');
        id.current = usersInLS ? JSON.parse(usersInLS)[0].id : null;
    }, [])
    useEffect(() => {
        fetch(`${API_URL}?userId=${id.current}&_limit=5&_page=${page}&_sort=id`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => setTodos(data))
            .catch((error) => setFetchError(error));
    }, [page])

    const addTodo = async (title) => {
        console.log(id.current);
        console.log(title); 
        try {
            setIsFetching(true);
            const addNewTodo = {
                userId: id.current,
                title: title,
                completed: 0,
            };
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(addNewTodo),
            });
            // console.log(response);
            if (!response.ok) {
                // console.log(response);
                throw new Error('Did not receive expected data');
            }

            const json = await response.json();

            setTodos((prevTodos) => [...prevTodos, json[0]]);
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
                headers: {
                    'Content-Type': 'application/json',
                },
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
            console.log(idToDelete);
            await fetch(`${API_URL}/${idToDelete}`, {
                method: 'DELETE',
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('Did not receive expected data');
                }
                console.log("bbb");
                // let json = response.json();
                // console.log(json);
                setTodos(todos.filter((todo) =>
                    todo.id !== idToDelete))
            })
        } catch (error) {
            setFetchError(error);
        } finally {
            setIsFetching(false);
        }
    }

    const handleGoBack = () => {
        navigate(-1); // Go back one page
      };

    if (isFetching) {
        return <p>Loading...</p>
    } else if (fetchError) {
        return <p>ERROR: {fetchError}</p>
    } else {
        return (
            <div className='todos'>
                <h2>Todos:</h2>
                <ListTodos todos={todos} todosForFilter={todosForFilter} setTodosForFilter={setTodosForFilter} updateTodo={updateTodo} deleteTodo={deleteTodo} addTodo={addTodo} />
                <p>current page: {page}</p>
                {todos.length ? <button onClick={() => setPage(page + 1)}>next</button> : <p>There are no more todos.</p>}
                <button onClick={() => { if (page > 1) setPage(page - 1) }}>prev</button>
                <button onClick={handleGoBack}>Go Back</button>
            </div>
        )
    }


}

export default Todos;
