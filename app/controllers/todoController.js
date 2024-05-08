import { getAllTodos, getTodosByUserId, getTodoById, createTodo, updateTodoById, deleteTodoById } from '../models/todoModel.js';

// Controller function to get all todos
export const getTodos_ = async (req, res) => {
    const { userId, _limit, _page, _sort } = req.query;
    try {
        console.log(userId);
        console.log(_sort);
        const todos = await getAllTodos(userId,_sort);
        if(_page && _limit){
        if(_page<=0)
            _page=1
        res.status(200).json(todos.slice((_page-1)*_limit,_page*_limit));}
        else{
            res.status(200).json(todos);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to get todos by user ID
export const getTodosByUser_ = async (req, res) => {
    const { userId } = req.params;
    try {
        const todos = await getTodosByUserId(userId);
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to get a todo by ID
export const getTodo_ = async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await getTodoById(id);
        if (todo) {
            res.status(200).json(todo);
        } else {
            res.status(404).json({ message: `Todo with ID ${id} not found` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to create a new todo
export const createTodo_ = async (req, res) => {
    console.log(req);
    const { userId, title, completed } = req.body;
    if (!userId || !title) {
        return res.status(400).json({ error: 'User ID and title are required fields' });
    }
    try {
        const newTodo = await createTodo(userId, title, completed);
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to update a todo by ID
export const updateTodo_ = async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    try {
        const updatedTodo = await updateTodoById(id, title, completed);
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to delete a todo by ID
export const deleteTodo_ = async (req, res) => {
    const { id } = req.params;
    try {
        console.log("on server")
        console.log(id);
        const result = await deleteTodoById(id);
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: `Todo with ID ${id} not found` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
