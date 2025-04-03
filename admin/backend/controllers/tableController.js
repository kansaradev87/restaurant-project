const Table = require('../models/Table');

//create a table
exports.createTable= async (req,res)=>{
    try {
        //before table creation its name and quantity must be provided
        const {name,capacity}=req.body;
        if(!name || !capacity){
            return res.status(400).json({message:'name and quantity are required to create a new table'})
        }

        //checking if table with same name exists
        const existingTable=await Table.findOne({name});
        if(existingTable){
            return res.status(400).json({message:`table with name ${name} already exists. Try a new table name`})
        }

        //creating new table 
        const newTable= new Table({name,capacity}); //new table creation
        await newTable.save(); //saving new table to the collection

        res.status(201).json({
            message:"table added successfully",
            table: newTable
        });
    } catch (error) {
        console.log("error",error);
        res.status(500).json({message:"internal server error", error: error.message});
        
    };
}

//display table
exports.getAllTables = async (req,res)=>{
    try {
        const tables = await Table.find().sort({createdAt: -1});
        res.json(tables);
    } catch (error) {
        res.status(500).json({message:"server error",error: error.message})
    }
}

//delete table
exports.deleteTable= async (req,res)=>{
    try {
        //checking if table exists
        const{name}=req.params;
        const deleteTable =await Table.findOne({name});
        if(!deleteTable){
            return res.status(404).json({message:`table ${deleteTable} not found`})
        }
        //deleting a table

        await Table.deleteOne({name});
        res.status(200).json({message:`successfully delete ${name} table`});

    } catch (error) {
        res.status(500).json({message:"server error",error:error.message})
    }
};

//update table

exports.updateTable = async (req,res)=>{
    try {
        const {currentName,newName,capacity}=req.body;

        //checking if table name is given or not
        if(!currentName){
            return res.status(400).json({message:`table ${currentName} is required`})
        }

        //finding table
        const existingTable= await Table.findOne({name:currentName});
        if(!existingTable){
            return res.status(400).json({message:`table ${existingTable} not found`});
        }

        //check if new name conflicts with another table name
        if(newName!== currentName){
            const nameConflict = await Table.findOne({name:newName});
            if(nameConflict){
                return res.status(400).json({message:`table with ${newName} already exists`})
            }
        }

        //updating the table

        existingTable.name=newName||name;
        if(capacity!==undefined){
            existingTable.capacity=capacity;
        }

        await existingTable.save();

        res.status(200).json({message:"table name updated successfully",
            table:existingTable});
    } catch (error) {
        res.status(500).json({message:"server error",error:error.message});
        console.log(error)
    }
};