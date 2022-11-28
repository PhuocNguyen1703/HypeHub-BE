import { boardModel } from '../../models/kanban/boardModel.js';

const createNew = async (data) => {
    try {
        const createdBoard = await boardModel.createNew(data);
        const getNewBoard = await boardModel.findOneById(createdBoard.insertedId.toString());

        return getNewBoard;
    } catch (error) {
        throw new Error(error);
    }
};

const getAllBoard = async (boardId) => {
    try {
        const board = await boardModel.getAllBoard(boardId);

        //Add card to each column
        board.columns.forEach((column) => {
            column.cards = board.cards.filter((c) => c.columnId.toString() === column._id.toString());
        });

        //remove cards data from boards
        delete board.cards

        return board;
    } catch (error) {
        throw new Error(error);
    }
};

export const boardService = { createNew, getAllBoard };
