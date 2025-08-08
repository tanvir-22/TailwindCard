import bcrypt from "bcrypt";
import User from "../models/user.js";
/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: User Authentication API
 *   version: 1.0.0
 *   description: API for user registration
 * paths:
 *   /register:
 *     post:
 *       summary: Register a new user
 *       tags: [Register]
 *       description: Register a new user with username, password, and email
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - username
 *                 - email
 *                 - password
 *               properties:
 *                 username:
 *                   type: string
 *                   minLength: 5
 *                   example: Tanvir
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: tanvir123@gmail.com
 *                 password:
 *                   type: string
 *                   minLength: 6
 *                   example: password123
 *       responses:
 *         302:
 *           description: Redirect to login page after successful registration
 *           headers:
 *             Location:
 *               description: Redirect URL
 *               schema:
 *                 type: string
 *               example: /login?registered=true
 *         400:
 *           description: >
 *             Bad request — validation errors can be:
 *               - Username already exists.
 *               - Password must be at least 6 characters.
 *               - username already exists.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Username already exists             
 *         500:
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: internal server error
 */

export const register = async (req, res) => {
    const { username, password,email } = req.body;
    
    try {
          if (username.length < 5) {
            return res.status(400).json({ message: "Username must be at least 5 characters." });
        }
        const existingUser = await  User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists." });
        }
    
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters." });
        }
       const hashedPassword = await bcrypt.hash(password, 10);
       const newUser = new User({
            username,
            password: hashedPassword,
            email
        });
        await newUser.save();
        res.redirect('/login?registered=true');
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};