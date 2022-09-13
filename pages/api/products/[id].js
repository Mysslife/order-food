import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
    cookies,
  } = req;

  const token = cookies.pizzaToken;

  dbConnect();

  // GET A PRODUCT:
  if (method === "GET") {
    try {
      const product = await Product.findById(id);
      return res.status(200).json(product);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  // DELETE A PRODUCT:
  if (method === "DELETE") {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json("You are not authenticated!");
    }
    try {
      await Product.findByIdAndDelete(id);
      return res.status(200).json("Deleted successfully!");
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  // UPDATE A PRODUCT:
  if (method === "PUT") {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json("You are not authenticated!");
    }
    try {
      const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.status(200).json(product);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}
