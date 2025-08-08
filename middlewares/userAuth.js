import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const authenticateToken = async(req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({ message: "you have to login First" });
        return res.render('/login');
    }

        try {
            let decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findOne({ username: decoded.username }).select('-password');
            req.user = user
            next();

            
        } catch (error) {
            console.error("something went wrong!", error);
            res.status(500).json({ message: "Internal server error." });
        }
    };
export default authenticateToken;
