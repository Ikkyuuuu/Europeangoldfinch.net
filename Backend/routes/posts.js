const { Router } = require('express');
const { createPost, listMyPosts } = require('../controllers/postController');
const { authRequired } = require('../middleware/authRequired');

const router = Router();

router.post('/', authRequired, createPost);
router.get('/', authRequired, listMyPosts);

module.exports = router;
