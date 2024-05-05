import React, { useState, useEffect, useRef } from 'react';
import AlbumsList from './AlbumsList';

const Albums = () => {

    const userId = useRef(0);
    const [albums, setAlbums] = useState([]);
    const [albumsForFilter, setAlbumsForFilter] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const API_URL = "http://localhost:3300/albums";

    useEffect(() => {
        const usersInLS = localStorage.getItem('usersInLS');
        userId.current = usersInLS ? JSON.parse(usersInLS)[0].id : null;
        fetch(`${API_URL}?userId=${userId.current}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => setAlbums(data))
            .catch((error) => setFetchError(error));
    }, [])

    const addAlbum = async (title) => {
        try {
            setIsFetching(true);
            const addNewAlbum = {
                userId: userId.current,
                title: title,
            };
            const response = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify(addNewAlbum),
            });

            if (!response.ok) {
                throw new Error('Did not receive expected data');
            }

            const json = await response.json();
            console.log(json);
            setAlbums((prevAlbums) => [...prevAlbums, addNewAlbum]);
        } catch (error) {
            setFetchError(error.message);
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
                <h2>Albums:</h2>
                <AlbumsList albums={albums} addAlbum={addAlbum} albumsForFilter={albumsForFilter} setAlbumsForFilter={setAlbumsForFilter} />
            </div>
        )
    }
}

export default Albums