import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());



export default app;