const express = require('express');
const router=express.Router();
const categoryController= require('../controllers/categoryController');

//routes

router.get("/",categoryController.createCategory);


module.exports=router;