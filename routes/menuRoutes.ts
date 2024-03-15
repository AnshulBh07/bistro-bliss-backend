import express from "express";
import { getAllMenu } from "../controllers/menuControllers";
const router = express.Router();

router.get("/", getAllMenu);

export default router;
