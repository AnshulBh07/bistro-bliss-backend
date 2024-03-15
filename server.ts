import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import HTML_TEMPLATE from "./mail/mail-template";
import { SENDMAIL } from "./mail/mail";
import mongoose from "mongoose";
import menuRoutes from "./routes/menuRoutes";
import signupRoutes from "./routes/signupRoutes";
import loginRoutes from "./routes/loginRoutes";
import { IBlogPost, IMenuItem } from "./interfaces";
import { promises as fsPromises } from "fs";
import Menu from "./models/menu";

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(ignoreFavicon);
const port = process.env.PORT || 3001;

let menuData: IMenuItem[], blogData: IBlogPost[];
const filePath1 = "services/bistro-bliss-db.Menu.json";
const filePath2 = "services/bistro-bliss-db.BlogPosts.json";

const readAndParseJSON = async () => {
  try {
    let rawData = await fsPromises.readFile(filePath1, "utf8");

    let jsonData = JSON.parse(rawData);

    menuData = jsonData;

    // we face an error because the date object we get is in the form created_at: { '$date': '2024-02-14T08:45:47.722Z' },
    // fixing that using map function
    menuData = menuData.map((item) => {
      const arrDate: Date[] = Object.values(item.created_at!);
      const arrID = Object.values(item._id);
      return { ...item, created_at: arrDate[0], _id: arrID[0] };
    });
    // console.log(menuData);

    rawData = await fsPromises.readFile(filePath2, "utf8");

    jsonData = JSON.parse(rawData);

    blogData = jsonData;
  } catch (err) {
    console.error(err);
  }
};

readAndParseJSON();

app.get("/", async (req: Request, res: Response) => {
  // let's populate database with all the initial data we have
  try {
    const menuCount = await Menu.countDocuments({});
    // console.log(menuCount);

    if (menuCount === 0) {
      menuData.forEach(async (item) => {
        const newItem = new Menu(item);
        await newItem.save();
      });
    }

    res.send("on the server").status(200);
  } catch (err) {
    console.error(err);
  }
});

function ignoreFavicon(req: Request, res: Response, next: NextFunction) {
  if (req.originalUrl.includes("favicon.ico")) {
    res.status(204).end();
  }
  next();
}

app.use("/menu", menuRoutes);

app.use("/signup", signupRoutes);

app.use("/login", loginRoutes);

app.post("/contact", async (req: Request, res: Response) => {
  const message = "Hi there, you were emailed me through nodemailer";
  const options = {
    from: "anshulbh009@gmail.com", // sender address
    to: "bhardwajanshul1000@gmail.com", // receiver email
    subject: "Send email in Node.JS with Nodemailer using Gmail account", // Subject line
    text: message,
    html: HTML_TEMPLATE(message),
  };

  try {
    await SENDMAIL(options);
    console.log("Email sent successfully");
    res.send("ok").status(200);
  } catch {
    res.send("failed").status(500);
  }
});

const main = async () => {
  try {
    await mongoose.connect(
      process.env.ATLAS_URI ||
        "mongodb+srv://anshulbh009:2009anshulAb@bistro-bliss-db.fkkjqto.mongodb.net/"
    );
    app.listen(port, () => console.log(`server started on port ${port}`));
  } catch (err) {
    console.error(err);
  }
};

main();

export default app;
