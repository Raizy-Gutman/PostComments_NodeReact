import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import ListPhotos from './ListPhotos';

const Photos = () => {

    const { albumId } = useParams();
    const [photos, setPhotos] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const API_URL = "http://localhost:3300/photos";

    useEffect(() => {
        setIsFetching(true);
        fetch(`${API_URL}?albumId=${albumId}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                setPhotos(data);
                setIsFetching(false);
            })
            .catch((error) => setFetchError(error));
    }, [])

    const addPhoto = async (title, url, thumbnailUrl) => {
        try {
            setIsFetching(true);
            const addNewPhoto = {
                albumId: albumId,
                title: title,
                url: url,
                thumbnailUrl: thumbnailUrl
            };
            const response = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify(addNewPhoto),
            });

            if (!response.ok) {
                throw new Error('Did not receive expected data');
            }

            const json = await response.json();
            console.log(json);
            setPhotos((prevPhotos) => [...prevPhotos, addNewPhoto]);
        } catch (error) {
            setFetchError(error.message);
        } finally {
            setIsFetching(false);
        }
    }

    const updatePhotos = async (photoUpdate) => {
        try {
            setIsFetching(true);
            await fetch(`${API_URL}/${photoUpdate.id}`, {
                method: 'PUT',
                body: JSON.stringify(photoUpdate)
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('Did not receive expected data');
                }
                let json = response.json();
                console.log(json);
                setPhotos(photos.map((photo) =>
                    photo.id === photoUpdate.id ? { ...photoUpdate } : photo))
            })

        } catch (error) {
            setFetchError(error);
        } finally {
            setIsFetching(false);
        }
    }

    const deletePhoto = async (idToDelete) => {
        try {
            console.log("hhhhhhh");
            setIsFetching(true);
            await fetch(`${API_URL}/${idToDelete}`, {
                method: 'DELETE',
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('Did not receive expected data');
                }
                console.log("bbb");
                let json = response.json();
                console.log(json);
                setPhotos(photos.filter((photo) =>
                    photo.id !== idToDelete))
            })
        } catch (error) {
            setFetchError(error);
        } finally {
            setIsFetching(false);
        }
    }

    if (isFetching) {
        return <p>Loading...</p>
    } else if (fetchError) {
        return <p>ERROR: {fetchError}</p>
    } else {
        return (
            <div>
                <ListPhotos photos={photos} addPhoto={addPhoto} updatePhotos={updatePhotos} deletePhoto={deletePhoto} />
            </div>
        )
    }
}


export default Photos;
