const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://goFood:Amar%409812@cluster0.kedm2oy.mongodb.net/gofoodmern";

<<<<<<< HEAD
const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connection to MongoDB successful');

        const fetched_data = await mongoose.connection.db.collection("food_items");
        const data = await fetched_data.find({}).toArray();
        
=======

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, {});

        console.log('Connection successfully');

        const fetched_data = await mongoose.connection.db.collection("food_items");
        console.log('Collection:', fetched_data.collectionName);

        const data = await fetched_data.find({}).toArray();

>>>>>>> origin/master
        const foodCategory = await mongoose.connection.db.collection("foodCategory");
        const catData = await foodCategory.find({}).toArray();

        global.food_items = data;
        global.foodCategory = catData;
<<<<<<< HEAD
=======
 

        console.log('Fetched data count:', data.length);
        console.log('Fetched data count:', catData.length);
        // console.log('Fetched data:', data);
>>>>>>> origin/master

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
<<<<<<< HEAD
};
=======
}
>>>>>>> origin/master

module.exports = mongoDB;
