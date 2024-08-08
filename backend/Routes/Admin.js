const express = require("express");
const router = express.Router();
const FoodItem = require("../modals/FoodItems");
const FoodCategory = require("../modals/FoodCategory");
const multer = require('multer');
const path = require('path');
const User = require("../modals/User");
const Orders = require("../modals/Orders");



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.get("/getCategories", async (req, res) => {
    try {
        const categories = await FoodCategory.find();
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

router.post("/uploadFoodItem", upload.single("imageFile"), async (req, res) => {
    const { name, img, CategoryName, options, description } = req.body;

    try {
        let imageUrl = img;
        if (req.file) {
            imageUrl = `uploads/${req.file.filename}`;
        }

        const parsedOptions = [JSON.parse(options)];

        const categoryExists = await FoodCategory.findOne({ CategoryName });

        if (!categoryExists) {
            await new FoodCategory({ CategoryName }).save();
        }

        const newFoodItem = new FoodItem({
            name,
            img: imageUrl,
            CategoryName,
            options: parsedOptions,
            description
        });

        await newFoodItem.save();

        res.json({ success: true });
    } catch (error) {
        console.error("Error uploading food item:", error);
        res.status(500).send("Server Error");
    }
});

router.put('/foodItemUpdate/:id', upload.single('imageFile'), async (req, res) => {
    const { id } = req.params;
    const { name, img, CategoryName, options, description } = req.body;

    try {
        let imageUrl = img;
        if (req.file) {
            imageUrl = `uploads/${req.file.filename}`;
        }

        const parsedOptions = [JSON.parse(options)];

        const categoryExists = await FoodCategory.findOne({ CategoryName });

        if (!categoryExists) {
            await new FoodCategory({ CategoryName }).save();
        }

        const updatedFoodItem = await FoodItem.findByIdAndUpdate(
            id,
            {
                name,
                img: imageUrl,
                CategoryName,
                options: parsedOptions,
                description
            },
            { new: true }
        );

        if (!updatedFoodItem) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        res.json({ success: true, FoodItem: updatedFoodItem });
    } catch (error) {
        console.error("Error updating food item: ", error);
        res.status(500).send("Server Error");
    }
});

router.get("/adminOrders", async (req, res) => {
  try {
      const [users, orders] = await Promise.all([
          User.find(),
          Orders.find()
      ]);
      res.json({ users: users, orders: orders });
  } catch (error) {
      console.error("Error fetching users' orders data: ", error);
      res.status(500).send("Server Error");
  }
});

router.delete('/deleteItem/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deleteItem = await FoodItem.findByIdAndDelete(id);
      if (!deleteItem) {
        return res.status(404).send(`Item with ID ${id} not found`);
      }
      res.json({ message: 'Item deleted successfully!!!', deleteItem: deleteItem });
    } catch (error) {
      console.error("Error deleting item ", error);
      res.status(500).send("Server Error");
    }
  });
  

module.exports = router;