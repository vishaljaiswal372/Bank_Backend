import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import UserRouter from "./routes/user.routes.js";
import AccountRouter from "./routes/account.routes.js";
dotenv.config();

const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.use("/api/v1/user",UserRouter);
app.use("/api/v1/account",AccountRouter);


export default app;