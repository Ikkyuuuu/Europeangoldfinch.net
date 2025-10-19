const { Post, User } = require('../models');

/**
 * POST /posts  (auth)
 * Body: { topic?: string, detail: string }
 */
async function createPost(req, res, next) {
    try {
        const username = req.auth?.username;
        if (!username) return res.status(401).json({ error: 'Unauthorized' });

        const { topic, detail } = req.body || {};
        if (!detail || String(detail).trim().length === 0) {
            return res.status(400).json({ error: 'detail is required' });
        }
        if (topic && String(topic).length > 255) {
            return res.status(400).json({ error: 'topic must be <= 255 chars' });
        }

        const post = await Post.create({
            user_username: username,
            topic: topic || null,
            detail,
        });

        return res.status(201).json({
            id: post.id,
            user_username: post.user_username,
            topic: post.topic,
            detail: post.detail,
            created_at: post.createdAt ?? post.created_at,
            updated_at: post.updatedAt ?? post.updated_at,
        });
    } catch (err) { return next(err); }
}

/**
 * GET /posts  (public, paginated)
 */
async function listAllPosts(req, res, next) {
    try {
        const page = Math.max(1, parseInt(req.query.page, 10) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
        const offset = (page - 1) * limit;

        const { rows, count } = await Post.findAndCountAll({
            offset,
            limit,
            order: [['createdAt', 'DESC']],
            attributes: ['id', 'user_username', 'topic', 'detail', 'createdAt', 'updatedAt'],
            include: [{ model: User, as: 'user', attributes: ['id', 'username'] }],
        });

        const items = rows.map(p => ({
            id: p.id,
            user_username: p.user_username,
            topic: p.topic,
            detail: p.detail,
            created_at: p.createdAt,
            updated_at: p.updatedAt,
            user: p.user ? { id: p.user.id, username: p.user.username } : null,
        }));

        return res.json({ page, limit, total: count, items });
    } catch (err) { return next(err); }
}

/**
 * GET /posts/me  (auth)
 */
async function listMyPosts(req, res, next) {
    try {
        const username = req.auth?.username;
        if (!username) return res.status(401).json({ error: 'Unauthorized' });

        const posts = await Post.findAll({
            where: { user_username: username },
            order: [['createdAt', 'DESC']],
            attributes: ['id', 'user_username', 'topic', 'detail', 'createdAt', 'updatedAt'],
        });

        return res.json(posts.map(p => ({
            id: p.id,
            user_username: p.user_username,
            topic: p.topic,
            detail: p.detail,
            created_at: p.createdAt,
            updated_at: p.updatedAt,
        })));
    } catch (err) { return next(err); }
}

/**
 * GET /posts/:id  (public)
 */
async function getPostById(req, res, next) {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ error: 'Invalid id' });

        const post = await Post.findByPk(id, {
            attributes: ['id', 'user_username', 'topic', 'detail', 'createdAt', 'updatedAt'],
            include: [{ model: User, as: 'user', attributes: ['id', 'username'] }],
        });
        if (!post) return res.status(404).json({ error: 'Post not found' });

        return res.json({
            id: post.id,
            user_username: post.user_username,
            topic: post.topic,
            detail: post.detail,
            created_at: post.createdAt,
            updated_at: post.updatedAt,
            user: post.user ? { id: post.user.id, username: post.user.username } : null,
        });
    } catch (err) { return next(err); }
}

module.exports = { createPost, listAllPosts, listMyPosts, getPostById };
