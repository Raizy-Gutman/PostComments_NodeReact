import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';

const FinallRegister = () => {
  const API_URL = "http://localhost:8080/users/";
  const id = JSON.parse(localStorage.getItem('usersInLS'))[0].id;
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [homePage, setHomePage] = useState(false);

  console.log(id);


  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: ""
      }
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: ""
    }
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
      setNewUser({
        ...newUser,
        username: [resData.username],
        website: `${resData.website}`
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
          address: {
            street: newUser.address.street,
            suite: newUser.address.suite,
            city: newUser.address.city,
            zipcode: newUser.address.zipcode,
            geo: {
              lat: newUser.address.geo.lat,
              lng: newUser.address.geo.lng
            }
          },
          phone: newUser.phone,
          company: {
            name: newUser.company.name,
            catchPhrase: newUser.company.catchPhrase,
            bs: newUser.company.bs
          }
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

  const handleChangeOnAddress = (event, type) => {
    setNewUser({
      ...newUser,
      address: {
        ...newUser.address,
        [type]: event.target.value
      }
    })
  }

  const handleChangeOnGeo = (event, type) => {
    setNewUser({
      ...newUser,
      address: {
        ...newUser.address,
        geo: {
          ...newUser.address.geo,
          [type]: event.target.value
        }
      }
    })
  }

  const handleChangeOnCompany = (event, type) => {
    setNewUser({
      ...newUser,
      company: {
        ...newUser.company,
        [type]: event.target.value
      }
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
      <div>
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

          <label>Enter your street:</label>
          <input
            type="text"
            name="street"
            onChange={(event) => handleChangeOnAddress(event, 'street')}
            required
          />

          <label>Enter your suite:</label>
          <input
            type="text"
            name="suite"
            onChange={(event) => handleChangeOnAddress(event, 'suite')}
            required
          />

          <label>Enter your city:</label>
          <input
            type="text"
            name="city"
            onChange={(event) => handleChangeOnAddress(event, 'city')}
            required
          />

          <label>Enter your zipcode:</label>
          <input
            type="text"
            name="zipcode"
            onChange={(event) => handleChangeOnAddress(event, 'zipcode')}
            required
          />

          <label>Enter your lat:</label>
          <input
            type="text"
            name="lat"
            onChange={(event) => handleChangeOnGeo(event, 'lat')}
            required
          />

          <label>Enter your lng:</label>
          <input
            type="text"
            name="lng"
            onChange={(event) => handleChangeOnGeo(event, 'lng')}
            required
          />

          <label>Enter your phone:</label>
          <input
            type="text"
            name="phone"
            onChange={(event) => handleChangeOnObject(event, 'phone')}
            required
          />

          <label>Enter your name of company:</label>
          <input
            type="text"
            name="nameOfCompany"
            onChange={(event) => handleChangeOnCompany(event, 'name')}
            required
          />

          <label>Enter catchPhrase:</label>
          <input
            type="text"
            name="catchPhrase"
            onChange={(event) => handleChangeOnCompany(event, 'catchPhrase')}
            required
          />

          <label>Enter bs:</label>
          <input
            type="text"
            name="bs"
            onChange={(event) => handleChangeOnCompany(event, 'bs')}
            required
          />

          <button type="button" className='submit' onClick={handleOnSubmit}>submit</button>
        </form>
      </div>
    )
  }
}

export default FinallRegister