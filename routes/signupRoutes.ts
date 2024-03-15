import express from "express";
import { getUsername, insertNewUser } from "../controllers/signupController";
const router = express.Router();

router.get("/username", getUsername);

router.post("/", insertNewUser);

export default router;
