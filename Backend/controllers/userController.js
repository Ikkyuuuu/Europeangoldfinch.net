const bcrypt = require('bcryptjs');
const { User } = require('../models');

const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s || '').toLowerCase());

async function createUser(req, res, next) {
    try {
        const { email, password } = req.body || {};

        if (!email || !isEmail(email)) {
            return res.status(400).json({ error: 'Valid email is required' });
        }
        if (!password || String(password).length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters' });
        }

        const existing = await User.findOne({ where: { email } });
        if (existing) return res.status(409).json({ error: 'Email already registered' });

        const passwordHash = await bcrypt.hash(password, 12);
        const user = await User.create({ email, passwordHash });

        return res.status(201).json({
            id: user.id,
            email: user.email,
            created_at: user.createdAt ?? user.created_at,
            updated_at: user.updatedAt ?? user.updated_at,
        });
    } catch (err) {
        if (err?.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'Email already registered' });
        }
        return next(err);
    }
}

module.exports = { createUser };
