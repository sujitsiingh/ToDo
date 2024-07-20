const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const auth = async (req, res, next) => {
    // let token;
    // if (
    //     req.headers.authorization &&
    //     req.headers.authorization.startsWith('Bearer')
    // ) {
    //     try {
    //         token = req.headers.authorization.split(' ')[1];
    //         const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //         req.user = await User.findById(decoded.id).select('-password');

    //         next();
    //     } catch (error) {
    //         console.error(error);
    //         res.status(401);
    //         throw new Error('Not authirized! Token failed.');
    //     }
    // }
    // if (!token) {
    //     res.status(401);
    //     throw new Error('Not authorized! No Token');
    // }
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Not authorized! No Token' });
    }

    if (!token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Invalid token format' });
    }

    const cleanToken = token.replace('Bearer ', '');

    try {
        // Verify the token and get the user data
        const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.id });
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = auth;