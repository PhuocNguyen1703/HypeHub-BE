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
    const { id } = req.params;

    try {
        const result = await columnService.update(id, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.message,
        });
    }
};

const updateTwoColumn = async (req, res) => {
    const { sourceColId, destinationColId } = req.params;
    const { sourceCol, destinationCol } = req.body;

    try {
        const updatedSourceCol = await columnService.update(sourceColId, sourceCol);
        const updatedDestinationCol = await columnService.update(destinationColId, destinationCol);
        const result = { updatedSourceCol, updatedDestinationCol };
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.message,
        });
    }
};

export const columnController = { createNew, update, updateTwoColumn };
