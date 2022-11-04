import SectionModel from '../models/SectionModel.js';
import TaskModel from '../models/TaskModel.js';

//Section controllers
export const createSection = async (req, res) => {
    const { userId, sectionId, title } = req.body;
    const newSection = new SectionModel({ userId, sectionId, title });

    try {
        const result = await newSection.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getAllSection = async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await SectionModel.find({ userId });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

//Task controllers
export const createTask = async (req, res) => {
    const { sectionId, label, labelColor, title, description, photoUrl, startDate, endDate } = req.body;
    const newTask = new TaskModel({ sectionId, label, labelColor, title, description, photoUrl, startDate, endDate });

    try {
        const result = await newTask.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getAllTask = async (req, res) => {
    const { sectionId } = req.params;

    try {
        const result = await TaskModel.find({ sectionId });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};
