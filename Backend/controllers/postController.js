const { Post } = require('../models');

/**
 * POST /posts
 * Auth: Bearer <JWT>
 * Body: { topic?: string, detail: string }
 */
async function createPost(req, res, next) {
    try {
        const userId = req.auth?.sub;
        if (!userId) return res.status(401).json({ error: 'Unauthorized' });

        const { topic, detail } = req.body || {};
        if (!detail || String(detail).trim().length === 0) {
            return res.status(400).json({ error: 'detail is required' });
        }
        if (topic && String(topic).length > 255) {
            return res.status(400).json({ error: 'topic must be <= 255 chars' });
        }

        const post = await Post.create({
            user_id: userId,
            topic: topic || null,
            detail, // works whether column is 'detail' or mapped to 'body'
        });

        return res.status(201).json({
            id: post.id,
            user_id: post.user_id,
            topic: post.topic,
            detail: post.detail,
            created_at: post.createdAt ?? post.created_at,
            updated_at: post.updatedAt ?? post.updated_at,
        });
    } catch (err) {
        return next(err);
    }
}

/**
 * GET /posts
 * Auth: Bearer <JWT>
 * Returns only the authenticated user's posts (newest first)
 */
async function listMyPosts(req, res, next) {
    try {
        const userId = req.auth?.sub;
        if (!userId) return res.status(401).json({ error: 'Unauthorized' });

        const posts = await Post.findAll({
            where: { user_id: userId },
            order: [['createdAt', 'DESC']],
            attributes: ['id', 'user_id', 'topic', 'detail', 'createdAt', 'updatedAt'],
        });

        return res.json(posts.map(p => ({
            id: p.id,
            user_id: p.user_id,
            topic: p.topic,
            detail: p.detail,
            created_at: p.createdAt,
            updated_at: p.updatedAt,
        })));
    } catch (err) {
        return next(err);
    }
}

module.exports = { createPost, listMyPosts };
