const express = require('express');
require('dotenv').config();

const { sequelize } = require('./models'); // initializes DB + models
const { notFound, errorHandler } = require('./middleware/errorHandler');

// NEW: users route
const usersRouter = require('./routes/users');

const authRouter = require('./routes/auth');   // <-- add this near other requires
const postsRouter = require('./routes/posts');

const app = express();
app.use(express.json());

// Health check
app.get('/', (_req, res) => res.json({ ok: true }));

// Mount routes
app.use('/users', usersRouter);
app.use('/auth', authRouter); 
app.use('/posts', postsRouter);

// 404 + error handlers
app.use(notFound);
app.use(errorHandler);

// Connect & sync (safe for dev; for prod consider migrations)
(async () => {
    try {
        await sequelize.authenticate();
        const doAlter = process.env.DB_SYNC_ALTER === '1';
        await sequelize.sync({ alter: !!doAlter });
        console.log('[db] connected and synced');
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`[http] listening on :${port}`));
    } catch (err) {
        console.error('[db] startup error:', err);
        process.exit(1);
    }
})();
