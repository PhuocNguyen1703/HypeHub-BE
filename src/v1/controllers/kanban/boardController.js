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
    const { userId } = req.params;
    
    try {
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
        const { boardId } = req.params;
        const result = await boardService.getAllBoard(boardId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.message,
        });
    }
};

const update = async (req, res) => {
    try {
        const { boardId } = req.params;
        const result = await boardService.update(boardId, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.message,
        });
    }
};

export const boardController = { createNew, getAllBoardFromUserId, getAllBoard, update };
