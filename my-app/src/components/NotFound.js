import React from 'react'
import { Link } from 'react-router-dom'


const NotFound = () => {
    return (
        <div className='notfound'> 
            <p>Page Not Found</p>
            <Link to="/home" >Go to Home</Link>
        </div>
    )
}

export default NotFound


// import React from 'react';
// import { Link } from 'react-router-dom';

// const NotFound = () => {
//     return (
//         <div style={{ textAlign: 'center', marginTop: '50px' }}>
//             <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Page Not Found</h1>
//             <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>The page you are looking for does not exist.</p>
//             <Link to="/home" style={{ textDecoration: 'none', color: 'white', backgroundColor: 'blue', padding: '10px 20px', borderRadius: '5px', fontSize: '1.2rem' }}>Go to Home</Link>
//         </div>
//     );
// };

// export default NotFound;
