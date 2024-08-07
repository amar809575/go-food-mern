const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodCategorySchema = new Schema({
    CategoryName: { type: String, required: true }
}, { collection: "foodCategory" });

module.exports = mongoose.model('FoodCategory', FoodCategorySchema);
