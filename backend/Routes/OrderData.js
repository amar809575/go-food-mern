const express = require('express');
const Order = require('../modals/Orders');
const User = require('../modals/User');
const router = express.Router();



router.post('/orderData', async (req, res) => {
    try {
        const orderDate = req.body.order_date;
        const orderData = req.body.order_data;

        const orderArray = [{ Order_date: orderDate}, ...orderData];

        let existingUser = await Order.findOne({ email: req.body.email });

        if (!existingUser) {
            await Order.create({
                email: req.body.email,
                order_data: [orderArray]
            });
        } else {
            existingUser.order_data.push(orderArray);
            await existingUser.save();
        }

        res.json({ success: true });
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).send("Server Error: " + error.message);
    }
});

router.post('/myOrderData', async (req, res) => {
    try {
        let myData = await Order.findOne({'email': req.body.email});
        res.json(myData);
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).send("Server Error: " + error.message);
    }
});




module.exports = router;