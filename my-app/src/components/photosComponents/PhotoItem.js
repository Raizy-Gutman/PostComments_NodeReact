import React, { useState } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const PhotoItem = ({photo, updatePhotos, deletePhoto}) => {

    const [isEditing, setEditing] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(photo.title);

    const handleUpdateButton = () => {
        setEditing(true);
    };

    const handleSaveButton = () => {
        updatePhotos({ ...photo, title: updatedTitle });
        setEditing(false);
    };

    const handleCancelUpdate = () => {
        setUpdatedTitle(photo.title);
        setEditing(false);
    };

    return (
        <li id='liPhoto'>
            <>
                {isEditing ? (
                    <input
                        type='text'
                        placeholder="update photo title"
                        value={updatedTitle}
                        onChange={(e) => setUpdatedTitle(e.target.value)}
                    />
                ) : (<>
                    <img src={photo.thumbnailUrl} alt={photo.title}></img></>
                )}
            </>
            <div>
                {isEditing ? (
                    <div className='PhotoButton'>
                        <button onClick={handleSaveButton}>Save</button>
                        <button onClick={handleCancelUpdate}>Cancel</button>
                    </div>
                ) : (
                    <div className='PhotoButton'>
                        <button onClick={() => deletePhoto(photo.id)}>
                            <FaTrashAlt />
                        </button>
                        <button onClick={handleUpdateButton}><FaEdit /></button>
                    </div>
                )}
            </div>
        </li>
    );
};

export default PhotoItem;