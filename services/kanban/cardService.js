import { cardModel } from '../../models/kanban/cardModel.js';
import { columnModel } from '../../models/kanban/columnModel.js';

const createNew = async (data) => {
    try {
        const newCard = await cardModel.createNew(data);

        //update cardOrder Array in board collection
        await columnModel.pushCardOrder(newCard.columnId.toString(), newCard._id.toString());

        return newCard;
    } catch (error) {
        throw new Error(error);
    }
};

export const cardService = { createNew };
