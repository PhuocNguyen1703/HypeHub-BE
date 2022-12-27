import mongoose from 'mongoose';

const SectionSchema = mongoose.Schema(
    {
        userId: {
            type: String,
        },
        sectionId: {
            type: String,
        },
        title: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    },
);

const SectionModel = mongoose.model('Section', SectionSchema);
export default SectionModel;
