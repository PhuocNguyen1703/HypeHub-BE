import cloneDeep from 'lodash/cloneDeep.js';
import { todoModel } from '../../models/todo/todoModel.js';

const createNew = async (data) => {
    try {
        const createdTodo = await todoModel.createNew(data);
        const getNewTodo = await todoModel.findOneById(createdTodo.insertedId.toString());

        return getNewTodo;
    } catch (error) {
        throw new Error(error);
    }
};

const getAllTodo = async (userId) => {
    try {
        const todo = await todoModel.getAllTodo(userId);

        if (!todo) {
            throw new Error('Todo not found!!');
        }

        let transformTodo = cloneDeep(todo);

        transformTodo = transformTodo.filter((calendar) => !calendar._destroy);

        return transformTodo;
    } catch (error) {
        throw new Error(error);
    }
};

const update = async (todoId, data) => {
    try {
        const updateData = { ...data, updatedAt: Date.now() };

        const updatedTodo = await todoModel.update(todoId, updateData);

        return updatedTodo;
    } catch (error) {
        throw new Error(error);
    }
};

export const todoService = { createNew, getAllTodo, update };
