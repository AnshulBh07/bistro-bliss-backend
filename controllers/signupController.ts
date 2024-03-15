import { Request, Response } from "express";
import md5 from "md5";
import Users from "../models/users";
import { IUser } from "../interfaces";

export const getUsername = async (req: Request, res: Response) => {
  try {
    const { username } = req.query;

    if (!username || typeof username !== "string") {
      res.status(400).send("Username not received or invalid!");
      return;
    }

    const userResult = await Users.findOne({ username: username });
    // console.log(userResult);

    if (userResult) {
      res.status(409).send("User already present.");
    } else {
      res.status(200).send("ok");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error!");
  }
};

export const insertNewUser = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, password, username } = req.body;

    const uname = username ? String(username) : "";
    const mailId = email ? String(email) : "";
    const FName = first_name ? String(first_name) : "";
    const LName = last_name ? String(last_name) : "";
    const pwd = password ? String(password) : "";

    if (
      uname === "" ||
      mailId === "" ||
      FName === "" ||
      LName === "" ||
      pwd === ""
    ) {
      res.send("Incomplete data").status(404);
      return;
    }

    const encrypted_pwd = md5(pwd);

    const newUserObj: IUser = {
      first_name: FName,
      last_name: LName,
      email_id: mailId,
      password: encrypted_pwd,
      username: uname,
      created_at: new Date(),
      updated_at: new Date(),
    };

    // console.log(newUserObj);

    // insert in database
    const newUser = new Users(newUserObj);
    await newUser.save();

    res.status(200).send("ok");
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
