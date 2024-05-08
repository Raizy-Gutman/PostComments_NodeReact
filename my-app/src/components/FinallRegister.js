import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';

const FinallRegister = () => {
  const API_URL = "http://localhost:8080/users/";
  const id = JSON.parse(localStorage.getItem('usersInLS'))[0].id;
  const username = JSON.parse(localStorage.getItem('usersInLS'))[0].username;
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [homePage, setHomePage] = useState(false);

  console.log(username);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    username: username,
    address: "",
    phone: "",
    website: "",
    company: ""
  })

  // useEffect(() => {
  const searchUser = async () => {
    try {
      setIsFetching(true);
      const response = await fetch(`${API_URL}${id}`);
      if (!response.ok) {
        throw new Error('Did not receive expected data');
      }
      const resData = await response.json();
      console.log(resData[0]);
      console.log(resData);
      setNewUser({
        ...newUser,
        username: [resData[0].username]
      });
      setFetchError(null);
    } catch (error) {
      setFetchError(error.message);
    } finally {
      setIsFetching(false);
    }
  }

  const handleOnSubmit = async () => {
    await searchUser()
    fetch(`${API_URL}${id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser)
    })
      .then((response) => {
        let json = response.json();
        console.log(json);
        const userToLS = {
          id: id,
          name: newUser.name,
          username: newUser.username,
          email: newUser.email,
          address: newUser.address,
          phone: newUser.phone,
          website: newUser.website,
          company: newUser.company
        }
        localStorage.setItem('usersInLS', JSON.stringify([userToLS]));
        setHomePage(true);
      })
  }

  const handleChangeOnObject = (event, type) => {
    setNewUser({
      ...newUser,
      [type]: event.target.value
    })
  }

  
  if (homePage) {
    return <Navigate to={'/home'} />
  }
  else if (isFetching) {
    return (
      <p>Loading...</p>
    )
  } else if (fetchError) {
    return (
      <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>
    )
  } else {
    return (
      <div className='finallregister'>
        <p>Hello, please fill out the form</p>
        <form >
          <label>Enter your name:</label>
          <input
            type="text"
            name="name"
            onChange={(event) => handleChangeOnObject(event, 'name')}
            required
          />

          <label>Enter your email:</label>
          <input
            type="email"
            name="email"
            onChange={(event) => handleChangeOnObject(event, 'email')}
            required
          />

          <label>Enter your address:</label>
          <input
            type="text"
            name="street"
            onChange={(event) => handleChangeOnObject(event, 'address')}
            required
          />

          <label>Enter your phone:</label>
          <input
            type="text"
            name="phone"
            onChange={(event) => handleChangeOnObject(event, 'phone')}
            required
          />

          <label>Enter your website:</label>
          <input
            type="text"
            name="phone"
            onChange={(event) => handleChangeOnObject(event, 'website')}
            required
          />

          <label>Enter your name of company:</label>
          <input
            type="text"
            name="nameOfCompany"
            onChange={(event) => handleChangeOnObject(event, 'company')}
            required
          />

          <button type="button" className='submit' onClick={handleOnSubmit}>submit</button>
        </form>
      </div>
    )
  }
}

export default FinallRegister