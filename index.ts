import { configDotenv } from "dotenv";

configDotenv()

import express from "express";

const port = process.env.PORT || 8000;

const app = express();

import cookieParser from "cookie-parser";
import router from "./userRouter";

// const usercontrollers = require("./controllers/usercontroller");

app.use(cookieParser());
app.use(express.json());
app.use("/",router)



// app.post("/api/signup",usercontrollers.signupHandler);

// app.post("/api/login",usercontrollers.loginHandler)

// app.get("/api/logout",usercontrollers.logoutHandler)

app.listen(port, () => console.log("server in running on port %d",port));