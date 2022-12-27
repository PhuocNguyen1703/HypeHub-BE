import { authModel } from '../../models/auth/authModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

let refreshTokens = [];

//GenerateToken
export const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user._id ? user._id : user.id,
            phone: user.phone,
        },
        process.env.JWT_ACCESS_TOKEN,
        { expiresIn: '1h' },
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user._id ? user._id : user.id,
            phone: user.phone,
        },
        process.env.JWT_REFRESH_TOKEN,
        { expiresIn: '365d' },
    );
};

const login = async (data, res) => {
    const { email, password } = data;
    try {
        const user = await authModel.login(email);

        if (!user) {
            throw new Error('Incorrect email');
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            throw new Error('Incorrect password');
        }

        if (user && validPassword) {
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            refreshTokens.push(refreshToken);

            //Store refresh token in cookie
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false, //Deploy set true
                path: '/',
                sameSite: 'strict',
            });

            const { password, ...others } = user;
            return { ...others, accessToken };
        }
    } catch (error) {
        throw new Error(error);
    }
};

const requestRefreshToken = async (req, res) => {
    //Take refresh token from user
    const refreshToken = req.cookies.refreshToken;
    //Send error if token is not valid
    if (!refreshToken) {
        return res.status(401).json('You are not authenticated');
    }
    if (!refreshToken.includes(refreshToken)) {
        return res.status(403).json('Refresh token is not valid');
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, user) => {
        if (err) {
            return console.log(err);
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
            sameSite: 'Strict',
        });
        res.status(200).json({
            accessToken: newAccessToken,
        });
    });
};

const logout = async (req, res) => {
    //Clear cookies when user log out
    refreshTokens = refreshTokens.filter((token) => token !== req.cookies.refreshToken);
    res.clearCookie('refreshToken');
    res.status(200).json('Logged out successfully');
};

export const authService = { login, requestRefreshToken, logout };
