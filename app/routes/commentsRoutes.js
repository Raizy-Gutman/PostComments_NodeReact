import express from 'express';
import {
    getAllComments_,
    getCommentsByPostId_,
    getCommentById_,
    createComment_,
    updateComment_,
    deleteComment_
} from '../controllers/commentController.js';

const router = express.Router();

// Route to retrieve all comments
router.get('/', getAllComments_);

// Route to retrieve comments by post ID
router.get('/post/:postId', getCommentsByPostId_);

// Route to retrieve a comment by ID
router.get('/:id', getCommentById_);

// Route to create a new comment
router.post('/', createComment_);

// Route to update a comment
router.put('/:id', updateComment_);

// Route to delete a comment
router.delete('/:id', deleteComment_);

export default router;
