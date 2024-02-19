import { ObjectId } from "mongodb";

// data definition for menu items
export interface IMenuItem {
  _id: ObjectId;
  title: string;
  category: string[];
  price: number;
  discount: number | null;
  description: string | null;
  image: string;
  rating: number;
  delivery_type: "fast" | "regular";
  cuisines: string[];
  veg: boolean;
  offer: string | null;
  available: boolean;
  created_at: Date;
  updated_at: Date;
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
