import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        banner: String,
        avatar: String,
        fullName: String,
        livesIn: String,
        streetAddress: String,
        birth: String,
        gender: String,
        hashtag: String,
        position: String,
        phone: String,
    },
    { timestamps: true },
);

const UserModel = mongoose.model('Users', userSchema);
export default UserModel;
