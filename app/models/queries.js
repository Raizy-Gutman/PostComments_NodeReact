// import { pool } from './db.js';


// //--------------users-----------------
// export async function getAllUsers(){
//     const [rows] = await pool.query("SELECT * FROM users");
//     return rows;
// }

// export async function getUser(id){
//     const [rows] = await pool.query(`
//     SELECT * 
//     FROM users 
//     WHERE id = ?
//     `, [id]);
//     return rows[0];
// }

// export async function createUser(name, username, email, address, phone, website, company){
//     const [result] = await pool.query(`
//     INSERT INTO users (name, username, email, address, phone, website, company)
//     VALUES (?, ?, ?, ?, ?, ?, ?)
//     `, [name, username, email, address, phone, website, company]);
//     const id = result.insertId;
//     return getUser(id);
// }

// export async function updateUser(id, name, username, email, address, phone, website, company){
//     const [result] = await pool.query(`
//     UPDATE users 
//     SET 
//     name = ?,
//     username = ?,
//     email = ?,
//     address = ?,
//     phone = ?,
//     website = ?,
//     company = ?
//     WHERE id = ?
//     `, [name, username, email, address, phone, website, company, id]);
    
//     // Checking whether the query has updated one record
//     if (result.affectedRows === 1) {
//         return getUser(id); // If yes, return the updated user
//     } else {
//         throw new Error(`User with id ${id} not found`); //else, there is an error
//     }
// }

// export async function deleteUser(id){
//     // Execute the DELETE query to delete the user with the specified ID
//     const [result] = await pool.query(`
//     DELETE FROM users 
//     WHERE id = ?
//     `, [id]);
    
//     // Check if the query deleted one row
//     if (result.affectedRows === 1) {
//         return true; // If successful, return true
//     } else {
//         throw new Error(`User with id ${id} not found`); // If user not found, throw an error
//     }
// }

import { pool } from './db.js';

//--------------users-----------------

// Get all users
export async function getAllUsers() {
    try {
        const [rows] = await pool.query("SELECT * FROM users");
        return rows;
    } catch (error) {
        throw new Error(`Error fetching users: ${error.message}`);
    }
}

