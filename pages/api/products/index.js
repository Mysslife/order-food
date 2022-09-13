import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  const { method, cookies } = req;

  const token = cookies.pizzaToken;

  dbConnect();

  // GET ALL PRODUCTS:
  if (method === "GET") {
    try {
      const products = await Product.find();
      return res.status(200).json(products);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  // CREATE A PRODUCT:
  if (method === "POST") {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json("You are not authenticated!");
    }
    const newPizza = new Product(req.body);
    try {
      const savedNewPizza = await newPizza.save();
      return res.status(200).json(savedNewPizza);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}
