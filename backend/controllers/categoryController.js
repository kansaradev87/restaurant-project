const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "name is required" });
        }

        const existingCategory = await Category.findOne({ name: { $regex: new RegExp("^" + name + "$", "i") } });
        if (existingCategory) {
            return res.status(400).json({ message: `category ${name} already exists.` });
        }

        const newCategory = new Category({ name:name.toLowerCase() });
        await newCategory.save();

        return res.status(201).json({
            message: "category added successfully",
            category: newCategory
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "internal server Error", error: error.message });
    }

}

exports.getAllCategories =async(req,res)=>{
    try {
        const category=await Category.find().sort({createdAt:-1});
        res.json(category);
    } catch (error) {
        res.status(500).json({message:"server error",error:error.message})
    }
}

exports.getOneCategory= async(req,res)=>{
    const {name} = req.params;
    try {
        const oneCategory=await Category.findOne({name});
        
    if (!oneCategory) {
        return res.status(404).json({ message: `Category '${name}' not found` });
    }

    res.json(oneCategory);
    } catch (error) {
    res.status(500).json({ message: "Server error",error: error.message });
    }

}

exports.deleteCategory=async(req,res)=>{
    try {
        const{name}=req.params;
        const deleteCategory=await Category.findOne({name});
        if(!deleteCategory){
            return res.status(404).json({message:`category ${name} not found`})
        }

        await Category.deleteOne({name});
        res.status(200).json({message:`category ${deleteCategory} deleted successfully`});

    } catch (error) {
        res.status(500).json({message:"server error",error:error.message});
    }
}

exports.updateCategory=async(req,res)=>{
    try {
        const{currentName,newName}=req.body;

        if(!currentName){
            return res.status(400).json({message:`category ${currentName} is reuired`})
        }

        const existingCategory= await Category.findOne({name:currentName});
        if(!existingCategory){
            return res.status(400).json({message:`category ${existingCategory} not found`});
        }

        if(newName!==currentName){
            const nameConflict = await Category.findOne({name:newName});
            if(nameConflict){
                return res.status(400).json({message:`category with ${newName} already exists`});

            }
        }

        existingCategory.name=newName;
        await existingCategory.save();

        res.status(200).json({message:"category name updated successfully",catgeory:existingCategory});
        

    } catch (error) {
        res.status(200).josn({message:'server Error',error:error.message});
    }
};