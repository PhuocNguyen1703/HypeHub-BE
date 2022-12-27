import { boardModel } from '../../models/kanban/boardModel.js';
import cloneDeep from 'lodash/cloneDeep.js';

const createNew = async (data) => {
    try {
        const createdBoard = await boardModel.createNew(data);
        const getNewBoard = await boardModel.findOneById(createdBoard.insertedId.toString());

        return getNewBoard;
    } catch (error) {
        throw new Error(error);
    }
};

const getAllBoardFromUserId = async (userId) => {
    try {
        const board = await boardModel.getAllBoardFromUserId(userId);

        if (!board) {
            throw new Error('Board not found!!');
        }

        let transformBoard = cloneDeep(board);

        //Filter deleted board
        transformBoard = transformBoard.filter((board) => !board._destroy);

        return transformBoard;
    } catch (error) {
        throw new Error(error);
    }
};

const getAllBoard = async (boardId) => {
    try {
        const board = await boardModel.getAllBoard(boardId);

        if (!board || !board.columns) {
            throw new Error('Board not found!!');
        }

        const transformBoard = cloneDeep(board);
        //Filter deleted columns
        transformBoard.columns = transformBoard.columns.filter((column) => !column._destroy);

        //Add card to each column
        transformBoard.columns.forEach((column) => {
            column.cards = transformBoard.cards.filter((c) => c.columnId.toString() === column._id.toString());
        });

        //remove cards data from boards
        delete transformBoard.cards;

        return transformBoard;
    } catch (error) {
        throw new Error(error);
    }
};

const update = async (boardId, data) => {
    try {
        const updateData = { ...data, updatedAt: Date.now() };
        if (updateData._id) delete updateData._id;
        if (updateData.userId) delete updateData.userId;
        if (updateData.columns) delete updateData.columns;

        const updatedBoard = await boardModel.update(boardId, updateData);

        return updatedBoard;
    } catch (error) {
        throw new Error(error);
    }
};

export const boardService = { createNew, getAllBoardFromUserId, getAllBoard, update };
