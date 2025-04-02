const Item = require('../models/Item');
const Category=require('../models/Category')

exports.getAllItems = async(req, res) => {
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
        
        //  finding the category name bi id
        const categoryDoc = await Category.findById(category);
        if (!categoryDoc) {
            return res.status(400).json({message: "Category not found"});
        }
        
        // checking for existing item
        const existingItem = await Item.findOne({name, category});
        if (existingItem) {
            return res.status(400).json({message: `Item ${name} already exists in ${categoryDoc.name} category`});
        }

        // creating and saving new item with all required fields
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

exports.deleteItem = async (req, res) => {
    try {
        const { name, category } = req.params;

        // finding by name
        const categoryDoc = await Category.findOne({ name: category });
        if (!categoryDoc) {
            return res.status(404).json({ message: `Category ${category} not found` });
        }

        // finding and deleting item
        const deleteItem = await Item.findOneAndDelete({ name, category: categoryDoc._id });

        if (!deleteItem) {
            return res.status(404).json({ message: `Item ${name} not found in category ${category}` });
        }

        res.status(200).json({ message: `Item ${name} from category ${category} deleted successfully` });

    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message });
    }
};
