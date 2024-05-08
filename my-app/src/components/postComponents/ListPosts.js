import React, { useEffect, useState } from 'react';
import PostsItem from './PostsItem';
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiMapPin } from "react-icons/ci";

const ListPosts = ({ posts, posts2, setPosts2, addPost, updatePost, deletePost, id }) => {
    const [titleToAdd, setTitleToAdd] = useState("");

    useEffect(() => {
        setPosts2([...posts]);
    }, [posts]);

    const [change, setChange] = useState({
        title: "",
        id: 0//??????????????????????/
    });

    const handleChangeOnObject = (event, type) => {
        setChange({
            ...change,
            [type]: event.target.value
        })
    }

    const filterBy = (filter) => {
        console.log(posts);
        switch (filter) {
            case 'allTodos':
                setPosts2(posts);
                break;
            case 'id':
                console.log(posts2);
                setPosts2([posts[change.id - 1]] || []);
                console.log(posts);
                console.log(posts2);
                break;
            case 'title':
                setPosts2(posts);
                setPosts2(posts2.filter((post => post.title === change.title)));
                console.log(posts);
                console.log(posts2);
                break;
            default:
                setPosts2(posts);
        }
    }


    return (
        <div>
            <div>
                <label htmlFor="searchId">Search by id:</label>
                <input
                    type="text"
                    placeholder="Search by id"
                    onChange={(event) => handleChangeOnObject(event, 'id')}
                    name="id"
                    id="searchId"
                />
                <button onClick={() => filterBy("id")}><CiMapPin /></button>
            </div>
            <label htmlFor="searchTitle">Search by title:</label>
            <div>
                <input
                    type="text"
                    placeholder="Search by title"
                    onChange={(event) => handleChangeOnObject(event, 'title')}
                    name="title"
                    id="searchTitle"
                />
                <button onClick={() => filterBy("title")}><CiMapPin /></button>
            </div>
            <div>
                <button onClick={() => filterBy("allTodos")}>allPosts</button>
            </div>
            <input
                type="text"
                placeholder="Add Post"
                onChange={(event) => setTitleToAdd(event.target.value)} />
            <button onClick={() => addPost(titleToAdd)}><IoIosAddCircleOutline /></button>
            <ol>
                {posts2.length && posts2.map((post) => (
                    <PostsItem key={post.id} post={post} updatePost={updatePost} deletePost={deletePost} id={id}/>
                ))}
            </ol>
        </div>
    )
}

export default ListPosts