const bcrypt = require('bcryptjs');
const { User } = require('../models');

const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s || '').toLowerCase());
const isUsername = (s) => /^[a-zA-Z0-9_.-]{3,30}$/.test(String(s || ''));

/**
 * POST /users
 * Body: { username, password, email? }
 */
async function createUser(req, res, next) {
    try {
        const { username, password, email } = req.body || {};

        if (!username || !isUsername(username)) {
            return res.status(400).json({ error: 'Valid username is required (3-30 chars, letters/digits/._-)' });
        }
        if (!password || String(password).length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters' });
        }
        if (email && !isEmail(email)) {
            return res.status(400).json({ error: 'Email is invalid' });
        }

        // Uniqueness
        const existingUser = await User.findOne({
            where: email ? { username } : { username },
        });
        if (existingUser) return res.status(409).json({ error: 'Username already taken' });

        if (email) {
            const byEmail = await User.findOne({ where: { email } });
            if (byEmail) return res.status(409).json({ error: 'Email already registered' });
        }

        const passwordHash = await bcrypt.hash(password, 12);
        const user = await User.create({ username, email: email || null, passwordHash });

        return res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email,
            created_at: user.createdAt ?? user.created_at,
            updated_at: user.updatedAt ?? user.updated_at,
        });
    } catch (err) {
        if (err?.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'Username or email already in use' });
        }
        return next(err);
    }
}

module.exports = { createUser };
