import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";
import contactRoutes from "./routes/ContactsRoutes.js";
import messagesRoutes from "./routes/MessagesRoutes.js";
import channelRoutes from "./routes/ChannelRoutes.js";
import setupSocket from "./socket.js";

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
app.use("/api/contacts", contactRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/channel", channelRoutes)

app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use("/uploads/files", express.static("uploads/files"));

const server = app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`);
})

setupSocket(server);

mongoose.connect(dbURL).then(()=>{console.log("Successfully connected Database")}).catch((err)=>{console.error("Caught an error: ", err.message)});