import { cardService } from '../../services/kanban/cardService.js';

const createNew = async (req, res) => {
    try {
        const result = await cardService.createNew(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.message,
        });
    }
};

export const cardController = { createNew };
