const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const cors = require('cors'); // <-- add this
const { sequelize } = require('./models');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const postsRouter = require('./routes/posts');

const app = express();

// Allow your Vite dev origin
app.use(cors({ origin: 'http://localhost:5173' })); // <-- add this

app.use(express.json());

app.get('/', (_req, res) => res.json({ ok: true }));

app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/posts', postsRouter);

app.use(notFound);
app.use(errorHandler);

(async () => {
    try {
        await sequelize.authenticate();
        const doAlter = process.env.DB_SYNC_ALTER === '1';
        await sequelize.sync({ alter: !!doAlter });
        console.log('[db] connected and synced');
        const port = process.env.PORT || 3000;
        app.listen(port, '0.0.0.0', () => console.log(`[http] listening on :${port}`));
    } catch (err) {
        console.error('[db] startup error:', err);
        process.exit(1);
    }
})();
