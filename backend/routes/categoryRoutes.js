const express = require('express');
const router=express.Router();
const categoryController= require('../controllers/categoryController');

//routes

router.post("/",categoryController.createCategory);
router.get("/",categoryController.getAllCategories);
router.get('/:name',categoryController.getOneCategory);
router.delete('/:name',categoryController.deleteCategory);
router.put("/",categoryController.updateCategory);


module.exports=router;