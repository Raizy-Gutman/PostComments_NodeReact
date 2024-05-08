import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';

const Register = () => {

    const API_URL = "http://localhost:8080/users";
    const [users, setUsers] = useState([]);
    const [finallRediseration, setFinallRediseration] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const [wrong, setWrong] = useState('');
    const [verifyPassword, setVerifyPassword] = useState("");
    const [addUser, setAddUser] = useState({
        username: "",
        password: ""
    })

    const searchUser = async () => {
        try {
            setIsFetching(true);
            const response = await fetch(`${API_URL}?username=${addUser.username}`);
            console.log(addUser.username);
            if (!response.ok) {
                throw new Error('Did not receive expected data111');
            }
            const resData = await response.json();
            setUsers(resData);
            setFetchError(null);
        } catch (error) {
            setFetchError(error.message);
        } finally {
            setIsFetching(false);
        }
    }

    const handleChangeOnObject = (event, type) => {
        setAddUser({
            ...addUser,
            [type]: event.target.value
        })
    }

    const handleChangeVerifyPassword = (event) => {
        setVerifyPassword(event.target.value);
    }

    const handlePostPassword = async (id) => {
        try {
            console.log(id);
            const response = await fetch('http://localhost:8080/passwords', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idOfUser: id,
                    password: addUser.password
                }),
            });

            if (!response.ok) {
                throw new Error('Did not receive expected data222');
            }

            const json = await response.json();
            console.log(json);
            setFinallRediseration(true);
        } catch (error) {
            setFetchError(error.message);
        }
    }

    const addToLS = (user) => {
        console.log(user);
        console.log("================")
        console.log(user[0]);
        const userToLS = {
            id: user[0].id,
            username: user[0].username
        }
        localStorage.setItem('usersInLS', JSON.stringify([userToLS]));
        handlePostPassword(user[0].id);
    }

    const handlePostUser = async () => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: addUser.username
                }),
            });

            if (!response.ok) {
                throw new Error('Did not receive expected data333');
            }

            const json = await response.json();
            console.log(json);
            addToLS(json);
        } catch (error) {
            setFetchError(error.message);
        }
    }


    const handleOnSubmit = () => {
        if (addUser.password !== verifyPassword) {
            setWrong("ERROR: Try again");
        } else {
            searchUser();
            if (users.length === 0) {
                handlePostUser();
            }
            else {
                setWrong("ERROR: Try again");
            }
        }
    }

    if (isFetching) {
        return (
            <p>Loading...</p>
        )
    } else if (fetchError) {
        return (
            <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>
        )
    } else {
        return (
            <div>
                {finallRediseration && <Navigate to="/finallRegister" />}
                <form >
                    <label>Enter a username:</label>
                    <input
                        type="text"
                        name="username"
                        onChange={(event) => handleChangeOnObject(event, 'username')}
                        required
                    />

                    <label>Enter a password:</label>
                    <input
                        type="text"
                        name="password"
                        onChange={(event) => handleChangeOnObject(event, 'password')}
                        required
                    />

                    <label>Enter a verify-password:</label>
                    <input
                        type="text"
                        name="verifyPassword"
                        onChange={handleChangeVerifyPassword}
                        required
                    />

                    {(wrong !== '') && <p>{wrong}</p>}

                    <button type="button" className='submit' onClick={handleOnSubmit}>submit</button>
                    <p><i>already have an account? <Link to="/logIn">LOG IN!</Link></i></p>
                </form>
            </div>
        )
    }
}

export default Register