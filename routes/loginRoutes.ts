import express from "express";
import { authenticateUser, verifyLogin } from "../controllers/loginControllers";
const router = express.Router();

router.post("/", authenticateUser);

router.post("/verify_auto_login", verifyLogin);

export default router;
