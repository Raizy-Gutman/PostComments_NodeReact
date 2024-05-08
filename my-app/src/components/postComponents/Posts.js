import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListPosts from './ListPosts';
const Posts = () => {
    const id = useRef(0);
    const [posts, setPosts] = useState([]);
    const [posts2, setPosts2] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const navigate = useNavigate();
    const API_URL = "http://localhost:8080/posts";
    useEffect(() => {
        const usersInLS = localStorage.getItem('usersInLS');
        id.current = usersInLS ? JSON.parse(usersInLS)[0].id : null;
        fetch(`${API_URL}`, {
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
                user_id: id.current,
                title: title,
                body: "fill the body of post"
            };
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(addNewPost),
            });

            if (!response.ok) {
                throw new Error('Did not receive expected data');
            }

            const json = await response.json();
            console.log(json);
            setPosts((prevPosts) => [...prevPosts, json[0]]);
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
                headers: {
                    'Content-Type': 'application/json',
                },
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
                // let json = response.json();
                // console.log(json);
                setPosts(posts.filter((post) =>
                    post.id !== idToDelete))
            })
        } catch (error) {
            setFetchError(error);
        } finally {
            setIsFetching(false);
        }
    }

    const handleGoBack = () => {
        navigate(-1); // Go back one page
      };

    if (isFetching) {
        return <p>Loading...</p>
    } else if (fetchError) {
        return <p>ERROR: {fetchError}</p>
    } else {
        return (
            <div  className='posts'>
                <h2>Posts:</h2>
                <ListPosts posts={posts} posts2={posts2} setPosts2={setPosts2} addPost={addPost} updatePost={updatePost} deletePost={deletePost} id={id.current}/>
                <button onClick={handleGoBack}>Go Back</button>
            </div>
        )
    }
}

export default Posts