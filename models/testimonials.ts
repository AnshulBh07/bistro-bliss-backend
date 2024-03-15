import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TestimonialSchema = new Schema({
  rating: { type: Number, required: true },
  quote: { type: String, required: true },
  description: { type: String },
  created_at: { type: Date },
  updated_at: { type: Date },
});

const Testimonial = mongoose.model("Testimonial", TestimonialSchema);

export default Testimonial;
