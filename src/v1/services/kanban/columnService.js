import { columnModel } from '../../models/kanban/columnModel.js';
import { boardModel } from '../../models/kanban/boardModel.js';
import { cardModel } from '../../models/kanban/cardModel.js';

const createNew = async (data) => {
    try {
        const createdColumn = await columnModel.createNew(data);
        const getNewColumn = await columnModel.findOneById(createdColumn.insertedId.toString());
        getNewColumn.cards = [];

        //update columnOrder Array in board collection
        await boardModel.pushColumnOrder(getNewColumn.boardId.toString(), getNewColumn._id.toString());

        return getNewColumn;
    } catch (error) {
        throw new Error(error);
    }
};

const update = async (id, data) => {
    try {
        const updateData = { ...data, updatedAt: Date.now() };
        if (updateData._id) delete updateData._id;
        if (updateData.cards) delete updateData.cards;

        const updatedColumn = await columnModel.update(id, updateData);

        if (updatedColumn._destroy) {
            cardModel.deleteMany(updatedColumn.cardOrder);
        }

        return updatedColumn;
    } catch (error) {
        throw new Error(error);
    }
};

export const columnService = { createNew, update };
