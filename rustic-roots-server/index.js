const express = require('express');
const cors = require('cors');
const { MongoClient,ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.csovo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.use(cors());
app.use(express.json());

async function run() {
  try {
    
    console.log("Successfully connected to MongoDB!");

    const foodCollection = client.db("foodDB").collection('foods');
    const orderCollection = client.db("foodDB").collection('food_order');

    // Delete an order by ID
    app.delete('/food-order/:orderId', async (req, res) => {
      const { orderId } = req.params;

      try {
        const result = await orderCollection.deleteOne({ _id: new ObjectId(orderId) });
        if (result.deletedCount === 1) {
          res.json({ message: 'Order deleted successfully' });
        } else {
          res.status(404).json({ message: 'Order not found' });
        }
      } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: 'Error deleting order' });
      }
    });

    // Fetch orders for a specific email
    app.get('/food-order', async (req, res) => {
      const email = req.query.email;
      try {
        const orders = await orderCollection.find({ applicant_email: email }).toArray();
        for (let order of orders) {
          const food = await foodCollection.findOne({ _id: new ObjectId(order.food_id) });
          if (food) {
            order.foodName = food.foodName;
            order.price = food.price;
            order.foodImage = food.foodImage || '/images/default-image.jpg';
          }
        }
        res.json(orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).send('Error fetching orders');
      }
    });

    
    // Place an order
    app.post('/food-order', async (req, res) => {
      const { food_id, applicant_email, foodName, price, quantity, totalPrice, buyingDate, foodImage } = req.body;

      
      if (!food_id || !applicant_email || !foodName || !price || !quantity || !totalPrice || !buyingDate || !foodImage) {
        return res.status(400).json({ message: 'All fields are required.' });
      }

      
      if (!ObjectId.isValid(food_id)) {
        return res.status(400).json({ message: 'Invalid food_id format.' });
      }

      
      if (isNaN(price) || isNaN(totalPrice) || isNaN(quantity)) {
        return res.status(400).json({ message: 'Price, totalPrice, and quantity must be valid numbers.' });
      }

      
      const food = await foodCollection.findOne({ _id: new ObjectId(food_id) });
      if (!food) {
        return res.status(404).json({ message: 'Food item not found.' });
      }

    
      if (food.quantity < quantity) {
        return res.status(400).json({ message: 'Not enough stock available.' });
      }

      
      const order = {
        food_id,
        applicant_email,
        foodName,
        price,
        quantity,
        totalPrice,
        buyingDate,
        foodImage,
        orderDate: new Date(),
      };

      try {
        const result = await orderCollection.insertOne(order);


        res.status(201).json({
          message: 'Order placed successfully',
          order: {
            _id: result.insertedId,
            foodName,
            quantity,
            totalPrice,
            buyingDate,
            foodImage
          }
        });
      } catch (error) {
        console.error('Error inserting order:', error);
        res.status(500).json({ message: 'Failed to place order', error: error.message });
      }
    });


    app.put('/foods/:id', async (req, res) => {
      const { id } = req.params;
      const updatedFood = req.body;
    
      
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid food ID' });
      }
    
    
      if (
        !updatedFood.foodName ||
        !updatedFood.foodImage ||
        !updatedFood.foodCategory ||
        !updatedFood.price ||
        !updatedFood.quantity
      ) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
    
      try {
        const result = await foodCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updatedFood }
        );
    
        if (result.matchedCount === 0) {
          return res.status(404).json({ message: 'Food item not found' });
        }
    
        if (result.modifiedCount === 0) {
          return res.status(304).json({ message: 'No changes made to the food item' });
        }
    
        res.status(200).json({
          message: 'Food item updated successfully',
          updatedFood,
        });
      } catch (error) {
        console.error('Error updating food:', error); 
        res.status(500).json({ message: 'Internal server error', error: error.message });
      }
    });
    
    
    


    // Update food stock
    app.patch('/foods/:id', async (req, res) => {
      const { id } = req.params;
      const { quantity } = req.body;

      try {
        const result = await foodCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { quantity } }
        );

        if (result.modifiedCount > 0) {
          res.status(200).json({ message: 'Food stock updated successfully' });
        } else {
          res.status(404).json({ message: 'Food item not found' });
        }
      } catch (error) {
        console.error('Error updating stock:', error);
        res.status(500).json({ message: 'Failed to update food stock', error: error.message });
      }
    });

    // Get all foods
    app.get('/foods', async (req, res) => {
      try {
        const { name = '' } = req.query; 

       
        const query = name ? { foodName: { $regex: name, $options: 'i' } } : {}; 

        
        const foods = await foodCollection.find(query).toArray();
        res.json(foods);
      } catch (err) {
        console.error('Error fetching foods:', err);
        res.status(500).json({ message: 'Error fetching foods' });
      }
    });

    

    app.get('/foods', async (req, res) => {
      const { email } = req.query; 
    
     
      if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }
    
   
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
    
      try {
      
        const query = { addedByEmail: email };
        const result = await foodCollection.find(query).toArray(); 
    
      
        if (result.length === 0) {
          return res.status(404).json({ message: 'No food items found for this user.' });
        }
    
       
        res.status(200).json(result);
      } catch (error) {
        console.error('Error fetching foods:', error);
        res.status(500).json({ message: 'Failed to fetch foods. Please try again later.' });
      }
    });
    
    






    // Add new food item
    app.post('/foods', async (req, res) => {
      const { foodName, foodImage, foodCategory, quantity, price, foodOrigin, description, addedByName, addedByEmail } = req.body;

      if (!foodName || !foodImage || !foodCategory || !quantity || !price || !foodOrigin || !description || !addedByName || !addedByEmail) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      if (isNaN(quantity) || isNaN(price)) {
        return res.status(400).json({ message: 'Invalid quantity or price' });
      }

      const foodItem = {
        foodName,
        foodImage,
        foodCategory,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        foodOrigin,
        description,
        addedByName,
        addedByEmail,
        addedAt: new Date(),
      };

      try {
        console.log('Received data:', foodItem);
        const result = await foodCollection.insertOne(foodItem);
        console.log('Inserted food item:', result);
        const insertedFood = result.ops ? result.ops[0] : result.insertedId;
        res.status(201).json({ message: 'Food item added successfully!', food: insertedFood });
      } catch (error) {
        console.error('Error inserting food item:', error);
        res.status(500).json({ message: 'Failed to add food item', error: error.message });
      }
    });



    // top selling

    app.get('/top-selling-foods', async (req, res) => {
      try {
        const topSellingFoods = await foodCollection
          .find()
          .sort({ purchaseCount: -1 })
          .limit(6)
          .toArray();

        if (topSellingFoods.length === 0) {
          return res.status(404).json({ message: 'No top-selling foods available' });
        }

        res.json(topSellingFoods);
      } catch (error) {
        console.error('Error fetching top-selling foods:', error);
        res.status(500).send({ message: 'Failed to fetch top-selling foods' });
      }
    });
    // foods details
    app.get('/foods/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await foodCollection.findOne(query);
      res.send(result)
    });


    // Delete food item
    app.delete('/foods/:id', async (req, res) => {
      const { id } = req.params;

      try {
        const result = await foodCollection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
          return res.status(404).json({ message: 'Food item not found' });
        }

        res.status(200).json({ message: 'Food item deleted successfully' });
      } catch (error) {
        console.error('Error deleting food item:', error);
        res.status(500).json({ message: 'Failed to delete food item', error: error.message });
      }
    });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally { }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
