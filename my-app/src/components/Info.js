import React from 'react'

const Info = () => {

  const user = JSON.parse(localStorage.getItem('usersInLS'))[0];

  return (
    <div className="user-info">
      <h2>User Information</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <div className="address">
        <h3>Address</h3>
        <p><strong>Street:</strong> {user.address.street}</p>
        <p><strong>Suite:</strong> {user.address.suite}</p>
        <p><strong>City:</strong> {user.address.city}</p>
        <p><strong>Zipcode:</strong> {user.address.zipcode}</p>
        <div className="geo">
          <h4>Geo</h4>
          <p><strong>Lat:</strong> {user.address.geo.lat}</p>
          <p><strong>Lng:</strong> {user.address.geo.lng}</p>
        </div>
      </div>
      <p><strong>Phone:</strong> {user.phone}</p>
      <div className="company">
        <h3>Company</h3>
        <p><strong>Name:</strong> {user.company.name}</p>
        <p><strong>Catch Phrase:</strong> {user.company.catchPhrase}</p>
        <p><strong>BS:</strong> {user.company.bs}</p>
      </div>
    </div>
  );
}

export default Info
// id: id,????






