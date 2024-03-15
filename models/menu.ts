import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
  title: { type: String, required: true },
  category: { type: [String] },
  price: { type: Number, required: true },
  discount: { type: Number },
  description: { type: String },
  image: { type: String, required: true },
  rating: { type: Number, required: true },
  delivery_type: { type: String, enum: ["fast", "regular"], required: true },
  cuisines: { type: [String] },
  veg: { type: Boolean, required: true },
  offer: { type: String },
  available: { type: Boolean, required: true },
  created_at: { type: Date },
  updated_at: { type: Date },
});

const Menu = mongoose.model("Menu", MenuSchema);

export default Menu;
