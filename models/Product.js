const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    title: { type: String, require: true, unique: true, maxlength: 60 },
    prices: { type: [Number], require: true },
    desc: { type: String, require: true, maxlength: 60 },
    img: { type: String, require: true },
    extraOptions: {
      type: [
        {
          extraName: { type: String, required: true },
          extraPrice: { type: Number, required: true },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
