import express from 'express';
import {
    getPosts_,
    getPostsByUser_,
    getPost_,
    createPost_ as createPostHandler,
    updatePost_ as updatePostHandler,
    deletePost_ as deletePostHandler
} from '../controllers/postController.js';

const router = express.Router();

// Route to get all posts
router.get('/', getPosts_);

// Route to get posts by user ID
router.get('/user/:userId', getPostsByUser_);

// Route to get a post by ID
router.get('/:id', getPost_);

// Route to create a new post
router.post('/', createPostHandler);

// Route to update a post by ID
router.put('/:id', updatePostHandler);

// Route to delete a post by ID
router.delete('/:id', deletePostHandler);

export default router;
