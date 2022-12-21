import { boardService } from '../../services/kanban/boardService.js';

const createNew = async (req, res) => {
    try {
        const result = await boardService.createNew(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.message,
        });
    }
};

const getAllBoardFromUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await boardService.getAllBoardFromUserId(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.message,
        });
    }
};

const getAllBoard = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await boardService.getAllBoard(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.message,
        });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await boardService.update(id, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.message,
        });
    }
};

export const boardController = { createNew, getAllBoardFromUserId, getAllBoard, update };
