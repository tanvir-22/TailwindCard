import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const optionalAuth = async (req, res, next) => {
    const token = req.cookies.token;
    req.user = null;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findOne({ username: decoded.username }).select('-password');
            req.user = user;
        } catch (err) {
            console.error('Invalid token:', err.message);
        }
    }

    next();
};

export default optionalAuth;
