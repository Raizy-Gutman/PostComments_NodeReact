import { pool } from './db.js';

//--------------comments-----------------

// Retrieve all comments
export async function getAllComments() {
    try {
        const [rows] = await pool.query("SELECT * FROM comments");
        return rows;
    } catch (error) {
        throw new Error(`Error retrieving comments: ${error.message}`);
    }
}

// Retrieve comments by post ID
export async function getCommentsByPostId(id) {
    try {
        const [rows] = await pool.query("SELECT * FROM comments WHERE postId = ?", [id]);
        return rows;
    } catch (error) {
        throw new Error(`Error retrieving comments by post ID ${id}: ${error.message}`);
    }
}

// Retrieve a comment by ID
export async function getCommentById(id) {
    try {
        const [rows] = await pool.query("SELECT * FROM comments WHERE id = ?", [id]);
        return rows[0];
    } catch (error) {
        throw new Error(`Error retrieving comment with ID ${id}: ${error.message}`);
    }
}

// Create a new comment
export async function createComment(postId, name, email, body) {
    try {
        const [result] = await pool.query("INSERT INTO comments (postId, name, email, body) VALUES (?, ?, ?, ?)", [postId, name, email, body]);
        const id = result.insertId;
        return getCommentById(id);
    } catch (error) {
        throw new Error(`Error creating comment: ${error.message}`);
    }
}

// Update a comment
export async function updateComment(id, name, email, body) {
    try {
        const [result] = await pool.query("UPDATE comments SET name = ?, email = ?, body = ? WHERE id = ?", [name, email, body, id]);
        if (result.affectedRows === 1) {
            return getCommentById(id);
        } else {
            throw new Error(`Comment with ID ${id} not found`);
        }
    } catch (error) {
        throw new Error(`Error updating comment: ${error.message}`);
    }
}

// Delete a comment
export async function deleteComment(id) {
    try {
        const [result] = await pool.query("DELETE FROM comments WHERE id = ?", [id]);
        if (result.affectedRows === 1) {
            return true;
        } else {
            throw new Error(`Comment with ID ${id} not found`);
        }
    } catch (error) {
        throw new Error(`Error deleting comment: ${error.message}`);
    }
}