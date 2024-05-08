import React, { useState } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PostsItem = ({ post, updatePost, deletePost, id }) => {
  const [isEditing, setEditing] = useState(false);
  const [toShow, setToShow] = useState(false);
  const [allDetailsPost, setAllDetailsPost] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(post.title);
  const [updatedBody, setUpdatedBody] = useState(post.body);

  const sameUser = post.user_id === id;

  const handleUpdateButton = () => {
    setEditing(true);
  };

  const handleSaveButton = () => {
    updatePost({ ...post, title: updatedTitle, body: updatedBody });
    setEditing(false);
  };

  const handleCancelUpdate = () => {
    setUpdatedTitle(post.title);
    setUpdatedBody(post.body);
    setEditing(false);
  };
  const onClick =()=>{
    setAllDetailsPost(!allDetailsPost); 
    setToShow(true);
  }

  return (
    <div>
    <li id='postItem'>
      <>
        {isEditing ? (
          <>
            <input
              type='text'
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <textarea
              value={updatedBody}
              onChange={(e) => setUpdatedBody(e.target.value)}
            />
          </>
        ) : (
          <>
            <p>{post.title}</p>
            {toShow && <p> {post.body}</p>}
            {toShow && <Link to={`../posts/${post.id}/comments`} >Comments</Link> }
          </>
        )}
      </>
      <div>
        {isEditing ? (
          <>
            <button onClick={handleSaveButton}>Save</button>
            <button onClick={handleCancelUpdate}>Cancel</button>
          </>
        ) : (
          <div>
            <button onClick={() => onClick()}>Read more</button>
            {sameUser && <button className='todoButton' onClick={() => deletePost(post.id)}>
              <FaTrashAlt />
            </button>}
            {sameUser && <button className='todoButton' onClick={handleUpdateButton}>
              <FaEdit />
            </button>}
          </div>
        )}
      </div>
    </li>
    </div>
  );
  
};

export default PostsItem;