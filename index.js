const { MongoClient, ServerApiVersion } = require("mongodb");
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

const brands = [
  {
    _id: 1,
    brand_img: "https://i.ibb.co/hBCHPN8/toyote-logo.jpg",
    brand_title: "Toyota: Driven by Innovation, Committed to Sustainability",
    brand_description:
      "Experience the future of mobility with Toyota, where cutting-edge innovation meets a steadfast commitment to environmental sustainability. Explore a world of automotive excellence that's shaping a greener, more exciting tomorrow.",
    product_brand: "toyota_products",
  },
  {
    _id: 2,
    brand_img: "https://i.ibb.co/qgGX8Jc/lamborghini-logo.jpg",
    brand_title: "Lamborghini: Where Dreams Ignite and Engines Roar",
    brand_description:
      "Lamborghini, the epitome of exotic elegance, ignites your wildest dreams with cars that embody art, passion, and unbridled power. Dive into the realm of automotive fantasies, where roaring engines set hearts on fire.",
    product_brand: "lamborghini_products",
  },
  {
    _id: 3,
    brand_img: "https://i.ibb.co/3F1CCxy/bmw-logo.jpgg",
    brand_title: "BMW: Beyond Performance, It's a Lifestyle",
    brand_description:
      "Beyond mere cars, BMW represents a lifestyle of exhilarating performance, unrivaled luxury, and enduring quality. Step into a world where driving isn't just a necessity but a profound experience.",
    product_brand: "bmw_products",
  },
  {
    _id: 4,
    brand_img: "https://i.ibb.co/3zBwxn9/mercedes-logo.jpg",
    brand_title: "Mercedes-Benz: The Art of Luxury in Motion",
    brand_description:
      "Mercedes-Benz epitomizes the art of luxury on wheels, where every detail exudes opulence and sophistication. Immerse yourself in a world where automotive design and engineering reach new heights of elegance.",
    product_brand: "mercedes-benz_products",
  },
  {
    _id: 5,
    brand_img: "https://i.ibb.co/wBPwCNv/tesla-logo.jpg",
    brand_title: "Tesla: Leading the Charge to an Electrifying Future",
    brand_description:
      "Join Tesla in leading the charge towards a sustainable and electrifying future. With cutting-edge electric vehicles, Tesla is rewriting the rules of driving and reshaping the automotive landscape.",
    product_brand: "tesla_products",
  },
  {
    _id: 6,
    brand_img: "https://i.ibb.co/y4pwDTV/honda-logo.jpg",
    brand_title: "Honda: Engineering Excellence for Every Journey",
    brand_description:
      "Honda's legacy of engineering excellence is designed to make every journey memorable. Discover a brand that combines reliability, efficiency, and innovation to enhance your everyday adventures.",
    product_brand: "honda_products",
  },
];

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

app.get("/", (req, res) => {
  res.send(brands);
});

app.listen(port, () => {
  console.log(`Car Master Server Running Now on Port: ${port}`);
});
