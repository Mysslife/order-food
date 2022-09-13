import dbConnect from "../../../util/mongo";
import Order from "../../../models/Order";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  // GET ALL ORDERS:
  if (method === "GET") {
    try {
      const orders = await Order.find();
      return res.status(200).json(orders);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  // PAY ONE ORDER:
  if (method === "POST") {
    try {
      const order = await Order.create(req.body);
      return res.status(201).json(order);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}
