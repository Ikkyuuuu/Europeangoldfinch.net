const express = require('express');
const { createReply, listRepliesByPost, listMyReplies, getReplyById, deleteReply } =
    require('../controllers/replyController');
const { authRequired } = require('../middleware/authRequired'); // ← fix import

const r = express.Router();
r.get('/posts/:postId/replies', listRepliesByPost);
r.get('/replies/:id', getReplyById);
r.get('/replies/me', authRequired, listMyReplies);
r.post('/replies', authRequired, createReply);
r.delete('/replies/:id', authRequired, deleteReply);

module.exports = r;