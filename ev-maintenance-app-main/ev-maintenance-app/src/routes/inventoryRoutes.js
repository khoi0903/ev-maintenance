// src/routes/inventoryRoutes.js
const router = require('express').Router();
const c = require('../controllers/inventoryController');
const { auth } = require('../middlewares/authMiddleware');
const { role } = require('../middlewares/roleMiddleware');

const allow = (...roles) => [auth, role(...roles)];

router.get('/', allow('Admin', 'Staff'), c.listAll);
router.get('/low-stock', allow('Admin', 'Staff'), c.listLowStock);

module.exports = router;


