import express from 'express';
import { register } from '../controllers/register.js';
import { login } from '../controllers/login.js';
import { logout } from '../controllers/logout.js';

import authenticateToken from '../middlewares/userAuth.js';


const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/admin/dashboard', authenticateToken, (req, res) => {
    if (req.user.role !== 'admin') {
        res.status(403).json({ message: "Access denied." });
        return res.redirect('/');
    }
    res.render('adminDashboard', { user: req.user });
});
router.get('/register', (req, res) => {
    res.render('register');
});
router.get('/login', (req, res) => {
    const registered = req.query.registered === 'true';
    const error = req.query.error === 'invalid' || false;
    res.render('login', { registered, error });
});

router.get('/customer/dashboard', authenticateToken, (req, res) => {
    if (req.user.role !== 'customer') {
        return res.status(403).json({ message: "Access denied." });
    }
    res.render('customerDashboard', { user: req.user, section: 'dashboard', data: [] });
});

export default router;
