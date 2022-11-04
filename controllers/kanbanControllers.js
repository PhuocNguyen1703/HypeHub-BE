import SectionModel from '../models/SectionModel';
import TaskModel from '../models/TaskModel';

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
