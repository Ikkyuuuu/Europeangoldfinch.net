const { Router } = require('express');
const { login } = require('../controllers/authController');
const { authRequired } = require('../middleware/authRequired');

const router = Router();

// Login
router.post('/login', login);

// Example protected route (optional)
router.get('/me', authRequired, (req, res) => {
    res.json({ userId: req.auth.sub, email: req.auth.email });
});

module.exports = router;
