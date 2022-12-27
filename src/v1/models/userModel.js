import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            default:'',
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
        banner: {
            type:String,
            default:'',
        },
        avatar: {
            type:String,
            default:'',
        },
        fullName: {
            type:String,
            default:'',
        },
        livesIn: {
            type:String,
            default:'',
        },
        streetAddress: {
            type:String,
            default:'',
        },
        birth: {
            type:String,
            default:'',
        },
        gender: {
            type:String,
            default:'',
        },
        hashtag: {
            type:String,
            default:'',
        },
        position: {
            type:String,
            default:'',
        },
        phone: {
            type:String,
            default:'',
        },
        faceId: {
            type: String,
            default: '',
        },
    },
    { timestamps: true },
);

const UserModel = mongoose.model('Users', userSchema);
export default UserModel;
