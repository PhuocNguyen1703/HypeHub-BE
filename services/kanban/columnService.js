import { columnModel } from '../../models/kanban/columnModel.js';
import { boardModel } from '../../models/kanban/boardModel.js';

const createNew = async (data) => {
    try {
        const createdColumn = await columnModel.createNew(data);
        const getNewColumn = await columnModel.findOneById(createdColumn.insertedId.toString());
        getNewColumn.cards = [];

        //update columnOrder Array in board collection
        await boardModel.pushColumnOrder(createdColumn.boardId.toString(), createdColumn._id.toString());

        return getNewColumn;
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
