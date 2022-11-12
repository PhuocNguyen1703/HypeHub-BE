import mongoose from 'mongoose';

const EmailSchema = mongoose.Schema(
    {
        members: {
            type: Array,
        },
        subject: {
            type: String,
        },
        content: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

const EmailModel = mongoose.model('Email', EmailSchema);
export default EmailModel;
