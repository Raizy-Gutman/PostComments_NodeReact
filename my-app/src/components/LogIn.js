// import '../logIn.css'
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

const LogIn = () => {

  const [users, setUsers] = useState([]);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isExist, setIsExist] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [needNewpassword, setNeedNewpassword] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [user, setUser] = useState({
    id: "",//???????????????????
    userName: "",
    password: ""
  });


  const searchUser = async () => {
    let resData = [];
    try {

      setIsFetching(true);
      const response = await fetch(`http://localhost:8080/users?username=${user.userName}`);
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

  const searchPassword = async (id) => {
    let resData = [];
    try {

      setIsFetching(true);
      const response = await fetch(`http://localhost:8080/passwords/${id}`);
      if (!response.ok) {
        throw new Error('Did not receive expected data');
      }
      resData = await response.json();
      // setUsers(resData);
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

  const handlenewPassword = async () => {
    try {
      setIsFetching(true);
      const response = await fetch('http://localhost:8080/passwords', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idOfUser: user.id,
          password: user.password
        })
      });
      if (!response.ok) {
        throw new Error('Failed to create new password');
      }
      console.log('The password created successfully');
      setFetchError(null);
      setNeedNewpassword(false);
    } catch (error) {
      setFetchError(error.message);
    } finally {
      setIsFetching(false);
    }
  }

  const handleSubmit = async () => {

    let retData = await searchUser();
    console.log(users.length);
    console.log(retData.length);
    console.log(retData);
    if (retData.length > 0) {
      let resdata = await searchPassword(retData[0].id);
      if (resdata.length > 0 && resdata[0].password === user.password) {
        setUser({
          ...user,
          id: retData[0].id
        });
        const currentDate = new Date();
        const thirtyDaysLater =new Date(resdata[0].created);
        thirtyDaysLater.setDate(currentDate.getDate() + 30);
        if (thirtyDaysLater > currentDate) {
          console.log("The password is still valid");
          const userToStorage = {
            id: retData[0].id,
            name: retData[0].name,
            username: retData[0].username,
            email: retData[0].email,
            address: retData[0].address,
            phone: retData[0].phone,
            website: retData[0].website,
            company: retData[0].company
          }
          localStorage.setItem('usersInLS', JSON.stringify([userToStorage]));
          setIsExist(true);
        } else {
          console.log("The password is no longer valid");
          setNeedNewpassword(true);
        }
      }else{
        setIsNewUser(true);
      }
    } else {
      setIsNewUser(true);
    }
  }

  if (!needNewpassword && isExist) {
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
      <div className='login'>
        <form >
          <label>Enter a username:</label>
          <input
            type="text"
            name="username"
            onChange={(event) => handleOnChange(event, 'userName')}
            required
          />

          <label>Enter a password:</label>
          <input
            type="text"
            name="password"
            onChange={(event) => handleOnChange(event, 'password')}
            required
          />

          {isNewUser && <p>User does not exist</p>}
          {needNewpassword && <p>Enter a new password</p>}
          {needNewpassword && <button type="button" className='newPassword' onClick={handlenewPassword}>update</button>}

          {!needNewpassword && <button type="button" className='submit' onClick={handleSubmit}>login</button>}
          <p><i>don't have an account? click to <Link to="/register" >SIGN UP!</Link></i></p>
        </form>
      </div>
    )
  }


}

export default LogIn