const Item = require('../models/Item');

exports.display= async(req,res)=>{
    return res.status(200).json({message:'api items working'})
}
