import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  address_lin1: { type: String, required: true },
  address_line2: { type: String },
  zipcode: { type: Number, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  phone_number: { type: String },
  type: { type: String },
  created_at: { type: Date },
  updated_at: { type: Date },
});

const Address = mongoose.model("Address", AddressSchema);

export default Address;
