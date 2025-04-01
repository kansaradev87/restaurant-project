const mongoose=require('mongoose');

const Category = require('./Category');

const itemSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    price:{
        type:Number,
        required:true,
        min:0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'Category',  
        required: true,
    }
});
module.exports=mongoose.model('Item',itemSchema);