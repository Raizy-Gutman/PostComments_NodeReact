import { pool } from './db.js';

//--------------users-----------------

// Get all users
export async function getAllUsers(username = "") {
    try {
        if (username !== "") {
            const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
            return rows;
        } else {
            const [rows] = await pool.query("SELECT * FROM users");
            return rows;
        }
    } catch (error) {
        throw new Error(`Error fetching users: ${error.message}`);
    }
}

// Get a user by ID
export async function getUserById(id) {
    try {
        const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
        return rows;
    } catch (error) {
        throw new Error(`Error fetching user: ${error.message}`);
    }
}

// Create a new user
export async function createUser({ name, username, email, address, phone, website, company }) {
    try {
        const [result] = await pool.query(`
            INSERT INTO users (name, username, email, address, phone, website, company)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [name, username, email, address, phone, website, company]);
        const id = result.insertId;
        return getUserById(id);
    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
}

// Update a user
export async function updateUserById(id, { name, username, email, address, phone, website, company }) {
    try {
        const [result] = await pool.query(`
            UPDATE users 
            SET 
            name = ?,
            username = ?,
            email = ?,
            address = ?,
            phone = ?,
            website = ?,
            company = ?
            WHERE id = ?
        `, [name, username, email, address, phone, website, company, id]);

        if (result.affectedRows === 1) {
            return getUserById(id);
        } else {
            throw new Error(`User with id ${id} not found`);
        }
    } catch (error) {
        throw new Error(`Error updating user: ${error.message}`);
    }
}

// Delete a user
export async function deleteUserById(id) {
    try {
        const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
        if (result.affectedRows === 1) {
            return true;
        } else {
            throw new Error(`User with id ${id} not found`);
        }
    } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
    }
}

// const users = await getAllUsers();
// console.log(users);