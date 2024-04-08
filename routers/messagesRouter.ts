import { Router } from "express";
import protectRoute from "../middlewares/authMiddleware";
import { sendMessageHandler } from "../controllers/messageController";

const messageRouter = Router();

messageRouter.post("/send/:id",protectRoute,sendMessageHandler)
messageRouter.get("/:id",protectRoute,sendMessageHandler)

export default messageRouter