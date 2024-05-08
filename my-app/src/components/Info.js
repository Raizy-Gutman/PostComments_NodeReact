import React from 'react'

const Info = () => {

  const user = JSON.parse(localStorage.getItem('usersInLS'))[0];

  return (
    <div className="user-info">
      <h2>User Information</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Addresss:</strong> {user.address}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Company:</strong> {user.company}</p>
    </div>
  );
}

export default Info






