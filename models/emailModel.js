import mongoose from 'mongoose';

const EmailSchema = mongoose.Schema(
    {
        senderId: {
            type: String,
        },
        sender: {
            type: String,
        },
        receiverId: {
            type: String,
        },
        receiver: {
            type: String,
        },
        subject: {
            type: String,
        },
        content: {
            type: String,
        },
        status: {
            watched: {
                type: Boolean,
                default: true,
            },
            star: {
                type: Boolean,
                default: false,
            },
            spam: {
                type: Boolean,
                default: true,
            },
        },
    },
    {
        timestamps: true,
    },
);

const EmailModel = mongoose.model('Email', EmailSchema);
export default EmailModel;
