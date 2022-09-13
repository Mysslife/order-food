import dbConnect from "../../../util/mongo";
import Order from "../../../models/Order";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  // GET A ORDER:
  if (method === "GET") {
    try {
      const order = await Order.findById(id);
      return res.status(200).json(order);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  // UPDATE A ORDER:
  if (method === "PUT") {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.status(200).json(updatedOrder);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  //   if (method === "DELETE") {
  //     try {
  //       const product = await Product.findById(id);
  //       return res.status(200).json(product);
  //     } catch (err) {
  //       return res.status(500).json(err);
  //     }
  //   }
}
