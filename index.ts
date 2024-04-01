import { configDotenv } from "dotenv";

configDotenv()

import express from "express";

const port = process.env.PORT || 8000;


import cookieParser from "cookie-parser";
import router from "./userRouter";
import { app , server } from "./socket/socket";

app.use(cookieParser());
app.use(express.json());
app.use("/",router)

server.listen(port, () => console.log("server in running on port %d",port));