import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';

//Get a user
export const getUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await UserModel.findById(id);

        if (user) {
            const { password, ...otherDetails } = user._doc;

            res.status(200).json(otherDetails);
        } else {
            res.status(404).json('No such user exists');
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

//Get all user
export const getAllUsers = async (req, res) => {
    try {
        let users = await UserModel.find();
        users = users.map((user) => {
            const { password, ...otherDetails } = user._doc;
            return otherDetails;
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
};

//Update a user
export const updateUser = async (req, res) => {
    const id = req.params.id;
    const { currentUserId, currentUserAdminStatus, password } = req.body;

    if (id === currentUserId || currentUserAdminStatus) {
        try {
            if (password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password, salt);
            }

            const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
            const token = jwt.sign(
                {
                    email: user.email,
                    id: user._id,
                },
                process.env.JWT_ACCESS_TOKEN,
                { expiresIn: '1h' },
            );
            res.status(200).json({ user, token });
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json('Access Denied! You can only update your own profile');
    }
};

//Delete a user
export const deleteUser = async (req, res) => {
    const id = req.params.id;

    const { currentUserId, currentUserAdminStatus } = req.body;

    if (currentUserId === id || currentUserAdminStatus) {
        try {
            await UserModel.findByIdAndDelete(id);
            res.status(200).json('User deleted successfully');
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json('Access Denied! You can only delete your own profile');
    }
};
