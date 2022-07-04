import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';

let refreshTokens = [];

//Register
export const registerUser = async (req, res) => {
    const { firstName, lastName, password, email } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newUser = new UserModel({ firstName, lastName, password: hashed, email });

    try {
        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email });
        const validPassword = await bcrypt.compare(password, user.password);

        if (!user) {
            res.status(404).json('Incorrect email');
        }

        if (!validPassword) {
            res.status(404).json('Incorrect password');
        }
        if (user && validPassword) {
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            refreshTokens.push(refreshToken);

            //Store refresh token in cookie
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict',
            });
            const { password, ...others } = user._doc;
            res.status(200).json({ ...others, accessToken, refreshToken });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Log out
export const logOut = async (req, res) => {
    //Clear cookies when user log out
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.clearCookie('refreshToken');
    res.status(200).json('Logged out successfully');
};

//GenerateToken
const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_ACCESS_TOKEN,
        { expiresIn: '1h' },
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_REFRESH_TOKEN,
        { expiresIn: '365d' },
    );
};

export const requestRefreshToken = async (req, res) => {
    //Take refresh token from user
    const refreshToken = req.cookies.refreshToken;
    //Send error if token is not valid
    if (!refreshToken) return res.status(401).json('You are not authenticated');
    if (!refreshToken.includes(refreshToken)) {
        return res.status(403).json('Refresh token is not valid');
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, user) => {
        if (err) {
            console.log(err);
        }
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

        //Create new access token, refresh token and send to user
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);
        refreshTokens.push(newRefreshToken);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            path: '/',
            sameSite: 'strict',
        });
        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        });
    });
};
