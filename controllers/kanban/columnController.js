import { columnService } from '../../services/kanban/columnService.js';

const createNew = async (req, res) => {
    try {
        const result = await columnService.createNew(req.body);
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
        const result = await columnService.update(id, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.message,
        });
    }
};

export const columnController = { createNew, update };
