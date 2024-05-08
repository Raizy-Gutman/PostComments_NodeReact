import React from 'react'
import { useNavigate } from 'react-router-dom';

const Info = () => {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('usersInLS'))[0];

  const handleGoBack = () => {
    navigate(-1); // Go back one page
  };

  return (
    <div className="user-info">
      <h2>User Information</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Addresss:</strong> {user.address}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Company:</strong> {user.company}</p>
      <button onClick={handleGoBack}>Go Back</button>
    </div>
  );
}

export default Info






