const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodItemSchema = new Schema({
    name: { type: String, required: true },
    img: { type: String },
    CategoryName: { type: String, required: true },
    options: {
        type: [{ 
          half: String,
          full: String,
          regular: String,
          medium: String,
          large: String,
          _id: false,
        }],
        required: true,
      },
    description: { type: String, required: true }
}, { collection: "food_items" });

module.exports = mongoose.model('FoodItem', FoodItemSchema);
