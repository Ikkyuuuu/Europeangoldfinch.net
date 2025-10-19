const jwt = require('jsonwebtoken');

function authRequired(req, res, next) {
    try {
        const header = req.headers.authorization || '';
        const [, token] = header.split(' ');
        if (!token) return res.status(401).json({ error: 'Missing token' });

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.auth = payload; // { sub, email, iat, exp }
        return next();
    } catch {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}

module.exports = { authRequired };
