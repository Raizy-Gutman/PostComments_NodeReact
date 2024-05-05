import '../logIn.css'
import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';

const LogIn = () => {

  const [users, setUsers] = useState([]);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isExist, setIsExist] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [user, setUser] = useState({
    name: "",
    password: ""
  });


  const searchUser = async () => {
    let resData = [];
    try {

      setIsFetching(true);
      const response = await fetch(`http://localhost:8080/users?username=${user.name}&website=${user.password}`);
      if (!response.ok) {
        throw new Error('Did not receive expected data');
      }
      resData = await response.json();
      setUsers(resData);
      setFetchError(null);
    } catch (error) {
      setFetchError(error.message);
    } finally {
      setIsFetching(false);
      return resData;
    }

  }




  const handleOnChange = (event, type) => {
    setUser({
      ...user,
      [type]: event.target.value
    })
  }


  const handleSubmit = async () => {

    let retData = await searchUser();
    console.log(users.length);
    console.log(retData.length);
    if (retData.length > 0) {
      const userToStorage = {
        id: retData[0].id,
        name: retData[0].name,
        username: retData[0].username,
        email: retData[0].email,
        address: {
          street: retData[0].address.street,
          suite: retData[0].address.suite,
          city: retData[0].address.city,
          zipcode: retData[0].address.zipcode,
          geo: {
            lat: retData[0].address.geo.lat,
            lng: retData[0].address.geo.lng
          }
        },
        phone: retData[0].phone,
        company: {
          name: retData[0].company.name,
          catchPhrase: retData[0].company.catchPhrase,
          bs: retData[0].company.bs
        }
      }
      localStorage.setItem('usersInLS', JSON.stringify([userToStorage]));
      setIsExist(true);
    } else {
      setIsNewUser(true);
    }
  }

  if (isExist) {
    return (
      <Navigate to="/home" />
    )
  }
  else if (fetchError) {
    return (
      <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>
    )
  }
  else if (isFetching) {
    return (
      <div className="ring">Loading
        <span></span>
      </div>
    )
  }
  else {
    return (
      <div>
        <form >
          <label>Enter a username:</label>
          <input
            type="text"
            name="username"
            onChange={(event) => handleOnChange(event, 'name')}
            required
          />

          <label>Enter a password:</label>
          <input
            type="text"
            name="password"
            onChange={(event) => handleOnChange(event, 'password')} g
            required
          />

          {isNewUser && <p>User does not exist</p>}

          <button type="button" className='submit' onClick={handleSubmit}>submit</button>
          <p><i>don't have an account? click to <Link to="/register" >SIGN UP!</Link></i></p>
        </form>
      </div>
    )
  }


}

export default LogIn