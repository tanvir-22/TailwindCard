
/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Logout user by clearing JWT cookie
 *     tags: [logout]
 *     description: >
 *       Logs out the currently authenticated user by clearing the JWT cookie and redirecting to the homepage.
 *     responses:
 *       302:
 *         description: Logout successful — redirects to home page
 *         headers:
 *           Cookie:
 *             description: Clears the JWT cookie
 *             schema:
 *               type: string
 *           Location:
 *             description: Redirect URL
 *             schema:
 *               type: string
 *               example: http://localhost:5000/
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

export const logout = async(req, res) => {
    try {
        console.log("Logging out user:", req.user.username);
        res.clearCookie('token');
        res.redirect('/');
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
} 