import { configDotenv } from "dotenv";

configDotenv()

import express from "express";

const port = process.env.PORT || 8000;

const app = express();

import cookieParser from "cookie-parser";
import router from "./userRouter";

app.use(cookieParser());
app.use(express.json());
app.use("/",router)

app.listen(port, () => console.log("server in running on port %d",port));