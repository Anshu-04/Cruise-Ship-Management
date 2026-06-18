import mongoose from "mongoose";

const cateringItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const CateringItem = mongoose.model("CateringItem", cateringItemSchema);
export default CateringItem;
