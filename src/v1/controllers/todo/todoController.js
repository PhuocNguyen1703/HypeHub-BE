import { todoService } from '../../services/todo/todoService.js';

const createNew = async (req, res) => {
    try {
        const result = await todoService.createNew(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.message,
        });
    }
};

const getAllTodo = async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await todoService.getAllTodo(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.message,
        });
    }
};

const update = async (req, res) => {
    try {
        const { todoId } = req.params;
        const result = await todoService.update(todoId, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.message,
        });
    }
};

export const todoController = { createNew, getAllTodo, update };
