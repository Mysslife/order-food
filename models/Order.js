const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    customer: { type: String, require: true, maxlength: 60 },
    address: { type: String, require: true },
    total: { type: Number, require: true },
    status: { type: Number, default: 0 },
    method: { type: Number, require: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
