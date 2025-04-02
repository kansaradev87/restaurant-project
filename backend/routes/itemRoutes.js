const express=require('express');
const router=express.Router();
const itemController=require('../controllers/itemController');

router.get('/',itemController.getAllItems);
router.post('/',itemController.createItem);
router.delete('/:name/:category',itemController.deleteItem);

module.exports=router