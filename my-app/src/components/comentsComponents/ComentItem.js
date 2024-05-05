import React, { useState } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const ComentItem = ({ coment, updateComent, deleteComent, email }) => {
    
  const sameUser = coment.email === email;

  const [isEditing, setEditing] = useState(false);
  const [updatedComent, setUpdatedComent] = useState({ ...coment });

  const handleUpdateButton = () => {
    setEditing(true);
  };

  const handleSaveButton = () => {
    updateComent(updatedComent);
    setEditing(false);
  };

  const handleCancelUpdate = () => {
    setUpdatedComent({ ...coment });
    setEditing(false);
  };

  return (
    <li>
      <>
        {isEditing ? (
          <>
            <input
              type="text"
              value={updatedComent.name}
              onChange={(e) => setUpdatedComent({ ...updatedComent, name: e.target.value })}
            />
            <p>{coment.email}</p>
            <input
              type="text"
              value={updatedComent.body}
              onChange={(e) => setUpdatedComent({ ...updatedComent, body: e.target.value })}
            />
          </>
        ) : (
          <div>
            <p>{coment.name}</p>
            <p>{coment.email}</p>
            <p>{coment.body}</p>
          </div>
        )}
      </>
      {sameUser && (
        <div>
          {isEditing ? (
            <>
              <button onClick={handleSaveButton}>Save</button>
              <button onClick={handleCancelUpdate}>Cancel</button>
            </>
          ) : (
            <>
              <button onClick={() => deleteComent(coment.id)}>
                <FaTrashAlt />
              </button>
              <button onClick={handleUpdateButton}>
                <FaEdit />
              </button>
            </>
          )}
        </div>
      )}
    </li>
  );
};

export default ComentItem;
