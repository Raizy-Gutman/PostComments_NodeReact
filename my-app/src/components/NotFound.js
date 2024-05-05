import React from 'react'
import { Link } from 'react-router-dom'


const NotFound = () => {
    return (
        <div>
            <p>NotFound</p>
            <Link to="/home" >Go to Home</Link>
        </div>
    )
}

export default NotFound