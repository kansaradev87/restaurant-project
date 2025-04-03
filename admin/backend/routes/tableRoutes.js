const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');


router.post('/', tableController.createTable);
router.get('/', tableController.getAllTables);
router.delete('/:tableId', tableController.deleteTable);
router.put('/:tableId', tableController.updateTable);
router.get('/:tableId/qrcode', tableController.generateQrCode);

module.exports = router;