// Get a user by ID
export async function getUserById(id) {
    try {
        const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
        return rows[0];
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


// //--------------todos-----------------
// export async function getAllTodos(){//לבדוק אם צריך את זה
//     const [rows] = await pool.query("SELECT * FROM todos");
//     return rows;
// }

// export async function getTodosByUserId(id){
//     const [rows] = await pool.query(`
//     SELECT * 
//     FROM todos 
//     WHERE userId = ?
//     `, [id]);
//     return rows[0];//לשים לב שיחזיר הכל
// }

// export async function getTodoById(id){
//     const [rows] = await pool.query(`
//     SELECT * 
//     FROM todos 
//     WHERE id = ?
//     `, [id]);
//     return rows[0];
// }

// export async function createTodo(userId, title, completed){
//     const [result] = await pool.query(`
//     INSERT INTO todos (userId, title, completed)
//     VALUES (?, ?, ?)
//     `, [userId, title, completed]);
//     const id = result.insertId;
//     return getTodoById(id);
// }

// export async function updateTodo(id, title, completed){
//     const [result] = await pool.query(`
//     UPDATE todos 
//     SET 
//     title = ?,
//     completed = ?
//     WHERE id = ?
//     `, [title, completed, id]);
    
//     // Checking whether the query has updated one record
//     if (result.affectedRows === 1) {
//         return getTodoById(id); // If yes, return the updated user
//     } else {
//         throw new Error(`User with id ${id} not found`); //else, there is an error
//     }
// }

// export async function deleteTodo(id){
//     // Execute the DELETE query to delete the user with the specified ID
//     const [result] = await pool.query(`
//     DELETE FROM todos 
//     WHERE id = ?
//     `, [id]);
    
//     // Check if the query deleted one row
//     if (result.affectedRows === 1) {
//         return true; // If successful, return true
//     } else {
//         throw new Error(`User with id ${id} not found`); // If user not found, throw an error
//     }
// }


//--------------todos-----------------

// Get all todos
export async function getAllTodos() {
    try {
        const [rows] = await pool.query("SELECT * FROM todos");
        return rows;
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
        return rows[0];
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
        if (result.affectedRows === 1) {
            return true;
        } else {
            throw new Error(`Todo with id ${id} not found`);
        }
    } catch (error) {
        throw new Error(`Error deleting todo: ${error.message}`);
    }
}

// Similarly, implement CRUD operations for posts, comments, and passwords

// //--------------posts-----------------
// export async function getAllPosts(){//לבדוק אם צריך את זה
//     const [rows] = await pool.query("SELECT * FROM posts");
//     return rows;
// }

// export async function getPostsByUserId(id){
//     const [rows] = await pool.query(`
//     SELECT * 
//     FROM posts 
//     WHERE user_id = ?
//     `, [id]);
//     return rows[0];//לשים לב שיחזיר הכל
// }

// export async function getPostById(id){
//     const [rows] = await pool.query(`
//     SELECT * 
//     FROM posts 
//     WHERE id = ?
//     `, [id]);
//     return rows[0];
// }

// export async function createPost(user_id, title, body){
//     const [result] = await pool.query(`
//     INSERT INTO posts (user_id, title, body)
//     VALUES (?, ?, ?)
//     `, [user_id, title, body]);
//     const id = result.insertId;
//     return getPostById(id);
// }

// export async function updatePost(id, title, body){
//     const [result] = await pool.query(`
//     UPDATE posts 
//     SET 
//     title = ?,
//     body = ?
//     WHERE id = ?
//     `, [title, body, id]);
    
//     // Checking whether the query has updated one record
//     if (result.affectedRows === 1) {
//         return getPostById(id); // If yes, return the updated user
//     } else {
//         throw new Error(`User with id ${id} not found`); //else, there is an error
//     }
// }

// export async function deletePost(id){
//     // Execute the DELETE query to delete the user with the specified ID
//     const [result] = await pool.query(`
//     DELETE FROM posts 
//     WHERE id = ?
//     `, [id]);
    
//     // Check if the query deleted one row
//     if (result.affectedRows === 1) {
//         return true; // If successful, return true
//     } else {
//         throw new Error(`User with id ${id} not found`); // If user not found, throw an error
//     }
// }


//--------------posts-----------------
// Retrieve all posts
export async function getAllPosts() {
    try {
        const [rows] = await pool.query("SELECT * FROM posts");
        return rows;
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
        return rows[0];
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

// //--------------comments-----------------
// export async function getAllComments(){//לבדוק אם צריך את זה
//     const [rows] = await pool.query("SELECT * FROM comments");
//     return rows;
// }

// export async function getCommentsByPostId(id){
//     const [rows] = await pool.query(`
//     SELECT * 
//     FROM comments 
//     WHERE postId = ?
//     `, [id]);
//     return rows[0];//לשים לב שיחזיר הכל
// }

// export async function getCommentById(id){
//     const [rows] = await pool.query(`
//     SELECT * 
//     FROM comments 
//     WHERE id = ?
//     `, [id]);
//     return rows[0];
// }

// export async function createComment(postId, name, email, body){
//     const [result] = await pool.query(`
//     INSERT INTO comments (postId, name, email, body)
//     VALUES (?, ?, ?, ?)
//     `, [postId, name, email, body]);
//     const id = result.insertId;
//     return getCommentById(id);
// }
// //לבדוק אם אפשרי לעדכן את כל השדות האלה
// export async function updateComment(id, name, email, body){
//     const [result] = await pool.query(`
//     UPDATE comments 
//     SET 
//     name = ?,
//     email = ?,
//     body = ?
//     WHERE id = ?
//     `, [name, email, body, id]);
    
//     // Checking whether the query has updated one record
//     if (result.affectedRows === 1) {
//         return getCommentById(id); // If yes, return the updated user
//     } else {
//         throw new Error(`User with id ${id} not found`); //else, there is an error
//     }
// }

// export async function deleteComment(id){
//     // Execute the DELETE query to delete the user with the specified ID
//     const [result] = await pool.query(`
//     DELETE FROM comments 
//     WHERE id = ?
//     `, [id]);
    
//     // Check if the query deleted one row
//     if (result.affectedRows === 1) {
//         return true; // If successful, return true
//     } else {
//         throw new Error(`The comment with the given ID was not found`); // If user not found, throw an error
//     }
// }

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


// //--------------passwords-----------------
// export async function getPasswordByUserId(id){
//     const [rows] = await pool.query(`
//     SELECT * 
//     FROM passwords 
//     WHERE postId = ?
//     ORDER BY created DESC
//     LIMIT 1
//     `, [id]);

//     // Check if any password is found for the user
//     if (rows.length > 0) {
//         return rows[0]; // Return the latest password object
//     } else {
//         return null; // If no password is found, return null
//     }
// }

// export async function createPassword(idOfUser, password){
//     const [result] = await pool.query(`
//     INSERT INTO passwords (idOfUser, password)
//     VALUES (?, ?)
//     `, [idOfUser, password]);
//     const id = result.insertId;
//     return getPasswordByUserId(idOfUser);
// }


//--------------passwords-----------------
// Retrieve the latest password for a user by user ID
export async function getPasswordByUserId(id) {
    try {
        const [rows] = await pool.query("SELECT * FROM passwords WHERE idOfUser = ? ORDER BY created DESC LIMIT 1", [id]);
        if (rows.length > 0) {
            return rows[0];
        } else {
            return null;
        }
    } catch (error) {
        throw new Error(`Error retrieving password for user with ID ${id}: ${error.message}`);
    }
}

// Create a new password for a user
export async function createPassword(idOfUser, password) {
    try {
        const [result] = await pool.query("INSERT INTO passwords (idOfUser, password) VALUES (?, ?)", [idOfUser, password]);
        const id = result.insertId;
        return getPasswordByUserId(idOfUser);
    } catch (error) {
        throw new Error(`Error creating password: ${error.message}`);
    }
}


// const users = await getAllUsers();
// console.log(users);

// const customer = await getCustomer(1);
// console.log(customer);

// const result = await createCustomer('test', 'test');
// console.log(result);

// ראיתי שיש לכל הפרוייקטים איזשהו מבנה עם נוד הם מכילים קונטרולרס
//אשמח שנעבור איך זה אמור להיות בנוי ואיך מחברים בין הריאקט לנוד?