// Login: When the user logs in successfully, you issue both an access JWT and a refresh JWT. The access JWT has a shorter expiration time (e.g., a few minutes), while the refresh JWT has a longer expiration time (e.g., several days).

// Subsequent Requests: For subsequent requests to protected endpoints, the client includes the access JWT in the request headers.

// Access Token Expiry: When the server receives a request with an access JWT, it verifies the token's signature and checks if it has expired. If the access token is expired, the server checks if there's a valid refresh token associated with the user.

// Refresh Token Renewal: If a valid refresh token is available, the server uses it to generate a new access token and sends it back to the client. The client can then use the new access token for subsequent requests.

// No Refresh Token or Invalid Refresh Token: If there's no refresh token available (e.g., because the user logged out or the refresh token expired), or if the refresh token is invalid, the server responds with a 401 Unauthorized status code. The client interprets this response as an indication that the user needs to log in again.

// User Re-authentication: When the client receives a 401 response, it prompts the user to log in again by redirecting them to the login page or displaying a login form.

import { Request, Response } from "express";
import Users from "../models/users";
import md5 from "md5";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticateUser = async (req: Request, res: Response) => {
  try {
    // we will find the user from email and password, then check if the received password matches password in db
    // if the password matches , generate a jwt and send to client
    // console.log(req.body);
    const { email, password, remember } = req.body;

    if (
      email === "" ||
      typeof email !== "string" ||
      password === "" ||
      typeof password !== "string"
    ) {
      res.status(404).send("Invalid inputs..");
      return;
    }

    // retrieve by email
    const user = await Users.findOne({ email_id: email });
    // console.log(user);

    if (user !== null) {
      const encrypted_pwd = md5(password);

      // if password doesn't match
      if (user.password !== encrypted_pwd) {
        res.status(404).send("Incorrect Password!");
        return;
      }

      //   form a web token to send back to user
      const payload = {
        user_id: user._id,
        username: user.username,
      };

      //   first generate access token
      // generate a strong encrypted key to sign your json token with
      const access_secretKey =
        process.env.JWT_ACCESS_SECRET_KEY ||
        "sd5totbvxgDcB3eUE/m7+Nij9/Zpv2F+g0a3+RHO/08="; //convert key to base64 which is jwt acceptable format

      const access_token = jwt.sign(payload, access_secretKey, {
        expiresIn: "1h",
      }); //sign token with secretKey

      //   now generate a refresh token for in case if access token expires we regenerate them
      const refresh_secretKey =
        process.env.JWT_REFRESH_SECRET_KEY ||
        "DecR9LXS7XStfvgPsu0yQjSIIdW26K9ux+suEgDaXc0=";

      const refresh_token = jwt.sign(payload, refresh_secretKey, {
        expiresIn: "7d",
      });

      // if the remember me functionality is enabled we will also generate a persistent token, for auto login
      // use the same key as access token
      let persistent_token;

      // console.log(Boolean(remember));

      if (Boolean(remember) === true) {
        const persistent_secretKey =
          process.env.JWT_ACCESS_SECRET_KEY ||
          "sd5totbvxgDcB3eUE/m7+Nij9/Zpv2F+g0a3+RHO/08=";

        persistent_token = jwt.sign(payload, persistent_secretKey, {
          expiresIn: "90d",
        });
      }

      //   send to client
      res.status(200).send({
        access_token: access_token,
        refresh_token: refresh_token,
        persistent_token: persistent_token,
      });
    } else {
      res.status(404).send("User not found! Please register.");
    }
  } catch (err) {
    res.status(500).send("Internal server error...");
    console.error(err);
  }
};

export const verifyLogin = async (req: Request, res: Response) => {
  // we verify persistent token here
  try {
    const { token } = req.body;

    if (token === "" || typeof token !== "string") {
      res.status(401).send("Invalid token, please login again.");
      return;
    }

    const secretKey =
      process.env.JWT_ACCESS_SECRET_KEY ||
      "sd5totbvxgDcB3eUE/m7+Nij9/Zpv2F+g0a3+RHO/08=";

    try {
      const decoded = jwt.verify(String(token), secretKey, {
        complete: true,
      }) as JwtPayload;

      // if no error occurs token has been verified and successfully decoded,
      // we do two checks further, first for expiration and second we successfully
      // login the user and generate a new access token & refresh token to be inserted in
      // session storage
      const expirationTime = decoded.payload.exp;

      // get curr time in seconds
      const currTime = Math.floor(Date.now() / 1000);

      if (expirationTime && currTime > expirationTime) {
        res.status(401).send("Invalid token, please login again.");
        return;
      }

      // token hasn't expired so we continue and generate tokens and send
      const { user_id, username } = decoded.payload;

      const payload = { user_id: user_id, username: username };

      const access_secretKey =
        process.env.JWT_ACCESS_SECRET_KEY ||
        "sd5totbvxgDcB3eUE/m7+Nij9/Zpv2F+g0a3+RHO/08="; //convert key to base64 which is jwt acceptable format

      const access_token = jwt.sign(payload, access_secretKey, {
        expiresIn: "1h",
      }); //sign token with secretKey

      //   now generate a refresh token for in case if access token expires we regenerate them
      const refresh_secretKey =
        process.env.JWT_REFRESH_SECRET_KEY ||
        "DecR9LXS7XStfvgPsu0yQjSIIdW26K9ux+suEgDaXc0=";

      const refresh_token = jwt.sign(payload, refresh_secretKey, {
        expiresIn: "7d",
      });

      res.status(200).send({
        access_token: access_token,
        refresh_token: refresh_token,
        persistent_token: token,
      });
    } catch (err) {
      res.status(401).send("Invalid token, please login again.");
    }
  } catch (err) {
    res.status(500).send("Internal server error...");
    console.error(err);
  }
};
