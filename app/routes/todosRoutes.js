import express from 'express';
import {
    getTodos_,
    getTodosByUser_,
    getTodo_,
    createTodo_ as createTodoHandler,
    updateTodo_ as updateTodoHandler,
    deleteTodo_ as deleteTodoHandler
} from '../controllers/todoController.js';

const router = express.Router();

// Route to get all todos
router.get('/', getTodos_);

// Route to get todos by user ID
router.get('/user/:userId', getTodosByUser_);

// Route to get a todo by ID
router.get('/:id', getTodo_);

// Route to create a new todo
router.post('/', createTodoHandler);

// Route to update a todo by ID
router.put('/:id', updateTodoHandler);

// Route to delete a todo by ID
router.delete('/:id', deleteTodoHandler);

export default router;
