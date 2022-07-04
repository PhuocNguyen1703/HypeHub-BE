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
        avatar: String,
        profilePicture: String,
        position: String,
        livesIn: String,
        worksAt: String,
        country: String,
    },
    { timestamps: true },
);

const UserModel = mongoose.model('Users', userSchema);
export default UserModel;
