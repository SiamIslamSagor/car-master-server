const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.e9we0w0.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    /////////////////////////////////////
    //           all collection        //
    /////////////////////////////////////

    const brandsCollection = client.db("carMasterDB").collection("brands");

    const cartItemCollection = client
      .db("carMasterDB")
      .collection("cart_items");

    const toyotaCollection = client
      .db("carMasterDB")
      .collection("toyota_products");

    const lamborghiniCollection = client
      .db("carMasterDB")
      .collection("lamborghini_products");

    const bmwCollection = client.db("carMasterDB").collection("bmw_products");

    const mercedesCollection = client
      .db("carMasterDB")
      .collection("mercedes_products");

    const teslaCollection = client
      .db("carMasterDB")
      .collection("tesla_products");

    const hondaCollection = client
      .db("carMasterDB")
      .collection("honda_products");

    app.get("/", async (req, res) => {
      const cursor = brandsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    /////////////////////////////////////
    //           product api           //
    /////////////////////////////////////

    //////////// for toyota
    app.get("/toyota_products", async (req, res) => {
      const cursor = toyotaCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // to read single data
    app.get("/toyota_products/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await toyotaCollection.findOne(query);
      res.send(result);
    });

    ////////////for lamborghini
    app.get("/lamborghini_products", async (req, res) => {
      const cursor = lamborghiniCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // to read single data
    app.get("/lamborghini_products/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await lamborghiniCollection.findOne(query);
      res.send(result);
    });

    ////////////for bmw
    app.get("/bmw_products", async (req, res) => {
      const cursor = bmwCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // to read single data
    app.get("/bmw_products/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await bmwCollection.findOne(query);
      res.send(result);
    });

    ////////////for mercedes
    app.get("/mercedes_products", async (req, res) => {
      const cursor = mercedesCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // to read single data
    app.get("/mercedes_products/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await mercedesCollection.findOne(query);
      res.send(result);
    });

    ////////////for tesla
    app.get("/tesla_products", async (req, res) => {
      const cursor = teslaCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // to read single data
    app.get("/tesla_products/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await teslaCollection.findOne(query);
      res.send(result);
    });

    ////////////for honda
    app.get("/honda_products", async (req, res) => {
      const cursor = hondaCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // to read single data
    app.get("/honda_products/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await hondaCollection.findOne(query);
      res.send(result);
    });

    /////////////////////////////////////
    //           Cart api              //
    /////////////////////////////////////

    /* app.post("/cart_item", async (req, res) => {
      const data = req.body;
      console.log(data);
      const result = await cartItemCollection.insertOne(data);
      res.send(result);
    }); */

    // to read a item in cart
    app.get("/cart_items", async (req, res) => {
      const cursor = cartItemCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // to insert a item in cart
    app.post("/cart_items", async (req, res) => {
      const data = req.body;
      console.log(data);
      const result = await cartItemCollection.insertOne(data);
      res.send(result);
    });

    // to delete a item in cart
    app.delete("/cart_items/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await cartItemCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Car Master Server Running Now on Port: ${port}`);
});
