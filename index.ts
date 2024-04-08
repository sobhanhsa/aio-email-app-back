import { configDotenv } from "dotenv";

configDotenv()

import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routers/userRouter";
import { app , server } from "./socket/socket";
import cors from "cors";
import messageRouter from "./routers/messageRouter";

const port = process.env.PORT || 8000;

const corsOptions = {
    credentials:true,
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/user",userRouter);
app.use("/message",messageRouter);

server.listen(port, () => console.log("server in running on port %d",port));