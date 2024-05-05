import React, { useState, useEffect } from 'react'
import AlbumItem from './AlbumItem';
import { IoIosAddCircleOutline } from "react-icons/io";

const AlbumsList = ({ albums, addAlbum, albumsForFilter, setAlbumsForFilter }) => {

    const [titleToAdd, setTitleToAdd] = useState("");

    useEffect(() => {
        setAlbumsForFilter([...albums]);
    }, [albums]);

    const filterBy = (filter, paramToFilter) => {

        switch (filter) {
            case 'allAlbums':
                setAlbumsForFilter(albums);
                break;
            case 'id':
                setAlbumsForFilter([albums[paramToFilter - 1]] || []);
                //setPosts(x);
                break;
            case 'title':
                setAlbumsForFilter(albums);
                setAlbumsForFilter(albumsForFilter.filter((album => album.title === paramToFilter)))
                break;
            default:
                setAlbumsForFilter(albums);
        }
    }

    return (
        <div>
            <div>
                <label htmlFor="searchId">Search by id:</label>
                <input
                    type="text"
                    placeholder="Search by id"
                    onChange={(event) => filterBy("id", event.target.value)}
                    name="id"
                    id="searchId"
                />
            </div>
            <label htmlFor="searchTitle">Search by title:</label>
            <div >
                <input
                    type="text"
                    placeholder="Search by title"
                    onChange={(event) => filterBy("title", event.target.value)}
                    name="title"
                    id="searchTitle"
                />
            </div>
            <button onClick={(event) => filterBy("allAlbums", event.target.value)}>allAlbums</button>
            <input
                type="text"
                placeholder="Add Album"
                onChange={(event) => setTitleToAdd(event.target.value)} />
            <button onClick={() => addAlbum(titleToAdd)}><IoIosAddCircleOutline /></button>
            <ol >
                {albumsForFilter.map((album) => (
                    <AlbumItem key={album.id} album={album} />
                ))}
            </ol>
        </div>
    )
}

export default AlbumsList







