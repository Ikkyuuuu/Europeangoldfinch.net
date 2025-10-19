const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s || '').toLowerCase());
const isUsername = (s) => /^[a-zA-Z0-9_.-]{3,30}$/.test(String(s || ''));

function signToken(user) {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET is not set');
    return jwt.sign(
        { sub: user.id, username: user.username, email: user.email }, // now includes username
        secret,
        { expiresIn: process.env.JWT_EXPIRES || '7d' }
    );
}

/**
 * POST /auth/login
 * Body: { username?, email?, password }
 * Prefer username; fallback to email.
 */
async function login(req, res, next) {
    try {
        const { username, email, password } = req.body || {};
        if (!password) return res.status(400).json({ error: 'Password is required' });

        let user = null;
        if (username && isUsername(username)) {
            user = await User.findOne({ where: { username } });
        } else if (email && isEmail(email)) {
            user = await User.findOne({ where: { email } });
        } else {
            return res.status(400).json({ error: 'Provide a valid username or email' });
        }

        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

        const token = signToken(user);
        return res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
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
