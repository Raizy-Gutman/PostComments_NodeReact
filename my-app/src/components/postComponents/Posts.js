import React, { useState, useRef, useEffect } from 'react';
import ListPosts from './ListPosts';
const Posts = () => {
    const id = useRef(0);
    const [posts, setPosts] = useState([]);
    const [posts2, setPosts2] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const API_URL = "http://localhost:3300/posts";
    useEffect(() => {
        const usersInLS = localStorage.getItem('usersInLS');
        id.current = usersInLS ? JSON.parse(usersInLS)[0].id : null;
        fetch(`${API_URL}?userId=${id.current}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => setPosts(data))
            .catch((error) => setFetchError(error));
    }, [])

    const addPost = async (title) => {
        try {
            setIsFetching(true);
            const addNewPost = {
                userId: id.current,
                title: title,
                body: ""
            };
            const response = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify(addNewPost),
            });

            if (!response.ok) {
                throw new Error('Did not receive expected data');
            }

            const json = await response.json();
            console.log(json);
            setPosts((prevPosts) => [...prevPosts, addNewPost]);
        } catch (error) {
            setFetchError(error.message);
        } finally {
            setIsFetching(false);
        }
    }

    const updatePost = async (postUpdate) => {
        try {
            setIsFetching(true);
            await fetch(`${API_URL}/${postUpdate.id}`, {
                method: 'PUT',
                body: JSON.stringify(postUpdate)
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('Did not receive expected data');
                }
                let json = response.json();
                console.log(json);
                setPosts(posts.map((post) =>
                    post.id === postUpdate.id ? { ...postUpdate } : post))
            })

        } catch (error) {
            setFetchError(error);
        } finally {
            setIsFetching(false);
        }
    }

    const deletePost = async (idToDelete) => {
        try {
            setIsFetching(true);
            await fetch(`${API_URL}/${idToDelete}`, {
                method: 'DELETE',
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('Did not receive expected data');
                }
                let json = response.json();
                console.log(json);
                setPosts(posts.filter((post) =>
                    post.id !== idToDelete))
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
                <h2>Posts:</h2>
                <ListPosts posts={posts} posts2={posts2} setPosts2={setPosts2} addPost={addPost} updatePost={updatePost} deletePost={deletePost} />
            </div>
        )
    }
}

export default Posts