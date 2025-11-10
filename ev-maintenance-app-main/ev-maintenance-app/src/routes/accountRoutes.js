const router = require('express').Router();
const { auth } = require('../middlewares/authMiddleware');
const { requireRoles } = require('../middlewares/roleMiddleware');
const accountController = require('../controllers/accountController');

// Authenticated routes
router.use(auth);

router.get('/me', accountController.getMe);
router.put('/me', accountController.updateMe);

// Admin only
router.use(requireRoles('Admin'));

router.get('/', accountController.getAll);
router.post('/', accountController.createAccount);
router.put('/:id', accountController.updateAccount);
router.post('/:id/reset-password', accountController.resetPassword);

module.exports = router;
