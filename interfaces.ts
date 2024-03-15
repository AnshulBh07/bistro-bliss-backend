import { ObjectId } from "mongodb";

// data definition for menu items
export interface IMenuItem {
  _id: ObjectId;
  title: string;
  category: string[];
  price: number;
  discount?: number | null;
  description?: string | null;
  image: string;
  rating: number;
  delivery_type: "fast" | "regular";
  cuisines: string[];
  veg: boolean;
  offer?: string | null;
  available: boolean;
  created_at?: Date | null;
  updated_at?: Date | null;
}

export type paramsObjectType = {
  sort: string | null;
  delivery: "fast" | "regular" | null;
  cuisines: string[] | null;
  explore: string[] | null;
  rating: number | null;
  veg: boolean | null;
  offer: string[] | null;
  cost: string | null;
  type: string | null;
  keyword: string | null;
};

export interface ISubtopic {
  heading: string;
  info: string;
  picture: string | null;
}

export interface IPost {
  title: string;
  main_picture: string;
  intro: string;
  subtopics: ISubtopic[];
  created_at: Date;
  updated_at: Date;
}

export interface IBlogPost {
  _id?: ObjectId;
  author_first_name: string;
  author_last_name: string | null;
  author_profile_pic: string | null;
  author_about: string | null;
  posts: IPost[];
  created_at: Date;
  updated_at: Date;
}

export interface IAddress {
  address_line1: string;
  address_line2?: string | null;
  zipcode: number;
  city: string;
  state: string;
  country: string;
  phone_number?: string | null;
  type?: string | null;
  created_at?: Date | null;
  updated_at?: Date | null;
}

export interface ITestimonial {
  rating: number;
  quote: number;
  description?: string | null;
  created_at?: Date | null;
  updated_at?: Date | null;
}

interface ICartItem {
  item: IMenuItem;
  quantity: number;
}

export interface ICart {
  items: ICartItem[];
  status: string;
  created_at?: Date | null;
  updated_at?: Date | null;
}

export interface IUser {
  first_name: string;
  last_name?: string | null;
  email_id: string;
  username: string;
  password: string;
  address?: IAddress[];
  testimonials?: ITestimonial[];
  cart?: ICart | null;
  created_at?: Date | null;
  updated_at?: Date | null;
}
