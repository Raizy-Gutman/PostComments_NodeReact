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
        website: ""
    })

    const searchUser = async () => {
        try {
            setIsFetching(true);
            const response = await fetch(`${API_URL}?username=${addUser.username}`);
            if (!response.ok) {
                throw new Error('Did not receive expected data');
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


    const handleChangeName = (event) => {
        setAddUser({
            ...addUser,
            username: event.target.value
        })
    }

    const handleChangePassword = (event) => {
        setAddUser({
            ...addUser,
            website: event.target.value
        })
    }

    const handleChangeVerifyPassword = (event) => {
        setVerifyPassword(event.target.value);
    }

    const addToLS = (user) => {
        const userToLS = {
            id: user.id
        }
        localStorage.setItem('usersInLS', JSON.stringify([userToLS]));
    }

    const handlePost = async () => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify(addUser),
            });
    
            if (!response.ok) {
                throw new Error('Did not receive expected data');
            }
    
            const json = await response.json();
            console.log(json);
            addToLS(json);
            setFinallRediseration(true);
        } catch (error) {
            setFetchError(error.message);
        }
    }
    

    const handleOnSubmit = () => {
        if (addUser.website !== verifyPassword) {
            setWrong("ERROR: Try again");
        } else {
            searchUser();
            if (users.length === 0) {
                handlePost();
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
                        onChange={handleChangeName}
                        required
                    />

                    <label>Enter a password:</label>
                    <input
                        type="text"
                        name="password"
                        onChange={handleChangePassword}
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