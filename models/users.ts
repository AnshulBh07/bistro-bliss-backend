import mongoose from "mongoose";
import Address from "./address";
import Testimonial from "./testimonials";
import Cart from "./cart";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String },
  email_id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  addresses: { type: [Address.schema] },
  testimonials: { type: [Testimonial.schema] },
  cart: { type: Cart.schema }, //each user has only one cart associated
  created_at: { type: Date },
  updated_at: { type: Date },
});

const Users = mongoose.model("Users", UserSchema);

export default Users;
