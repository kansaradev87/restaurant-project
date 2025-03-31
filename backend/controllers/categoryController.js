const Table = require('../models/Category');

exports.createCategory = async (req,res)=>{
    return res.status(200).json({message:"api category running"})
}
