import React from 'react';
import { Link } from 'react-router-dom';

const AlbumItem = ({ album }) => {

    return (
        <li id='liAlbums'>
            <Link to={`../albums/${album.id}`} ><p>{album.title}</p></Link>
        </li>
    );
}

export default AlbumItem;