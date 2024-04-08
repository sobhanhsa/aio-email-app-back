import { Request, Response } from "express";
import { MessageModel, UserType } from "../db/schemas/userSchema";
import { getReceiverSocketId, io } from "../socket/socket";

export const sendMessages = async(req:Request,res:Response) => {
    try {
        const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = (req as any).user._id;

        const newMessage = await MessageModel.create({
            ...message,
        });

        const receiverSocketId = getReceiverSocketId(receiverId);

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }

        return res.status(201).json({
            message:"success",
            newMessage
        });

    } catch (error:any) {
        console.log("Error in sendMessage controller: ", error.message);
		return res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessages = async(req:Request,res:Response) => {
    try {
        
        const userId = (req as any).user._id;

        const messages = await MessageModel.find({$or:[
            {
                receivers:{$in:[userId]}
            },
            {
                sender:userId
            }
        ]}).populate("receivers","sender");

        return res.status(200).json({
            message:"success",
            messages
        })
    } catch (error:any) {
        console.log("error in getMessages controller : ",error.message);
        return res.status(500).json({
            message:"internal server error"
        });
    }
};