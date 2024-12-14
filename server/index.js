import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
const dbURL = process.env.DATABASE_URL;

app.use(cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);


app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`);
})

mongoose.connect(dbURL).then(()=>{console.log("Successfully connected Database")}).catch((err)=>{console.error("Caught an error: ", err.message)});