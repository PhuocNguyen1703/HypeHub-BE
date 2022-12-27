import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    //Access token from header, refresh token from cookie
    const accessToken = req.headers.token.split(' ')[1];
    if (accessToken) {
        const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN);
        if (req.body._id === decoded.id) {
            next();
        } else {
            res.status(403).json('You are not allowed to do that!');
        }
    } else {
        res.status(401).json('You are not authenticated');
    }
};

const verifyTokenAndUserAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json('You are not allowed to do that!');
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json('You are not allowed to do that!');
        }
    });
};

export const authMiddleware = { verifyToken, verifyTokenAndUserAuthorization, verifyTokenAndAdmin };
