import express from 'express';
import {
    getUsers_,
    getUser_,
    createUser_ as createUserHandler,
    updateUser_ as updateUserHandler,
    deleteUser_ as deleteUserHandler
} from '../controllers/userController.js';

const router = express.Router();

// Route to get all users
router.get('/', getUsers_);

// Route to get a user by ID
router.get('/:id', getUser_);

// Route to create a new user
router.post('/', createUserHandler);

// Route to update a user by ID
router.put('/:id', updateUserHandler);

// Route to delete a user by ID
router.delete('/:id', deleteUserHandler);

export default router;
