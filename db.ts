import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let dbConnection: any;

export const connectToDb = (cb: (err?: any) => void) => {
  MongoClient.connect(process.env.ATLAS_URI!)
    .then((client: MongoClient) => {
      dbConnection = client.db("bistro-bliss-db");
      return cb();
    })
    .catch((err) => {
      console.log(err);
      return cb(err);
    });
};

export const getDb = () => dbConnection;
