import { columnModel } from '../../models/kanban/columnModel.js';
import { boardModel } from '../../models/kanban/boardModel.js';

const createNew = async (data) => {
    try {
        const newColumn = await columnModel.createNew(data);

        //update columnOrder Array in board collection
        await boardModel.pushColumnOrder(newColumn.boardId.toString(), newColumn._id.toString());

        return newColumn;
    } catch (error) {
        throw new Error(error);
    }
};

const update = async (id, data) => {
    try {
        const updateData = { ...data, updatedAt: Date.now() };
        const result = await columnModel.update(id, updateData);

        return result;
    } catch (error) {
        throw new Error(error);
    }
};

export const columnService = { createNew, update };
