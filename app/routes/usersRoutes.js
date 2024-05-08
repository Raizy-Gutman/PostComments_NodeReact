import express from 'express';
import {
    getUsers_,
    getUser_,
    createUser_ as createUserHandler,
    updateUser_ as updateUserHandler,
    deleteUser_ as deleteUserHandler
} from '../controllers/userController.js';

const userRouter = express.Router();

// Route to get all users
userRouter.get('/', getUsers_);

// Route to get a user by ID
userRouter.get('/:id', getUser_);

// Route to create a new user
userRouter.post('/', createUserHandler);

// Route to update a user by ID
userRouter.put('/:id', updateUserHandler);

// Route to delete a user by ID
userRouter.delete('/:id', deleteUserHandler);

export default userRouter;
