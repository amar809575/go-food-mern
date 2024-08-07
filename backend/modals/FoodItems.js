const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodItemSchema = new Schema({
    name: { type: String, required: true },
    img: { type: String },
    CategoryName: { type: String, required: true },
    options: {
        half: { type: String },
        full: { type: String },
        regular: { type: String },
        medium: { type: String },
        large: { type: String }
    },
    description: { type: String, required: true }
}, { collection: "food_items" });

module.exports = mongoose.model('FoodItem', FoodItemSchema);
