const { Router } = require('express');
const { createPost, listAllPosts, listMyPosts, getPostById } = require('../controllers/postController');
const { authRequired } = require('../middleware/authRequired');

const router = Router();

// Order matters: keep '/me' above '/:id'
router.get('/', listAllPosts);                 // public: list all
router.get('/me', authRequired, listMyPosts);  // authed: my posts
router.get('/:id', getPostById);               // public: specific post
router.post('/', authRequired, createPost);    // authed: create

module.exports = router;
