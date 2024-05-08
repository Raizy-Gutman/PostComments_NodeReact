import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ComentItem from './ComentItem';
import { IoIosAddCircleOutline } from "react-icons/io";
import { useParams } from 'react-router-dom';

const Coments = () => {

  const { postId } = useParams();
  const [coments, setComents] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [cometsToAdd, setCometsToAdd] = useState({ name: "", body: "" });
  const navigate = useNavigate();
  const usersInLS = localStorage.getItem('usersInLS');
  const email = usersInLS ? JSON.parse(usersInLS)[0].email : "";
  const API_URL = "http://localhost:8080/comments";

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsFetching(true);
        const response = await fetch(`${API_URL}?postId=${postId}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error('Did not receive expected data');
        }

        const data = await response.json();
        setComents(data);
      } catch (error) {
        setFetchError(error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchComments();
  }, [postId]);

  const addComent = async (name, body) => {
    try {
      setIsFetching(true);
      const addNewComent = {
        postId: postId,
        name: name,
        email: email,
        body: body
      };
      console.log(email);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(addNewComent),
      });

      if (!response.ok) {
        throw new Error('Did not receive expected data');
      }

      const json = await response.json();
      setComents((prevComents) => [...prevComents, json[0]]);

    } catch (error) {
      setFetchError(error.message);
    } finally {
      setIsFetching(false);
    }
  };

    const updateComent = async (comentUpdate) => {
    try {
      setIsFetching(true);
      await fetch(`${API_URL}/${comentUpdate.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comentUpdate)
      }).then((response) => {
        if (!response.ok) {
          throw new Error('Did not receive expected data');
        }
        let json = response.json();
        console.log(json);
        setComents(coments.map((coment) =>
          coment.id === comentUpdate.id ? { ...comentUpdate } : coment))
      })

    } catch (error) {
      setFetchError(error);
    } finally {
      setIsFetching(false);
    }
  }

  const deleteComent = async (idToDelete) => {
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
        setComents(coments.filter((coment) =>
          coment.id !== idToDelete))
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
    return <p>Loading...</p>;
  } else if (fetchError) {
    return <p>ERROR: {fetchError.toString()}</p>;
  } else {
    return (
      <div className='comments'>
         <h2>Comments:</h2>
         <input
          type="text"
          placeholder="Add Comment name"
          onChange={(event) => setCometsToAdd({...cometsToAdd, name: event.target.value})} />
        <input
          type="text"
          placeholder="Add Comment body"
          onChange={(event) => setCometsToAdd({...cometsToAdd, body: event.target.value})} />
        <button onClick={() => addComent(cometsToAdd.name, cometsToAdd.body)}><IoIosAddCircleOutline /></button>
        < ol >
          {
            coments.length && coments.map((coment) => (
              <ComentItem key={coment.id} coment={coment} updateComent={updateComent} deleteComent={deleteComent} email={email} />
            ))
          }
        </ol >
        <button onClick={handleGoBack}>Go Back</button>
      </div>
    );
  }
};

export default Coments;
