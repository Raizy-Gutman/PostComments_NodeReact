import { getAllPosts, getPostsByUserId, getPostById, createPost, updatePost, deletePost } from '../models/postModel.js';

// Controller function to get all posts
export const getPosts_ = async (req, res) => {
    const { userId } = req.query;
    try {
        const posts = await getAllPosts(userId);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to get posts by user ID
export const getPostsByUser_ = async (req, res) => {
    const { userId } = req.params;
    try {
        const posts = await getPostsByUserId(userId);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to get a post by ID
export const getPost_ = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await getPostById(id);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: `Post with ID ${id} not found` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to create a new post
export const createPost_ = async (req, res) => {
    const { user_id, title, body } = req.body;
    try {
        const newPost = await createPost(user_id, title, body);
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to update a post by ID
export const updatePost_ = async (req, res) => {
    const { id } = req.params;
    const { title, body } = req.body;
    try {
        const updatedPost = await updatePost(id, title, body);
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to delete a post by ID
export const deletePost_ = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await deletePost(id);
        if (result) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: `Post with ID ${id} not found` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
