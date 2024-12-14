import express from "express";
import {signup} from "./../controllers/AuthController.js";
import {login} from "./../controllers/AuthController.js";
import { getUserInfo } from "./../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import {updateProfile} from "./../controllers/AuthController.js";

const authRoutes = express.Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/user-info",verifyToken, getUserInfo);
authRoutes.post("/update-profile",verifyToken,updateProfile )

export default authRoutes;