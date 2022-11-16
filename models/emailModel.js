import mongoose from 'mongoose';

const EmailSchema = mongoose.Schema(
    {
        senderID: {
            type: String,
        },
        receiverId: {
            type: String,
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
