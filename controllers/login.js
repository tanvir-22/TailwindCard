
import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate user and issue JWT as a cookie
 *     tags: [Login]
 *     description: Authenticates a user using username and password. If valid, sets a JWT cookie and redirects to the homepage.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: Passw0rd!
 *     responses:
 *       302:
 *         description: Login successful — redirects to home page
 *         headers:
 *           Set-Cookie:
 *             description: JWT token cookie
 *             schema:
 *               type: string
 *           Location:
 *             description: Redirect URL
 *             schema:
 *               type: string
 *             example: http://localhost:5000/
 *       400:
 *         description: Invalid credentials — redirects back to login with error
 *         content:
 *           text/html:
 *             example: invalid username or password
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error.
 */

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
         
            return res.redirect('/login?error=invalid');
        }
       

            bcrypt.compare(password, user.password, async(err, result) => {
                if (err) {
                    console.error("Error comparing passwords:", err);
                    return res.status(500).json({ message: "Internal server error." });
                }
                if(result){
                         let token = jwt.sign({username:user.username,role:user.role}, process.env.JWT_SECRET, { expiresIn: '1h' });
                         res.cookie('token', token);
                         res.redirect('/');
                }else{
                   
                    return res.redirect('/login?error=invalid');
                }
            });
        
    }catch (error) {    
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error." });    
        
    }
    
}
