import React, { useEffect, useState } from 'react';
import PostsItem from './PostsItem';
import { IoIosAddCircleOutline } from "react-icons/io";

const ListPosts = ({ posts, posts2, setPosts2, addPost, updatePost, deletePost }) => {
    const [titleToAdd, setTitleToAdd] = useState("");

    useEffect(() => {
        setPosts2([...posts]);
    }, [posts]);

    const filterBy = (filter, paramToFilter) => {
        console.log(posts);
        switch (filter) {
            case 'allTodos':
                setPosts2(posts);
                break;
            case 'id':
                console.log(posts2);
                setPosts2([posts[paramToFilter - 1]] || []);
                console.log(posts);
                console.log(posts2);
                break;
            case 'title':
                setPosts2(posts);
                setPosts2(posts2.filter((post => post.title === paramToFilter)));
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
            <div>
                <button onClick={(event) => filterBy("allTodos", event.target.value)}>allTodos</button>
            </div>
            <input
                type="text"
                placeholder="Add Post"
                onChange={(event) => setTitleToAdd(event.target.value)} />
            <button onClick={() => addPost(titleToAdd)}><IoIosAddCircleOutline /></button>
            <ol>
                {posts2.length && posts2.map((post) => (
                    <PostsItem key={post.id} post={post} updatePost={updatePost} deletePost={deletePost} />
                ))}
            </ol>
        </div>
    )
}

export default ListPosts