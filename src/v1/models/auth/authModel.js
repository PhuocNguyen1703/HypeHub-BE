import { getDB } from '../../../../config/mongodb.js';

const authCollectionName = 'users';

const login = async (email) => {
    try {
        const result = await getDB().collection(authCollectionName).find({ email: email }).toArray();

        return result[0];
    } catch (error) {
        throw new Error(error);
    }
};

export const authModel = { login };
