import { Router } from "express";
import protectRoute from "../middlewares/authMiddleware";
import { getMessagesHandler, sendMessageHandler } from "../controllers/messageController";

const messageRouter = Router();

messageRouter.post("/send/:id",protectRoute,sendMessageHandler)
messageRouter.get("/",protectRoute,getMessagesHandler)

export default messageRouter