import './App.css';
// import React, {useState} from 'react';
import { Navigate, BrowserRouter, Routes, Route } from 'react-router-dom';
import LogIn from './components/LogIn';
import Register from './components/Register';
import FinallRegister from './components/FinallRegister';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Info from './components/Info';
import Todos from './components/todoComponents/Todos';
import Posts from './components/postComponents/Posts';
// import Coments from './components/comentsComponents/Coments';
import Albums from './components/albumComponents/Albums';
import Photos from './components/photosComponents/Photos';
import Coments from './components/comentsComponents/Coments';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/logIn"} />} />
        {/* <Route path="/comments/:postId" element={<Coments />} /> */}
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/finallRegister" element={<FinallRegister />} />
        <Route path="home" index element={<Home />} />
        <Route path="/users/:id" >
          <Route path="info" element={<Info />} />
          <Route path="todos" element={<Todos />} />
          <Route path="posts" element={<Posts />} />
          <Route path="posts/:postId/comments" element={<Coments />} />
          {/* <Route path="posts/:postId/comments" element={<Coments />} /> */}
            {/* <Route path="comments" element={<Coments />} /> */}
              {/* <Route path="comments" element={<Coments />} />
            </Route> */}
          <Route path="albums" element={<Albums />} />
          <Route path="albums/:albumId" element={<Photos />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
