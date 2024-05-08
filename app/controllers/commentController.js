import { getAllComments, getCommentsByPostId, getCommentById, createComment, updateComment, deleteComment } from '../models/commentModel.js';

// Controller function to retrieve all comments
export const getAllComments_ = async (req, res) => {
    const { postId } = req.query;
    try {
        const comments = await getAllComments(postId);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to retrieve comments by post ID
export const getCommentsByPostId_ = async (req, res) => {
    const { postId } = req.params;
    try {
        const comments = await getCommentsByPostId(postId);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to retrieve a comment by ID
export const getCommentById_ = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await getCommentById(id);
        if (comment) {
            res.status(200).json(comment);
        } else {
            res.status(404).json({ message: `Comment with ID ${id} not found` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to create a new comment
export const createComment_ = async (req, res) => {
    const { postId, name, email, body } = req.body;
    try {
        const newComment = await createComment(postId, name, email, body);
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to update a comment
export const updateComment_ = async (req, res) => {
    const { id } = req.params;
    const { name, email, body } = req.body;
    try {
        const updatedComment = await updateComment(id, name, email, body);
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to delete a comment
export const deleteComment_ = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await deleteComment(id);
        if (result) {
            res.status(200).json({ message: `Comment with ID ${id} deleted successfully` });
        } else {
            res.status(404).json({ message: `Comment with ID ${id} not found` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
