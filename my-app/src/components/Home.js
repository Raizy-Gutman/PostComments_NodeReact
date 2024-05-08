import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

  const usersInLS = localStorage.getItem('usersInLS');
  const user = usersInLS ? JSON.parse(usersInLS)[0] : {};

  const handleLogout = () => {
    localStorage.clear();
    window.location.replace('/logIn'); 
  };

  return (
    <div className='home'>        
        <h4>Hello, {user.name}</h4>
        <Link to={`../users/${user.id}/info`}>Info</Link><br/>
        <Link to={`../users/${user.id}/todos`}>Todos</Link><br/>
        <Link to={`../users/${user.id}/posts`}>Posts</Link><br/>
        <Link to="#" onClick={handleLogout}>Logout</Link><br/>
    </div>
  )
}

export default Home;
