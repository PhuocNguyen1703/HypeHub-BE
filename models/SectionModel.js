import mongoose from 'mongoose';

const SectionSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        sectionId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

const SectionModel = mongoose.model('Section', SectionSchema);
export default SectionModel;
