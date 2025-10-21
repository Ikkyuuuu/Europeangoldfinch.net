// src/controllers/replyController.js
const { Reply, Post, User } = require('../models');

/**
 * POST /replies   (auth)
 * Body: { post_id: number, detail: string }
 */
async function createReply(req, res, next) {
    try {
        const username = req.auth?.username;
        if (!username) return res.status(401).json({ error: 'Unauthorized' });

        const { post_id, detail } = req.body || {};
        const pid = Number(post_id);

        if (!Number.isInteger(pid) || pid <= 0) {
            return res.status(400).json({ error: 'post_id must be a positive integer' });
        }
        if (!detail || String(detail).trim().length === 0) {
            return res.status(400).json({ error: 'detail is required' });
        }

        // Ensure target post exists
        const post = await Post.findByPk(pid, { attributes: ['id'] });
        if (!post) return res.status(404).json({ error: 'Post not found' });

        const reply = await Reply.create({
            post_id: pid,
            user_username: username,
            detail: String(detail),
        });

        return res.status(201).json({
            id: reply.id,
            post_id: reply.post_id,
            user_username: reply.user_username,
            detail: reply.detail,
            created_at: reply.createdAt ?? reply.created_at,
            updated_at: reply.updatedAt ?? reply.updated_at,
        });
    } catch (err) {
        return next(err);
    }
}

/**
 * GET /posts/:postId/replies  (public, paginated)
 * Query: page?, limit?
 * Oldest → newest (thread order)
 */
async function listRepliesByPost(req, res, next) {
    try {
        const postId = Number(req.params.postId);
        if (!Number.isInteger(postId) || postId <= 0) {
            return res.status(400).json({ error: 'Invalid post id' });
        }

        const page = Math.max(1, parseInt(req.query.page, 10) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
        const offset = (page - 1) * limit;

        const { rows, count } = await Reply.findAndCountAll({
            where: { post_id: postId },
            offset,
            limit,
            order: [['createdAt', 'ASC'], ['id', 'ASC']], // stable chronological order
            attributes: ['id', 'post_id', 'user_username', 'detail', 'createdAt', 'updatedAt'],
            include: [{ model: User, as: 'user', attributes: ['id', 'username'] }],
        });

        const items = rows.map(r => ({
            id: r.id,
            post_id: r.post_id,
            user_username: r.user_username,
            detail: r.detail,
            created_at: r.createdAt,
            updated_at: r.updatedAt,
            user: r.user ? { id: r.user.id, username: r.user.username } : null,
        }));

        return res.json({ page, limit, total: count, items });
    } catch (err) {
        return next(err);
    }
}

/**
 * GET /replies/me  (auth)
 */
async function listMyReplies(req, res, next) {
    try {
        const username = req.auth?.username;
        if (!username) return res.status(401).json({ error: 'Unauthorized' });

        const replies = await Reply.findAll({
            where: { user_username: username },
            order: [['createdAt', 'DESC'], ['id', 'DESC']],
            attributes: ['id', 'post_id', 'user_username', 'detail', 'createdAt', 'updatedAt'],
        });

        return res.json(replies.map(r => ({
            id: r.id,
            post_id: r.post_id,
            user_username: r.user_username,
            detail: r.detail,
            created_at: r.createdAt,
            updated_at: r.updatedAt,
        })));
    } catch (err) {
        return next(err);
    }
}

/**
 * GET /replies/:id  (public)
 */
async function getReplyById(req, res, next) {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ error: 'Invalid id' });

        const reply = await Reply.findByPk(id, {
            attributes: ['id', 'post_id', 'user_username', 'detail', 'createdAt', 'updatedAt'],
            include: [{ model: User, as: 'user', attributes: ['id', 'username'] }],
        });
        if (!reply) return res.status(404).json({ error: 'Reply not found' });

        return res.json({
            id: reply.id,
            post_id: reply.post_id,
            user_username: reply.user_username,
            detail: reply.detail,
            created_at: reply.createdAt,
            updated_at: reply.updatedAt,
            user: reply.user ? { id: reply.user.id, username: reply.user.username } : null,
        });
    } catch (err) {
        return next(err);
    }
}

/**
 * DELETE /replies/:id  (auth; only author)
 */
async function deleteReply(req, res, next) {
    try {
        const username = req.auth?.username;
        if (!username) return res.status(401).json({ error: 'Unauthorized' });

        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ error: 'Invalid id' });

        const reply = await Reply.findByPk(id, { attributes: ['id', 'user_username'] });
        if (!reply) return res.status(404).json({ error: 'Reply not found' });
        if (reply.user_username !== username) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        await reply.destroy();
        return res.status(204).end();
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    createReply,
    listRepliesByPost,
    listMyReplies,
    getReplyById,
    deleteReply,
};
