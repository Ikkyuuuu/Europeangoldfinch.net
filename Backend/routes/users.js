const { Router } = require('express');
const { createUser } = require('../controllers/userController');

const router = Router();

// TEMP debug to verify Postman body arrives correctly
router.post('/', (req, res, next) => {
    console.log('[DEBUG] /users body:', req.body, 'content-type:', req.headers['content-type']);
    return createUser(req, res, next);
});

module.exports = router;
