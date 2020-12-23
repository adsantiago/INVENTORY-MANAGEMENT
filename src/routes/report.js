const express = require('express');
const router = express.Router();

const reportController = require('../controllers/reportController');

// Reports petitions
router.get('/', reportController.list_report);
router.post('/add', reportController.save);
router.get('/update/:id', reportController.edit);
router.get('/delete/:id', reportController.delete);
router.post('/update/:id', reportController.update);

// Inventory petitions
router.get('/inventory/:id', reportController.inventory);
router.get('/inventory/:id/update/:id', reportController.edit_product);
router.post('/inventory/:id/add_product', reportController.add_product);
router.post('/inventory/:id/update_product/:id', reportController.update_product);
router.get('/inventory/:id/delete_product/:id', reportController.delete_product);

module.exports = router;