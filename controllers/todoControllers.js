import TodoModel from '../models/todoModel.js';

export const createTodo = async (req, res) => {
    const newTask = new TodoModel(req.body);

    try {
        const result = await newTask.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getAllTodo = async (req, res) => {
    const { userId } = req.body;

    try {
        const result = await TodoModel.find({ userId });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};
