const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s || '').toLowerCase());

function signToken(user) {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET is not set');
    return jwt.sign(
        { sub: user.id, email: user.email },
        secret,
        { expiresIn: process.env.JWT_EXPIRES || '7d' }
    );
}

/**
 * POST /auth/login
 * Body: { email, password }
 */
async function login(req, res, next) {
    try {
        const { email, password } = req.body || {};

        if (!email || !isEmail(email) || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await User.findOne({ where: { email } });
        // Avoid leaking which field failed
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

        const token = signToken(user);

        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                created_at: user.createdAt ?? user.created_at,
                updated_at: user.updatedAt ?? user.updated_at,
            },
        });
    } catch (err) {
        return next(err);
    }
}

module.exports = { login };
