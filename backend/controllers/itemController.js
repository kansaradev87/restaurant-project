const Item = require('../models/Item');
const Category=require('../models/Category')

exports.display = async(req, res) => {
    try {
        const item = await Item.find().sort({createdAt: -1});
        res.json(item);
    } catch (error) {
        res.status(500).json({message: 'server error', error: error.message})
    }
}
exports.createItem = async(req, res) => {
    try {
        const {name, price, category} = req.body;
        
        // Validate required fields
        if(!name) {
            return res.status(400).json({message: "Name is required"});
        }
        if(price === undefined || price === null) {
            return res.status(400).json({message: "Price is required"});
        }
        if(!category) {
            return res.status(400).json({message: "Category is required"});
        }
        
        // First, find the category to get its name
        const categoryDoc = await Category.findById(category);
        if (!categoryDoc) {
            return res.status(400).json({message: "Category not found"});
        }
        
        // Check for existing item
        const existingItem = await Item.findOne({name, category});
        if (existingItem) {
            return res.status(400).json({message: `Item ${name} already exists in ${categoryDoc.name} category`});
        }

        // Create and save new item with all required fields
        const newItem = new Item({
            name, 
            price, 
            category
        });
        await newItem.save();

        return res.status(201).json({
            message: 'Item added successfully',
            item: newItem
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}