const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');

// Table routes
router.post('/', tableController.createTable);
router.get('/',tableController.getAllTables);
router.delete('/:name',tableController.deleteTable);
router.put('/',tableController.updateTable)

module.exports=router;