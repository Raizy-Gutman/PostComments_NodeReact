import React, { useState, useEffect } from 'react';
import PhotoItem from './PhotoItem';
import { IoIosAddCircleOutline } from "react-icons/io";

const ListPhotos = ({ photos, addPhoto, updatePhotos, deletePhoto }) => {

    const [titleToAdd, setTitleToAdd] = useState("");
    const [urlToAdd, setUrlToAdd] = useState("");
    const [thumbnailUrlToAdd, setThumbnailUrlToAdd] = useState("");
    const [visiblePhotos, setVisiblePhotos] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < photos.length) {
            const timer = setTimeout(() => {
                setVisiblePhotos(prevPhotos => [...prevPhotos, photos[currentIndex]]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, 200);

            return () => clearTimeout(timer);
        }
    }, [currentIndex, photos]);
    
    return (
        <div>
            <h1>Photos:</h1>
            <input
                type="text"
                placeholder="title to add a photo"
                onChange={(event) => setTitleToAdd(event.target.value)} />
            <input
                type="text"
                placeholder="url to add a photo"
                onChange={(event) => setUrlToAdd(event.target.value)} />
            <input
                type="text"
                placeholder="thumbnailUrl to add a photo"
                onChange={(event) => setThumbnailUrlToAdd(event.target.value)} />
            <button onClick={() => addPhoto(titleToAdd, urlToAdd, thumbnailUrlToAdd)}><IoIosAddCircleOutline /></button>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {visiblePhotos.map(photo => (
                    <PhotoItem key={photo.id} photo={photo} updatePhotos={updatePhotos} deletePhoto={deletePhoto}/>
                ))}
            </div>
        </div>
    );
};

export default ListPhotos;
