import { cardModel } from '../../models/kanban/cardModel.js';
import { columnModel } from '../../models/kanban/columnModel.js';
import cloudinary from '../../utils/cloudinary.js';

const uploadImage = async (fileStr) => {
    try {
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'upload_profile_images',
        });
        return uploadedResponse.secure_url;
    } catch (error) {
        console.log(error, 'loi');
    }
};

const createNew = async (data) => {
    let coverUrl = '';
    if (data.cover) {
        coverUrl = await uploadImage(data.cover);
    }

    const transformData = { ...data, cover: coverUrl };

    try {
        const createdCard = await cardModel.createNew(transformData);
        const getNewCard = await cardModel.findOneById(createdCard.insertedId.toString());
        //update cardOrder Array in board collection
        await columnModel.pushCardOrder(getNewCard.columnId.toString(), getNewCard._id.toString());

        return getNewCard;
    } catch (error) {
        throw new Error(error);
    }
};

const update = async (id, data) => {
    try {
        const updateData = { ...data, updatedAt: Date.now() };
        if (updateData._id) delete updateData._id;

        const updatedCard = await cardModel.update(id, updateData);

        return updatedCard;
    } catch (error) {
        throw new Error(error);
    }
};

export const cardService = { createNew, update };
