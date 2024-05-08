import { pool } from './db.js';

//--------------todos-----------------

// Get all todos
export async function getAllTodos(userId = 0, sort='id') {//?????????????????????????????=0???/
    try {
        if(userId !== 0){
            const [rows] = await pool.query("SELECT * FROM todos WHERE userId = ? ORDER BY " + sort, [userId]);
            return rows;
        }else{
            const [rows] = await pool.query("SELECT * FROM todos ORDER BY " + sort);
            return rows;
        }
        
    } catch (error) {
        throw new Error(`Error fetching todos: ${error.message}`);
    }
}

// Get todos by user ID
export async function getTodosByUserId(userId) {
    try {
        const [rows] = await pool.query("SELECT * FROM todos WHERE userId = ?", [userId]);
        return rows;
    } catch (error) {
        throw new Error(`Error fetching todos: ${error.message}`);
    }
}

// Get a todo by ID
export async function getTodoById(id) {
    try {
        const [rows] = await pool.query("SELECT * FROM todos WHERE id = ?", [id]);
        return rows;
    } catch (error) {
        throw new Error(`Error fetching todo: ${error.message}`);
    }
}

// Create a new todo
export async function createTodo(userId, title, completed) {
    try {
        const [result] = await pool.query("INSERT INTO todos (userId, title, completed) VALUES (?, ?, ?)", [userId, title, completed]);
        const id = result.insertId;
        return getTodoById(id);
    } catch (error) {
        throw new Error(`Error creating todo: ${error.message}`);
    }
}

// Update a todo
export async function updateTodoById(id, title, completed) {
    try {
        const [result] = await pool.query("UPDATE todos SET title = ?, completed = ? WHERE id = ?", [title, completed, id]);
        
        if (result.affectedRows === 1) {
            return getTodoById(id);
        } else {
            throw new Error(`Todo with id ${id} not found`);
        }
    } catch (error) {
        throw new Error(`Error updating todo: ${error.message}`);
    }
}

// Delete a todo
export async function deleteTodoById(id) {
    try {
        const [result] = await pool.query("DELETE FROM todos WHERE id = ?", [id]);
        console.log(result.affectedRows);
        if (result.affectedRows === 1) {
            return true;
        } else {
            throw new Error(`Todo with id ${id} not found`);
        }
    } catch (error) {
        throw new Error(`Error deleting todo: ${error.message}`);
    }
}