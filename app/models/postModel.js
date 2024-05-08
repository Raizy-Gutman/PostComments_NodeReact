import { pool } from './db.js';

//--------------posts-----------------

// Retrieve all posts
export async function getAllPosts(user_id = 0) {//???????????????????????????/00?
    try {
        if (user_id !== 0){
            const [rows] = await pool.query("SELECT * FROM posts WHERE user_id = ?", [id]);
            return rows;
        }else{
            const [rows] = await pool.query("SELECT * FROM posts");
            return rows;
        }
        
    } catch (error) {
        throw new Error(`Error retrieving posts: ${error.message}`);
    }
}

// Retrieve posts by user ID
export async function getPostsByUserId(id) {
    try {
        const [rows] = await pool.query("SELECT * FROM posts WHERE user_id = ?", [id]);
        return rows;
    } catch (error) {
        throw new Error(`Error retrieving posts by user ID ${id}: ${error.message}`);
    }
}

// Retrieve a post by ID
export async function getPostById(id) {
    try {
        const [rows] = await pool.query("SELECT * FROM posts WHERE id = ?", [id]);
        return rows;
    } catch (error) {
        throw new Error(`Error retrieving post with ID ${id}: ${error.message}`);
    }
}

// Create a new post
export async function createPost(user_id, title, body) {
    try {
        const [result] = await pool.query("INSERT INTO posts (user_id, title, body) VALUES (?, ?, ?)", [user_id, title, body]);
        const id = result.insertId;
        return getPostById(id);
    } catch (error) {
        throw new Error(`Error creating post: ${error.message}`);
    }
}

// Update a post
export async function updatePost(id, title, body) {
    try {
        const [result] = await pool.query("UPDATE posts SET title = ?, body = ? WHERE id = ?", [title, body, id]);
        if (result.affectedRows === 1) {
            return getPostById(id);
        } else {
            throw new Error(`Post with ID ${id} not found`);
        }
    } catch (error) {
        throw new Error(`Error updating post: ${error.message}`);
    }
}

// Delete a post
export async function deletePost(id) {
    try {
        const [result] = await pool.query("DELETE FROM posts WHERE id = ?", [id]);
        if (result.affectedRows === 1) {
            return true;
        } else {
            throw new Error(`Post with ID ${id} not found`);
        }
    } catch (error) {
        throw new Error(`Error deleting post: ${error.message}`);
    }
}