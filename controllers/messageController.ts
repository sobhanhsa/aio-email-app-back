import { Request, Response } from "express";
import { MessageModel, UserModel, UserType } from "../db/schemas/userSchema";
import { getReceiverSocketId, io } from "../socket/socket";
import { connectToDB } from "../db/utils";

export const sendMessageHandler = async(req:Request,res:Response) => {
    try {
        await connectToDB();

        const body = req.body;
		const { email } = req.params;

		const senderId = (req as any).user._id;

        const receiver : UserType = (await UserModel.find({
            email
        }))[0];

        const receiverId = receiver._id;

        const newMessage = await MessageModel.create({
            ...body,
            receivers:[receiverId],
            sender:senderId
        });

        await UserModel.updateMany({
            $or :[{_id:receiverId},{_id:senderId}]
        },{
            $push:{
                messages:newMessage
            }
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

export const getMessagesHandler = async(req:Request,res:Response) => {
    try {
        await connectToDB();

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