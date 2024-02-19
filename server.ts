import express, { NextFunction, Request, Response, query } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { IMenuItem, paramsObjectType } from "./interfaces";
import { connectToDb, getDb } from "./db";
import { filterResults } from "./services/filterResults";

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(ignoreFavicon);
const port = process.env.PORT || 3001;

let db: any;

// first get connect to db and get db
connectToDb((err) => {
  // if no error occurs then a successful connection
  if (!err) {
    db = getDb();

    // console.log(db);
  } else console.error;
});

app.get("/", (req: Request, res: Response) => {
  res.send("on the server").status(200);
});

function ignoreFavicon(req: Request, res: Response, next: NextFunction) {
  if (req.originalUrl.includes("favicon.ico")) {
    res.status(204).end();
  }
  next();
}

app.get("/menu_items", async (req: Request, res: Response) => {
  const { page, paramsObject } = req.query;
  let paramsObj: paramsObjectType, pageNum: number;

  if (!page) res.send("page number not available").status(500);

  pageNum = Number(page);

  if (paramsObject) paramsObj = JSON.parse(String(paramsObject));

  try {
    let query = {};
    // the data received is in it's original form but the data when sent is converted to
    // json so we will only define the type for results when fetched at the server
    // this definition will change at client side
    let results: IMenuItem[] = await db
      .collection("Menu")
      .find(query)
      .sort({ title: 1 })
      .toArray(); //this here returns a cursor/ iterator, iterate it and push stuff to array

    // now let us filter this data
    if (paramsObject) results = filterResults(results, paramsObj!);

    // apply pagination
    if (page) results = results.slice(8 * pageNum, 8 * pageNum + 8);

    res.send(results).status(200);
  } catch (err) {
    res.send(err).status(400);
  }
});

app.listen(port, () => console.log(`server started on port ${port}`));

export default app;
