import cloudinary from '../src/v1/utils/cloudinary.js';

export const uploadImage = async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'upload_profile_images',
        });
        res.status(200).json(uploadedResponse);
    } catch (error) {
        res.status(500).json(error);
    }
};
