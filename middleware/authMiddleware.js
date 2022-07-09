import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try {
        //Access token from header, refresh token from cookie
        const accessToken = req.headers.token.split(' ')[1];
        if (accessToken) {
            const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN);
            req.body._id = decoded?.id;
            next();
        }
    } catch (error) {
        console.log(error);
    }

    // if (token) {
    //     jwt.verify(accessToken, secret, (err, user) => {
    //         if (err) {
    //             return res.status(403).json('Token is not valid');
    //         }
    //         req.user = user;
    //     });
    // } else {
    //     res.status(401).json('You are not authenticated');
    // }
};

export const verifyTokenAndUserAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json('You are not allowed to do that!');
        }
    });
};

export const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json('You are not allowed to do that!');
        }
    });
};
