import { cardModel } from '../../models/kanban/cardModel.js';
import { columnModel } from '../../models/kanban/columnModel.js';

const createNew = async (data) => {
    try {
        const createdCard = await cardModel.createNew(data);
        const getNewCard = await cardModel.findOneById(createdCard.insertedId.toString());
        //update cardOrder Array in board collection
        await columnModel.pushCardOrder(getNewCard.columnId.toString(), getNewCard._id.toString());

        return getNewCard;
    } catch (error) {
        throw new Error(error);
    }
};

export const cardService = { createNew };
