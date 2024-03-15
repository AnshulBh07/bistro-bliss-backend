import mongoose from "mongoose";
import Menu from "./menu";
const Schema = mongoose.Schema;

const CartItemSchema = new Schema({
  item: { type: Menu.schema, required: true },
  quantity: { type: Number, required: true },
});

const CartSchema = new Schema({
  items: { type: [CartItemSchema] },
  status: { type: String, required: true },
  created_at: { type: Date },
  updated_at: { type: Date },
});

const Cart = mongoose.model("Cart", CartSchema);

export default Cart;
