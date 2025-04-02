const express=require('express');
const router=express.Router();
const itemController=require('../controllers/itemController');

router.get('/',itemController.display);
router.post('/',itemController.createItem);

module.exports=router